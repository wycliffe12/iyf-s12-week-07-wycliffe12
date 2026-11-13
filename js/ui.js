import { filterTodos, countActive } from "./todo-logic.js";

export const elements = {
    form: document.getElementById("todo-form"),
    input: document.getElementById("todo-input"),
    list: document.getElementById("todo-list"),
    itemsLeft: document.getElementById("items-left"),
    filters: document.querySelectorAll(".filter"),
    clearCompleted: document.getElementById("clear-completed"),
};

export function renderTodos(todos, currentFilter) {
    elements.list.replaceChildren();

    const visibleTodos = filterTodos(todos, currentFilter);

    visibleTodos.forEach((todo) => {
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.dataset.id = todo.id;

        if (todo.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.classList.add("todo-text");
        span.textContent = todo.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.dataset.action = "delete";

        li.append(span, deleteButton);
        elements.list.appendChild(li);
    });

    updateStats(todos);
    updateFilterButtons(currentFilter);
}

export function updateStats(todos) {
    const remaining = countActive(todos);

    elements.itemsLeft.textContent = `${remaining} item${remaining === 1 ? "" : "s"} left`;
}

export function updateFilterButtons(currentFilter) {
    elements.filters.forEach((button) => {
        button.classList.toggle("active", button.dataset.filter === currentFilter);
    });
}
