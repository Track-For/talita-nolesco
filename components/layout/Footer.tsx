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
            sizes="(max-width: 700px) 210px, 250px"
            src="/images/Logo.png"
            width={864}
          />
          <p>
            Psicóloga, atendimento online
            <br />
            CRP {talita.crp.value} (a confirmar)
          </p>
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
          <p>
            Protótipo conceitual. Conteúdo profissional sujeito à revisão e
            aprovação de Talita F. Nolasco.
          </p>
        </div>
      </div>
      <div className="site-footer__base">
        <span>Entre sentir e florescer</span>
        <span>Sem rastreamento nesta versão</span>
      </div>
    </footer>
  );
}

