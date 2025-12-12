import type { Task } from '@/stores/task-store'

export type Priority = 'high' | 'medium' | 'low'

const priorityOrder: Record<Priority, number> = {
  high: 1,
  medium: 2,
  low: 3,
}

export function sortTasksByPriority(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })
}

export function getPriorityColor(priority: Priority): string {
  const colors: Record<Priority, string> = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981',
  }
  return colors[priority]
}

