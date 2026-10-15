import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import { socialLinks } from "@/data/socials";
import { talita } from "@/data/talita";
import { SocialHighlightCards } from "@/components/ui/SocialHighlightCards";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <Image
            alt={talita.name}
            className="footer-logo"
            height={289}
            loading="eager"
            sizes="(max-width: 700px) 210px, 250px"
            src="/images/Logo.png"
            unoptimized
            width={864}
          />
          <p>
            Psicóloga · CRP {talita.crp.value}
            <br />Atendimento online
          </p>
          <div className="site-footer__contacts">
            <a className="site-footer__contact" href={talita.contact.href ?? "#contato"}>
              {talita.contact.displayPhone}
            </a>
            <a className="site-footer__contact" href={`mailto:${talita.contact.email}`}>
              {talita.contact.email}
            </a>
          </div>
          <SocialHighlightCards links={socialLinks} />
        </div>
        <nav aria-label="Navegação do rodapé">
          {navigation.slice(0, 4).map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="site-footer__legal">
          <Link href="/privacidade">Privacidade</Link>
          <p>Atendimento psicológico online com horário previamente agendado.</p>
        </div>
      </div>
      <div className="site-footer__base">
        <span>Entre sentir e florescer</span>
        <span>Talita F. Nolasco</span>
      </div>
    </footer>
  );
}

