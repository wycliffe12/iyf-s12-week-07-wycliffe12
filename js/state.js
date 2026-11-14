import { loadTodos, loadFilter, saveTodos, saveFilter } from "./storage.js";

const defaultTodos = [
    {
        id: 1,
        text: "Complete JavaScript homework",
        completed: false,
    },
    {
        id: 2,
        text: "Practice DOM manipulation",
        completed: false,
    },
    {
        id: 3,
        text: "Read JavaScript notes",
        completed: false,
    },
    {
        id: 4,
        text: "Practice Git and GitHub commands",
        completed: false,
    },
    {
        id: 5,
        text: "Submit Week 5 assignment",
        completed: false,
    },
];

export let todos = loadTodos(defaultTodos);
export let currentFilter = loadFilter();

export function setTodos(newTodos) {
    todos = newTodos;
    saveTodos(todos);
}

export function setCurrentFilter(filter) {
    currentFilter = filter;
    saveFilter(filter);
}
