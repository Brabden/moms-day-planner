import { Button } from '@/ui/button'
import type { Priority } from '@/lib/sort'

type FilterOption = Priority | 'all'

interface PriorityFilterProps {
  value: FilterOption
  onChange: (value: FilterOption) => void
}

export function PriorityFilter({ value, onChange }: PriorityFilterProps) {
  const options: { value: FilterOption; label: string }[] = [
    { value: 'all', label: 'All Tasks' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option.value}
          variant={value === option.value ? 'default' : 'outline'}
          onClick={() => onChange(option.value)}
          className="min-h-touch"
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}

