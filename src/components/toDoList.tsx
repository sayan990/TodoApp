import { TodoItem } from "./toDoItem"
import type { Todo } from "../types/Todo"

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onUpdate: (id: string, text: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onToggle, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">📝</div>
        <p className="text-gray-500">No hay tareas aquí</p>
        <p className="text-gray-400 text-sm">¡Agrega una nueva tarea para comenzar!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          className="animate-in slide-in-from-top-2 fade-in duration-300"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <TodoItem todo={todo} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
      ))}
    </div>
  )
}
