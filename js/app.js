import { todos, currentFilter, setTodos, setCurrentFilter } from "./state.js";

import { addTodo, toggleTodo, deleteTodo, clearCompleted, updateTodo } from "./todo-logic.js";

import { elements, renderTodos } from "./ui.js";

function refresh() {
    renderTodos(todos, currentFilter);
}

// Add task
elements.form.addEventListener("submit", (event) => {
    event.preventDefault();

    setTodos(addTodo(todos, elements.input.value));

    elements.input.value = "";
    elements.input.focus();

    refresh();
});

// Handle clicks on tasks
elements.list.addEventListener("click", (event) => {
    const li = event.target.closest(".todo-item");

    if (!li) {
        return;
    }

    const id = Number(li.dataset.id);

    if (event.target.closest(".delete-btn")) {
        setTodos(deleteTodo(todos, id));
        refresh();
        return;
    }

    if (event.target.classList.contains("todo-text")) {
        setTodos(toggleTodo(todos, id));
        refresh();
    }
});

// Filter tasks
elements.filters.forEach((button) => {
    button.addEventListener("click", () => {
        setCurrentFilter(button.dataset.filter);
        refresh();
    });
});

// Clear completed tasks
elements.clearCompleted.addEventListener("click", () => {
    setTodos(clearCompleted(todos));
    refresh();
});

// Edit tasks by double-clicking
elements.list.addEventListener("dblclick", (event) => {
    if (!event.target.classList.contains("todo-text")) {
        return;
    }

    const li = event.target.closest(".todo-item");
    const id = Number(li.dataset.id);
    const todo = todos.find((item) => item.id === id);

    if (!todo) {
        return;
    }

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = todo.text;
    editInput.classList.add("edit-input");

    event.target.replaceWith(editInput);
    editInput.focus();
    editInput.select();

    let finished = false;

    function finishEditing(save) {
        if (finished) {
            return;
        }
        finished = true;

        if (save && editInput.value.trim()) {
            setTodos(updateTodo(todos, id, editInput.value));
        }

        refresh();
    }

    editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            finishEditing(true);
        }
        if (e.key === "Escape") {
            finishEditing(false);
        }
    });

    editInput.addEventListener("blur", () => {
        finishEditing(true);
    });
});

// Initial display
refresh();
