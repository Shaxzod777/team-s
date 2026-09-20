/* =========================================
   MERCEDES-BENZ CONFIGURATOR
========================================= */


/* MODELS */

const cars = {

    "C-Class": {
        price: 55000,
        type: "Premium Sedan",
        image:
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=90"
    },

    "E-Class": {
        price: 70000,
        type: "Business Sedan",
        image:
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1600&q=90"
    },

    "S-Class": {
        price: 110000,
        type: "Luxury Sedan",
        image:
            "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=90"
    },

    "G-Class": {
        price: 145000,
        type: "Luxury SUV",
        image:
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=90"
    },

    "AMG GT": {
        price: 135000,
        type: "Performance Coupe",
        image:
            "https://images.unsplash.com/photo-1618843479619-f3d0e1e2b4f4?auto=format&fit=crop&w=1600&q=90"
    }

};


/* CURRENT STATE */

let selectedCar = "C-Class";

let basePrice = cars[selectedCar].price;

let wheelPrice = 0;

let interiorPrice = 0;

let currentAngle = 0;

let currentColor = "black";


/* ELEMENTS */

const carImage = document.getElementById("carImage");

const carView = document.getElementById("carView");

const selectedModel =
    document.getElementById("selectedModel");

const selectedType =
    document.getElementById("selectedType");

const price =
    document.getElementById("price");

const colorName =
    document.getElementById("colorName");

const angleText =
    document.getElementById("angleText");


/* =========================================
   SELECT CAR
========================================= */

function chooseCar(carName) {

    if (!cars[carName]) {
        return;
    }

    selectedCar = carName;

    basePrice = cars[carName].price;

    selectedModel.textContent =
        carName;

    selectedType.textContent =
        cars[carName].type;

    carImage.src =
        cars[carName].image;

    /*
        Сбрасываем вращение
    */

    currentAngle = 0;

    updateRotation();

    /*
        Сбрасываем цвет
    */

    currentColor = "black";

    resetColorButtons();

    applyCarColor();

    updatePrice();

    /*
        Переходим к конфигуратору
    */

    document
        .getElementById("configurator")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================================
   CAR COLOR
========================================= */

function changeColor(color, button) {

    currentColor = color;

    /*
        Убираем active
        со всех цветов
    */

    document
        .querySelectorAll(".color")
        .forEach(btn => {
            btn.classList.remove("active");
        });

    /*
        Активируем выбранный
    */

    button.classList.add("active");

    /*
        Меняем название
    */

    const names = {

        black: "Obsidian Black",

        white: "Polar White",

        silver: "Iridium Silver",

        red: "Patagonia Red",

        blue: "Spectral Blue"

    };

    colorName.textContent =
        names[color];

    /*
        Меняем ТОЛЬКО автомобиль.
        Фон страницы не меняется.
    */

    applyCarColor();
}


/* =========================================
   REALISTIC COLOR FILTER
========================================= */

function applyCarColor() {

    let filter = "none";

    switch (currentColor) {

        case "black":

            filter =
                "brightness(0.65) contrast(1.25)";

            break;


        case "white":

            filter =
                "brightness(1.55) contrast(0.8) saturate(0.2)";

            break;


        case "silver":

            filter =
                "brightness(1.2) contrast(0.95) saturate(0.2)";

            break;


        case "red":

            filter =
                "sepia(0.5) saturate(4) hue-rotate(315deg) brightness(0.9)";

            break;


        case "blue":

            filter =
                "sepia(0.5) saturate(3) hue-rotate(165deg) brightness(0.85)";

            break;

    }

    carImage.style.filter = filter;
}


/* =========================================
   RESET COLOR BUTTONS
========================================= */

function resetColorButtons() {

    document
        .querySelectorAll(".color")
        .forEach(btn => {

            btn.classList.remove("active");

            if (
                btn.classList.contains("black")
            ) {
                btn.classList.add("active");
            }

        });

}


/* =========================================
   360° ROTATION
========================================= */

/*
    Здесь используется 36 положений.

    0   = FRONT
    9   = RIGHT
    18  = BACK
    27  = LEFT
    35  = FRONT
*/

const angles = [

    "FRONT",
    "FRONT RIGHT",
    "RIGHT FRONT",
    "RIGHT",
    "RIGHT SIDE",
    "RIGHT BACK",
    "BACK RIGHT",
    "BACK",
    "BACK LEFT",
    "LEFT BACK",
    "LEFT",
    "LEFT SIDE",
    "LEFT FRONT",
    "FRONT LEFT"

];


/*
    Кнопки ← →
*/

function rotateCar(direction) {

    currentAngle += direction;

    /*
        36 кадров
    */

    if (currentAngle < 0) {
        currentAngle = 35;
    }

    if (currentAngle > 35) {
        currentAngle = 0;
    }

    updateRotation();
}


/*
    Обновление положения
*/

function updateRotation() {

    /*
        Для текущей версии создаём
        визуальный эффект вращения.

        Когда появятся настоящие
        360° кадры, здесь можно
        просто менять src картинки.
    */

    const rotation =
        currentAngle * 10;

    /*
        Лёгкий 3D-эффект
    */

    carImage.style.transform =
        `perspective(1000px)
         rotateY(${rotation}deg)
         scale(${1 - Math.abs(Math.sin(rotation * Math.PI / 180)) * 0.08})`;

    /*
        Название ракурса
    */

    const index =
        Math.floor(currentAngle / 2.6);

    angleText.textContent =
        angles[index] || "FRONT";


    /*
        Обновляем точки
    */

    const dots =
        document.querySelectorAll(
            ".angle-dots span"
        );

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    const activeDot =
        Math.floor(currentAngle / 5);

    if (dots[activeDot]) {
        dots[activeDot]
            .classList.add("active");
    }

}


/* =========================================
   MOUSE / TRACKPAD 360°
========================================= */

let dragging = false;

let startX = 0;

let lastX = 0;


/*
    Начало вращения
*/

carView.addEventListener(
    "pointerdown",
    function(event) {

        dragging = true;

        startX = event.clientX;

        lastX = event.clientX;

        carView.setPointerCapture(
            event.pointerId
        );

    }
);


/*
    Движение
*/

carView.addEventListener(
    "pointermove",
    function(event) {

        if (!dragging) {
            return;
        }

        const difference =
            event.clientX - lastX;


        /*
            Чем больше движение мыши,
            тем сильнее вращение
        */

        if (Math.abs(difference) > 8) {

            if (difference > 0) {
                rotateCar(-1);
            } else {
                rotateCar(1);
            }

            lastX = event.clientX;
        }

    }
);


/*
    Конец вращения
*/

carView.addEventListener(
    "pointerup",
    function() {

        dragging = false;

    }
);


carView.addEventListener(
    "pointercancel",
    function() {

        dragging = false;

    }
);


/* =========================================
   WHEELS
========================================= */

function selectWheel(amount, button) {

    wheelPrice = amount;

    document
        .querySelectorAll(".option-button")
        .forEach(btn => {

            /*
                Не снимаем active
                с interior неправильно.
            */

        });


    /*
        Активируем кнопку
        только внутри блока wheels
    */

    const parent =
        button.parentElement;

    parent
        .querySelectorAll(".option-button")
        .forEach(btn => {

            btn.classList.remove("active");

        });

    button.classList.add("active");

    updatePrice();
}


/* =========================================
   INTERIOR
========================================= */

function selectInterior(amount, button) {

    interiorPrice = amount;

    const parent =
        button.parentElement;

    parent
        .querySelectorAll(".option-button")
        .forEach(btn => {

            btn.classList.remove("active");

        });

    button.classList.add("active");

    updatePrice();
}


/* =========================================
   PRICE
========================================= */

function updatePrice() {

    const total =
        basePrice +
        wheelPrice +
        interiorPrice;

    price.textContent =
        "$" +
        total.toLocaleString();
}


/* =========================================
   REQUEST
========================================= */

function requestCar() {

    const total =
        basePrice +
        wheelPrice +
        interiorPrice;

    alert(
        "Thank you!\n\n" +
        "Model: " + selectedCar +
        "\nColor: " + colorName.textContent +
        "\nPrice: $" + total.toLocaleString() +
        "\n\nOur manager will contact you."
    );
}


/* =========================================
   CONTACT FORM
========================================= */

document
    .getElementById("contactForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            alert(
                "Thank you!\n" +
                "Your message has been sent."
            );

            this.reset();

        }
    );


/* =========================================
   HEADER SCROLL
========================================= */

window.addEventListener(
    "scroll",
    function() {

        const header =
            document.querySelector(".header");

        if (window.scrollY > 50) {

            header.style.background =
                "rgba(0,0,0,0.95)";

        } else {

            header.style.background =
                "rgba(0,0,0,0.75)";

        }

    }
);


/* =========================================
   START
========================================= */

updatePrice();

applyCarColor();

updateRotation();

