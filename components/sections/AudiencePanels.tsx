"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import talitaPensante from "@/public/images/optimized/talita-pensante-hq.webp";

const panels = [
  {
    title: "Quando a ansiedade ocupa espaço demais",
    text: "Para quem deseja conversar sobre preocupações, sobrecarga e a forma como isso atravessa o cotidiano",
  },
  {
    title: "Quando a insegurança limita escolhas",
    text: "Para olhar com cuidado para dúvidas, autocrítica e maneiras de se posicionar diante da própria vida",
  },
  {
    title: "Quando as relações pedem compreensão",
    text: "Para elaborar conflitos, vínculos e repetições sem transformar experiências complexas em fórmulas simples",
  },
  {
    title: "Quando existe vontade de se conhecer",
    text: "Para mulheres que buscam um espaço de escuta e reflexão, mesmo sem uma resposta pronta sobre por onde começar",
  },
] as const;

export function AudiencePanels() {
  const [active, setActive] = useState(0);

  return (
    <div className="audience-layout">
      <div
        className="audience-panels"
        style={{ "--active-panel": active } as CSSProperties}
      >
        {panels.map((panel, index) => (
          <button
            aria-pressed={active === index}
            className="audience-panel"
            data-active={active === index}
            key={panel.title}
            onClick={() => setActive(index)}
            type="button"
          >
            <span className="audience-panel__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="audience-panel__copy">
              <strong>{panel.title}</strong>
              <span>
                <span>{panel.text}</span>
              </span>
            </span>
          </button>
        ))}
      </div>

      <figure
        className="audience-portrait"
        data-active={active}
        data-image-reveal="from-right"
        data-parallax
      >
        <Image
          alt="Talita em um ambiente de atendimento, em momento de reflexão"
          fill
          placeholder="blur"
          quality={90}
          sizes="(max-width: 900px) 100vw, 42vw"
          src={talitaPensante}
        />
        <span
          aria-hidden="true"
          className="image-curtain image-curtain--from-right"
          data-image-curtain
        />
        <div className="audience-portrait__shape" aria-hidden="true" />
      </figure>
    </div>
  );
}

