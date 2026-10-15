export type ContentStatus = "confirmado" | "provisorio" | "pendente";

export const talita = {
  name: "Talita F. Nolasco",
  role: "Psicóloga",
  audience: "Mulheres adultas",
  location: "Atendimento online",
  crp: {
    value: "06/144100",
    status: "confirmado" as ContentStatus,
    note: "Dado publicado no site profissional anterior da Talita.",
  },
  hero: {
    title: "Psicoterapia online para mulheres.",
    description:
      "Um espaço de escuta para compreender emoções, relações e escolhas com mais clareza e acolhimento",
    status: "provisorio" as ContentStatus,
  },
  about: {
    title: "Uma trajetória dedicada à escuta e ao cuidado.",
    paragraphs: [
      "Formada em Psicologia pela Universidade Católica de Santos, Talita construiu sua trajetória profissional em diferentes espaços de cuidado, incluindo a atuação no CAPS e a facilitação de grupos",
      "Seus estudos em Logoterapia e Análise Existencial ampliam uma prática atenta à história, aos vínculos, às escolhas e aos sentidos que cada pessoa constrói ao longo da vida",
    ],
    status: "provisorio" as ContentStatus,
  },
  formation: [
    {
      title: "Formação em Psicologia",
      detail: "Universidade Católica de Santos",
      status: "pendente" as ContentStatus,
    },
    {
      title: "Experiência em saúde mental",
      detail: "Atuação no CAPS e facilitação de grupos",
      status: "pendente" as ContentStatus,
    },
    {
      title: "Estudos em Logoterapia",
      detail: "Formação continuada em Logoterapia e Análise Existencial",
      status: "pendente" as ContentStatus,
    },
  ],
  contact: {
    href:
      "https://wa.me/5513991054065?text=Ol%C3%A1%2C%20Talita.%20Gostaria%20de%20receber%20informa%C3%A7%C3%B5es%20sobre%20o%20atendimento." as string | null,
    label: "Solicitar informações sobre o atendimento",
    displayPhone: "+55 13 99105-4065",
    email: "psitalitanolasco@gmail.com",
    schedulingHref: "https://corpora.bio/psitalitanolascog",
    whatsappNumber: "5513991054065",
    status: "confirmado" as ContentStatus,
    note: "Contato profissional pelo WhatsApp.",
  },
  guide: {
    title: "Ansiedade, um futuro no meu presente",
    href:
      "https://www.canva.com/design/DAEOojXm0xA/wucx4KArXc9pG7gTmo4u6Q/view?utm_content=DAEOojXm0xA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he29b331d63" as string | null,
    status: "confirmado" as ContentStatus,
  },
  resources: {
    temperamentTestHref:
      "https://docs.google.com/spreadsheets/d/18-YqH3hWpu9lw2jwtEU7O5TkTarlNVU59l9juY6ZCF4/edit?gid=0#gid=0",
  },
  testimonials: {
    hasWrittenConsent: true,
  },
} as const;

export const approachConcepts = [
  {
    title: "Escuta",
    sides: 3,
    description:
      "Um espaço para nomear experiências e perceber o que pede atenção, no ritmo possível para cada pessoa",
  },
  {
    title: "Acolhimento",
    sides: 4,
    description:
      "Uma presença sem pressa, que recebe dúvidas e emoções sem reduzir a experiência a rótulos",
  },
  {
    title: "Compreensão",
    sides: 5,
    description:
      "Uma conversa que considera emoções, relações, escolhas e contexto, sem respostas prontas sobre a sua história",
  },
  {
    title: "Elaboração",
    sides: 8,
    description:
      "Um processo de construir linguagem e novas perspectivas para aquilo que antes parecia difícil de organizar",
  },
  {
    title: "Sentido",
    sides: 24,
    description:
      "Perguntas que podem ajudar a olhar para valores e possibilidades. Não é uma sequência garantida de tratamento",
  },
] as const;

export const journey = [
  {
    title: "Conhecer as modalidades",
    description:
      "Veja as formas de atendimento apresentadas neste protótipo e identifique qual delas deseja compreender melhor",
  },
  {
    title: "Solicitar informações",
    description:
      "Use o canal profissional indicado no site para consultar disponibilidade e tirar dúvidas sobre o atendimento",
  },
  {
    title: "Alinhar os detalhes",
    description:
      "Formato, disponibilidade, frequência e demais condições são conversados diretamente, sem pressupostos neste site",
  },
  {
    title: "Iniciar o acompanhamento",
    description:
      "Depois do alinhamento inicial, o acompanhamento pode começar conforme a disponibilidade da profissional e da pessoa interessada",
  },
] as const;

