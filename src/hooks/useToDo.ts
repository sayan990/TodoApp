import { useState } from "react"
import { useLocalStorage } from "./useLocalStorage"
import type { Todo, FilterType } from "../types/Todo"

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", [])
  const [filter, setFilter] = useState<FilterType>("all")

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  const updateTodo = (id: string, text: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: text.trim(), updatedAt: new Date() } : todo)),
    )
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date() } : todo)),
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "pending":
        return !todo.completed
      case "completed":
        return todo.completed
      default:
        return true
    }
  })

  const stats = {
    total: todos.length,
    pending: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  }

  return {
    todos: filteredTodos,
    filter,
    stats,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
  }
}
