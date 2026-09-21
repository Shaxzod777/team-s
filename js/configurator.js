const BASE_PRICE = 62650;

const steps = document.querySelectorAll(".step");
const stepLabel = document.getElementById("stepLabel");
const render = document.getElementById("render");
const paintName = document.getElementById("paintName");
const totalPrice = document.getElementById("totalPrice");
const summary = document.getElementById("summary");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

let currentStep = 1;

function formatPrice(value) {
    return "$" + value.toLocaleString("en-US");
}

// выбранный вариант в группе с одиночным выбором (цвет, диски, салон, отделка)
function getActive(group) {
    return document.querySelector(`[data-group="${group}"] .swatch--active, [data-group="${group}"] .choice--active`);
}

function getPackages() {
    return [...document.querySelectorAll('[data-group="packages"] input:checked')];
}

function setImage(src, alt) {
    if (render.getAttribute("src") === src) return;
    render.classList.add("config__render--loading");
    render.onload = () => render.classList.remove("config__render--loading");
    render.src = src;
    render.alt = alt;
}

// на шаге 2 показываем салон, на остальных — машину снаружи
function updateImage() {
    if (currentStep === 2) {
        const interior = getActive("interior");
        setImage(interior.dataset.image, "E-Class interior in " + interior.dataset.name);
    } else {
        const paint = getActive("paint");
        setImage(paint.dataset.image, "Mercedes-Benz E-Class in " + paint.dataset.name);
    }
}

function update() {
    const selected = ["paint", "wheels", "interior", "trim"].map(getActive);
    const packages = getPackages();

    let total = BASE_PRICE;
    [...selected, ...packages].forEach((option) => {
        total += Number(option.dataset.price);
    });

    paintName.textContent = getActive("paint").dataset.name;
    totalPrice.textContent = formatPrice(total);

    const names = selected.map((option) => option.dataset.name);
    if (packages.length) {
        names.push(packages.map((p) => p.dataset.name).join(", "));
    }
    summary.textContent = names.join(" · ");

    updateImage();
}

function goToStep(number) {
    currentStep = number;

    steps.forEach((step) => {
        step.classList.toggle("step--active", Number(step.dataset.step) === number);
    });

    const title = steps[number - 1].dataset.title;
    stepLabel.textContent = `Step ${number} of ${steps.length} — ${title}`;

    backBtn.hidden = number === 1;
    nextBtn.textContent = number === steps.length
        ? "Request this build"
        : "Next: " + steps[number].dataset.title;

    updateImage();
}

// одиночный выбор: кружки цвета и кнопки-варианты
document.querySelectorAll(".option").forEach((group) => {
    const buttons = group.querySelectorAll(".swatch, .choice");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const activeClass = button.classList.contains("swatch") ? "swatch--active" : "choice--active";
            buttons.forEach((b) => b.classList.remove(activeClass));
            button.classList.add(activeClass);
            update();
        });
    });
});

// пакеты: можно выбрать несколько
document.querySelectorAll('[data-group="packages"] input').forEach((checkbox) => {
    checkbox.addEventListener("change", update);
});

backBtn.addEventListener("click", () => goToStep(currentStep - 1));

nextBtn.addEventListener("click", () => {
    if (currentStep < steps.length) {
        goToStep(currentStep + 1);
        return;
    }
    // последний шаг — переходим на контакты и передаём комплектацию в форму
    const build = "E-Class: " + summary.textContent + " — " + totalPrice.textContent;
    window.location.href = "./contacts.html?build=" + encodeURIComponent(build);
});

// заранее загружаем фото, чтобы смена цвета была мгновенной
document.querySelectorAll("[data-image]").forEach((el) => {
    new Image().src = el.dataset.image;
});

update();
