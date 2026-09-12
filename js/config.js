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

  // AJUSTAR: link de checkout único usado em todos os botões da página.
  CHECKOUT_URL: "COLE_AQUI_O_LINK_DO_CHECKOUT",

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
 * troque cada item por uma thumbnail real:
 *   { type: "image", src: "assets/gallery/thumb-01.jpg", tag: "PODCAST" }
 * Até lá, os itens abaixo usam blocos gerados em CSS (sem fotos de
 * banco de imagens) apenas para representar a categoria — são
 * placeholders, identificados pela classe "thumb--placeholder" no HTML.
 */
const GALLERY_PLACEHOLDERS = [
  { tag: "PODCAST", tone: "a" },
  { tag: "MOTIVAÇÃO", tone: "b" },
  { tag: "DINHEIRO", tone: "c" },
  { tag: "FITNESS", tone: "a" },
  { tag: "RELACIONAMENTO", tone: "b" },
  { tag: "GAMES", tone: "c" },
  { tag: "FILMES", tone: "a" },
  { tag: "NEGÓCIOS", tone: "b" },
  { tag: "PODCAST", tone: "c" },
  { tag: "MOTIVAÇÃO", tone: "a" },
  { tag: "DINHEIRO", tone: "b" },
  { tag: "FITNESS", tone: "c" },
  { tag: "RELACIONAMENTO", tone: "a" },
  { tag: "GAMES", tone: "b" },
  { tag: "FILMES", tone: "c" },
  { tag: "NEGÓCIOS", tone: "a" },
];
