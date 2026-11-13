
// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// State

let todos = [
    {
        id: 1,
        text: "Complete JavaScript homework",
        completed: false
    },
    {
        id: 2,
        text: "Practice DOM manipulation",
        completed: false
    },
    {
        id: 3,
        text: "Read JavaScript notes",
        completed: false
    },
    {
        id: 4,
        text: "Practice Git and GitHub commands",
        completed: false
    },
    {
        id: 5,
        text: "Submit Week 5 assignment",
        completed: false
    }
];
let currentFilter = "all";

// Create a task element
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    if (todo.completed) {
        li.classList.add("completed");
    }

    li.dataset.id = todo.id;

    const span = document.createElement("span");
    span.classList.add("todo-text");
    span.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.dataset.action = "delete";

    li.appendChild(span);
    li.appendChild(deleteButton);

    return li;
}

// Display tasks
function renderTodos() {
    todoList.replaceChildren();

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === "active") {
            return !todo.completed;
        }

        if (currentFilter === "completed") {
            return todo.completed;
        }

        return true;
    });

    filteredTodos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });

    updateStats();
}

// Add task
function addTodo(text) {
    const trimmedText = text.trim();

    if (trimmedText === "") {
        return;
    }

    todos.push({
        id: Date.now() + Math.random(),
        text: trimmedText,
        completed: false
    });

    renderTodos();
}

// Toggle completion
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }

        return todo;
    });

    renderTodos();
}

// Delete task
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Update remaining tasks
function updateStats() {
    const remaining = todos.filter(todo => !todo.completed).length;

    itemsLeft.textContent =
        `${remaining} item${remaining === 1 ? "" : "s"} left`;
}

// Add task using form
form.addEventListener("submit", function(event) {
    event.preventDefault();

    addTodo(input.value);
    input.value = "";
    input.focus();
});

// Event delegation: ONE click listener on the list
todoList.addEventListener("click", function(event) {
    const li = event.target.closest(".todo-item");

    if (!li) return;

    const id = Number(li.dataset.id);

    if (event.target.closest(".delete-btn")) {
        deleteTodo(id);
        return;
    }

    if (event.target.classList.contains("todo-text")) {
        toggleTodo(id);
    }
});

// Filter tasks
filters.forEach(button => {
    button.addEventListener("click", function() {
        currentFilter = button.dataset.filter;

        filters.forEach(filter => {
            filter.classList.remove("active");
        });

        button.classList.add("active");

        renderTodos();
    });
});

// Clear completed tasks
clearCompletedBtn.addEventListener("click", function() {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
});

// Bonus: Edit tasks by double-clicking
todoList.addEventListener("dblclick", function(event) {
    if (!event.target.classList.contains("todo-text")) return;

    const li = event.target.closest(".todo-item");
    const id = Number(li.dataset.id);
    const todo = todos.find(item => item.id === id);

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = todo.text;
    editInput.classList.add("edit-input");

    event.target.replaceWith(editInput);
    editInput.focus();
    editInput.select();

    function finishEditing(save) {
        if (save && editInput.value.trim() !== "") {
            todo.text = editInput.value.trim();
        }

        renderTodos();
    }

    editInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") finishEditing(true);
        if (e.key === "Escape") finishEditing(false);
    });

    editInput.addEventListener("blur", function() {
        if (editInput.isConnected) finishEditing(true);
    });
});

// Initial display
renderTodos();
