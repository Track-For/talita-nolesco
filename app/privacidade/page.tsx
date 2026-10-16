import Link from "next/link";

export const metadata = {
  title: "Privacidade | Talita F. Nolasco",
  description: "Informações de privacidade do protótipo conceitual.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <Link className="legal-page__back" href="/">
        Voltar ao início
      </Link>
      <article>
        <p className="section-kicker">Privacidade</p>
        <h1>Como trato seus dados neste site.</h1>
        <p>
          Esta versão conceitual não possui área de login, cookies de análise,
          pixel de publicidade ou ferramenta de acompanhamento de comportamento.
        </p>
        <h2>Contato profissional</h2>
        <p>
          O formulário de contato funciona apenas no seu navegador. As informações
          preenchidas não são enviadas nem armazenadas pelo site. Ao continuar,
          elas são inseridas em uma mensagem no WhatsApp para revisão e envio pela
          própria pessoa.
        </p>
        <p>
          O tratamento de dados realizado depois da abertura do WhatsApp está
          sujeito aos termos e às práticas de privacidade desse serviço e ao
          meu atendimento profissional.
        </p>
        <h2>Publicação</h2>
        <p>
          Antes da publicação, preciso revisar este texto e definir como vou
          receber solicitações relacionadas a dados pessoais. Também preciso
          registrar a data da última atualização.
        </p>
        <p className="validation-note">
          Texto provisório. Revisar requisitos de privacidade e proteção de dados
          com orientação adequada antes de disponibilizar o site ao público.
        </p>
      </article>
    </main>
  );
}

