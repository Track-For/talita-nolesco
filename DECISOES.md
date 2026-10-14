# Decisões do protótipo

## Estado do repositório

- O repositório já continha alterações e arquivos não rastreados antes desta execução. Para não misturar autoria nem incluir mudanças anteriores do usuário em commits, não foi criada branch e nenhum commit foi feito.
- A biblioteca `trackfor-motion-library` do projeto foi preservada como pacote autônomo. A cópia em `viviane-barbosa` foi somente lida e não foi modificada.
- As duas bibliotecas de motion foram comparadas por caminho relativo e conteúdo; a cópia local é equivalente à cópia adicional inspecionada.

## Direção visual

- O conceito adotado é “Entre sentir e florescer”, com uma linguagem editorial orgânica, fotográfica e cinematográfica.
- A distribuição cromática foi normalizada para cerca de 70% de marfim e papel, 20% de ameixa e lavanda e 10% de rosa. A proporção é visual, não matemática, e o contraste de texto tem prioridade.
- Cormorant Garamond foi usada nos títulos e Manrope nos textos e controles. Ambas são carregadas por `next/font`.
- A marca é tipográfica e provisória. O arquivo de logo anterior não foi tratado como identidade aprovada.
- As fotos reais fornecidas foram mantidas; nenhum retrato sintético foi criado.
- Os prints de depoimentos foram deliberadamente excluídos da interface.

## Conteúdo, ética e conversão

- A visitante é a protagonista; Talita aparece como guia profissional. A copy evita diagnóstico, promessa de cura, prazo de resultado, escassez e urgência promocional.
- Somente psicoterapia individual online e psicoterapia em grupo online aparecem como modalidades atuais. Os serviços do site anterior continuam estruturados como pendentes e ocultos.
- CRP, formação, trajetória e abordagem aparecem com aviso de validação quando necessário.
- O CTA final e o formulário direcionam para o WhatsApp profissional informado pela cliente.
- Guia gratuito e redes sociais têm componentes prontos, mas ficam ocultos enquanto não houver arquivos ou URLs reais.
- O formulário prepara a mensagem localmente e abre o WhatsApp. Não há envio para servidor próprio, armazenamento, analytics ou pixel.

## Movimento e performance

- A base é conteúdo HTML acessível e visível. O GSAP só aprimora uma página que já funciona sem animação.
- O registro de GSAP, ScrollTrigger e SplitText foi centralizado em `lib/gsap.ts`; todas as cenas React usam `useGSAP` e cleanup.
- Não foi usado Lenis. O scroll nativo reduz risco de conflito, melhora navegação por teclado e preserva o comportamento em touch.
- O preloader opcional foi omitido para não bloquear LCP nem a primeira interação. A entrada do hero cumpre a função narrativa.
- A transição entre manifesto e apresentação ganhou uma cena escura com pinning e expansão do retrato somente em desktop; em mobile e reduced-motion ela volta ao fluxo vertical estático.
- O HUD de capítulos e a textura de filme são camadas puramente visuais, não capturam interação e desaparecem quando a pessoa prefere movimento reduzido.
- O header lê o tom declarado por cada seção e alterna contraste sem acoplar a navegação às timelines do GSAP.
- O reel horizontal só é ativado a partir de 901 px e sem `prefers-reduced-motion`. Em telas menores ou com movimento reduzido, os quatro capítulos ficam empilhados.
- Aos 65% do percurso horizontal o fundo muda de marfim para lavanda. A mudança usa um atributo de estado e transição de cor, sem recalcular layout.
- Revelações de imagem usam três máscaras: cortina vertical, faixa central e entrada pela direita. Sem JavaScript, as imagens continuam visíveis.
- Títulos selecionados alternam revelação da direita para a esquerda e de baixo para cima; o restante usa entradas discretas para evitar um catálogo de efeitos.
- O destaque deslizante da lista “Para quem é” adapta a ideia do menu fornecido, sem copiar sua complexidade ou introduzir navegação aninhada desnecessária.
- O efeito glow/beam pedido para redes sociais foi adaptado à paleta da marca, mas somente será renderizado quando URLs reais forem cadastradas.
- O campo WebGL é único, lazy-loaded, limitado em DPR, observado por visibilidade e substituído por composição CSS em reduced-motion, touch estreito ou indisponibilidade.
- O campo WebGL não usa duas imagens: ele revela um fundo procedural em manchas móveis somente durante o hover e permanece atrás do texto da pausa contemplativa.
- O liquid glass foi concentrado em controles e pequenos elementos de apoio; grandes blocos de conteúdo continuam sólidos para preservar legibilidade e desempenho.
- O shader abstrato não é aplicado ao rosto. Retratos usam `clip-path`, parallax moderado e `object-position` controlado.

## Responsividade, acessibilidade e SEO

- O menu completo vira menu móvel até 1100 px. O hero adota composição totalmente empilhada até 900 px e uma composição intermediária legível entre 901 e 1200 px.
- O reel não prende o scroll em mobile. Alvos interativos têm pelo menos 44 px, foco visível, skip link e rótulos acessíveis.
- `prefers-reduced-motion` remove pinning, parallax, WebGL animado e revelações, mantendo todo o conteúdo.
- A página possui um único H1, headings em ordem, textos no DOM, imagens com alt e FAQ em `details/summary` nativo.
- O protótipo permanece `noindex` e o `robots.txt` bloqueia rastreamento enquanto não houver domínio e aprovação. Sitemap e canonical só devem ser habilitados com `NEXT_PUBLIC_SITE_URL` definido.
- JSON-LD foi omitido porque CRP, endereço e demais dados profissionais ainda não foram validados.

## Stack

- Mantidos Next.js 16.4, App Router, TypeScript, Tailwind/CSS global e React 19 existentes.
- Adicionados GSAP, `@gsap/react`, Three.js e React Three Fiber para as cenas aprovadas.
- Adicionados Sharp para o pipeline de imagens e Playwright para QA visual local.
- A documentação local da versão instalada do Next.js foi consultada antes das alterações de App Router, metadata, imagens, fontes, robots, sitemap e configuração Turbopack.
