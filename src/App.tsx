import { AddTodo } from "./components/addTodo"
import { FilterTabs } from "./components/FilterTabs"
import { TodoList } from "./components/toDoList"
import { useTodos } from "./hooks/useToDo"
import { Trash2 } from "lucide-react"
import { Footer } from "./components/footer"

export default function TodoApp() {
  const { todos, filter, stats, addTodo, updateTodo, toggleTodo, deleteTodo, clearCompleted, setFilter } = useTodos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Lista de Tareas</h1>
            <p className="text-gray-600">Organiza tu día de manera eficiente</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <AddTodo onAdd={addTodo} />
            <FilterTabs currentFilter={filter} onFilterChange={setFilter} stats={stats} />
            <TodoList todos={todos} onToggle={toggleTodo} onUpdate={updateTodo} onDelete={deleteTodo} />
          </div>

          {stats.completed > 0 && (
            <div className="text-center">
              <button
                onClick={clearCompleted}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm"
              >
                <Trash2 size={16} />
                Limpiar completadas ({stats.completed})
              </button>
            </div>
          )}

          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Los datos se guardan automáticamente en tu navegador</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
