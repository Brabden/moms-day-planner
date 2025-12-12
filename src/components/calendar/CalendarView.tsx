import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, startOfWeek, endOfWeek } from 'date-fns'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import { useTaskStore } from '@/stores/task-store'
import { useGoalStore } from '@/stores/goal-store'
import { getPriorityColor } from '@/lib/sort'
import { AddItemDialog } from './AddItemDialog'
import type { Task } from '@/stores/task-store'
import type { DailyGoal } from '@/stores/goal-store'

type ViewMode = 'tasks' | 'goals' | 'both'

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>('both')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const tasks = useTaskStore((state) => state.tasks)
  const goals = useGoalStore((state) => state.goals)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const getItemsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const items: { tasks: Task[]; goals: DailyGoal[] } = { tasks: [], goals: [] }

    if (viewMode === 'tasks' || viewMode === 'both') {
      items.tasks = tasks.filter((task) => {
        const taskDate = format(new Date(task.createdAt), 'yyyy-MM-dd')
        return taskDate === dateStr
      })
    }

    if (viewMode === 'goals' || viewMode === 'both') {
      items.goals = goals.filter((goal) => {
        const goalDate = format(new Date(goal.createdAt), 'yyyy-MM-dd')
        return goalDate === dateStr
      })
    }

    return items
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="default" 
              size="lg" 
              onClick={previousMonth} 
              aria-label="Previous month"
              className="bg-primary hover:bg-primary/90 min-w-[60px]"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h2 className="text-2xl font-bold gradient-text min-w-[200px] text-center">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <Button 
              variant="default" 
              size="lg" 
              onClick={nextMonth} 
              aria-label="Next month"
              className="bg-primary hover:bg-primary/90 min-w-[60px]"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <Button variant="outline" onClick={goToToday} className="ml-2">
              Today
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Add for Today Button */}
          <Button
            size="default"
            onClick={() => {
              setSelectedDate(new Date())
              setIsDialogOpen(true)
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 whitespace-nowrap"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add for Today
          </Button>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'tasks' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('tasks')}
            >
              Tasks
            </Button>
            <Button
              variant={viewMode === 'goals' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('goals')}
            >
              Goals
            </Button>
            <Button
              variant={viewMode === 'both' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('both')}
            >
              Both
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className="p-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-semibold text-lg py-2 text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => {
            const isCurrentMonth = isSameMonth(day, currentDate)
            const isCurrentDay = isToday(day)
            const items = getItemsForDate(day)

            return (
              <motion.button
                key={day.toISOString()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.01 }}
                onClick={() => handleDateClick(day)}
                className={`
                  min-h-[100px] p-2 rounded-lg border border-border/50
                  ${isCurrentMonth ? 'bg-card' : 'bg-muted/30'}
                  ${isCurrentDay ? 'ring-2 ring-primary' : ''}
                  hover:bg-accent/50 transition-colors text-left w-full
                  cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  flex flex-col
                `}
                aria-label={`Add task or goal for ${format(day, 'MMMM d, yyyy')}`}
              >
                <div
                  className={`
                    text-base font-medium mb-1 text-center
                    ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}
                    ${isCurrentDay ? 'text-primary font-bold' : ''}
                  `}
                >
                  {format(day, 'd')}
                </div>

                <div className="space-y-1">
                  {/* Tasks */}
                  {items.tasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className="text-xs px-1.5 py-0.5 rounded truncate text-white text-[10px]"
                      style={{ backgroundColor: getPriorityColor(task.priority) }}
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  ))}
                  {items.tasks.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{items.tasks.length - 3} more
                    </div>
                  )}

                  {/* Goals */}
                  {items.goals.slice(0, 2).map((goal) => (
                    <div
                      key={goal.id}
                      className={`
                        text-xs px-1.5 py-0.5 rounded truncate
                        ${goal.completed ? 'bg-green-600/50 line-through' : 'bg-blue-600/50'}
                        text-white text-[10px]
                      `}
                      title={goal.title}
                    >
                      ✓ {goal.title}
                    </div>
                  ))}
                  {items.goals.length > 2 && (
                    <div className="text-xs text-muted-foreground">
                      +{items.goals.length - 2} more
                    </div>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>
      </Card>

      {/* Add Item Dialog */}
      {selectedDate && (
        <AddItemDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          selectedDate={selectedDate}
        />
      )}

      {/* Legend */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#EF4444' }} />
            <span className="text-sm">High Priority Task</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F59E0B' }} />
            <span className="text-sm">Medium Priority Task</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10B981' }} />
            <span className="text-sm">Low Priority Task</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-600/50" />
            <span className="text-sm">Goal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-600/50" />
            <span className="text-sm">Completed Goal</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

