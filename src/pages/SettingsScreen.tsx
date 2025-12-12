import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Label } from '@/ui/label'
import { Checkbox } from '@/ui/checkbox'
import { useSettingsStore } from '@/stores/settings-store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select'

export function SettingsScreen() {
  const settings = useSettingsStore((state) => state.settings)
  const updateSettings = useSettingsStore((state) => state.updateSettings)

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-2 gradient-text">Settings</h2>
        <p className="text-lg text-muted-foreground">
          Customize your experience
        </p>
      </motion.div>

      {/* Font Size */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Font Size</CardTitle>
            <CardDescription className="text-base">
              Adjust the base font size for better readability (18px - 28px)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="font-size">Base Font Size: {settings.baseFontSize}px</Label>
              <input
                id="font-size"
                type="range"
                min="18"
                max="28"
                step="1"
                value={settings.baseFontSize}
                onChange={(e) =>
                  updateSettings({ baseFontSize: parseInt(e.target.value) })
                }
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>18px</span>
                <span>28px</span>
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-muted">
              <p style={{ fontSize: `${settings.baseFontSize}px` }}>
                Preview: This is how your text will look at {settings.baseFontSize}px
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* High Contrast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">High Contrast Mode</CardTitle>
            <CardDescription className="text-base">
              Increase contrast for better visibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="high-contrast"
                checked={settings.highContrast}
                onCheckedChange={(checked) =>
                  updateSettings({ highContrast: checked === true })
                }
                className="h-6 w-6"
              />
              <Label
                htmlFor="high-contrast"
                className="text-xl font-medium cursor-pointer"
              >
                Enable High Contrast Mode
              </Label>
            </div>
            {settings.highContrast && (
              <div className="mt-4 p-4 border-2 border-foreground bg-background rounded-lg">
                <p className="text-base font-semibold">
                  High contrast preview: This text has maximum contrast
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Dyslexia-Friendly Font */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Dyslexia-Friendly Font</CardTitle>
            <CardDescription className="text-base">
              Use a font designed to be easier to read for people with dyslexia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="dyslexia-friendly"
                checked={settings.dyslexiaFriendly}
                onCheckedChange={(checked) =>
                  updateSettings({ dyslexiaFriendly: checked === true })
                }
                className="h-6 w-6"
              />
              <Label
                htmlFor="dyslexia-friendly"
                className="text-xl font-medium cursor-pointer"
              >
                Enable Dyslexia-Friendly Font
              </Label>
            </div>
            {settings.dyslexiaFriendly && (
              <div className="mt-4 p-4 border rounded-lg bg-muted">
                <p className="text-base" style={{ fontFamily: 'Comic Sans MS, Comic Sans, Chalkboard SE, Comic Neue, sans-serif' }}>
                  Preview: This is how text looks with the dyslexia-friendly font
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Theme */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Theme</CardTitle>
            <CardDescription className="text-base">
              Choose between light and dark theme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="theme">Color Theme</Label>
              <Select
                value={settings.theme}
                onValueChange={(value: 'light' | 'dark') =>
                  updateSettings({ theme: value })
                }
              >
                <SelectTrigger id="theme" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Priority Colors Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Priority Colors</CardTitle>
            <CardDescription className="text-base">
              Reference for task priority colors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg shadow-lg" style={{ backgroundColor: '#EF4444', color: 'white' }}>
                <p className="text-xl font-semibold">High Priority</p>
                <p className="text-base opacity-90">#EF4444</p>
              </div>
              <div className="p-4 rounded-lg shadow-lg" style={{ backgroundColor: '#F59E0B', color: 'white' }}>
                <p className="text-xl font-semibold">Medium Priority</p>
                <p className="text-base opacity-90">#F59E0B</p>
              </div>
              <div className="p-4 rounded-lg shadow-lg" style={{ backgroundColor: '#10B981', color: 'white' }}>
                <p className="text-xl font-semibold">Low Priority</p>
                <p className="text-base opacity-90">#10B981</p>
              </div>
              <div className="p-4 rounded-lg shadow-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                <p className="text-xl font-semibold">Back of Mind</p>
                <p className="text-base opacity-90">Purple/Blue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

