import Image from "next/image";
import talitaPerseveranca from "@/public/images/optimized/talita-hero-wide-hq.webp";

export function CinematicBridge() {
  return (
    <section
      aria-labelledby="cinematic-bridge-title"
      className="cinematic-bridge"
      data-chapter-index="07"
      data-chapter-label="Perseverança"
      data-cinema-bridge
      data-header-tone="light"
    >
      <div className="cinematic-bridge__stage">
        <p className="cinematic-bridge__backdrop" data-cinema-backdrop>
          perseverança
        </p>

        <figure
          className="cinematic-bridge__frame"
          data-cinema-frame
        >
          <Image
            alt="Talita sorrindo em uma poltrona, em um ambiente acolhedor"
            fill
            placeholder="blur"
            quality={90}
            sizes="(max-width: 900px) 92vw, 78vw"
            src={talitaPerseveranca}
          />
          <span aria-hidden="true" className="cinematic-bridge__wash" />

          <div className="cinematic-bridge__copy" data-cinema-copy>
            <p>
              <span>07</span>
              <span>Um movimento de perseverança</span>
            </p>
            <h2 id="cinematic-bridge-title">
              Seguir também pode ser um jeito de se escutar
            </h2>
          </div>

          <p className="cinematic-bridge__caption" data-cinema-caption>
            Perseverar não é apressar a história. É sustentar, com cuidado, o
            próximo passo possível
          </p>
        </figure>
      </div>
    </section>
  );
}
