export type SocialLink = {
  platform: "facebook" | "instagram" | "linkedin";
  label: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  {
    platform: "instagram",
    label: "Talita Nolasco no Instagram",
    href: "https://www.instagram.com/psitalitanolasco/",
  },
  {
    platform: "facebook",
    label: "Talita Nolasco no Facebook",
    href: "https://www.facebook.com/psitalitanolasco",
  },
  {
    platform: "linkedin",
    label: "Talita Nolasco no LinkedIn",
    href: "https://www.linkedin.com/in/talita-nolasco-2b7785143/",
  },
];

