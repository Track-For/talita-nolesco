"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import {
  gsap,
  motionTokens,
  ScrollTrigger,
  SplitText,
} from "@/lib/gsap";

export function MotionOrchestrator({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      scope.dataset.motionReady = "true";

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const heroWords = gsap.utils.toArray<HTMLElement>(
          "[data-hero-word]",
          scope,
        );
        const heroPhoto = scope.querySelector<HTMLElement>("[data-hero-photo]");
        const heroMeta = gsap.utils.toArray<HTMLElement>(
          "[data-hero-meta]",
          scope,
        );
        const heroActions = scope.querySelector<HTMLElement>(
          "[data-hero-actions]",
        );
        const heroChapter = gsap.utils.toArray<HTMLElement>(
          "[data-hero-chapter]",
          scope,
        );

        const intro = gsap.timeline({
          defaults: { ease: motionTokens.ease },
        });

        if (heroPhoto) {
          const heroCurtain = heroPhoto.querySelector<HTMLElement>(
            "[data-image-curtain]",
          );
          const heroImage = heroPhoto.querySelector<HTMLElement>("img");

          if (heroCurtain) {
            intro.fromTo(
              heroCurtain,
              { yPercent: 0 },
              {
                yPercent: 101,
                duration: 1.25,
                ease: motionTokens.easeInOut,
              },
              0,
            );

            if (heroImage) {
              intro.fromTo(
                heroImage,
                { scale: 1.12 },
                {
                  scale: 1.06,
                  duration: 1.35,
                  ease: motionTokens.easeInOut,
                },
                0,
              );
            }
          } else {
            intro.fromTo(
              heroPhoto,
              { clipPath: "inset(0 0 100% 0)", scale: 1.06 },
              {
                clipPath: "inset(0 0 0% 0)",
                scale: 1,
                duration: 1.35,
                ease: motionTokens.easeInOut,
              },
            );
          }
        }

        intro.fromTo(
          heroWords,
          { yPercent: 115, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.95,
            stagger: 0.035,
          },
          "-=0.88",
        );

        intro.fromTo(
            heroMeta,
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.72, stagger: 0.08 },
            "-=0.5",
          );

        if (heroActions) {
          intro.fromTo(
            heroActions,
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.72 },
            "-=0.52",
          );
        }

        if (heroChapter.length) {
          intro.fromTo(
            heroChapter,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.8, stagger: 0.1 },
            "-=0.35",
          );
        }

        gsap.utils.toArray<HTMLElement>("[data-reveal]", scope).forEach((el) => {
          gsap.fromTo(
            el,
            { y: 42, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: motionTokens.ease,
              scrollTrigger: {
                trigger: el,
                start: "top 87%",
                once: true,
              },
            },
          );
        });

        gsap.utils
          .toArray<HTMLElement>("[data-direction-line]", scope)
          .forEach((line) => {
            const inner = line;

            const fromRight = line.dataset.revealDirection === "from-right";
            gsap.fromTo(
              inner,
              {
                autoAlpha: 0,
                xPercent: fromRight ? 28 : 0,
                yPercent: fromRight ? 0 : 110,
              },
              {
                autoAlpha: 1,
                xPercent: 0,
                yPercent: 0,
                duration: 1.05,
                ease: motionTokens.ease,
                scrollTrigger: {
                  trigger: line.parentElement ?? line,
                  start: "top 84%",
                  once: true,
                },
              },
            );
          });

        gsap.utils
          .toArray<HTMLElement>("[data-image-reveal]", scope)
          .forEach((image) => {
            const direction = image.dataset.imageReveal;
            if (direction === "band-reel") return;
            const curtain = image.querySelector<HTMLElement>(
              "[data-image-curtain]",
            );

            if (curtain) {
              const fromRight = direction === "from-right";

              gsap.fromTo(
                curtain,
                fromRight ? { xPercent: 0 } : { yPercent: 0 },
                {
                  ...(fromRight ? { xPercent: -101 } : { yPercent: 101 }),
                  duration: 1.2,
                  ease: motionTokens.easeInOut,
                  scrollTrigger: {
                    trigger: image,
                    start: "top 84%",
                    once: true,
                  },
                },
              );
              return;
            }

            const initialClip =
              direction === "band"
                ? "inset(0 50% 0 50%)"
                : direction === "from-right"
                  ? "inset(0 0 0 100%)"
                  : "inset(0 0 100% 0)";

            gsap.fromTo(
              image,
              { clipPath: initialClip },
              {
                clipPath: "inset(0 0 0 0)",
                duration: 1.3,
                ease: motionTokens.easeInOut,
                scrollTrigger: {
                  trigger: image,
                  start: "top 82%",
                  once: true,
                },
              },
            );
          });

        const manifesto = scope.querySelector<HTMLElement>("[data-manifesto]");
        let manifestoSplit: SplitText | undefined;

        if (manifesto) {
          manifestoSplit = SplitText.create(manifesto, {
            type: "words",
            wordsClass: "manifesto-word",
          });

          gsap.fromTo(
            manifestoSplit.words,
            { opacity: 0.16, y: 18 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.045,
              ease: "none",
              scrollTrigger: {
                trigger: manifesto,
                start: "top 72%",
                end: "bottom 62%",
                scrub: 0.75,
              },
            },
          );
        }

        const thread = scope.querySelector<SVGPathElement>("[data-thread-path]");
        if (thread) {
          const length = thread.getTotalLength();
          gsap.set(thread, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(thread, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: thread,
              start: "top 78%",
              end: "bottom 82%",
              scrub: 0.8,
            },
          });

          gsap.fromTo(
            "[data-thread-point]",
            { scale: 0, transformOrigin: "center" },
            {
              scale: 1,
              stagger: 0.3,
              ease: motionTokens.ease,
              scrollTrigger: {
                trigger: thread,
                start: "top 62%",
                end: "bottom 80%",
                scrub: 0.6,
              },
            },
          );
        }

        const progressFill = scope.querySelector<HTMLElement>(
          "[data-cinema-progress-fill]",
        );
        const progressLabel = scope.querySelector<HTMLElement>(
          "[data-cinema-progress-label]",
        );
        const progressCurrent = scope.querySelector<HTMLElement>(
          "[data-cinema-current]",
        );
        const progressTotal = scope.querySelector<HTMLElement>(
          "[data-cinema-total]",
        );
        const progressValue = scope.querySelector<HTMLElement>(
          "[data-cinema-progress-value]",
        );
        const progressHud = scope.querySelector<HTMLElement>(".cinema-hud");

        const chapters = gsap.utils.toArray<HTMLElement>(
          "[data-chapter-label]",
          scope,
        );
        const toneSections = gsap.utils.toArray<HTMLElement>(
          "[data-header-tone]",
          scope,
        );

        if (progressTotal) {
          progressTotal.textContent = String(chapters.length).padStart(2, "0");
        }

        const updateChapter = () => {
          const marker = window.innerHeight * 0.52;
          const active = chapters.reduce((current, chapter) => {
            return chapter.getBoundingClientRect().top <= marker
              ? chapter
              : current;
          }, chapters[0]);

          if (!active) return;
          if (progressLabel) {
            progressLabel.textContent = active.dataset.chapterLabel ?? "";
          }
          if (progressCurrent) {
            progressCurrent.textContent = active.dataset.chapterIndex ?? "";
          }

          const activeToneSection = toneSections.reduce((current, section) => {
            return section.getBoundingClientRect().top <= marker
              ? section
              : current;
          }, toneSections[0]);

          if (progressHud && activeToneSection) {
            progressHud.dataset.tone =
              activeToneSection.dataset.headerTone === "dark"
                ? "dark"
                : "light";
          }
        };

        if (progressFill) {
          gsap.set(progressFill, { scaleY: 0, transformOrigin: "top" });
          ScrollTrigger.create({
            start: 0,
            end: () => ScrollTrigger.maxScroll(window),
            invalidateOnRefresh: true,
            refreshPriority: -100,
            onUpdate: (self) => {
              gsap.set(progressFill, { scaleY: self.progress });
              if (progressValue) {
                progressValue.textContent = `${Math.round(self.progress * 100)}%`;
              }
            },
            onRefresh: (self) => {
              gsap.set(progressFill, { scaleY: self.progress });
              if (progressValue) {
                progressValue.textContent = `${Math.round(self.progress * 100)}%`;
              }
            },
          });
        }

        ScrollTrigger.create({
          start: 0,
          end: () => ScrollTrigger.maxScroll(window),
          invalidateOnRefresh: true,
          refreshPriority: -100,
          onUpdate: updateChapter,
          onRefresh: updateChapter,
        });

        media.add("(min-width: 901px)", () => {
          const hero = scope.querySelector<HTMLElement>(".hero");
          const heroCopy = scope.querySelector<HTMLElement>(".hero__copy");
          const ornament = scope.querySelector<HTMLElement>(".hero__ornament");

          if (hero && heroCopy && heroPhoto) {
            gsap.to(heroCopy, {
              yPercent: -7,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
            gsap.to(heroPhoto, {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          if (hero && ornament) {
            gsap.to(ornament, {
              rotation: 38,
              scale: 1.12,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          const bridge = scope.querySelector<HTMLElement>(
            "[data-cinema-bridge]",
          );
          const frame = bridge?.querySelector<HTMLElement>(
            "[data-cinema-frame]",
          );
          const image = frame?.querySelector<HTMLElement>("img");
          const backdrop = bridge?.querySelector<HTMLElement>(
            "[data-cinema-backdrop]",
          );
          const copy = bridge?.querySelector<HTMLElement>("[data-cinema-copy]");
          const caption = bridge?.querySelector<HTMLElement>(
            "[data-cinema-caption]",
          );

          if (bridge && frame && image && backdrop && copy && caption) {
            const cinemaTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: bridge,
                start: "top top",
                end: () => `+=${window.innerHeight * 1.7}`,
                pin: true,
                scrub: 1.2,
                anticipatePin: 1,
                refreshPriority: 2,
                invalidateOnRefresh: true,
              },
            });

            cinemaTimeline
              .fromTo(
                backdrop,
                { xPercent: 12, autoAlpha: 0.16 },
                { xPercent: -12, autoAlpha: 0.58, duration: 1, ease: "none" },
                0,
              )
              .fromTo(
                frame,
                {
                  scale: 0.46,
                  rotation: -1.4,
                  yPercent: 3,
                },
                {
                  scale: 1,
                  rotation: 0,
                  yPercent: 0,
                  duration: 1.15,
                  ease: "none",
                },
                0,
              )
              .fromTo(
                image,
                { scale: 1.12 },
                { scale: 1.01, duration: 1.15, ease: "none" },
                0,
              );

            cinemaTimeline
              .fromTo(
                copy,
                { yPercent: 34, autoAlpha: 0 },
                {
                  yPercent: 0,
                  autoAlpha: 1,
                  duration: 0.48,
                  ease: "none",
                },
                0.3,
              )
              .fromTo(
                caption,
                { y: 24, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.34, ease: "none" },
                0.62,
              );
          }

          const approach = scope.querySelector<HTMLElement>(
            "[data-approach-section]",
          );
          const approachGrid = approach?.querySelector<HTMLElement>(
            "[data-approach-grid]",
          );
          const approachMorph = approach?.querySelector<HTMLElement>(
            "[data-approach-morph]",
          );
          const approachPolygon = approach?.querySelector<SVGPolygonElement>(
            "[data-approach-polygon]",
          );
          const approachConcepts = approach
            ? gsap.utils.toArray<HTMLElement>(
                "[data-approach-concept]",
                approach,
              )
            : [];
          const approachPanels = approach
            ? gsap.utils.toArray<HTMLElement>("[data-approach-panel]", approach)
            : [];
          const approachCopies = approach
            ? gsap.utils.toArray<HTMLElement>("[data-approach-copy]", approach)
            : [];

          if (
            approach &&
            approachGrid &&
            approachMorph &&
            approachPolygon &&
            approachConcepts.length &&
            approachPanels.length
          ) {
            const shapePoints = approachConcepts.map(
              (concept) => concept.dataset.approachShapePoints ?? "",
            );

            gsap.set(approachPanels, {
              scaleY: (index) =>
                Number(approachConcepts[index]?.dataset.approachStart ?? 1),
              transformOrigin: "center bottom",
            });
            gsap.set(approachPolygon, {
              attr: { points: shapePoints[0] },
            });

            const approachTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: approach,
                start: "top top",
                end: () => `+=${window.innerHeight * 2.35}`,
                pin: true,
                scrub: 1.1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            approachTimeline
              .to(
                approachPanels,
                {
                  scaleY: 1,
                  duration: 4,
                  stagger: 0.04,
                  ease: "none",
                },
                0,
              )
              .fromTo(
                approachCopies,
                { y: 16, autoAlpha: 0.58 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 3.2,
                  stagger: 0.16,
                  ease: "none",
                },
                0.2,
              )
              .to(
                approachMorph,
                {
                  rotation: 220,
                  duration: 4,
                  ease: "none",
                },
                0,
              );

            shapePoints.slice(1).forEach((points, index) => {
              const stage = index + 1;
              approachTimeline
                .to(
                  approachMorph,
                  {
                    x: () =>
                      (approachGrid.clientWidth * 0.8 * stage) /
                      (shapePoints.length - 1),
                    duration: 1,
                    ease: "none",
                  },
                  index,
                )
                .to(
                  approachPolygon,
                  {
                    attr: { points },
                    duration: 0.72,
                    ease: "power1.inOut",
                  },
                  index + 0.12,
                );
            });
          }
        });

        media.add("(max-width: 900px)", () => {
          const approachCards = gsap.utils.toArray<HTMLElement>(
            "[data-approach-concept]",
            scope,
          );

          approachCards.slice(0, -1).forEach((card, index) => {
            gsap.to(card, {
              scale: 0.94,
              opacity: 0.58,
              transformOrigin: "center top",
              ease: "none",
              scrollTrigger: {
                trigger: approachCards[index + 1],
                start: "top 84%",
                end: "top 18%",
                scrub: 0.65,
              },
            });
          });
        });

        media.add("(min-width: 768px)", () => {
          gsap.utils
            .toArray<HTMLElement>("[data-parallax]", scope)
            .forEach((frame) => {
              const image = frame.querySelector("img");
              if (!image) return;

              gsap.fromTo(
                image,
                { yPercent: -5 },
                {
                  yPercent: 6,
                  ease: "none",
                  scrollTrigger: {
                    trigger: frame,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
            });
        });

        const servicePanels = gsap.utils.toArray<HTMLElement>(
          "[data-service-panel]",
          scope,
        );
        servicePanels.slice(0, -1).forEach((panel, index) => {
          gsap.to(panel, {
            scale: 0.94,
            opacity: 0.58,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: servicePanels[index + 1],
              start: "top 78%",
              end: "top 18%",
              scrub: 0.65,
            },
          });
        });

        return () => {
          manifestoSplit?.revert();
        };
      });

      return () => {
        media.revert();
        delete scope.dataset.motionReady;
        ScrollTrigger.refresh();
      };
    },
    { scope: root },
  );

  return (
    <div className="site-shell" ref={root}>
      {children}
    </div>
  );
}

