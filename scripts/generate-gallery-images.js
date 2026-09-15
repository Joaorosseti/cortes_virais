/**
 * Gera as thumbnails placeholder da galeria (assets/gallery/thumb-XX.svg).
 * Gráficos vetoriais com gradiente + ícone da categoria — não são fotos
 * reais de vídeo (não temos os arquivos do pack). Reflete 1:1 a ordem e
 * as tags definidas em js/config.js (GALLERY_PLACEHOLDERS).
 *
 * Rodar de novo com: node scripts/generate-gallery-images.js
 */
const fs = require("fs");
const path = require("path");

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

const ICONS = {
  PODCAST: "\u{1F399}️",
  "MOTIVAÇÃO": "\u{1F9E0}",
  DINHEIRO: "\u{1F4B0}",
  FITNESS: "\u{1F3CB}️",
  RELACIONAMENTO: "❤️",
  GAMES: "\u{1F3AE}",
  FILMES: "\u{1F3AC}",
  "NEGÓCIOS": "\u{1F4BC}",
};

const TONES = {
  a: { from: "#FF0050", to: "#141414", stop: "68%" },
  b: { from: "#7C3AED", to: "#141414", stop: "68%" },
  c: { from: "#3A3A3A", to: "#101010", stop: "75%" },
};

const W = 540;
const H = 960;

function svgFor(tag, tone, index) {
  const icon = ICONS[tag];
  const { from, to, stop } = TONES[tone];
  const gradId = `g${index}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Categoria: ${tag}">
  <defs>
    <linearGradient id="${gradId}" x1="10%" y1="0%" x2="75%" y2="100%">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="${stop}" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${to}"/>
  <rect width="${W}" height="${H}" fill="url(#${gradId})"/>
  <text x="50%" y="46%" font-size="150" text-anchor="middle" dominant-baseline="middle">${icon}</text>
</svg>
`;
}

const outDir = path.join(__dirname, "..", "assets", "gallery");
fs.mkdirSync(outDir, { recursive: true });

GALLERY_PLACEHOLDERS.forEach((item, i) => {
  const num = String(i + 1).padStart(2, "0");
  const filePath = path.join(outDir, `thumb-${num}.svg`);
  fs.writeFileSync(filePath, svgFor(item.tag, item.tone, i + 1), "utf8");
  console.log(`wrote ${filePath}`);
});

console.log(`Done: ${GALLERY_PLACEHOLDERS.length} images.`);
