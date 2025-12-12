import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/ui/card'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { useGoalStore } from '@/stores/goal-store'
import { GoalItem } from '@/components/goals/GoalItem'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'

export function GoalsScreen() {
  const goals = useGoalStore((state) => state.goals)
  const addGoal = useGoalStore((state) => state.addGoal)
  const toggleGoal = useGoalStore((state) => state.toggleGoal)
  const deleteGoal = useGoalStore((state) => state.deleteGoal)
  const clearCompleted = useGoalStore((state) => state.clearCompleted)
  const [newGoalTitle, setNewGoalTitle] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const incompleteGoals = goals.filter((g) => !g.completed)
  const completedGoals = goals.filter((g) => g.completed)

  const handleAddGoal = () => {
    if (newGoalTitle.trim()) {
      addGoal({ title: newGoalTitle.trim(), createdAt: Date.now() })
      setNewGoalTitle('')
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2 gradient-text">Daily Goals</h2>
          <p className="text-lg text-muted-foreground">
            Set and track your daily goals
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl">Add New Goal</DialogTitle>
              <DialogDescription className="text-base">
                What would you like to accomplish today?
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="goal-title">Goal Title</Label>
                <Input
                  id="goal-title"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  placeholder="Enter your goal"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddGoal()
                    }
                  }}
                />
              </div>
              <Button onClick={handleAddGoal} size="lg" className="w-full">
                Add Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Incomplete Goals */}
      {incompleteGoals.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Active Goals</h3>
          <div className="space-y-3">
            <AnimatePresence>
              {incompleteGoals.map((goal) => (
                <GoalItem
                  key={goal.id}
                  goal={goal}
                  onToggle={toggleGoal}
                  onDelete={deleteGoal}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold">Completed Goals</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCompleted}
              className="text-muted-foreground"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Completed
            </Button>
          </div>
          <div className="space-y-3">
            <AnimatePresence>
              {completedGoals.map((goal) => (
                <GoalItem
                  key={goal.id}
                  goal={goal}
                  onToggle={toggleGoal}
                  onDelete={deleteGoal}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Empty State */}
      {goals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-xl text-muted-foreground mb-4">
                No goals yet. Add your first goal to get started!
              </p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Your First Goal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Add New Goal</DialogTitle>
                    <DialogDescription className="text-base">
                      What would you like to accomplish today?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="goal-title-empty">Goal Title</Label>
                      <Input
                        id="goal-title-empty"
                        value={newGoalTitle}
                        onChange={(e) => setNewGoalTitle(e.target.value)}
                        placeholder="Enter your goal"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddGoal()
                          }
                        }}
                      />
                    </div>
                    <Button onClick={handleAddGoal} size="lg" className="w-full">
                      Add Goal
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

