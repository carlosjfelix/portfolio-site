// ===== Portfolio site interactions =====
(function () {
  "use strict";

  // --- Current year in footer ---
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Mobile nav toggle ---
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    // Close menu after clicking a link (mobile)
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- Nav background on scroll ---
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- Scroll reveal ---
  var revealEls = document.querySelectorAll(
    ".section__title, .about__text, .stat, .skill-card, .tl-item, .gallery__card, .edu-card"
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // --- Active nav link highlighting ---
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
  var linkMap = {};
  document.querySelectorAll(".nav__links a").forEach(function (a) {
    var id = a.getAttribute("href");
    if (id && id.charAt(0) === "#") linkMap[id.slice(1)] = a;
  });
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          Object.keys(linkMap).forEach(function (k) { linkMap[k].classList.remove("active"); });
          var link = linkMap[entry.target.id];
          if (link) link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  // --- Lightbox for gallery media ---
  var lightbox = document.getElementById("lightbox");
  var lightboxContent = document.getElementById("lightboxContent");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(cardEl) {
    if (!lightbox || !lightboxContent) return;
    var media = cardEl.querySelector("img, video");
    if (!media) return; // placeholders / embeds skip

    lightboxContent.innerHTML = "";
    var clone;
    if (media.tagName === "IMG") {
      clone = document.createElement("img");
      clone.src = media.currentSrc || media.src;
      clone.alt = media.alt || "";
    } else {
      clone = document.createElement("video");
      clone.src = media.currentSrc || media.src;
      clone.controls = true;
      clone.autoplay = true;
      clone.loop = true;
      clone.playsInline = true;
    }
    lightboxContent.appendChild(clone);
    lightboxCaption.textContent = cardEl.getAttribute("data-caption") || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxContent.innerHTML = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".gallery__card").forEach(function (card) {
    if (card.classList.contains("is-placeholder") || card.classList.contains("gallery__card--embed")) return;
    card.addEventListener("click", function () { openLightbox(card); });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
})();
