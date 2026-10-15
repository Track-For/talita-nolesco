import type { ReactNode } from "react";

type HighlightDirection = "left" | "right" | "top" | "bottom";

type HighlightedTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: HighlightDirection;
};

export function HighlightedText({
  children,
  className = "",
  delay = 0,
  from = "bottom",
}: HighlightedTextProps) {
  return (
    <span
      className={["highlighted-text", className].filter(Boolean).join(" ")}
      data-highlight-delay={delay}
      data-highlight-from={from}
      data-highlighted-text
    >
      <span
        aria-hidden="true"
        className="highlighted-text__wash"
        data-highlighted-text-wash
      />
      <span className="highlighted-text__content">{children}</span>
    </span>
  );
}
