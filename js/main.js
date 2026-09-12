/**
 * PACK CORTES VIRAIS — comportamento da landing page
 * ------------------------------------------------------------
 * Sem frameworks, sem dependências externas. Tudo aqui é
 * progressive enhancement: sem JS a página continua legível,
 * com todo o conteúdo estático visível e os links de CTA
 * apontando para "#" (ver aviso no console).
 */
(function () {
  "use strict";

  /* ------------------------------------------------------------
   * 1. TRACKING
   * ------------------------------------------------------------
   * Ponto único de integração com qualquer ferramenta de analytics
   * (GA4, Meta Pixel, TikTok Pixel, etc). Por padrão só loga no
   * console e empurra para window.dataLayer, sem carregar nenhum
   * script de terceiros. Troque a função track() por chamadas reais
   * (gtag, fbq, ttq.track...) quando o pixel estiver definido.
   * ------------------------------------------------------------ */
  function track(eventName, detail) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, detail || {}));
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      console.debug("[track]", eventName, detail || {});
    }
    // Integração real, exemplo:
    // if (window.gtag) gtag('event', eventName, detail || {});
    // if (window.fbq) fbq('trackCustom', eventName, detail || {});
  }

  document.addEventListener("DOMContentLoaded", function () {
    track("page_view");
    applyConfig();
    renderCategories();
    renderGallery();
    setupCtaLinks();
    setupStickyCta();
    setupRevealOnScroll();
    setupFaqTracking();
    document.getElementById("footer-year").textContent = new Date().getFullYear();
  });

  /* ------------------------------------------------------------
   * 2. APLICAR CONFIG.JS NA PÁGINA
   * ------------------------------------------------------------ */
  function applyConfig() {
    document.querySelectorAll("[data-cfg]").forEach(function (el) {
      const key = el.getAttribute("data-cfg");
      const value = CONFIG[key];
      if (value !== undefined && value !== null && value !== "") {
        el.textContent = value;
      }
    });

    // Bloco "DE R$ X,XX" só aparece se um preço de referência real
    // for informado em CONFIG.OLD_PRICE (evita ancoragem falsa).
    document.querySelectorAll("[data-cfg-if]").forEach(function (el) {
      const key = el.getAttribute("data-cfg-if");
      if (CONFIG[key]) {
        el.hidden = false;
        const target = el.querySelector("[data-cfg]");
        if (target) target.textContent = CONFIG[key];
      } else {
        el.hidden = true;
      }
    });

    // Aviso visível apenas para quem está editando o arquivo (não
    // aparece para o visitante final) caso o checkout ainda não
    // tenha sido configurado.
    if (!CONFIG.CHECKOUT_URL || CONFIG.CHECKOUT_URL.indexOf("COLE_AQUI") === 0) {
      console.warn(
        "[Pack Cortes Virais] CHECKOUT_URL ainda não foi definido em js/config.js — os botões estão apontando para \"#\"."
      );
    }
  }

  /* ------------------------------------------------------------
   * 3. CATEGORIAS (grid dinâmico a partir de config.js)
   * ------------------------------------------------------------ */
  function renderCategories() {
    const grid = document.getElementById("categories-grid");
    if (!grid) return;
    grid.innerHTML = CATEGORIES.map(function (cat) {
      return (
        '<li class="category-card">' +
        '<span class="category-card__icon" aria-hidden="true">' + cat.icon + "</span>" +
        '<span class="category-card__label">' + cat.label + "</span>" +
        "</li>"
      );
    }).join("");
  }

  /* ------------------------------------------------------------
   * 4. GALERIA (placeholders identificados no código)
   * ------------------------------------------------------------
   * Cada item é um bloco gerado em CSS, não uma foto real.
   * Para usar assets reais, troque o <li> por:
   *   <li class="thumb">
   *     <img src="assets/gallery/thumb-01.jpg" alt="" loading="lazy" width="360" height="640">
   *     <span class="thumb__tag">PODCAST</span>
   *   </li>
   * ------------------------------------------------------------ */
  function renderGallery() {
    const grid = document.getElementById("gallery-grid");
    if (!grid) return;
    grid.innerHTML = GALLERY_PLACEHOLDERS.map(function (item) {
      return (
        '<li class="thumb thumb--placeholder thumb--tone-' + item.tone + '">' +
        '<span class="thumb__play" aria-hidden="true">▶</span>' +
        '<span class="thumb__tag">' + item.tag + "</span>" +
        "</li>"
      );
    }).join("");
  }

  /* ------------------------------------------------------------
   * 5. LINKS DE CTA (usam sempre CONFIG.CHECKOUT_URL)
   * ------------------------------------------------------------ */
  function setupCtaLinks() {
    document.querySelectorAll("[data-cta]").forEach(function (link) {
      link.setAttribute("href", CONFIG.CHECKOUT_URL || "#");
      if (!CONFIG.CHECKOUT_URL) link.setAttribute("aria-disabled", "true");
    });

    document.addEventListener("click", function (event) {
      const link = event.target.closest("[data-cta]");
      if (!link) return;
      const eventName = link.getAttribute("data-cta");
      track(eventName);
      track("checkout_click", { source: eventName });
    });
  }

  /* ------------------------------------------------------------
   * 6. CTA FIXO NO MOBILE
   * ------------------------------------------------------------
   * Some quando o Hero está visível, aparece depois que o
   * visitante rola a página, e nunca cobre o rodapé.
   * ------------------------------------------------------------ */
  function setupStickyCta() {
    const stickyBar = document.getElementById("sticky-cta");
    const hero = document.getElementById("hero");
    const footer = document.getElementById("footer");
    if (!stickyBar || !hero || !("IntersectionObserver" in window)) return;

    let heroVisible = true;
    let footerVisible = false;

    function updateVisibility() {
      const shouldShow = !heroVisible && !footerVisible;
      stickyBar.classList.toggle("is-visible", shouldShow);
    }

    const heroObserver = new IntersectionObserver(
      function (entries) {
        heroVisible = entries[0].isIntersecting;
        updateVisibility();
      },
      { threshold: 0 }
    );
    heroObserver.observe(hero);

    if (footer) {
      const footerObserver = new IntersectionObserver(
        function (entries) {
          footerVisible = entries[0].isIntersecting;
          updateVisibility();
        },
        { threshold: 0, rootMargin: "0px 0px -10% 0px" }
      );
      footerObserver.observe(footer);
    }
  }

  /* ------------------------------------------------------------
   * 7. REVEAL AO SCROLL (fade + slide sutil)
   * ------------------------------------------------------------ */
  function setupRevealOnScroll() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------------
   * 8. FAQ — tracking simples de qual pergunta foi aberta
   * ------------------------------------------------------------ */
  function setupFaqTracking() {
    document.querySelectorAll(".faq__item").forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (item.open) {
          const question = item.querySelector(".faq__question");
          track("faq_open", { question: question ? question.textContent.trim() : "" });
        }
      });
    });
  }
})();
