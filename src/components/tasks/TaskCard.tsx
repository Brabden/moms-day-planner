import { useState } from 'react'
import { Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/ui/card'
import { Button } from '@/ui/button'
import { getPriorityColor } from '@/lib/sort'
import type { Task } from '@/stores/task-store'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [showDescription, setShowDescription] = useState(false)
  const priorityColor = getPriorityColor(task.priority)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative overflow-hidden border-l-4" style={{ borderLeftColor: priorityColor }}>
        <div
          className="absolute left-0 top-0 h-full w-1 opacity-50"
          style={{ backgroundColor: priorityColor }}
          aria-hidden="true"
        />
        <div className="pl-6 pr-4 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
              <AnimatePresence>
                {showDescription && task.description && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-base text-muted-foreground mb-3"
                  >
                    {task.description}
                  </motion.p>
                )}
              </AnimatePresence>
              {task.description && (
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-3 min-h-touch"
                  aria-expanded={showDescription}
                  aria-label={showDescription ? 'Hide description' : 'Show description'}
                >
                  {showDescription ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Hide details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Show details
                    </>
                  )}
                </button>
              )}
              <div className="flex items-center gap-2">
                <span
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: priorityColor }}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(task)}
                aria-label={`Edit task: ${task.title}`}
              >
                <Edit className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(task.id)}
                aria-label={`Delete task: ${task.title}`}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

