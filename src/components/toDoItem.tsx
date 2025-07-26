import type React from "react"

import { useState } from "react"
import { Check, Edit2, Trash2, X, Save } from "lucide-react"
import type { Todo } from "../types/Todo"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onUpdate: (id: string, text: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim() && editText !== todo.text) {
      onUpdate(todo.id, editText)
    }
    setIsEditing(false)
    setEditText(todo.text)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditText(todo.text)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <div
      className={`group bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all duration-300 hover:shadow-md ${
        todo.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-green-400"
          }`}
        >
          {todo.completed && <Check size={12} />}
        </button>

        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              maxLength={200}
            />
            <button
              onClick={handleSave}
              className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors duration-200"
            >
              <Save size={16} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <span
              className={`flex-1 transition-all duration-200 ${
                todo.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {todo.text}
            </span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
