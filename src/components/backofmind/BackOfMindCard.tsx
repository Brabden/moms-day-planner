import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Card } from '@/ui/card'
import { Button } from '@/ui/button'
import type { BackOfMindNote } from '@/stores/backofmind-store'

interface BackOfMindCardProps {
  note: BackOfMindNote
  onDelete: (id: string) => void
}

export function BackOfMindCard({ note, onDelete }: BackOfMindCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative border-l-4 border-l-purple-500">
        <div className="p-4 pr-12">
          <p className="text-lg leading-relaxed">{note.text}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => onDelete(note.id)}
          aria-label="Delete note"
        >
          <X className="h-5 w-5" />
        </Button>
      </Card>
    </motion.div>
  )
}

