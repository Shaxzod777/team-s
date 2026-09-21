const items = document.querySelectorAll(".gallery__item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("lightboxPrev");
const nextBtn = document.getElementById("lightboxNext");

let current = 0;

function show(index) {
    // по кругу: после последней снова первая
    current = (index + items.length) % items.length;
    const img = items[current].querySelector("img");
    lightboxImage.src = img.dataset.full;
    lightboxImage.alt = img.alt;
}

function open(index) {
    show(index);
    lightbox.classList.add("lightbox--open");
    lightbox.setAttribute("aria-hidden", false);
    document.body.style.overflow = "hidden";
}

function close() {
    lightbox.classList.remove("lightbox--open");
    lightbox.setAttribute("aria-hidden", true);
    document.body.style.overflow = "";
}

items.forEach((item, index) => {
    item.addEventListener("click", () => open(index));
});

closeBtn.addEventListener("click", close);
prevBtn.addEventListener("click", () => show(current - 1));
nextBtn.addEventListener("click", () => show(current + 1));

// клик по тёмному фону закрывает
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
});

// клавиатура: Esc, стрелки
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("lightbox--open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
});
