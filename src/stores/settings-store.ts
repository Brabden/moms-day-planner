import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Settings {
  baseFontSize: number // 18-28px
  highContrast: boolean
  dyslexiaFriendly: boolean
  theme: 'light' | 'dark'
}

interface SettingsStore {
  settings: Settings
  updateSettings: (updates: Partial<Settings>) => void
}

const defaultSettings: Settings = {
  baseFontSize: 18,
  highContrast: false,
  dyslexiaFriendly: false,
  theme: 'dark', // Default to dark theme for MapleBot aesthetic
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (updates) => {
        set((state) => {
          const newSettings = { ...state.settings, ...updates }
          // Apply settings to document
          applySettings(newSettings)
          return {
            settings: newSettings,
          }
        })
      },
    }),
    {
      name: 'settings-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applySettings(state.settings)
        }
      },
    }
  )
)

function applySettings(settings: Settings) {
  const root = document.documentElement
  root.style.fontSize = `${settings.baseFontSize}px`
  
  if (settings.highContrast) {
    root.classList.add('high-contrast')
  } else {
    root.classList.remove('high-contrast')
  }
  
  if (settings.dyslexiaFriendly) {
    root.classList.add('dyslexia-friendly')
  } else {
    root.classList.remove('dyslexia-friendly')
  }
  
  if (settings.theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

