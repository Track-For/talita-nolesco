import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const baseURL = process.env.QA_BASE_URL ?? "http://localhost:3001";
const executablePath =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDirectory = path.resolve("docs", "screenshots");

const viewports = [
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "430x932", width: 430, height: 932 },
  { name: "390x844", width: 390, height: 844 },
  { name: "360x800", width: 360, height: 800 },
  { name: "320x700", width: 320, height: 700 },
];

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({
  executablePath,
  headless: true,
});

const results = [];

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    colorScheme: "light",
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const response = await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);

  const metrics = await page.evaluate(() => {
    const links = [...document.querySelectorAll("a[href]")];
    const missingAnchors = links
      .map((link) => link.getAttribute("href"))
      .filter((href) => href?.startsWith("#"))
      .filter((href) => !document.querySelector(href));

    return {
      h1Count: document.querySelectorAll("h1").length,
      viewportWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      missingAnchors,
      imageCount: document.images.length,
      lazyImagesPendingAtInitial: [...document.images]
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.getAttribute("src")),
      reducedMotion: window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches,
    };
  });

  await page.screenshot({
    path: path.join(outputDirectory, `home-${viewport.name}.png`),
    fullPage: false,
  });

  if (viewport.width === 1440) {
    for (const [name, selector] of [
      ["manifesto", ".manifesto-section"],
      ["cinematic-static", ".cinematic-bridge"],
      ["sobre", "#sobre"],
      ["atendimentos", "#atendimentos"],
      ["abordagem", ".approach-section"],
      ["pausa", ".pause-section"],
      ["contato", "#contato"],
    ]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(180);
      await page.screenshot({
        path: path.join(outputDirectory, `desktop-${name}.png`),
        fullPage: false,
      });
    }
  }

  if (viewport.width === 390) {
    await page.locator(".menu-toggle").click();
    await page.waitForTimeout(100);
    await page.screenshot({
      path: path.join(outputDirectory, "mobile-menu-390x844.png"),
      fullPage: false,
    });
    await page.getByRole("button", { name: "Fechar" }).click();
  }

  await page.evaluate(async () => {
    const step = Math.max(360, window.innerHeight * 0.72);
    for (let top = 0; top < document.documentElement.scrollHeight; top += step) {
      window.scrollTo({ top, behavior: "instant" });
      await new Promise((resolve) => window.setTimeout(resolve, 45));
    }
    for (
      let top = document.documentElement.scrollHeight;
      top > 0;
      top -= step
    ) {
      window.scrollTo({ top, behavior: "instant" });
      await new Promise((resolve) => window.setTimeout(resolve, 30));
    }
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" });
  });
  await page.waitForTimeout(900);
  metrics.incompleteImagesAfterTraversal = await page.evaluate(() =>
    [...document.images]
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.getAttribute("src")),
  );

  results.push({
    viewport: viewport.name,
    status: response?.status(),
    consoleErrors,
    pageErrors,
    metrics,
  });

  await context.close();
}

const motionContext = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  colorScheme: "light",
  reducedMotion: "no-preference",
});
const motionPage = await motionContext.newPage();
const motionErrors = [];

motionPage.on("console", (message) => {
  if (message.type() === "error") motionErrors.push(message.text());
});
motionPage.on("pageerror", (error) => motionErrors.push(error.message));

await motionPage.goto(baseURL, { waitUntil: "networkidle" });
await motionPage.waitForTimeout(900);
const cinemaPosition = await motionPage
  .locator(".cinematic-bridge")
  .evaluate((section) => {
    const spacer = section.parentElement?.classList.contains("pin-spacer")
      ? section.parentElement
      : section;
    return spacer.getBoundingClientRect().top + window.scrollY;
  });
await motionPage.evaluate((top) => {
  window.scrollTo({
    top: top + window.innerHeight * 0.82,
    behavior: "instant",
  });
}, cinemaPosition);
await motionPage.waitForTimeout(900);
const cinemaState = await motionPage.locator(".cinematic-bridge").evaluate(() => {
  const frame = document.querySelector("[data-cinema-frame]");
  return {
    chapter: document.querySelector("[data-cinema-current]")?.textContent,
    clipPath: frame ? getComputedStyle(frame).clipPath : null,
    transform: frame ? getComputedStyle(frame).transform : null,
  };
});
await motionPage.screenshot({
  path: path.join(outputDirectory, "desktop-cinematic-mid.png"),
  fullPage: false,
});

const reelStart = await motionPage.locator(".reel-section").evaluate((section) => {
  const spacer = section.parentElement?.classList.contains("pin-spacer")
    ? section.parentElement
    : section;
  const top = spacer.getBoundingClientRect().top + window.scrollY;
  const track = section.querySelector("[data-reel-track]");
  const distance = Math.max(0, track.scrollWidth - window.innerWidth);
  window.scrollTo({ top, behavior: "instant" });
  return { top, distance };
});
await motionPage.waitForTimeout(650);
await motionPage.screenshot({
  path: path.join(outputDirectory, "desktop-reel-start.png"),
  fullPage: false,
});

await motionPage.evaluate(({ top, distance }) => {
  window.scrollTo({ top: top + distance * 0.34, behavior: "instant" });
}, reelStart);
await motionPage.waitForTimeout(900);
await motionPage.screenshot({
  path: path.join(outputDirectory, "desktop-reel-image.png"),
  fullPage: false,
});

await motionPage.evaluate(({ top, distance }) => {
  window.scrollTo({ top: top + distance * 0.7, behavior: "instant" });
}, reelStart);
await motionPage.waitForTimeout(900);
const reelTone = await motionPage
  .locator(".reel-section")
  .getAttribute("data-tone");
await motionPage.screenshot({
  path: path.join(outputDirectory, "desktop-reel-70.png"),
  fullPage: false,
});

const approachPosition = await motionPage
  .locator(".approach-section")
  .evaluate((section) => {
    const spacer = section.parentElement?.classList.contains("pin-spacer")
      ? section.parentElement
      : section;
    return spacer.getBoundingClientRect().top + window.scrollY;
  });
await motionPage.evaluate((top) => {
  window.scrollTo({
    top: top + window.innerHeight * 1.2,
    behavior: "instant",
  });
}, approachPosition);
await motionPage.waitForTimeout(1100);
const approachState = await motionPage.locator(".approach-section").evaluate(() => ({
  panelTransforms: [...document.querySelectorAll("[data-approach-panel]")].map(
    (panel) => getComputedStyle(panel).transform,
  ),
  polygonPoints: document
    .querySelector("[data-approach-polygon]")
    ?.getAttribute("points"),
}));
await motionPage.screenshot({
  path: path.join(outputDirectory, "desktop-abordagem-mid.png"),
  fullPage: false,
});

const pauseSection = motionPage.locator(".pause-section");
await pauseSection.scrollIntoViewIfNeeded();
await motionPage.waitForTimeout(1800);
for (const position of [
  { x: 860, y: 360 },
  { x: 930, y: 320 },
  { x: 990, y: 275 },
  { x: 1040, y: 250 },
]) {
  await pauseSection.hover({ position });
  await motionPage.waitForTimeout(140);
}
await motionPage.waitForTimeout(420);
const webgl = await motionPage
  .locator(".organic-field")
  .getAttribute("data-enhanced");
await motionPage.screenshot({
  path: path.join(outputDirectory, "desktop-pausa-webgl.png"),
  fullPage: false,
});

results.push({
  viewport: "1440x900-motion",
  motionErrors,
  cinemaState,
  approachState,
  reelEnhanced: await motionPage
    .locator(".reel-section")
    .getAttribute("data-enhanced"),
  reelToneAt70Percent: reelTone,
  webglEnhanced: webgl,
});

await motionContext.close();
await browser.close();

await writeFile(
  path.join(outputDirectory, "qa-results.json"),
  `${JSON.stringify(results, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify(results, null, 2));

