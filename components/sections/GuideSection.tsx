import type { ContentStatus } from "@/data/talita";
import { MagneticLink } from "@/components/motion/MagneticLink";

type Guide = {
  title: string;
  href: string | null;
  status: ContentStatus;
};

export function GuideSection({ guide }: { guide: Guide }) {
  if (!guide.href || guide.status !== "confirmado") return null;

  return (
    <section className="guide-section">
      <div className="section-frame">
        <h2>{guide.title}</h2>
        <p>Conteúdo gratuito preparado por Talita.</p>
        <MagneticLink href={guide.href}>Acessar o guia</MagneticLink>
      </div>
    </section>
  );
}

