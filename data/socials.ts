export type SocialLink = {
  platform: "instagram" | "linkedin" | "youtube";
  label: string;
  href: string;
};

// Adicionar somente perfis profissionais confirmados pela Talita.
export const socialLinks: SocialLink[] = [];

