import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/ui/card'
import { Button } from '@/ui/button'
import { useTaskStore } from '@/stores/task-store'
import { sortTasksByPriority } from '@/lib/sort'
import { TaskCard } from '@/components/tasks/TaskCard'
import { PriorityFilter } from '@/components/tasks/PriorityFilter'
import type { Priority } from '@/lib/sort'

type FilterOption = Priority | 'all'

export function TaskListScreen() {
  const tasks = useTaskStore((state) => state.tasks)
  const deleteTask = useTaskStore((state) => state.deleteTask)
  const [filter, setFilter] = useState<FilterOption>('all')

  const sortedTasks = sortTasksByPriority(tasks)
  const filteredTasks =
    filter === 'all'
      ? sortedTasks
      : sortedTasks.filter((task) => task.priority === filter)

  const handleEdit = (task: typeof tasks[0]) => {
    // For now, we'll navigate to add page with edit mode
    // In a full implementation, you'd have an edit route
    console.log('Edit task:', task)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2 gradient-text">All Tasks</h2>
          <p className="text-lg text-muted-foreground">
            Manage your tasks by priority
          </p>
        </div>
        <Link to="/tasks/add">
          <Button size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Add Task
          </Button>
        </Link>
      </div>

      <PriorityFilter value={filter} onChange={setFilter} />

      <AnimatePresence mode="wait">
        {filteredTasks.length > 0 ? (
          <motion.div
            key="tasks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={deleteTask}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card>
              <CardContent className="py-16 text-center">
                <p className="text-xl text-muted-foreground mb-4">
                  {filter === 'all'
                    ? "No tasks yet. Add your first task to get started!"
                    : `No ${filter} priority tasks.`}
                </p>
                {filter === 'all' && (
                  <Link to="/tasks/add">
                    <Button size="lg">
                      <Plus className="h-5 w-5 mr-2" />
                      Add Your First Task
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

