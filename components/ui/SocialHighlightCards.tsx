import type { CSSProperties } from "react";
import type { SocialLink } from "@/data/socials";

const highlights = {
  instagram: "#df8da5",
  linkedin: "#b8a8d1",
  youtube: "#efaa98",
} as const;

function SocialIcon({ platform }: Pick<SocialLink, "platform">) {
  if (platform === "linkedin") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M5.1 3.5a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM3.3 8.9h3.6V20H3.3V8.9Zm5.8 0h3.4v1.5h.1c.5-.9 1.6-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6V20h-3.6v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H9.1V8.9Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (platform === "youtube") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M21.6 7.1a2.9 2.9 0 0 0-2-2C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 2 12a30 30 0 0 0 .4 4.9 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 22 12a30 30 0 0 0-.4-4.9ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <rect
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
        width="18"
        x="3"
        y="3"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" fill="currentColor" r="1.2" />
    </svg>
  );
}

export function SocialHighlightCards({ links }: { links: SocialLink[] }) {
  if (!links.length) return null;

  return (
    <nav aria-label="Redes sociais" className="social-cards">
      {links.map((social) => {
        const style = {
          "--social-accent": highlights[social.platform],
        } as CSSProperties;

        return (
          <a
            aria-label={social.label}
            className="social-card"
            href={social.href}
            key={social.href}
            rel="noreferrer"
            style={style}
            target="_blank"
            title={social.label}
          >
            <span className="social-card__glow" aria-hidden="true" />
            <span className="social-card__beam" aria-hidden="true" />
            <span className="social-card__icon">
              <SocialIcon platform={social.platform} />
            </span>
          </a>
        );
      })}
    </nav>
  );
}

