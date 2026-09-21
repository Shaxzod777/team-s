const form = document.getElementById("testDriveForm");
const success = document.getElementById("formSuccess");
const message = document.getElementById("message");

// если пришли из конфигуратора — подставляем комплектацию в сообщение
const build = new URLSearchParams(window.location.search).get("build");
if (build) {
    message.value = "I'd like to request this build: " + build;
}

const errors = {
    name: "Enter your name (at least 2 letters)",
    phone: "Enter a valid phone number, e.g. +998 90 123 45 67",
};

function validateField(input) {
    const error = input.parentElement.querySelector(".form__error");
    const value = input.value.trim();
    let valid = true;

    if (input.required && value === "") valid = false;
    if (input.minLength > 0 && value.length < input.minLength) valid = false;
    if (input.pattern && value !== "" && !new RegExp(input.pattern).test(value)) valid = false;

    input.classList.toggle("form__input--invalid", !valid);
    error.textContent = valid ? "" : errors[input.name];
    return valid;
}

const fields = form.querySelectorAll("[required]");

// убираем ошибку, как только пользователь начинает исправлять
fields.forEach((input) => {
    input.addEventListener("input", () => {
        if (input.classList.contains("form__input--invalid")) validateField(input);
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    fields.forEach((input) => {
        if (!validateField(input)) isValid = false;
    });

    if (!isValid) {
        success.classList.remove("form__success--visible");
        return;
    }

    // сервера нет — собираем данные и показываем в консоли
    const data = {};
    new FormData(form).forEach((value, key) => {
        data[key] = value.trim();
    });
    console.log("Test drive request:", data);

    form.reset();
    success.classList.add("form__success--visible");
});
