import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { Checkbox } from '@/ui/checkbox'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import type { DailyGoal } from '@/stores/goal-store'

interface GoalItemProps {
  goal: DailyGoal
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function GoalItem({ goal, onToggle, onDelete }: GoalItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Checkbox
            id={`goal-${goal.id}`}
            checked={goal.completed}
            onCheckedChange={() => onToggle(goal.id)}
            className="h-6 w-6"
            aria-label={`Mark "${goal.title}" as ${goal.completed ? 'incomplete' : 'complete'}`}
          />
          <label
            htmlFor={`goal-${goal.id}`}
            className={`flex-1 text-xl font-medium cursor-pointer ${
              goal.completed
                ? 'line-through text-muted-foreground'
                : 'text-foreground'
            }`}
          >
            {goal.title}
          </label>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(goal.id)}
            aria-label={`Delete goal: ${goal.title}`}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

