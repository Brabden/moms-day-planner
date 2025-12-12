import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface BackOfMindNote {
  id: string
  text: string
  createdAt: number
}

interface BackOfMindStore {
  notes: BackOfMindNote[]
  addNote: (note: Omit<BackOfMindNote, 'id' | 'createdAt'>) => void
  removeNote: (id: string) => void
  updateNote: (id: string, text: string) => void
}

export const useBackOfMindStore = create<BackOfMindStore>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note) => {
        const newNote: BackOfMindNote = {
          ...note,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
        }
        set((state) => ({
          notes: [...state.notes, newNote],
        }))
      },
      removeNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }))
      },
      updateNote: (id, text) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, text } : note
          ),
        }))
      },
    }),
    {
      name: 'backofmind-storage',
    }
  )
)

