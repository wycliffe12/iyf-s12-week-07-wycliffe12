// Pure functions for managing todo tasks

export function addTodo(todos, text, id = Date.now()) {
    const trimmedText = text.trim();

    if (!trimmedText) {
        return todos;
    }

    return [
        ...todos,
        {
            id,
            text: trimmedText,
            completed: false,
        },
    ];
}

export function toggleTodo(todos, id) {
    return todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
}

export function deleteTodo(todos, id) {
    return todos.filter((todo) => todo.id !== id);
}

export function clearCompleted(todos) {
    return todos.filter((todo) => !todo.completed);
}

export function updateTodo(todos, id, newText) {
    const trimmedText = newText.trim();

    if (!trimmedText) {
        return todos;
    }

    return todos.map((todo) => (todo.id === id ? { ...todo, text: trimmedText } : todo));
}

export function filterTodos(todos, filter) {
    if (filter === "active") {
        return todos.filter((todo) => !todo.completed);
    }

    if (filter === "completed") {
        return todos.filter((todo) => todo.completed);
    }

    return todos;
}

export function countActive(todos) {
    return todos.filter((todo) => !todo.completed).length;
}
