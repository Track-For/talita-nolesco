"use client";

import Image, { type StaticImageData } from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import testimonialOne from "@/public/images/optimized/depoimento-1.webp";
import testimonialTwo from "@/public/images/optimized/depoimento-2.webp";
import testimonialThree from "@/public/images/optimized/depoimento-3.webp";
import testimonialFour from "@/public/images/optimized/depoimento-4.webp";
import testimonialFive from "@/public/images/optimized/depoimento-5.webp";

const testimonials: StaticImageData[] = [
  testimonialOne,
  testimonialTwo,
  testimonialThree,
  testimonialFour,
  testimonialFive,
];

const testimonialTextures = testimonials.map((testimonial, index) => ({
  id: `testimonial-${index + 1}`,
  src: testimonial.src,
  width: testimonial.width,
  height: testimonial.height,
}));

const TestimonialsGalleryCanvas = dynamic(
  () => import("@/components/webgl/TestimonialsGalleryCanvas"),
  { ssr: false },
);

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function Testimonials({ approved }: { approved: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [enhanced, setEnhanced] = useState(false);
  const [webglSupported, setWebglSupported] = useState(false);
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleLost = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setEnhanced(!reduced.matches);
      setWebglSupported(supportsWebGL());
    };

    update();
    reduced.addEventListener("change", update);

    return () => {
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !enhanced || failed || !webglSupported) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "200% 0px", threshold: 0.01 },
    );
    observer.observe(section);

    const refreshFrame = window.requestAnimationFrame(() =>
      ScrollTrigger.refresh(),
    );

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      observer.disconnect();
    };
  }, [enhanced, failed, webglSupported]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !enhanced) return;

      const progress = { value: 0 };
      const tween = gsap.to(progress, {
        value: 1,
        ease: "none",
        onUpdate: () => {
          progressRef.current = progress.value;
          const nextIndex = Math.min(
            testimonials.length - 1,
            Math.floor(progress.value * testimonials.length),
          );
          setActiveIndex((current) =>
            current === nextIndex ? current : nextIndex,
          );
        },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.15,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.kill();
    },
    { scope: sectionRef, dependencies: [enhanced] },
  );

  if (!approved) return null;

  const webglActive = enhanced && webglSupported && !failed;
  const immersive = enhanced;
  const activeTestimonial = testimonials[activeIndex] ?? testimonials[0];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-title"
      className={`testimonials-section ${immersive ? "is-immersive" : "is-fallback"}`}
      data-chapter-index="06"
      data-chapter-label="Sentir"
      data-chapter-proxy
      data-header-tone="dark"
    >
      {immersive ? (
        <div className="testimonials-gallery__stage">
          <div className="testimonials-gallery__canvas" aria-hidden="true">
            {webglActive && active ? (
              <TestimonialsGalleryCanvas
                active={active}
                onLost={handleLost}
                progressRef={progressRef}
                testimonials={testimonialTextures}
              />
            ) : !webglActive ? (
              <figure className="testimonials-gallery__fallback-card">
                <Image
                  alt=""
                  fill
                  key={activeTestimonial.src}
                  quality={90}
                  sizes="(max-width: 900px) 82vw, 36vw"
                  src={activeTestimonial}
                />
              </figure>
            ) : null}
          </div>
          <div className="testimonials-gallery__veil" aria-hidden="true" />

          <div className="testimonials-gallery__intro">
            <p className="section-kicker">Relatos compartilhados</p>
            <h2 id="testimonials-title">Palavras de quem viveu esse processo</h2>
            <p>Mensagens compartilhadas com identidade preservada</p>
          </div>

          <p className="testimonials-gallery__counter" aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span aria-hidden="true"> / </span>
            <span>{String(testimonials.length).padStart(2, "0")}</span>
          </p>

          <div className="testimonials-gallery__rail" aria-hidden="true">
            {testimonials.map((testimonial, index) => (
              <span
                data-active={index === activeIndex}
                key={testimonial.src}
              />
            ))}
          </div>

          <p className="testimonials-gallery__instruction">
            Role para atravessar os relatos
          </p>

          <ol className="sr-only">
            {testimonials.map((testimonial, index) => (
              <li key={testimonial.src}>
                Depoimento {index + 1} sobre o acompanhamento psicológico, com
                identidade preservada
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="section-frame testimonials-layout">
          <div className="testimonials-intro" data-reveal>
            <p className="section-kicker">Relatos compartilhados</p>
            <h2 id="testimonials-title">Palavras de quem viveu esse processo</h2>
            <p>Mensagens compartilhadas com identidade preservada</p>
          </div>

          <div className="testimonials-track">
            {testimonials.map((testimonial, index) => (
              <figure
                className="testimonial-card"
                data-reveal
                key={testimonial.src}
              >
                <Image
                  alt={`Depoimento ${index + 1} sobre o acompanhamento psicológico, com identidade preservada`}
                  placeholder="blur"
                  quality={90}
                  sizes="(max-width: 700px) 82vw, 28vw"
                  src={testimonial}
                />
              </figure>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
