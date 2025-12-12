import { motion } from 'framer-motion'
import { CalendarView } from '@/components/calendar/CalendarView'

export function CalendarScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2 gradient-text">Calendar View</h2>
        <p className="text-lg text-muted-foreground">
          View your tasks and goals on a calendar
        </p>
      </div>

      <CalendarView />
    </motion.div>
  )
}

