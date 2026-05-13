"use strict";

const showOptimizationButton = document.getElementById("showOptimization");
const optimizationStatus = document.getElementById("optimizationStatus");

function showOptimizationSummary() {
    optimizationStatus.textContent = "Виконано: SEO-метатеги, preload CSS, defer JS, lazy-loading зображень, width/height для зображень, адаптивна сітка та легкі SVG-ресурси.";
    optimizationStatus.classList.add("success");
}

showOptimizationButton.addEventListener("click", showOptimizationSummary);
