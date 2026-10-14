# Auditoria das bibliotecas de motion

## Escopo e comparação

Foram inspecionados:

- `C:\Users\fhell\Documents\Projetos\talita-nolesco\trackfor-motion-library`
- `C:\Users\fhell\Documents\Projetos\viviane-barbosa\trackfor-motion-library`

Os arquivos das duas cópias foram comparados por caminho relativo e conteúdo. A implementação encontrada é equivalente nas duas origens. A biblioteca adicional de Viviane foi somente lida e não foi alterada. Não existe arquivo de licença no pacote; por isso, o site não publica a biblioteca como dependência nem copia o pacote inteiro. Os padrões adequados foram adaptados em componentes próprios do projeto.

## Stack encontrada

O pacote autônomo declara React 19, GSAP 3.13, Lenis 1.3, Three 0.180, React Three Fiber 9 e Drei 10. O projeto principal já tinha React/Next e recebeu apenas as dependências necessárias para sua própria implementação. Lenis e Drei não foram adicionados ao projeto principal.

O arquivo `src/index.ts` exporta `useMotion`, `ScrollEffects`, `InteractiveEffects`, `SmoothScroll` e `ImageDistortion`. O pacote possui seu próprio Vite, TypeScript e CSS e não foi conectado diretamente ao build do Next.js.

## Inventário e decisão por efeito

| Efeito/API encontrada | Origem real | Custo estimado | Uso no site | Destino/adaptação | Fallback |
|---|---|---:|---|---|---|
| `useMotion`, `motionAllowed`, registro GSAP/ScrollTrigger/SplitText | `trackfor-motion-library/src/effects/useMotion.ts` | Baixo | Base de lifecycle e reduced-motion | `lib/gsap.ts`, `components/motion/MotionOrchestrator.tsx` | Conteúdo visível e estático |
| `FadeUp` | `trackfor-motion-library/src/effects/ScrollEffects.tsx` | Baixo | Entradas de blocos editoriais | `[data-reveal]` em `MotionOrchestrator.tsx` | Sem transformação |
| `TextReveal` | `trackfor-motion-library/src/effects/ScrollEffects.tsx` | Médio | Hero, manifesto e títulos direcionais | `MotionOrchestrator.tsx`, `components/ui/DirectionalHeading.tsx` | Texto completo no DOM |
| `ParallaxImage` | `trackfor-motion-library/src/effects/ScrollEffects.tsx` | Baixo/médio | Retratos principais | `[data-parallax]` em `MotionOrchestrator.tsx` | Imagem sem deslocamento |
| `ImageClipReveal` | `trackfor-motion-library/src/effects/ScrollEffects.tsx` | Médio | Cortina, faixa central e entrada lateral | `[data-image-reveal]` em `MotionOrchestrator.tsx` e `HorizontalReel.tsx` | `clip-path: none` |
| `StaggerGrid` | `trackfor-motion-library/src/effects/ScrollEffects.tsx` | Baixo | Referência de stagger para palavras e blocos | Timeline do hero em `MotionOrchestrator.tsx` | Conteúdo já visível |
| `PinnedStory` | `trackfor-motion-library/src/effects/ScrollEffects.tsx` | Médio | Cards de serviços e jornada | Sticky CSS em `app/globals.css`; sem pin GSAP | Stack natural |
| `HorizontalScroll` | `trackfor-motion-library/src/effects/ScrollEffects.tsx` | Médio/alto | Sequência de reflexões em “reels” | `components/sections/HorizontalReel.tsx` | Quatro capítulos verticais |
| `ScrollProgress` | `trackfor-motion-library/src/effects/ScrollEffects.tsx` | Baixo | Avaliado, não incorporado | Nenhum | Não aplicável |
| `Marquee` | `trackfor-motion-library/src/effects/ScrollEffects.tsx` | Médio e contínuo | Rejeitado por não servir à narrativa | Nenhum | Não aplicável |
| `ScaleOnScroll` | `trackfor-motion-library/src/effects/ScrollEffects.tsx` | Baixo/médio | Referência para transições de cena | Máscaras e escalas pontuais no hero | Cena estática |
| `MagneticButton` | `trackfor-motion-library/src/effects/InteractiveEffects.tsx` | Baixo | CTAs com ponteiro fino | `components/motion/MagneticLink.tsx` | Link permanece imóvel |
| `CursorFollower` | `trackfor-motion-library/src/effects/InteractiveEffects.tsx` | Médio e contínuo | Rejeitado para preservar cursor nativo e reduzir ruído | Nenhum | Não aplicável |
| `TiltCard` | `trackfor-motion-library/src/effects/InteractiveEffects.tsx` | Baixo/médio | Rejeitado por conflito com o tom sereno | Nenhum | Não aplicável |
| `SmoothScroll`/Lenis | `trackfor-motion-library/src/components/SmoothScroll.tsx` | Médio e contínuo | Rejeitado para manter scroll nativo, teclado e touch | Nenhum | Scroll nativo |
| `ImageDistortion` | `trackfor-motion-library/src/shaders/ImageDistortion.tsx` | Alto, canvas contínuo | Não aplicado a retratos para evitar distorção facial | Campo abstrato próprio em `components/webgl/OrganicField.tsx` | Poster CSS |

## Efeitos próprios incorporados após a auditoria

- `OrganicThread.tsx`: caminho SVG revelado por ScrollTrigger e pontos de conexão; estático em reduced-motion.
- `HorizontalReel.tsx`: pin desktop, movimento lateral, máscara em faixa e mudança de fundo aos 65%; versão vertical fora do breakpoint.
- `DirectionalHeading.tsx`: primeira linha entra da direita e segunda sobe a partir da linha inferior.
- `AudiencePanels.tsx`: destaque deslizante adaptado da referência de lista fornecida, com botões reais e `aria-pressed`.
- `SocialHighlightCards.tsx`: glow, feixe luminoso e ícone, preparado para links reais e não renderizado enquanto a lista estiver vazia.
- `OrganicField.tsx`: shader de ruído suave, cursor moderado, DPR limitado e cleanup; texto permanece fora do canvas.

## Segurança de lifecycle

- GSAP e plugins são registrados uma vez em `lib/gsap.ts`.
- Hooks usam `useGSAP` com escopo e limpeza de matchMedia, tweens e ScrollTriggers.
- O reel é criado apenas com `(min-width: 901px) and (prefers-reduced-motion: no-preference)`.
- O WebGL é carregado dinamicamente, pausa fora da viewport, trata perda de contexto e não é requisito para acessar conteúdo.
- Nenhum conteúdo essencial recebe estado invisível em CSS antes da confirmação de JavaScript.
