import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select'
import { Label } from '@/ui/label'
import { getPriorityColor } from '@/lib/sort'
import type { Priority } from '@/lib/sort'

interface PrioritySelectorProps {
  value: Priority
  onValueChange: (value: Priority) => void
  label?: string
}

export function PrioritySelector({
  value,
  onValueChange,
  label = 'Priority',
}: PrioritySelectorProps) {
  const priorities: Priority[] = ['high', 'medium', 'low']

  return (
    <div className="space-y-2">
      <Label htmlFor="priority-select">{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id="priority-select" className="w-full">
          <SelectValue>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-4 w-4 rounded-full"
                style={{ backgroundColor: getPriorityColor(value) }}
                aria-hidden="true"
              />
              <span className="capitalize">{value}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {priorities.map((priority) => (
            <SelectItem key={priority} value={priority}>
              <div className="flex items-center gap-3">
                <span
                  className="inline-block h-5 w-5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: getPriorityColor(priority) }}
                  aria-hidden="true"
                />
                <span className="capitalize text-base">{priority}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

