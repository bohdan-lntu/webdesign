"use strict";

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#navMenu");
const modal = document.querySelector("#customModal");
const modalMessage = document.querySelector("#modalMessage");
const closeModal = document.querySelector("#closeModal");
const actionButtons = document.querySelectorAll("[data-modal-message]");
const contactForm = document.querySelector("#contactForm");
const contactName = document.querySelector("#contactName");
const contactEmail = document.querySelector("#contactEmail");
const contactMessage = document.querySelector("#contactMessage");
const formStatus = document.querySelector("#formStatus");

function openModal(message) {
  modalMessage.textContent = message;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function hideModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

function setFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.classList.remove("success", "error");
  formStatus.classList.add(type);
}

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  const isOpen = navMenu.classList.contains("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button.dataset.modalMessage);
  });
});

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideModal();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = contactName.value.trim();
  const email = contactEmail.value.trim();
  const message = contactMessage.value.trim();

  if (name.length < 2) {
    setFormStatus("Введіть ім'я довжиною не менше 2 символів.", "error");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    setFormStatus("Введіть коректний email.", "error");
    return;
  }

  if (message.length < 5) {
    setFormStatus("Повідомлення має містити не менше 5 символів.", "error");
    return;
  }

  setFormStatus("Повідомлення успішно підготовлено до відправлення.", "success");
  openModal("Дякуємо! Форма перевірена чистим JavaScript.");
  contactForm.reset();
});
