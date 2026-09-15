/**
 * CONFIGURAÇÃO CENTRAL — PACK CORTES VIRAIS
 * ------------------------------------------------------------
 * Altere os valores abaixo para atualizar a página inteira.
 * Todo elemento com atributo data-cfg="CHAVE" é preenchido
 * automaticamente por js/main.js com o valor correspondente.
 *
 * NÃO invente números que não existam de verdade (regra do
 * briefing). Os campos marcados com "AJUSTAR" ainda precisam
 * de confirmação antes de publicar a página.
 */

const CONFIG = {
  // Identidade do produto
  PRODUCT_NAME: "Pack Cortes Virais",
  CREATOR_HANDLE: "Maycon_lm",

  // Oferta
  VIDEO_COUNT: "+60.000",
  CURRENT_PRICE: "19,90",

  // AJUSTAR: só preencha OLD_PRICE se R$39,90 for realmente o preço
  // de referência já praticado. Deixe null para não exibir o "DE".
  // Isso evita ancoragem de preço falsa.
  OLD_PRICE: null, // exemplo quando confirmado: "39,90"

  // Link de checkout único usado em todos os botões da página.
  CHECKOUT_URL: "https://pay.kiwify.com.br/Iutv729",

  // AJUSTAR: nome/descrição real do brinde. Não inventar conteúdo.
  BONUS_NAME: "[NOME_DO_BRINDE]",

  // Autoridade (Maycon_lm) — não representa compradores, apenas
  // o alcance do perfil de onde a oferta parte.
  FOLLOWER_COUNT: "+17 mil",

  // Quantidade de categorias é calculada a partir da lista real
  // renderizada em CATEGORIES (ver abaixo) — nunca é um número solto.
  get CATEGORY_COUNT() {
    return String(CATEGORIES.length);
  },
};

/**
 * Categorias exibidas na seção "Tem conteúdo para quase todo tipo
 * de perfil". Adicione/remova itens aqui — o contador de categorias
 * na barra de impacto acompanha automaticamente.
 */
const CATEGORIES = [
  { icon: "🎙️", label: "Cortes de Podcasts" },
  { icon: "💰", label: "Dinheiro" },
  { icon: "📈", label: "Empreendedorismo" },
  { icon: "🧠", label: "Motivação" },
  { icon: "🏋️", label: "Fitness" },
  { icon: "❤️", label: "Relacionamentos" },
  { icon: "🎮", label: "Games" },
  { icon: "🎬", label: "Filmes e Séries" },
  { icon: "📚", label: "Educação" },
  { icon: "🔥", label: "Conteúdos Virais" },
  { icon: "🎤", label: "Entrevistas" },
  { icon: "💼", label: "Negócios" },
  { icon: "📱", label: "Redes Sociais" },
  { icon: "🚀", label: "Desenvolvimento Pessoal" },
];

/**
 * Galeria "Veja o tamanho do acervo".
 * AJUSTAR: assim que houver 10–20 exemplos reais dos cortes do pack,
 * troque o "img" de cada item pelo caminho da thumbnail real (mesma
 * pasta assets/gallery/, mesma proporção 9:16). Até lá, os arquivos
 * em assets/gallery/thumb-XX.svg são gráficos gerados (gradiente +
 * ícone da categoria) — não são fotos reais de vídeo, e foram criados
 * com scripts/generate-gallery-images.js.
 */
const GALLERY_PLACEHOLDERS = [
  { tag: "PODCAST", img: "assets/gallery/thumb-01.svg" },
  { tag: "MOTIVAÇÃO", img: "assets/gallery/thumb-02.svg" },
  { tag: "DINHEIRO", img: "assets/gallery/thumb-03.svg" },
  { tag: "FITNESS", img: "assets/gallery/thumb-04.svg" },
  { tag: "RELACIONAMENTO", img: "assets/gallery/thumb-05.svg" },
  { tag: "GAMES", img: "assets/gallery/thumb-06.svg" },
  { tag: "FILMES", img: "assets/gallery/thumb-07.svg" },
  { tag: "NEGÓCIOS", img: "assets/gallery/thumb-08.svg" },
  { tag: "PODCAST", img: "assets/gallery/thumb-09.svg" },
  { tag: "MOTIVAÇÃO", img: "assets/gallery/thumb-10.svg" },
  { tag: "DINHEIRO", img: "assets/gallery/thumb-11.svg" },
  { tag: "FITNESS", img: "assets/gallery/thumb-12.svg" },
  { tag: "RELACIONAMENTO", img: "assets/gallery/thumb-13.svg" },
  { tag: "GAMES", img: "assets/gallery/thumb-14.svg" },
  { tag: "FILMES", img: "assets/gallery/thumb-15.svg" },
  { tag: "NEGÓCIOS", img: "assets/gallery/thumb-16.svg" },
];

/**
 * Efeito "biblioteca infinita" (marquee decorativo, logo abaixo da
 * galeria) e miniaturas do mockup de celular no Hero.
 * Usa um conjunto de imagens DIFERENTE do da galeria (as 14
 * categorias completas de CATEGORIES) para essas seções não
 * mostrarem exatamente as mesmas imagens uma embaixo da outra.
 * Gerado com scripts/generate-marquee-images.js.
 */
const MARQUEE_ITEMS = [
  { img: "assets/marquee/thumb-01.svg" },
  { img: "assets/marquee/thumb-02.svg" },
  { img: "assets/marquee/thumb-03.svg" },
  { img: "assets/marquee/thumb-04.svg" },
  { img: "assets/marquee/thumb-05.svg" },
  { img: "assets/marquee/thumb-06.svg" },
  { img: "assets/marquee/thumb-07.svg" },
  { img: "assets/marquee/thumb-08.svg" },
  { img: "assets/marquee/thumb-09.svg" },
  { img: "assets/marquee/thumb-10.svg" },
  { img: "assets/marquee/thumb-11.svg" },
  { img: "assets/marquee/thumb-12.svg" },
  { img: "assets/marquee/thumb-13.svg" },
  { img: "assets/marquee/thumb-14.svg" },
];
