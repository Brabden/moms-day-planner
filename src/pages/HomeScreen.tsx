import { Link } from '@tanstack/react-router'
import { Plus, ArrowRight, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Button } from '@/ui/button'
import { useTaskStore } from '@/stores/task-store'
import { useGoalStore } from '@/stores/goal-store'
import { useBackOfMindStore } from '@/stores/backofmind-store'
import { sortTasksByPriority } from '@/lib/sort'
import { TaskCard } from '@/components/tasks/TaskCard'
import { GoalItem } from '@/components/goals/GoalItem'
import { BackOfMindCard } from '@/components/backofmind/BackOfMindCard'

export function HomeScreen() {
  const tasks = useTaskStore((state) => state.tasks)
  const deleteTask = useTaskStore((state) => state.deleteTask)
  const goals = useGoalStore((state) => state.goals)
  const toggleGoal = useGoalStore((state) => state.toggleGoal)
  const deleteGoal = useGoalStore((state) => state.deleteGoal)
  const notes = useBackOfMindStore((state) => state.notes)
  const removeNote = useBackOfMindStore((state) => state.removeNote)

  const sortedTasks = sortTasksByPriority(tasks)
  const topPriorityTasks = sortedTasks.slice(0, 3)
  const incompleteGoals = goals.filter((g) => !g.completed)
  const recentNotes = notes.slice(-3).reverse()

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-2 gradient-text">Today's Overview</h2>
        <p className="text-lg text-muted-foreground">
          Here's what you have planned for today
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Link to="/tasks/add">
          <Button size="lg" className="w-full h-20 text-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Plus className="h-6 w-6" />
            Add Task
          </Button>
        </Link>
        <Link to="/goals">
          <Button size="lg" variant="outline" className="w-full h-20 text-xl border-2">
            <Plus className="h-6 w-6" />
            Add Goal
          </Button>
        </Link>
        <Link to="/calendar">
          <Button size="lg" variant="outline" className="w-full h-20 text-xl border-2">
            <Calendar className="h-6 w-6" />
            Calendar View
          </Button>
        </Link>
        <Link to="/backofmind">
          <Button size="lg" variant="outline" className="w-full h-20 text-xl border-2">
            <Plus className="h-6 w-6" />
            Add Note
          </Button>
        </Link>
      </motion.div>

      {/* Today's Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today's Goals</CardTitle>
                <CardDescription>
                  {incompleteGoals.length} goal{incompleteGoals.length !== 1 ? 's' : ''} remaining
                </CardDescription>
              </div>
              <Link to="/goals">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {incompleteGoals.length > 0 ? (
              <div className="space-y-3">
                {incompleteGoals.slice(0, 3).map((goal) => (
                  <GoalItem
                    key={goal.id}
                    goal={goal}
                    onToggle={toggleGoal}
                    onDelete={deleteGoal}
                  />
                ))}
              </div>
            ) : (
              <p className="text-base text-muted-foreground text-center py-8">
                No goals for today. Add one to get started!
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Priority Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Priority Tasks</CardTitle>
                <CardDescription>
                  Your most important tasks
                </CardDescription>
              </div>
              <Link to="/tasks">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {topPriorityTasks.length > 0 ? (
              <div className="space-y-4">
                {topPriorityTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => {}}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            ) : (
              <p className="text-base text-muted-foreground text-center py-8">
                No tasks yet. Add your first task to get started!
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Back of Mind Notes Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Back of Mind Notes</CardTitle>
                <CardDescription>
                  Recent thoughts and reminders
                </CardDescription>
              </div>
              <Link to="/backofmind">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentNotes.length > 0 ? (
              <div className="space-y-3">
                {recentNotes.map((note) => (
                  <BackOfMindCard
                    key={note.id}
                    note={note}
                    onDelete={removeNote}
                  />
                ))}
              </div>
            ) : (
              <p className="text-base text-muted-foreground text-center py-8">
                No notes yet. Jot down your thoughts!
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

