const { chromium } = require("playwright");
const URL = "http://localhost:4173/index.html";

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const consoleErrors = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  await page.goto(URL, { waitUntil: "networkidle" });

  const ctaHrefs = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[data-cta]")).map((a) => ({ event: a.dataset.cta, href: a.getAttribute("href") }))
  );
  console.log("CTA hrefs:", JSON.stringify(ctaHrefs, null, 2));

  const overlap = await page.evaluate(() => {
    const gallerySrcs = Array.from(document.querySelectorAll("#gallery-grid img")).map((i) => i.getAttribute("src"));
    const marqueeSrcs = Array.from(document.querySelectorAll("#marquee-row1 img, #marquee-row2 img")).map((i) => i.getAttribute("src"));
    const phoneSrcs = Array.from(document.querySelectorAll("#phone-thumbs img")).map((i) => i.getAttribute("src"));
    const gallerySet = new Set(gallerySrcs);
    const marqueeSet = new Set(marqueeSrcs);
    const phoneSet = new Set(phoneSrcs);
    const galleryVsMarquee = [...gallerySet].filter((s) => marqueeSet.has(s));
    const galleryVsPhone = [...gallerySet].filter((s) => phoneSet.has(s));
    return {
      galleryUnique: gallerySet.size,
      marqueeUnique: marqueeSet.size,
      phoneUnique: phoneSet.size,
      galleryVsMarqueeOverlap: galleryVsMarquee,
      galleryVsPhoneOverlap: galleryVsPhone,
    };
  });
  console.log("Overlap check:", JSON.stringify(overlap, null, 2));
  console.log("console errors:", consoleErrors.length ? consoleErrors : "none");

  await page.screenshot({ path: ".tmp-review/hero.png" });

  const y = await page.evaluate(() => {
    const el = document.getElementById("galeria-heading");
    return window.scrollY + el.getBoundingClientRect().top - 20;
  });
  await page.evaluate((yy) => { document.documentElement.style.scrollBehavior = "auto"; window.scrollTo(0, yy); }, y);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: ".tmp-review/gallery-then-marquee.png" });

  await page.evaluate(() => { window.scrollBy(0, 900); });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: ".tmp-review/marquee-section.png" });

  await browser.close();
}
run().catch((e) => { console.error(e); process.exit(1); });
