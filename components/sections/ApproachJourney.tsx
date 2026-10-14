import { approachConcepts } from "@/data/talita";
import type { CSSProperties } from "react";

const SHAPE_SAMPLES = 24;
const START_HEIGHTS = [1, 0.86, 0.72, 0.58, 0.44] as const;

function polygonPoints(sides: number) {
  const radius = 42;
  const center = 50;
  const vertices = Array.from({ length: sides }, (_, index) => {
    const angle = -Math.PI / 2 + (index / sides) * Math.PI * 2;
    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
    };
  });

  return Array.from({ length: SHAPE_SAMPLES }, (_, index) => {
    const perimeterPosition = (index / SHAPE_SAMPLES) * sides;
    const startIndex = Math.floor(perimeterPosition) % sides;
    const endIndex = (startIndex + 1) % sides;
    const progress = perimeterPosition - Math.floor(perimeterPosition);
    const start = vertices[startIndex];
    const end = vertices[endIndex];
    const x = start.x + (end.x - start.x) * progress;
    const y = start.y + (end.y - start.y) * progress;

    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

export function ApproachJourney() {
  return (
    <section
      className="approach-section"
      data-approach-section
      data-chapter-index="07"
      data-chapter-label="Abordagem"
      data-header-tone="light"
      id="abordagem"
    >
      <div className="section-frame approach-stage">
        <div className="approach-title" data-reveal>
          <p className="section-kicker">A abordagem</p>
          <h2>Escuta, compreensão e construção de sentido</h2>
          <p>
            Um percurso de presença e elaboração inspirado pela Logoterapia e
            pela Análise Existencial. Cada processo acontece em seu próprio
            ritmo, sem uma sequência rígida ou respostas prontas
          </p>
        </div>

        <div className="approach-concepts" data-approach-grid>
          <div className="approach-concepts__axis" aria-hidden="true" />

          {approachConcepts.map((concept, index) => (
            <article
              data-approach-concept
              data-approach-shape-points={polygonPoints(concept.sides)}
              data-approach-start={START_HEIGHTS[index]}
              key={concept.title}
              style={
                {
                  "--approach-start": START_HEIGHTS[index],
                } as CSSProperties
              }
            >
              <span className="approach-concept__panel" data-approach-panel />
              <div className="approach-concept__copy" data-approach-copy>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{concept.title}</h3>
                <p>{concept.description}</p>
              </div>
            </article>
          ))}

          <div className="approach-morph" data-approach-morph aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <polygon
                data-approach-polygon
                points={polygonPoints(approachConcepts[0].sides)}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
