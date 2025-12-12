import { Link, useRouterState } from '@tanstack/react-router'
import { Home, ListTodo, Target, Brain, Settings, ClipboardList, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSettingsStore } from '@/stores/settings-store'
import { useEffect } from 'react'

interface LayoutProps {
  children?: React.ReactNode
}

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/tasks', label: 'Tasks', icon: ListTodo },
  { path: '/goals', label: 'Goals', icon: Target },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
  { path: '/backofmind', label: 'Notes', icon: Brain },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export function Layout({ children }: LayoutProps) {
  const router = useRouterState()
  const location = router.location
  const settings = useSettingsStore((state) => state.settings)

  useEffect(() => {
    // Apply settings on mount
    const root = document.documentElement
    root.style.fontSize = `${settings.baseFontSize}px`
    
    // Always apply dark theme for MapleBot aesthetic
    root.classList.add('dark')
    
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
  }, [settings])

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-background pointer-events-none" />
      
      <nav className="border-b border-border/50 glass-card sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold gradient-text">
                Mom's Day Planner
              </h1>
            </div>
            <div className="flex gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium transition-all min-h-touch',
                      isActive
                        ? 'bg-primary text-primary-foreground glow-button'
                        : 'hover:bg-accent/50 hover:text-accent-foreground text-muted-foreground'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8 relative z-10">
        {children}
      </main>
    </div>
  )
}

