"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export const motionTokens = {
  ease: "power3.out",
  easeInOut: "power3.inOut",
  duration: 0.9,
  stagger: 0.08,
} as const;

export { gsap, ScrollTrigger, SplitText };

