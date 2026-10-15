import Image from "next/image";
import type { ContentStatus } from "@/data/talita";
import { MagneticLink } from "@/components/motion/MagneticLink";
import ebookCover from "@/public/images/Ebook capa.png";

type Guide = {
  title: string;
  href: string | null;
  status: ContentStatus;
};

export function GuideSection({ guide }: { guide: Guide }) {
  if (!guide.href || guide.status !== "confirmado") return null;

  return (
    <section
      aria-labelledby="guide-title"
      className="guide-section"
      data-chapter-index="11"
      data-chapter-label="E-book"
      data-header-tone="dark"
      id="ebook"
    >
      <div className="section-frame guide-layout">
        <div className="guide-copy" data-reveal>
          <p className="section-kicker">E-book gratuito</p>
          <h2 id="guide-title">{guide.title}</h2>
          <p>
            Um material de Talita para refletir sobre como a ansiedade pode
            aproximar o futuro da experiência presente.
          </p>
          <MagneticLink
            href={guide.href}
            rel="noreferrer"
            target="_blank"
            variant="light"
          >
            Ler o e-book
          </MagneticLink>
        </div>

        <a
          aria-label={`Abrir o e-book ${guide.title}`}
          className="guide-book"
          data-reveal
          href={guide.href}
          rel="noreferrer"
          target="_blank"
        >
          <Image
            alt={`Capa do e-book ${guide.title}, de Talita F. Nolasco`}
            className="guide-book__image"
            placeholder="blur"
            quality={90}
            sizes="(max-width: 900px) 88vw, 29rem"
            src={ebookCover}
          />
        </a>
      </div>
    </section>
  );
}

