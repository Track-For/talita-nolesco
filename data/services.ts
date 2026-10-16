export type ServiceStatus = "confirmado" | "confirmar";

export type Service = {
  slug: string;
  modality: string;
  title: string;
  summary: string;
  detail: string;
  features: readonly string[];
  status: ServiceStatus;
};

export const visibleServices: Service[] = [
  {
    slug: "individual-online",
    modality: "Atendimento individual",
    title: "Psicoterapia individual online",
    summary: "Um encontro reservado para olharmos com atenção para a sua experiência",
    detail:
      "Construo o acompanhamento em diálogo com você, com escuta dedicada às emoções, relações, escolhas e questões que fazem parte da sua história",
    features: [
      "Encontros individuais e online",
      "Escuta dedicada à experiência pessoal",
      "Duração e frequência informadas no contato",
    ],
    status: "confirmado",
  },
  {
    slug: "grupo-online",
    modality: "Atendimento em grupo",
    title: "Psicoterapia em grupo online",
    summary: "Um espaço coletivo que conduzo para experiências que podem encontrar ressonância",
    detail:
      "Proponho um contexto coletivo de cuidado no qual conduzo a escuta e as trocas com atenção ao percurso de cada participante",
    features: [
      "Encontros coletivos e online",
      "Mediação feita por mim",
      "Temas e abertura de turmas sob consulta",
    ],
    status: "confirmado",
  },
];

export const pendingServices: Service[] = [
  "Avaliação psicológica",
  "Orientação psicológica",
  "Plantão psicológico",
  "Psicoterapia breve",
  "Orientação vocacional",
  "Palestras",
].map((title, index) => ({
  slug: `servico-anterior-${index + 1}`,
  modality: "Possibilidade a confirmar",
  title,
  summary: "Serviço encontrado no site anterior.",
  detail: "Não exibir como disponível até confirmação da profissional.",
  features: [],
  status: "confirmar",
}));

