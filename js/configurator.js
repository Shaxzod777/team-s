const BASE_PRICE = 95000;

const groups = document.querySelectorAll(".option");
const render = document.getElementById("render");
const paintName = document.getElementById("paintName");
const totalPrice = document.getElementById("totalPrice");
const summary = document.getElementById("summary");
const requestBtn = document.getElementById("requestBtn");

function formatPrice(value) {
    return "$" + value.toLocaleString("en-US");
}

// собираем выбранные варианты из всех групп
function getSelected() {
    const selected = [];
    groups.forEach((group) => {
        const active = group.querySelector(".swatch--active, .choice--active");
        selected.push(active);
    });
    return selected;
}

function update() {
    const selected = getSelected();

    let total = BASE_PRICE;
    selected.forEach((option) => {
        total += Number(option.dataset.price);
    });

    const paint = selected[0];
    paintName.textContent = paint.dataset.name;
    render.style.setProperty("--paint", paint.style.getPropertyValue("--color"));
    render.textContent = "Car render — " + paint.dataset.name;

    totalPrice.textContent = formatPrice(total);
    summary.textContent = selected.map((option) => option.dataset.name).join(" · ");
}

groups.forEach((group) => {
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

// переходим на контакты и передаём выбранную комплектацию в форму
requestBtn.addEventListener("click", () => {
    const build = summary.textContent + " — " + totalPrice.textContent;
    window.location.href = "./contacts.html?build=" + encodeURIComponent(build);
});

update();
