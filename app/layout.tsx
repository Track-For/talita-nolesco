import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Talita F. Nolasco | Psicóloga Online para Mulheres",
  description:
    "Ofereço psicoterapia online para mulheres que desejam compreender suas emoções, relações e a própria história.",
  applicationName: "Talita F. Nolasco",
  keywords: [
    "psicóloga online",
    "psicoterapia para mulheres",
    "psicoterapia individual online",
    "psicoterapia em grupo online",
  ],
  openGraph: {
    title: "Talita F. Nolasco | Psicóloga Online para Mulheres",
    description:
      "Ofereço um espaço para você olhar para si com mais acolhimento. Protótipo conceitual sujeito à aprovação profissional.",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html className={`${manrope.variable} ${cormorant.variable}`} lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
