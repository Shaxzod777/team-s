const header = document.querySelector(".header");
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const year = document.getElementById("year");

// мобильное меню
burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");

    burger.classList.toggle("burger--open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
});

// закрываем меню после клика по ссылке
nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("nav--open");
        burger.classList.remove("burger--open");
        burger.setAttribute("aria-expanded", "false");
    });
});

// закрываем меню при изменении размера экрана
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        nav.classList.remove("nav--open");
        burger.classList.remove("burger--open");
        burger.setAttribute("aria-expanded", "false");
    }
});

// полупрозрачная шапка при прокрутке
window.addEventListener(
    "scroll",
    () => {
        header.classList.toggle("header--scrolled", window.scrollY > 10);
    },
    { passive: true }
);

// текущий год в подвале
year.textContent = new Date().getFullYear();
// плавное появление блоков при прокрутке
const revealTargets = document.querySelectorAll(`
    main .eyebrow, main h1, main .section-title,
    .hero__text, .hero__buttons, .hero__media,
    .card, .showroom__image, .showroom__content,
    .breadcrumbs, .model__subtitle, .model__photo, .model__buttons, .spec, .gallery__item,
    .config__text, .config__render, .config__panel,
    .contacts__text, .info__item, .form, .map,
    .footer__top
`);

function reveal(el, delay) {
    el.style.animationDelay = delay + "s";
    el.classList.add("reveal--visible");

    // после анимации убираем классы, чтобы не мешать hover-эффектам
    el.addEventListener(
        "animationend",
        () => {
            el.classList.remove("reveal", "reveal--visible");
            el.style.animationDelay = "";
        },
        { once: true }
    );
}

// показываем всё, что уже на экране или выше него (быстрый скролл, переход по якорю)
function revealPassed() {
    let order = 0;

    document.querySelectorAll(".reveal:not(.reveal--visible)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 40) {
            reveal(el, order * 0.1);
            order++;
        }
    });
}

if ("IntersectionObserver" in window) {
    revealTargets.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) revealPassed();
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", revealPassed, { passive: true });
}
