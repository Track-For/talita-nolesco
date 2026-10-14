export type ContentStatus = "confirmado" | "provisorio" | "pendente";

export const talita = {
  name: "Talita F. Nolasco",
  role: "Psicóloga",
  audience: "Mulheres adultas",
  location: "Atendimento online",
  crp: {
    value: "06/144100",
    status: "pendente" as ContentStatus,
    note: "Dado exibido no site anterior. Confirmar antes da publicação.",
  },
  hero: {
    title: "Um espaço para olhar para si com mais acolhimento.",
    description:
      "Psicoterapia online para mulheres que desejam compreender suas emoções, suas relações e sua própria histórias",
    status: "provisorio" as ContentStatus,
  },
  about: {
    title: "Escuta profissional para histórias singulares.",
    paragraphs: [
      "Talita conduz um espaço de conversa atento à história, aos vínculos e às perguntas que cada mulher traz. A proposta é acolher o que está sendo vivido sem reduzir a pessoa a um rótulo",
      "Sua trajetória reúne atendimentos psicoterapêuticos, experiência no CAPS e facilitação de grupos. As informações de formação abaixo vieram do site anterior e precisam ser validadas pela profissional",
    ],
    status: "provisorio" as ContentStatus,
  },
  formation: [
    {
      title: "Graduação em Psicologia",
      detail: "Universidade Católica de Santos",
      status: "pendente" as ContentStatus,
    },
    {
      title: "Psicologia do Trabalho",
      detail: "Pós-graduação mencionada no site anterior",
      status: "pendente" as ContentStatus,
    },
    {
      title: "Logoterapia",
      detail: "Formação em curso, sem apresentação como título concluído",
      status: "pendente" as ContentStatus,
    },
  ],
  contact: {
    href: null as string | null,
    label: "Conversar sobre o atendimento",
    status: "pendente" as ContentStatus,
    note: "Canal profissional a confirmar com Talita.",
  },
  guide: {
    title: "Guia gratuito",
    href: null as string | null,
    status: "pendente" as ContentStatus,
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
      "Entre em contato pelo canal profissional que será confirmado por Talita antes da publicação",
  },
  {
    title: "Alinhar os detalhes",
    description:
      "Formato, disponibilidade, frequência e demais condições são conversados diretamente, sem pressupostos neste site",
  },
  {
    title: "Iniciar o acompanhamento",
    description:
      "O início acontece depois desse alinhamento e conforme a disponibilidade real da profissional e da pessoa interessada",
  },
] as const;

