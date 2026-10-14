# Site Talita F. Nolasco

Protótipo conceitual de um site editorial e cinematográfico para a psicóloga Talita F. Nolasco. A experiência combina conteúdo acessível, fotografias reais, GSAP/ScrollTrigger e um campo WebGL opcional. Dados profissionais, textos finais e links ainda dependem de aprovação antes da publicação.

## Requisitos

- Node.js compatível com Next.js 16.4
- npm
- Chrome local somente para executar o script de QA visual fornecido

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Comandos disponíveis:

```bash
npm run lint
npm run typecheck
npm run build
npm run start
npm run qa:visual
```

`qa:visual` usa `http://localhost:3001` por padrão. Para outra porta no PowerShell:

```powershell
$env:QA_BASE_URL='http://127.0.0.1:3101'
npm run qa:visual
```

As capturas e métricas são gravadas em `docs/screenshots/`.

## Onde editar o conteúdo

- Identidade, hero, biografia, formação, abordagem, jornada, guia e contato: `data/talita.ts`
- Modalidades visíveis e serviços pendentes: `data/services.ts`
- Perguntas e respostas: `data/faq.ts`
- Links de navegação: `data/navigation.ts`
- Redes sociais profissionais: `data/socials.ts`
- Estrutura e ordem das seções: `app/page.tsx`
- Página de privacidade: `app/privacidade/page.tsx`

Os registros distinguem conteúdo confirmado, provisório e pendente. Não remova esses estados sem validar as informações com Talita.

## Ativar o contato profissional

Em `data/talita.ts`, substitua o `href` pendente por um link profissional validado. Exemplos de formato técnico aceito incluem `mailto:` ou uma URL HTTPS de agenda/WhatsApp, mas o projeto não fornece nem inventa o número.

Quando o link estiver presente, o CTA final muda automaticamente do estado desabilitado para um link real. Revise também o texto e o aviso associados.

## Ativar redes sociais

Edite `data/socials.ts` e inclua somente perfis profissionais confirmados:

```ts
export const socialLinks: SocialLink[] = [
  {
    platform: "instagram",
    label: "Instagram profissional de Talita",
    href: "https://instagram.com/perfil-confirmado",
  },
];
```

Plataformas aceitas pelo componente atual: `instagram`, `linkedin` e `youtube`. Enquanto o array estiver vazio, nenhum botão ou link social é renderizado.

## Ativar o guia gratuito

O componente já existe em `components/sections/GuideSection.tsx`. Informe título, descrição e `href` real no objeto `guide` de `data/talita.ts`. Se o arquivo for local, coloque-o em uma pasta pública apropriada e use uma URL iniciada por `/`. O componente continua oculto enquanto não existir um link válido.

## Trocar fotografias

1. Preserve os originais em `public/images/`.
2. Gere uma versão WebP em `public/images/optimized/`.
3. Atualize o import correspondente em `app/page.tsx`, `AudiencePanels.tsx` ou `HorizontalReel.tsx`.
4. Revise `alt`, `sizes`, `object-position` e crop em todos os breakpoints.
5. Mantenha prioridade/eager somente na imagem LCP do hero.

Arquivos usados nesta versão:

- `public/images/optimized/talita-sorrindo.webp`
- `public/images/optimized/talita-pensante.webp`
- `public/images/optimized/talita-na-cadeira.webp`

Exemplo de conversão com Sharp:

```bash
node -e "const sharp=require('sharp'); sharp('public/images/Talita sorrindo.png').resize({width:1200,withoutEnlargement:true}).webp({quality:82}).toFile('public/images/optimized/talita-sorrindo.webp')"
```

Os arquivos `Depoimento *.png` não devem ser adicionados ao site sem revisão ética e jurídica específica.

## Alterar cores e tipografia

Os tokens ficam no início de `app/globals.css`:

- `--ivory`, `--ivory-deep`, `--paper`: superfícies dominantes
- `--lavender`, `--lavender-muted`, `--plum`, `--plum-deep`: profundidade e capítulos
- `--rose`, `--rose-ink`: acentos
- `--ink`, `--ink-muted`: texto

A proporção visual pretendida é aproximadamente 70% de neutros claros, 20% de lavanda/ameixa e 10% de rosa. Depois de qualquer alteração, verifique contraste, estados de foco, hero, manifesto, reel, CTA e footer.

As fontes são configuradas em `app/layout.tsx` com `next/font`. Atualize as variáveis CSS `--font-cormorant` e `--font-manrope` em conjunto com qualquer troca.

## Alterar títulos e serviços

Títulos estruturais e ordem narrativa ficam em `app/page.tsx`. Alguns usam `DirectionalHeading`, que recebe duas ou mais linhas e alterna as direções de revelação.

Para serviços:

1. Edite o registro em `data/services.ts`.
2. Use o status visível somente para uma modalidade validada.
3. Não inclua preço, duração, frequência, agenda ou plataforma sem confirmação.
4. Confirme que `visibleServices` retorna apenas os itens aprovados.

## Movimento e fallbacks

- Orquestração global: `components/motion/MotionOrchestrator.tsx`
- Reel horizontal: `components/sections/HorizontalReel.tsx`
- Botões magnéticos: `components/motion/MagneticLink.tsx`
- Fio orgânico: `components/motion/OrganicThread.tsx`
- WebGL: `components/webgl/OrganicField.tsx` e `OrganicFieldScene.tsx`

Não esconda conteúdo inicialmente no CSS. As animações devem aplicar o estado inicial somente depois que o JavaScript estiver ativo. Preserve as regras de `prefers-reduced-motion` no final de `app/globals.css`.

## SEO e publicação

O protótipo está bloqueado para indexação. Antes de publicar:

1. Resolva todas as pendências de `PENDENCIAS.md`.
2. Defina `NEXT_PUBLIC_SITE_URL` com o domínio HTTPS final.
3. Revise metadata em `app/layout.tsx`.
4. Atualize `app/robots.ts` para permitir indexação somente depois da aprovação.
5. Confirme sitemap, canonical, privacidade e imagem OG.
6. Execute lint, typecheck, build e QA visual.

Não há deploy, analytics ou pixels configurados nesta versão.

## Documentação do projeto

- `RELATORIO.md`: implementação e evidências das 20 etapas
- `DECISOES.md`: escolhas de design, conteúdo e engenharia
- `PENDENCIAS.md`: dados e riscos que bloqueiam publicação
- `docs/MOTION_AUDIT.md`: inventário e uso real das bibliotecas de motion
- `docs/screenshots/qa-results.json`: métricas automatizadas dos breakpoints
