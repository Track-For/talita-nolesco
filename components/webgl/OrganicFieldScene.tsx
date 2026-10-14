"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

const OrganicField = dynamic(
  () => import("./OrganicField").then((module) => module.OrganicField),
  { ssr: false },
);

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl"),
    );
  } catch {
    return false;
  }
}

export function OrganicFieldScene() {
  const container = useRef<HTMLDivElement>(null);
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const handleLost = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setEligible(!reduced.matches && supportsWebGL());
    };

    update();
    reduced.addEventListener("change", update);

    return () => {
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const element = container.current;
    if (!element || !eligible) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "180px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [eligible]);

  return (
    <div
      aria-hidden="true"
      className="organic-field"
      data-enhanced={eligible && visible && !failed}
      ref={container}
    >
      <div className="organic-field__poster" />
      {eligible && visible && !failed ? (
        <OrganicField onLost={handleLost} />
      ) : null}
    </div>
  );
}

