"use strict";

const userName = document.getElementById("userName");
const greetBtn = document.getElementById("greetBtn");
const greetOutput = document.getElementById("greetOutput");

const registerForm = document.getElementById("registerForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const formMessage = document.getElementById("formMessage");

const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const filterButtons = document.querySelectorAll("[data-filter]");
const detailsButtons = document.querySelectorAll(".detailsBtn");

let tasks = [
  {
    id: 1,
    text: "Вивчити DOM",
    done: true
  },
  {
    id: 2,
    text: "Реалізувати todo-список",
    done: false
  }
];

let currentFilter = "all";

function setMessage(element, text, type) {
  element.textContent = text;
  element.classList.remove("error", "success");

  if (type) {
    element.classList.add(type);
  }
}

function greetUser() {
  const name = userName.value.trim();

  if (name.length < 2) {
    setMessage(greetOutput, "Введіть ім'я довжиною не менше 2 символів", "error");
    return;
  }

  setMessage(greetOutput, `Привіт, ${name}!`, "success");
}

function validateRegisterForm(event) {
  event.preventDefault();

  if (!email.validity.valid) {
    setMessage(formMessage, "Введіть коректний email", "error");
    return;
  }

  if (password.value.length < 6) {
    setMessage(formMessage, "Пароль має містити не менше 6 символів", "error");
    return;
  }

  setMessage(formMessage, "Реєстрація успішна!", "success");
  registerForm.reset();
}

function showModal() {
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function hideModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

function getFilteredTasks() {
  if (currentFilter === "active") {
    return tasks.filter((task) => !task.done);
  }

  if (currentFilter === "done") {
    return tasks.filter((task) => task.done);
  }

  return tasks;
}

function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = getFilteredTasks();

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";

    const span = document.createElement("span");
    span.textContent = task.text;

    const doneBtn = document.createElement("button");
    doneBtn.type = "button";
    doneBtn.textContent = task.done ? "Скасувати" : "Виконано";
    doneBtn.addEventListener("click", () => toggleTask(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Видалити";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  const activeCount = tasks.filter((task) => !task.done).length;
  taskCounter.textContent = `Усього завдань: ${tasks.length}. Активних: ${activeCount}.`;
}

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Введіть текст завдання");
    return;
  }

  tasks.push({
    id: Date.now(),
    text,
    done: false
  });

  taskInput.value = "";
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        done: !task.done
      };
    }

    return task;
  });

  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function setActiveFilter(button) {
  filterButtons.forEach((filterButton) => {
    filterButton.classList.remove("active-filter");
  });

  button.classList.add("active-filter");
}

greetBtn.addEventListener("click", greetUser);

userName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    greetUser();
  }
});

registerForm.addEventListener("submit", validateRegisterForm);

openModal.addEventListener("click", showModal);
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

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    setActiveFilter(button);
    renderTasks();
  });
});

detailsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const details = card.querySelector(".details");

    details.classList.toggle("hidden");
    button.textContent = details.classList.contains("hidden") ? "Детальніше" : "Згорнути";
  });
});

renderTasks();
