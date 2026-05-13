"use strict";

const runCheckButton = document.getElementById("runCheck");
const checkStatus = document.getElementById("checkStatus");

function runLocalCheck() {
    const hasTitle = document.title.length > 0;
    const hasOneH1 = document.querySelectorAll("h1").length === 1;
    const imagesHaveAlt = Array.from(document.querySelectorAll("img")).every((image) => {
        return image.hasAttribute("alt") && image.getAttribute("alt").trim().length > 0;
    });
    const hasViewport = Boolean(document.querySelector('meta[name="viewport"]'));

    if (hasTitle && hasOneH1 && imagesHaveAlt && hasViewport) {
        checkStatus.textContent = "Локальна перевірка успішна: title, viewport, один h1 та alt для зображень наявні.";
        checkStatus.classList.add("success");
    } else {
        checkStatus.textContent = "Потрібна додаткова перевірка структури HTML.";
        checkStatus.classList.remove("success");
    }
}

runCheckButton.addEventListener("click", runLocalCheck);
