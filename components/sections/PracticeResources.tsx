import { CalendarDays, ExternalLink, ListChecks } from "lucide-react";

type PracticeResourcesProps = {
  schedulingHref: string;
  temperamentTestHref: string;
};

export function PracticeResources({
  schedulingHref,
  temperamentTestHref,
}: PracticeResourcesProps) {
  return (
    <section
      className="resources-section"
      data-chapter-index="10"
      data-chapter-label="Recursos"
      data-header-tone="light"
    >
      <div className="section-frame resources-layout">
        <div className="resources-intro">
          <p className="section-kicker">Recursos e próximos passos</p>
          <h2>Continue no seu ritmo</h2>
          <p>
            Acesse um material de autoconhecimento ou consulte diretamente os
            horários disponíveis para atendimento online
          </p>
        </div>

        <div className="resources-links">
          <a
            href={temperamentTestHref}
            rel="noreferrer"
            target="_blank"
          >
            <span className="resources-link__icon" aria-hidden="true">
              <ListChecks strokeWidth={1.55} />
            </span>
            <span>
              <strong>Teste de temperamento</strong>
              <small>
                Material externo de autoconhecimento. Não substitui avaliação
                psicológica
              </small>
            </span>
            <ExternalLink aria-hidden="true" strokeWidth={1.55} />
          </a>

          <a
            href={schedulingHref}
            rel="noreferrer"
            target="_blank"
          >
            <span className="resources-link__icon" aria-hidden="true">
              <CalendarDays strokeWidth={1.55} />
            </span>
            <span>
              <strong>Agendamento online</strong>
              <small>Consulte a agenda e escolha um horário disponível</small>
            </span>
            <ExternalLink aria-hidden="true" strokeWidth={1.55} />
          </a>
        </div>
      </div>
    </section>
  );
}
