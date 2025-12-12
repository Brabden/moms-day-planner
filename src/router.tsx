import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router'
import { HomeScreen } from './pages/HomeScreen'
import { TaskListScreen } from './pages/TaskListScreen'
import { AddTaskScreen } from './pages/AddTaskScreen'
import { GoalsScreen } from './pages/GoalsScreen'
import { BackOfMindScreen } from './pages/BackOfMindScreen'
import { SettingsScreen } from './pages/SettingsScreen'
import { CalendarScreen } from './pages/CalendarScreen'
import { Layout } from './components/layout/Layout'

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomeScreen,
})

const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasks',
  component: TaskListScreen,
})

const addTaskRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasks/add',
  component: AddTaskScreen,
})

const goalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/goals',
  component: GoalsScreen,
})

const backOfMindRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/backofmind',
  component: BackOfMindScreen,
})

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsScreen,
})

const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/calendar',
  component: CalendarScreen,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  tasksRoute,
  addTaskRoute,
  goalsRoute,
  backOfMindRoute,
  settingsRoute,
  calendarRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

