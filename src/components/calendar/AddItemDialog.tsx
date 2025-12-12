import { useState } from 'react'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { Label } from '@/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog'
import { PrioritySelector } from '@/components/tasks/PrioritySelector'
import { useTaskStore } from '@/stores/task-store'
import { useGoalStore } from '@/stores/goal-store'
import type { Priority } from '@/lib/sort'

interface AddItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedDate: Date
}

type ItemType = 'task' | 'goal'

export function AddItemDialog({ open, onOpenChange, selectedDate }: AddItemDialogProps) {
  const [itemType, setItemType] = useState<ItemType>('task')
  const addTask = useTaskStore((state) => state.addTask)
  const addGoal = useGoalStore((state) => state.addGoal)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<{
    title: string
    description?: string
    priority: Priority
  }>({
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
    },
  })

  const priority = watch('priority')

  const onSubmit = (data: { title: string; description?: string; priority: Priority }) => {
    // Create a date object for the selected date at the start of the day
    const dateForItem = new Date(selectedDate)
    dateForItem.setHours(0, 0, 0, 0)

    if (itemType === 'task') {
      addTask({
        title: data.title,
        description: data.description || undefined,
        priority: data.priority,
        createdAt: dateForItem.getTime(),
      })
    } else {
      addGoal({
        title: data.title,
        createdAt: dateForItem.getTime(),
      })
    }

    reset()
    onOpenChange(false)
  }

  const handleClose = () => {
    reset()
    setItemType('task')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add {itemType === 'task' ? 'Task' : 'Goal'}</DialogTitle>
          <DialogDescription className="text-base">
            For {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Item Type Selector */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant={itemType === 'task' ? 'default' : 'outline'}
              onClick={() => setItemType('task')}
              className="flex-1"
            >
              Task
            </Button>
            <Button
              type="button"
              variant={itemType === 'goal' ? 'default' : 'outline'}
              onClick={() => setItemType('goal')}
              className="flex-1"
            >
              Goal
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                {itemType === 'task' ? 'Task' : 'Goal'} Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                {...register('title', { required: 'Title is required' })}
                placeholder={`Enter ${itemType === 'task' ? 'task' : 'goal'} title`}
                aria-invalid={errors.title ? 'true' : 'false'}
                aria-describedby={errors.title ? 'title-error' : undefined}
              />
              {errors.title && (
                <p id="title-error" className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            {itemType === 'task' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Add any additional details..."
                    rows={4}
                  />
                </div>

                <PrioritySelector
                  value={priority}
                  onValueChange={(value) => setValue('priority', value)}
                />
              </>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                <Plus className="h-5 w-5 mr-2" />
                Add {itemType === 'task' ? 'Task' : 'Goal'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

