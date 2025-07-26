import type { FilterType } from "../types/Todo"

interface FilterTabsProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  stats: {
    total: number
    pending: number
    completed: number
  }
}

export function FilterTabs({ currentFilter, onFilterChange, stats }: FilterTabsProps) {
  const filters = [
    { key: "all" as FilterType, label: "Todas", count: stats.total },
    { key: "pending" as FilterType, label: "Pendientes", count: stats.pending },
    { key: "completed" as FilterType, label: "Completadas", count: stats.completed },
  ]

  return (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentFilter === key ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  )
}
