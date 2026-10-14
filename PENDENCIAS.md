# Pendências antes de publicação

## Aprovação profissional e conteúdo

- Confirmar o CRP `06/144100` e a forma correta de exibição segundo as orientações profissionais aplicáveis.
- Validar a redação proposta para “Sobre Talita”: graduação em Psicologia pela Universidade Católica de Santos, atuação no CAPS, facilitação de grupos e estudos em Logoterapia e Análise Existencial.
- Confirmar se a pós-graduação em Psicologia do Trabalho deve integrar a apresentação profissional e qual é a denominação correta do curso.
- Revisar com Talita todos os textos sobre Logoterapia e Análise Existencial. O protótipo não a apresenta como especialista em uma formação ainda não confirmada como concluída.
- Confirmar se psicoterapia individual online e psicoterapia em grupo online continuam disponíveis.
- Decidir se o novo site também deve divulgar avaliação psicológica, orientação psicológica, plantão psicológico, psicoterapia breve, orientação vocacional e palestras, serviços encontrados no site anterior.
- Confirmar duração, frequência, plataforma, disponibilidade e fluxo real do primeiro contato para cada modalidade divulgada.
- Aprovar hero, manifesto, seção de público, FAQ e CTA final.
- Confirmar autorização e escolha final das fotografias, crops e ordem de uso.

## Links e ativos ausentes

- Cadastrar perfis profissionais reais em `data/socials.ts`; o componente de glow/beam não renderiza links fictícios.
- Fornecer o arquivo ou URL real do guia gratuito citado na bio. `GuideSection` já está implementado e fica oculto enquanto o recurso não existe.
- Definir domínio oficial e `NEXT_PUBLIC_SITE_URL` para canonical, sitemap e regras finais de indexação.
- Revisar a página de privacidade com responsável jurídico antes da publicação e incluir dados reais do controlador e canais de contato.
- Fornecer imagem OG aprovada caso seja desejada uma prévia social fotográfica.

## Publicação e conformidade

- Revisar o protótipo conforme Código de Ética, publicidade CFP/CRP, e requisitos de proteção de dados aplicáveis.
- Revisar o texto de transparência e consentimento do formulário antes da publicação. O formulário apenas prepara a mensagem no navegador e não mantém dados no site.
- Manter depoimentos e prints de pacientes fora do site até haver análise ética e jurídica específica; eles não foram usados no protótipo.
- Trocar `robots` de bloqueio para indexação somente depois de conteúdo, domínio, contato, privacidade e metadata estarem aprovados.

## Dependências e segurança

- `npm audit --omit=dev` reportou 7 vulnerabilidades altas transitivas ligadas ao pacote `shadcn` já presente e sua cadeia `fast-glob`/`micromatch`/`braces`/`ts-morph`. O audit completo reportou 9 altas e 0 críticas.
- O reparo automático sugerido exige alteração principal para `shadcn@1.0.0`, com risco de incompatibilidade. Nenhum downgrade ou `--force` foi executado. Revisar a necessidade do CLI em produção e atualizar a cadeia em uma tarefa isolada.
- Rodar novamente lint, typecheck, build e QA visual após qualquer atualização de dependências ou inclusão de links reais.

## Fallbacks deliberados

- Sem preloader: o hero aparece imediatamente e executa uma entrada curta quando motion é permitido.
- Sem displacement no rosto: retratos usam máscara CSS e parallax; o shader fica restrito ao campo abstrato.
- Sem WebGL em reduced-motion ou quando o navegador não oferece suporte: uma composição CSS preserva cor, textura e conteúdo.
- Sem pin horizontal em até 900 px ou reduced-motion: os capítulos viram uma sequência vertical integral.
- Sem guia ou redes confirmadas: os componentes correspondentes não são renderizados.
- Sem JavaScript: conteúdo, imagens e o CTA direto do WhatsApp continuam presentes; o formulário e os aprimoramentos de movimento dependem de JavaScript.

## Observação de QA

- O controle automatizado usa Chrome local via Playwright porque a superfície de inspeção visual integrada não iniciou no ambiente. Isso não reduziu a cobertura: capturas e métricas estão salvas em `docs/screenshots/`.
- Lighthouse não foi executado nesta rodada. Não há pontuação estimada ou apresentada como medida.
