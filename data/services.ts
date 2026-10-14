export type ServiceStatus = "confirmado" | "confirmar";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  status: ServiceStatus;
};

export const visibleServices: Service[] = [
  {
    slug: "individual-online",
    title: "Psicoterapia individual online",
    summary: "Um encontro reservado para olhar com atenção para a sua experiência",
    detail:
      "A modalidade individual oferece um espaço de escuta entre paciente e psicóloga. Duração, frequência, plataforma e disponibilidade serão informadas no contato profissional",
    status: "confirmado",
  },
  {
    slug: "grupo-online",
    title: "Psicoterapia em grupo online",
    summary: "Um espaço coletivo, mediado profissionalmente, para experiências que podem encontrar ressonância",
    detail:
      "A composição dos grupos, os temas, o formato e a abertura de novas turmas precisam ser confirmados diretamente com Talita",
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
  title,
  summary: "Serviço encontrado no site anterior.",
  detail: "Não exibir como disponível até confirmação da profissional.",
  status: "confirmar",
}));

