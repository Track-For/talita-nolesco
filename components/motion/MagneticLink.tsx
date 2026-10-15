"use client";

import type { ReactNode, PointerEvent } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const GLOW_FREQUENCY = 3.4;
const GLOW_DAMPING = 0.78;
const GLOW_RISE = 0.5;

type MagneticLinkProps = {
  children: ReactNode;
  href: string;
  rel?: string;
  target?: "_blank" | "_self";
  variant?: "solid" | "outline" | "text" | "light";
  onClick?: () => void;
};

export function MagneticLink({
  children,
  href,
  rel,
  target,
  variant = "solid",
  onClick,
}: MagneticLinkProps) {
  const root = useRef<HTMLAnchorElement>(null);
  const inner = useRef<HTMLSpanElement>(null);
  const lightTrack = useRef<HTMLSpanElement>(null);
  const rightGlow = useRef<HTMLSpanElement>(null);
  const leftGlow = useRef<HTMLSpanElement>(null);
  const animationFrame = useRef<number | null>(null);
  const moveX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const moveY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const hasGlow = variant !== "text";

  useEffect(() => {
    const element = inner.current;
    if (!element) return;

    moveX.current = gsap.quickTo(element, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(element, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    return () => {
      moveX.current = null;
      moveY.current = null;
      gsap.killTweensOf(element);
    };
  }, []);

  useEffect(() => {
    const container = root.current;
    const light = lightTrack.current;
    const right = rightGlow.current;
    const left = leftGlow.current;
    if (!hasGlow || !container || !light || !right || !left) return;

    let bound = container.getBoundingClientRect().width / 2 + 12;
    let x = bound;
    let velocity = 0;
    let target = bound;
    let inside = false;
    let last = performance.now();

    const measure = () => {
      bound = container.getBoundingClientRect().width / 2 + 12;
    };

    const paint = () => {
      light.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), -50%, 0)`;

      const normalized = Math.max(-1, Math.min(1, x / bound));
      const magnitude = Math.abs(normalized);
      const intensity = Math.pow(magnitude, GLOW_RISE);

      right.style.opacity = (normalized > 0 ? intensity : 0).toFixed(3);
      left.style.opacity = (normalized < 0 ? intensity : 0).toFixed(3);
    };

    const frame = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.032);
      last = now;
      const angularFrequency = 2 * Math.PI * GLOW_FREQUENCY;

      velocity +=
        (angularFrequency * angularFrequency * (target - x) -
          2 * GLOW_DAMPING * angularFrequency * velocity) *
        delta;
      x += velocity * delta;
      paint();

      if (inside || Math.abs(target - x) > 0.15 || Math.abs(velocity) > 0.6) {
        animationFrame.current = requestAnimationFrame(frame);
      } else {
        animationFrame.current = null;
        x = target;
        velocity = 0;
        paint();
      }
    };

    const kick = () => {
      if (animationFrame.current === null) {
        last = performance.now();
        animationFrame.current = requestAnimationFrame(frame);
      }
    };

    const handleGlowMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = container.getBoundingClientRect();
      inside = true;
      target = Math.max(
        -bound,
        Math.min(bound, event.clientX - (bounds.left + bounds.width / 2)),
      );
      kick();
    };

    const handleGlowLeave = () => {
      inside = false;
      target = x;
      kick();
    };

    const handleFocus = () => {
      inside = false;
      target = 0;
      kick();
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);
    measure();
    paint();

    if (!reducedMotion) {
      container.addEventListener("pointermove", handleGlowMove);
      container.addEventListener("pointerleave", handleGlowLeave);
      container.addEventListener("focus", handleFocus);
      container.addEventListener("blur", handleGlowLeave);
    }

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", handleGlowMove);
      container.removeEventListener("pointerleave", handleGlowLeave);
      container.removeEventListener("focus", handleFocus);
      container.removeEventListener("blur", handleGlowLeave);
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [hasGlow]);

  function handleMove(event: PointerEvent<HTMLAnchorElement>) {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      !moveX.current ||
      !moveY.current
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.13;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.13;

    moveX.current(x);
    moveY.current(y);
  }

  function reset() {
    moveX.current?.(0);
    moveY.current?.(0);
  }

  return (
    <a
      className={`button button--${variant}`}
      href={href}
      onClick={onClick}
      onPointerLeave={reset}
      onPointerMove={handleMove}
      ref={root}
      rel={rel}
      target={target}
    >
      {hasGlow ? (
        <>
          <span
            aria-hidden="true"
            className="button__edge-glow button__edge-glow--right"
            ref={rightGlow}
          />
          <span
            aria-hidden="true"
            className="button__edge-glow button__edge-glow--left"
            ref={leftGlow}
          />
          <span aria-hidden="true" className="button__glass">
            <span className="button__light-track" ref={lightTrack} />
          </span>
        </>
      ) : null}
      <span className="button__content" ref={inner}>
        <span>{children}</span>
        {hasGlow ? (
          <svg
            aria-hidden="true"
            className="button__arrow"
            fill="none"
            viewBox="0 0 17 9"
          >
            <path
              clipRule="evenodd"
              d="m12.495 0 4.495 4.495-4.495 4.495-.99-.99 2.805-2.805H0v-1.4h14.31L11.505.99z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        ) : null}
      </span>
    </a>
  );
}

