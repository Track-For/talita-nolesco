import Image from "next/image";
import talitaPensante from "@/public/images/optimized/talita-pensante.webp";

export function CinematicBridge() {
  return (
    <section
      aria-labelledby="cinematic-bridge-title"
      className="cinematic-bridge"
      data-chapter-index="03"
      data-chapter-label="Presença"
      data-cinema-bridge
      data-header-tone="dark"
    >
      <div className="cinematic-bridge__stage">
        <p className="cinematic-bridge__backdrop" data-cinema-backdrop>
          presença
        </p>

        <figure className="cinematic-bridge__frame" data-cinema-frame>
          <Image
            alt="Talita em um ambiente de atendimento, em momento de reflexão"
            fill
            placeholder="blur"
            sizes="(max-width: 900px) 92vw, 78vw"
            src={talitaPensante}
            unoptimized
          />
          <span
            aria-hidden="true"
            className="image-curtain image-curtain--down"
            data-image-curtain
          />
          <span aria-hidden="true" className="cinematic-bridge__wash" />
        </figure>

        <div className="cinematic-bridge__copy" data-cinema-copy>
          <p>
            <span>03</span>
            <span>Um intervalo de presença</span>
          </p>
          <h2 id="cinematic-bridge-title">
            Algumas histórias pedem tempo antes de pedir respostas
          </h2>
        </div>

        <p className="cinematic-bridge__caption" data-cinema-caption>
          Escutar também é permitir que uma experiência encontre seu próprio
          contorno
        </p>
      </div>
    </section>
  );
}
