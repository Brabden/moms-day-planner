import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { Label } from '@/ui/label'
import { PrioritySelector } from './PrioritySelector'
import { useTaskStore } from '@/stores/task-store'
import type { Priority } from '@/lib/sort'

interface TaskFormData {
  title: string
  description?: string
  priority: Priority
}

interface AddTaskFormProps {
  onSuccess?: () => void
  initialData?: Partial<TaskFormData>
}

export function AddTaskForm({ onSuccess, initialData }: AddTaskFormProps) {
  const addTask = useTaskStore((state) => state.addTask)
  const isEditing = !!initialData

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      priority: initialData?.priority || 'medium',
    },
  })

  const priority = watch('priority')

  const onSubmit = (data: TaskFormData) => {
    if (isEditing && initialData) {
      // This would need task ID passed in for editing
      // For now, we'll just add as new
    }
    addTask({
      title: data.title,
      description: data.description || undefined,
      priority: data.priority,
      createdAt: Date.now(),
    })
    reset()
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">
          Task Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          {...register('title', { required: 'Task title is required' })}
          placeholder="Enter task title"
          aria-invalid={errors.title ? 'true' : 'false'}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <p id="title-error" className="text-sm text-destructive">
            {errors.title.message}
          </p>
        )}
      </div>

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

      <Button type="submit" size="lg" className="w-full">
        <Plus className="h-5 w-5" />
        {isEditing ? 'Update Task' : 'Add Task'}
      </Button>
    </form>
  )
}

