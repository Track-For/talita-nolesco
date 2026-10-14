"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import talitaPensante from "@/public/images/optimized/talita-pensante.webp";

const scenes = [
  {
    title: "Aquilo que aperta",
    text: "pode ser escutado sem pressa",
  },
  {
    title: "O que se repete",
    text: "pode encontrar novas perguntas",
  },
  {
    title: "O que importa",
    text: "pode aparecer com mais nitidez",
  },
  {
    title: "O que ainda não tem nome",
    text: "também pode encontrar espaço",
  },
] as const;

export function HorizontalReel() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      const track = section?.querySelector<HTMLElement>("[data-reel-track]");
      if (!section || !track) return;

      const media = gsap.matchMedia();
      media.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          section.dataset.enhanced = "true";
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                section.dataset.tone = self.progress >= 0.65 ? "lavender" : "ivory";
              },
            },
          });

          const portrait = track.querySelector<HTMLElement>(
            "[data-image-reveal='band-reel']",
          );
          const curtain = portrait?.querySelector<HTMLElement>(
            "[data-image-curtain]",
          );
          const portraitReveal = curtain
            ? gsap.fromTo(
                curtain,
                { xPercent: 0 },
                {
                  xPercent: -101,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${distance() * 0.34}`,
                    scrub: 0.65,
                    invalidateOnRefresh: true,
                  },
                },
              )
            : portrait
              ? gsap.fromTo(
                  portrait,
                  { clipPath: "inset(0 50% 0 50%)" },
                  {
                    clipPath: "inset(0 0 0 0)",
                    ease: "none",
                    scrollTrigger: {
                      trigger: section,
                      start: "top top",
                      end: () => `+=${distance() * 0.34}`,
                      scrub: 0.65,
                      invalidateOnRefresh: true,
                    },
                  },
                )
              : null;

          return () => {
            portraitReveal?.kill();
            tween.kill();
            delete section.dataset.enhanced;
            delete section.dataset.tone;
          };
        },
      );

      media.add(
        "(max-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          const portrait = track.querySelector<HTMLElement>(
            "[data-image-reveal='band-reel']",
          );
          const curtain = portrait?.querySelector<HTMLElement>(
            "[data-image-curtain]",
          );
          if (!portrait || !curtain) return;

          const reveal = gsap.fromTo(
            curtain,
            { xPercent: 0 },
            {
              xPercent: -101,
              duration: 1.15,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: portrait,
                start: "top 88%",
                once: true,
              },
            },
          );

          return () => reveal.kill();
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section
      aria-label="Uma sequência de reflexões"
      className="reel-section"
      data-chapter-index="06"
      data-chapter-label="Reflexões"
      data-header-tone="light"
      ref={root}
    >
      <div className="reel-track" data-reel-track>
        {scenes.map((scene, index) => (
          <article className="reel-panel" data-scene={index + 1} key={scene.title}>
            {index === 1 ? (
              <figure
                className="reel-panel__portrait"
                data-image-reveal="band-reel"
              >
                <Image
                  alt="Talita em momento de reflexão"
                  fill
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 40vw"
                  src={talitaPensante}
                  unoptimized
                />
                <span
                  aria-hidden="true"
                  className="image-curtain image-curtain--from-right"
                  data-image-curtain
                />
              </figure>
            ) : null}
            <div className="reel-panel__copy">
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h2>{scene.title}</h2>
              <p>{scene.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

