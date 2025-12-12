import { useState } from 'react'
import { Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/ui/card'
import { Button } from '@/ui/button'
import { Textarea } from '@/ui/textarea'
import { Label } from '@/ui/label'
import { useBackOfMindStore } from '@/stores/backofmind-store'
import { BackOfMindCard } from '@/components/backofmind/BackOfMindCard'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'

export function BackOfMindScreen() {
  const notes = useBackOfMindStore((state) => state.notes)
  const addNote = useBackOfMindStore((state) => state.addNote)
  const removeNote = useBackOfMindStore((state) => state.removeNote)
  const [newNoteText, setNewNoteText] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const sortedNotes = [...notes].sort((a, b) => b.createdAt - a.createdAt)

  const handleAddNote = () => {
    if (newNoteText.trim()) {
      addNote({ text: newNoteText.trim() })
      setNewNoteText('')
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2 gradient-text">Back of Mind Notes</h2>
          <p className="text-lg text-muted-foreground">
            Jot down thoughts, reminders, and ideas
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl">Add New Note</DialogTitle>
              <DialogDescription className="text-base">
                Write down anything that's on your mind
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="note-text">Note</Label>
                <Textarea
                  id="note-text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={6}
                />
              </div>
              <Button onClick={handleAddNote} size="lg" className="w-full">
                Add Note
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <AnimatePresence>
        {sortedNotes.length > 0 ? (
          <motion.div
            key="notes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {sortedNotes.map((note) => (
              <BackOfMindCard
                key={note.id}
                note={note}
                onDelete={removeNote}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card>
              <CardContent className="py-16 text-center">
                <p className="text-xl text-muted-foreground mb-4">
                  No notes yet. Add your first note to get started!
                </p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg">
                      <Plus className="h-5 w-5 mr-2" />
                      Add Your First Note
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Add New Note</DialogTitle>
                      <DialogDescription className="text-base">
                        Write down anything that's on your mind
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="note-text-empty">Note</Label>
                        <Textarea
                          id="note-text-empty"
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          placeholder="What's on your mind?"
                          rows={6}
                        />
                      </div>
                      <Button onClick={handleAddNote} size="lg" className="w-full">
                        Add Note
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

