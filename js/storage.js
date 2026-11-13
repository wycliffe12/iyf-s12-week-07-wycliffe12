const TODOS_KEY = "week7-todos";
const FILTER_KEY = "week7-filter";

export function loadTodos(fallback = []) {
    try {
        const saved = localStorage.getItem(TODOS_KEY);

        if (saved === null) {
            return [...fallback];
        }

        const parsed = JSON.parse(saved);

        if (
            !Array.isArray(parsed) ||
            !parsed.every(
                (todo) =>
                    todo !== null &&
                    typeof todo === "object" &&
                    typeof todo.id === "number" &&
                    typeof todo.text === "string" &&
                    typeof todo.completed === "boolean"
            )
        ) {
            return [...fallback];
        }

        return parsed;
    } catch {
        return [...fallback];
    }
}

export function saveTodos(todos) {
    try {
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    } catch {
        return false;
    }

    return true;
}

export function loadFilter(fallback = "all") {
    try {
        const filter = localStorage.getItem(FILTER_KEY);

        if (["all", "active", "completed"].includes(filter)) {
            return filter;
        }

        return fallback;
    } catch {
        return fallback;
    }
}

export function saveFilter(filter) {
    try {
        localStorage.setItem(FILTER_KEY, filter);
    } catch {
        return false;
    }

    return true;
}
