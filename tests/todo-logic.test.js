import { describe, it, expect } from "vitest";
import {
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    updateTodo,
    filterTodos,
    countActive,
} from "../js/todo-logic.js";

const sampleTodos = [
    { id: 1, text: "Study JavaScript", completed: false },
    { id: 2, text: "Practice coding", completed: true },
    { id: 3, text: "Read notes", completed: false },
];

describe("Todo Logic Tests", () => {
    it("adds a new task", () => {
        expect(addTodo(sampleTodos, "Learn testing", 4)).toHaveLength(4);
    });

    it("rejects an empty task", () => {
        expect(addTodo(sampleTodos, "   ")).toBe(sampleTodos);
    });

    it("toggles task completion", () => {
        expect(toggleTodo(sampleTodos, 1)[0].completed).toBe(true);
    });

    it("deletes a task", () => {
        expect(deleteTodo(sampleTodos, 1)).toHaveLength(2);
    });

    it("clears completed tasks", () => {
        expect(clearCompleted(sampleTodos)).toHaveLength(2);
    });

    it("updates a task", () => {
        expect(updateTodo(sampleTodos, 1, "New task")[0].text).toBe("New task");
    });

    it("filters active tasks", () => {
        expect(filterTodos(sampleTodos, "active")).toHaveLength(2);
    });

    it("counts active tasks", () => {
        expect(countActive(sampleTodos)).toBe(2);
    });

    it("does not modify the original array", () => {
        const original = JSON.stringify(sampleTodos);
        addTodo(sampleTodos, "New task", 4);
        toggleTodo(sampleTodos, 1);
        deleteTodo(sampleTodos, 2);
        clearCompleted(sampleTodos);
        expect(JSON.stringify(sampleTodos)).toBe(original);
    });
});
