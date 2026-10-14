import Image from "next/image";
import { AudiencePanels } from "@/components/sections/AudiencePanels";
import { ApproachJourney } from "@/components/sections/ApproachJourney";
import { Footer } from "@/components/layout/Footer";
import { GuideSection } from "@/components/sections/GuideSection";
import { HorizontalReel } from "@/components/sections/HorizontalReel";
import { Header } from "@/components/layout/Header";
import { CinemaHud } from "@/components/motion/CinemaHud";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { MotionOrchestrator } from "@/components/motion/MotionOrchestrator";
import { OrganicThread } from "@/components/motion/OrganicThread";
import { CinematicBridge } from "@/components/sections/CinematicBridge";
import { DirectionalHeading } from "@/components/ui/DirectionalHeading";
import { OrganicFieldScene } from "@/components/webgl/OrganicFieldScene";
import { faq } from "@/data/faq";
import { visibleServices } from "@/data/services";
import { journey, talita } from "@/data/talita";
import talitaCadeira from "@/public/images/optimized/talita-na-cadeira.webp";
import talitaSorrindo from "@/public/images/optimized/talita-sorrindo.webp";

function HeroTitle() {
  const lines = ["Um espaço para olhar", "para si com mais acolhimento"];

  return (
    <h1>
      {lines.map((line) => (
        <span className="hero-title__line" key={line}>
          {line.split(" ").map((word, index) => (
            <span className="hero-title__word" key={`${word}-${index}`}>
              <span data-hero-word>{word}&nbsp;</span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export default function Home() {
  return (
    <MotionOrchestrator>
      <CinemaHud />
      <Header />
      <main id="conteudo">
        <section
          className="hero"
          data-chapter-index="01"
          data-chapter-label="Chegar"
          data-header-tone="light"
          id="inicio"
        >
          <span data-header-threshold className="header-threshold" />
          <div className="hero__ornament" aria-hidden="true" />
          <p className="hero__chapter" data-hero-chapter>
            <span>01</span>
            <span>O primeiro encontro</span>
          </p>
          <div className="hero__copy">
            <p className="eyebrow" data-hero-meta>
              Psicoterapia online para mulheres
            </p>
            <HeroTitle />
            <p className="hero__description" data-hero-meta>
              {talita.hero.description}
            </p>
            <div className="hero__actions" data-hero-actions>
              <MagneticLink href="#atendimentos">
                Conheça o atendimento
              </MagneticLink>
              <MagneticLink href="#sobre" variant="text">
                Sobre a Talita
              </MagneticLink>
            </div>
          </div>

          <figure className="hero-portrait">
            <div className="hero-portrait__frame" data-hero-photo data-parallax>
              <Image
                alt="Talita F. Nolasco sorrindo, sentada em um ambiente acolhedor"
                fill
                fetchPriority="high"
                loading="eager"
                placeholder="blur"
                sizes="(max-width: 900px) 92vw, (max-width: 1199px) 40vw, 42vw"
                src={talitaSorrindo}
                unoptimized
              />
              <span
                aria-hidden="true"
                className="image-curtain image-curtain--down"
                data-image-curtain
              />
              <span className="hero-portrait__wash" aria-hidden="true" />
            </div>
            <figcaption>
              <span>{talita.name}</span>
              <span>Psicóloga, CRP em confirmação</span>
            </figcaption>
          </figure>
          <div className="hero__scroll-cue" data-hero-chapter aria-hidden="true">
            <span>continue</span>
            <i />
          </div>
        </section>

        <div className="story-flow">
          <OrganicThread />

          <section
            className="manifesto-section"
            data-chapter-index="02"
            data-chapter-label="Sentir"
            data-header-tone="dark"
          >
            <div className="section-frame manifesto-section__inner">
              <p className="manifesto" data-manifesto>
                Sua história é maior do que um momento difícil. Há espaço para
                escutar o que você sente. E olhar para o que faz sentido para
                você
              </p>
              <p className="manifesto-note" data-reveal>
                Entre sentir e florescer existe um caminho que não precisa ser
                percorrido sozinha
              </p>
            </div>
          </section>

          <CinematicBridge />

          <section
            className="about-section"
            data-chapter-index="04"
            data-chapter-label="Talita"
            data-header-tone="light"
            id="sobre"
          >
            <div className="section-frame about-layout">
              <div className="about-intro" data-reveal>
                <p className="section-kicker">Sobre Talita</p>
                <DirectionalHeading
                  lines={["Escuta profissional para", "histórias singulares"]}
                />
                {talita.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="validation-note">
                  Informações profissionais em validação para a apresentação.
                </p>
              </div>

              <figure
                className="about-portrait"
                data-image-reveal="down"
                data-parallax
              >
                <Image
                  alt="Talita sentada em uma cadeira, em retrato profissional"
                  fill
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 38vw"
                  src={talitaCadeira}
                  unoptimized
                />
                <span
                  aria-hidden="true"
                  className="image-curtain image-curtain--down"
                  data-image-curtain
                />
              </figure>

              <div className="formation-list" data-reveal>
                {talita.formation.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                    <span>Validar antes de publicar</span>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            className="audience-section"
            data-chapter-index="05"
            data-chapter-label="Para quem"
            data-header-tone="light"
          >
            <div className="section-frame">
              <div className="section-heading" data-reveal>
                <h2>Para quem é este espaço?</h2>
                <p>
                  Não como uma lista de diagnósticos, mas como pontos de partida
                  possíveis para uma conversa
                </p>
              </div>
              <AudiencePanels />
            </div>
          </section>

          <HorizontalReel />

          <ApproachJourney />

          <section
            className="services-section"
            data-chapter-index="08"
            data-chapter-label="Atendimento"
            data-header-tone="light"
            id="atendimentos"
          >
            <div className="section-frame services-layout">
              <div className="services-intro" data-reveal>
                <DirectionalHeading
                  lines={["Atendimentos apresentados", "neste protótipo"]}
                />
                <p>
                  Duas modalidades citadas na bio recente. Valores, duração,
                  frequência, disponibilidade e plataforma não são presumidos
                </p>
              </div>

              <div className="service-panels">
                {visibleServices.map((service, index) => (
                  <article
                    className="service-panel"
                    data-service-panel
                    key={service.slug}
                  >
                    <div className="service-panel__number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3>{service.title}</h3>
                      <p className="service-panel__summary">{service.summary}</p>
                      <p>{service.detail}</p>
                      <a href="#primeiro-contato">Entenda o primeiro contato</a>
                    </div>
                    <span className="service-panel__shape" aria-hidden="true" />
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            className="pause-section"
            data-header-tone="dark"
            aria-labelledby="pause-title"
          >
            <OrganicFieldScene />
            <div className="pause-section__content">
              <p>Uma pausa entre capítulos.</p>
              <h2 id="pause-title">Dar espaço ao que ainda não tem nome</h2>
              <p>
                Nem tudo precisa ser compreendido de uma vez. A escuta também
                pode começar pelo que ainda parece difícil de dizer
              </p>
              <span className="pause-section__hint" aria-hidden="true">
                Toque ou mova o cursor para revelar
              </span>
            </div>
          </section>

          <section
            className="journey-section"
            data-chapter-index="09"
            data-chapter-label="Caminho"
            data-header-tone="light"
            id="primeiro-contato"
          >
            <div className="section-frame journey-layout">
              <div className="journey-intro" data-reveal>
                <h2>Como funciona o primeiro contato?</h2>
                <p>
                  Uma proposta de fluxo para reduzir dúvidas, sujeita à
                  confirmação do processo real de Talita
                </p>
              </div>
              <div className="journey-cards">
                {journey.map((item, index) => (
                  <article
                    className="journey-card"
                    data-reveal
                    key={item.title}
                    style={{ "--card-index": index } as React.CSSProperties}
                  >
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <GuideSection guide={talita.guide} />

          <section className="faq-section" id="duvidas">
            <div className="section-frame faq-layout">
              <div className="faq-intro" data-reveal>
                <h2>Dúvidas antes de entrar em contato</h2>
                <p>
                  Respostas provisórias, sem inventar condições operacionais que
                  ainda precisam ser confirmadas
                </p>
              </div>
              <div className="faq-list" data-reveal>
                {faq.map((item) => (
                  <details key={item.question}>
                    <summary>
                      <span>{item.question}</span>
                      <span aria-hidden="true" className="faq-icon" />
                    </summary>
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section
            className="contact-section"
            data-chapter-index="10"
            data-chapter-label="Contato"
            data-header-tone="dark"
            id="contato"
          >
            <div
              className="contact-section__image"
              data-image-reveal="from-right"
              data-parallax
            >
              <Image
                alt="Talita sorrindo em retrato acolhedor"
                fill
                placeholder="blur"
                sizes="(max-width: 900px) 100vw, 42vw"
                src={talitaSorrindo}
                unoptimized
              />
              <span
                aria-hidden="true"
                className="image-curtain image-curtain--from-right"
                data-image-curtain
              />
              <span aria-hidden="true" className="contact-section__wash" />
            </div>
            <div className="contact-section__copy" data-reveal>
              <p className="section-kicker">O próximo capítulo</p>
              <DirectionalHeading
                lines={["Sua história merece", "um espaço de escuta"]}
              />
              {talita.contact.href ? (
                <MagneticLink href={talita.contact.href} variant="light">
                  {talita.contact.label}
                </MagneticLink>
              ) : (
                <>
                  <span aria-disabled="true" className="button button--disabled">
                    <span>{talita.contact.label}</span>
                  </span>
                  <p className="contact-pending">{talita.contact.note}</p>
                </>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </MotionOrchestrator>
  );
}
