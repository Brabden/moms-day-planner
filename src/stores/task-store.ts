import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Priority } from '@/lib/sort'

export interface Task {
  id: string
  title: string
  description?: string
  priority: Priority
  createdAt: number
}

interface TaskStore {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id'> & { createdAt?: number }) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  getTask: (id: string) => Task | undefined
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (task) => {
        const newTask: Task = {
          ...task,
          id: crypto.randomUUID(),
          createdAt: task.createdAt ?? Date.now(),
        }
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }))
      },
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        }))
      },
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },
      getTask: (id) => {
        return get().tasks.find((task) => task.id === id)
      },
    }),
    {
      name: 'task-storage',
    }
  )
)

