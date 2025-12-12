import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { AddTaskForm } from '@/components/tasks/AddTaskForm'

export function AddTaskScreen() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Add New Task</CardTitle>
          <CardDescription className="text-lg">
            Create a new task with priority level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddTaskForm
            onSuccess={() => {
              navigate({ to: '/tasks' })
            }}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}

