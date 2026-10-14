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
        <h1>Como este protótipo trata dados.</h1>
        <p>
          Esta versão conceitual não possui formulário, área de login, cookies
          de análise, pixel de publicidade ou ferramenta de acompanhamento de
          comportamento.
        </p>
        <h2>Contato profissional</h2>
        <p>
          O canal de contato ainda não foi definido. Quando for adicionado, esta
          política deverá informar se o serviço é operado por terceiro, quais
          dados podem ser processados e para qual finalidade.
        </p>
        <h2>Publicação</h2>
        <p>
          Antes da publicação, Talita deve revisar este texto e definir um canal
          para solicitações relacionadas a dados pessoais. Também será
          necessário registrar a data da última atualização.
        </p>
        <p className="validation-note">
          Texto provisório. Revisar requisitos de privacidade e proteção de dados
          com orientação adequada antes de disponibilizar o site ao público.
        </p>
      </article>
    </main>
  );
}

