/**
 * Gera as thumbnails do efeito "biblioteca infinita" (marquee) e do
 * mockup de celular do Hero: assets/marquee/thumb-XX.svg.
 *
 * Usa as 14 categorias completas de CATEGORIES (js/config.js), um
 * conjunto DIFERENTE das 16 imagens da galeria (assets/gallery/), pra
 * essas duas seções não mostrarem exatamente as mesmas imagens.
 *
 * Rodar de novo com: node scripts/generate-marquee-images.js
 */
const fs = require("fs");
const path = require("path");

const CATEGORIES = [
  { icon: "\u{1F399}️", label: "Cortes de Podcasts" },
  { icon: "\u{1F4B0}", label: "Dinheiro" },
  { icon: "\u{1F4C8}", label: "Empreendedorismo" },
  { icon: "\u{1F9E0}", label: "Motivação" },
  { icon: "\u{1F3CB}️", label: "Fitness" },
  { icon: "❤️", label: "Relacionamentos" },
  { icon: "\u{1F3AE}", label: "Games" },
  { icon: "\u{1F3AC}", label: "Filmes e Séries" },
  { icon: "\u{1F4DA}", label: "Educação" },
  { icon: "\u{1F525}", label: "Conteúdos Virais" },
  { icon: "\u{1F3A4}", label: "Entrevistas" },
  { icon: "\u{1F4BC}", label: "Negócios" },
  { icon: "\u{1F4F1}", label: "Redes Sociais" },
  { icon: "\u{1F680}", label: "Desenvolvimento Pessoal" },
];

const TONES = [
  { from: "#FF0050", to: "#141414", stop: "68%" }, // a
  { from: "#7C3AED", to: "#141414", stop: "68%" }, // b
  { from: "#3A3A3A", to: "#101010", stop: "75%" }, // c
];

const W = 540;
const H = 960;

function svgFor(icon, tone, index) {
  const gradId = `m${index}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="${gradId}" x1="15%" y1="0%" x2="70%" y2="100%">
      <stop offset="0%" stop-color="${tone.from}"/>
      <stop offset="${tone.stop}" stop-color="${tone.to}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${tone.to}"/>
  <rect width="${W}" height="${H}" fill="url(#${gradId})"/>
  <text x="50%" y="46%" font-size="150" text-anchor="middle" dominant-baseline="middle">${icon}</text>
</svg>
`;
}

const outDir = path.join(__dirname, "..", "assets", "marquee");
fs.mkdirSync(outDir, { recursive: true });

CATEGORIES.forEach((cat, i) => {
  const tone = TONES[i % TONES.length];
  const num = String(i + 1).padStart(2, "0");
  const filePath = path.join(outDir, `thumb-${num}.svg`);
  fs.writeFileSync(filePath, svgFor(cat.icon, tone, i + 1), "utf8");
  console.log(`wrote ${filePath} (${cat.label})`);
});

console.log(`Done: ${CATEGORIES.length} images.`);
