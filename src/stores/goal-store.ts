import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface DailyGoal {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

interface GoalStore {
  goals: DailyGoal[]
  addGoal: (goal: Omit<DailyGoal, 'id' | 'completed'> & { createdAt?: number }) => void
  toggleGoal: (id: string) => void
  deleteGoal: (id: string) => void
  clearCompleted: () => void
}

export const useGoalStore = create<GoalStore>()(
  persist(
    (set) => ({
      goals: [],
      addGoal: (goal) => {
        const newGoal: DailyGoal = {
          ...goal,
          id: crypto.randomUUID(),
          completed: false,
          createdAt: goal.createdAt ?? Date.now(),
        }
        set((state) => ({
          goals: [...state.goals, newGoal],
        }))
      },
      toggleGoal: (id) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
          ),
        }))
      },
      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        }))
      },
      clearCompleted: () => {
        set((state) => ({
          goals: state.goals.filter((goal) => !goal.completed),
        }))
      },
    }),
    {
      name: 'goal-storage',
    }
  )
)

