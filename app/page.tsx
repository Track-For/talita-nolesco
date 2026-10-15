import Image, { getImageProps } from "next/image";
import { AudiencePanels } from "@/components/sections/AudiencePanels";
import { ApproachJourney } from "@/components/sections/ApproachJourney";
import { Footer } from "@/components/layout/Footer";
import { GuideSection } from "@/components/sections/GuideSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { HorizontalReel } from "@/components/sections/HorizontalReel";
import { PracticeResources } from "@/components/sections/PracticeResources";
import { Testimonials } from "@/components/sections/Testimonials";
import { Header } from "@/components/layout/Header";
import { CinemaHud } from "@/components/motion/CinemaHud";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { MotionOrchestrator } from "@/components/motion/MotionOrchestrator";
import { OrganicThread } from "@/components/motion/OrganicThread";
import { CinematicBridge } from "@/components/sections/CinematicBridge";
import { WhatsAppContactForm } from "@/components/sections/WhatsAppContactForm";
import { DirectionalHeading } from "@/components/ui/DirectionalHeading";
import { OrganicFieldScene } from "@/components/webgl/OrganicFieldScene";
import { HighlightedText } from "@/registry/spell-ui/highlighted-text";
import { faq } from "@/data/faq";
import { visibleServices } from "@/data/services";
import { journey, talita } from "@/data/talita";
import talitaCadeira from "@/public/images/optimized/talita-na-cadeira-hq.webp";
import talitaHero from "@/public/images/optimized/talita-hero-wide-hq.webp";
import talitaHeroMobile from "@/public/images/optimized/talita-hero-mobile-lower-hq.webp";
import talitaPensante from "@/public/images/optimized/talita-pensante-hq.webp";
import talitaSorrindo from "@/public/images/optimized/talita-sorrindo-hq.webp";

function HeroTitle() {
  const lines = ["Psicoterapia online", "para mulheres"];

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

function HeroPortraitImage() {
  const alt = "Talita F. Nolasco sorrindo, sentada em um ambiente acolhedor";
  const common = { alt, quality: 90, sizes: "100vw" } as const;
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: talitaHero });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: talitaHeroMobile });

  return (
    <picture>
      <source media="(min-width: 901px)" srcSet={desktop} />
      <source media="(max-width: 900px)" srcSet={mobile} />
      <img {...rest} alt={alt} fetchPriority="high" loading="eager" />
    </picture>
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
              Talita F. Nolasco · Psicóloga · CRP {talita.crp.value}
            </p>
            <HeroTitle />
            <p className="hero__description" data-hero-meta>
              {talita.hero.description}
            </p>
            <div className="hero__actions" data-hero-actions>
              <MagneticLink href={talita.contact.schedulingHref}>
                Agendar atendimento
              </MagneticLink>
              <MagneticLink href="#sobre" variant="text">
                Sobre a Talita
              </MagneticLink>
            </div>
          </div>

          <figure className="hero-portrait">
            <div className="hero-portrait__frame" data-hero-photo data-parallax>
              <HeroPortraitImage />
              <span
                aria-hidden="true"
                className="image-curtain image-curtain--down"
                data-image-curtain
              />
              <span className="hero-portrait__wash" aria-hidden="true" />
            </div>
          </figure>
          <div className="hero__scroll-cue" data-hero-chapter aria-hidden="true">
            <span>continue</span>
            <i />
          </div>
        </section>

        <div className="story-flow">
          <OrganicThread />

          <section
            className="about-section"
            data-chapter-index="02"
            data-chapter-label="Talita"
            data-header-tone="light"
            id="sobre"
          >
            <div className="section-frame about-layout">
              <div className="about-intro" data-reveal>
                <p className="section-kicker">Sobre Talita</p>
                <DirectionalHeading
                  lines={["Uma trajetória dedicada", "à escuta e ao cuidado"]}
                />
                {talita.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
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
                  quality={90}
                  sizes="(max-width: 900px) 100vw, 38vw"
                  src={talitaCadeira}
                />
                <span
                  aria-hidden="true"
                  className="image-curtain image-curtain--down"
                  data-image-curtain
                />
              </figure>

              <div className="about-trajectory" data-reveal>
                <p className="section-kicker">Trajetória profissional</p>
                <div className="formation-list">
                  {talita.formation.map((item, index) => (
                    <article key={item.title}>
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3>{item.title}</h3>
                      <p>{item.detail}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <ApproachJourney />

          <section
            className="services-section"
            data-chapter-index="04"
            data-chapter-label="Atendimento"
            data-header-tone="light"
            id="atendimentos"
          >
            <div className="section-frame services-layout">
              <div className="services-intro" data-reveal>
                <DirectionalHeading
                  lines={["Modalidades de", "atendimento online"]}
                />
                <p>
                  Duas formas de acompanhamento, apresentadas de maneira clara
                  para facilitar o seu primeiro contato.
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
                      <p className="service-panel__modality">
                        {service.modality}
                      </p>
                      <h3>{service.title}</h3>
                      <p className="service-panel__summary">{service.summary}</p>
                      <p>{service.detail}</p>
                      <ul className="service-panel__features">
                        {service.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                      <a href={talita.contact.schedulingHref}>Ver agenda</a>
                    </div>
                    <span className="service-panel__shape" aria-hidden="true" />
                  </article>
                ))}
              </div>
            </div>
          </section>

          <div
            className="audience-sentir-sequence"
            data-audience-sentir-sequence
          >
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

            <section
              className="manifesto-section"
              data-chapter-index="06"
              data-chapter-label="Sentir"
              data-header-tone="dark"
              data-manifesto-section
            >
              <figure className="manifesto-section__image" data-manifesto-image>
                <Image
                  alt=""
                  aria-hidden="true"
                  fill
                  placeholder="blur"
                  quality={90}
                  sizes="(max-width: 900px) 100vw, 52vw"
                  src={talitaPensante}
                />
                <span aria-hidden="true" />
              </figure>
              <div
                className="section-frame manifesto-section__inner"
                data-manifesto-copy
              >
                <p className="manifesto" data-manifesto>
                  Sua história é maior do que um momento difícil. Há espaço para
                  escutar o que você sente. E olhar para o que faz sentido para
                  você
                </p>
                <p className="manifesto-note">
                  Entre sentir e florescer existe um caminho que não precisa ser
                  percorrido sozinha
                </p>
              </div>
            </section>

          </div>

          <CinematicBridge />

          <HorizontalReel />

          <Testimonials approved={talita.testimonials.hasWrittenConsent} />

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
                <h2>
                  Como funciona o primeiro{" "}
                  <HighlightedText from="left">
                    contato?
                  </HighlightedText>
                </h2>
                <p>
                  Do interesse inicial ao começo do acompanhamento, cada etapa
                  ajuda a tornar o processo mais claro
                </p>
              </div>
              <div className="journey-cards">
                {journey.map((item, index) => (
                  <article
                    className="journey-card"
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

          <PracticeResources
            schedulingHref={talita.contact.schedulingHref}
            temperamentTestHref={talita.resources.temperamentTestHref}
          />

          <GuideSection guide={talita.guide} />

          <section
            className="faq-section"
            data-chapter-index="12"
            data-chapter-label="Dúvidas"
            data-header-tone="light"
            id="duvidas"
          >
            <div className="section-frame faq-layout">
              <div className="faq-intro" data-reveal>
                <h2>
                  Dúvidas antes de entrar em{" "}
                  <HighlightedText delay={0.12} from="left">
                    contato
                  </HighlightedText>
                </h2>
                <p>
                  Informações iniciais para compreender as modalidades e dar o
                  próximo passo com mais segurança
                </p>
              </div>
              <FaqAccordion items={faq} />
            </div>
          </section>

          <section
            className="contact-form-section"
            data-chapter-index="13"
            data-chapter-label="Contato"
            data-header-tone="light"
            id="contato"
          >
            <div className="section-frame contact-form-layout">
              <div className="contact-form-intro" data-reveal>
                <h2>Conte um pouco do que você procura</h2>
                <p>
                  Preencha os campos para preparar sua mensagem. Você poderá
                  revisar tudo no WhatsApp antes de enviar
                </p>
              </div>
              <div data-reveal>
                <WhatsAppContactForm
                  displayPhone={talita.contact.displayPhone}
                  whatsappNumber={talita.contact.whatsappNumber}
                />
              </div>
            </div>
          </section>

          <section className="contact-section" data-header-tone="dark">
            <div
              className="contact-section__image"
              data-image-reveal="from-right"
              data-parallax
            >
              <Image
                alt="Talita sorrindo em retrato acolhedor"
                fill
                placeholder="blur"
                quality={90}
                sizes="(max-width: 900px) 100vw, 42vw"
                src={talitaSorrindo}
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
              <p className="contact-section__lead">
                Conheça as modalidades de psicoterapia online e converse sobre
                a possibilidade de iniciar seu acompanhamento
              </p>
              <MagneticLink
                href={talita.contact.schedulingHref}
                variant="light"
              >
                Agendar atendimento online
              </MagneticLink>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </MotionOrchestrator>
  );
}
