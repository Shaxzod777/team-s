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