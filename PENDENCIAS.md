# Pendências antes de publicação

## Aprovação profissional e conteúdo

- Confirmar o CRP `06/144100` e a forma correta de exibição segundo as orientações profissionais aplicáveis.
- Validar graduação, instituição, pós-graduação em Psicologia do Trabalho, formação em andamento em Logoterapia, tempo de experiência, atuação no CAPS e facilitação de grupos.
- Revisar com Talita todos os textos sobre Logoterapia e Análise Existencial. O protótipo não a apresenta como especialista em uma formação ainda não confirmada como concluída.
- Confirmar se psicoterapia individual online e psicoterapia em grupo online continuam disponíveis.
- Confirmar o fluxo real do primeiro contato e remover ou ajustar os avisos provisórios.
- Aprovar hero, manifesto, seção de público, FAQ e CTA final.
- Confirmar autorização e escolha final das fotografias, crops e ordem de uso.

## Links e ativos ausentes

- Cadastrar WhatsApp, e-mail ou agenda profissional validada em `data/talita.ts` antes de ativar o CTA.
- Cadastrar perfis profissionais reais em `data/socials.ts`; o componente de glow/beam não renderiza links fictícios.
- Fornecer o arquivo ou URL real do guia gratuito citado na bio. `GuideSection` já está implementado e fica oculto enquanto o recurso não existe.
- Definir domínio oficial e `NEXT_PUBLIC_SITE_URL` para canonical, sitemap e regras finais de indexação.
- Revisar a página de privacidade com responsável jurídico antes da publicação e incluir dados reais do controlador e canais de contato.
- Fornecer imagem OG aprovada caso seja desejada uma prévia social fotográfica.

## Publicação e conformidade

- Revisar o protótipo conforme Código de Ética, publicidade CFP/CRP, e requisitos de proteção de dados aplicáveis.
- Definir consentimento e finalidade antes de adicionar analytics, pixels, formulário ou captação de leads. Nenhum desses recursos existe nesta versão.
- Manter depoimentos e prints de pacientes fora do site até haver análise ética e jurídica específica; eles não foram usados no protótipo.
- Trocar `robots` de bloqueio para indexação somente depois de conteúdo, domínio, contato, privacidade e metadata estarem aprovados.

## Dependências e segurança

- `npm audit --omit=dev` reportou 7 vulnerabilidades altas transitivas ligadas ao pacote `shadcn` já presente e sua cadeia `fast-glob`/`micromatch`/`braces`/`ts-morph`. O audit completo reportou 9 altas e 0 críticas.
- O reparo automático sugerido exige alteração principal para `shadcn@1.0.0`, com risco de incompatibilidade. Nenhum downgrade ou `--force` foi executado. Revisar a necessidade do CLI em produção e atualizar a cadeia em uma tarefa isolada.
- Rodar novamente lint, typecheck, build e QA visual após qualquer atualização de dependências ou inclusão de links reais.

## Fallbacks deliberados

- Sem preloader: o hero aparece imediatamente e executa uma entrada curta quando motion é permitido.
- Sem displacement no rosto: retratos usam máscara CSS e parallax; o shader fica restrito ao campo abstrato.
- Sem WebGL em reduced-motion e telas touch estreitas: uma composição CSS preserva cor, textura e conteúdo.
- Sem pin horizontal em até 900 px ou reduced-motion: os capítulos viram uma sequência vertical integral.
- Sem contato, guia ou redes confirmadas: CTAs correspondentes ficam desabilitados ou componentes não são renderizados.
- Sem JavaScript: conteúdo, imagens e links válidos continuam presentes; apenas o aprimoramento de movimento é removido.

## Observação de QA

- O controle automatizado usa Chrome local via Playwright porque a superfície de inspeção visual integrada não iniciou no ambiente. Isso não reduziu a cobertura: capturas e métricas estão salvas em `docs/screenshots/`.
- Lighthouse não foi executado nesta rodada. Não há pontuação estimada ou apresentada como medida.
