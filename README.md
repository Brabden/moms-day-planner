# Mom's Day Planner

An accessible, color-coded, large-text reminder & daily task app designed for older adults. This application helps prioritize tasks from high → medium → low, add daily goals, and track "back-of-mind" notes.

## Features

- **Task Management**: Create tasks with priority levels (High, Medium, Low)
- **Daily Goals**: Set and track daily goals with checkboxes
- **Back-of-Mind Notes**: Jot down thoughts and reminders
- **Priority Sorting**: Tasks automatically sorted by priority (High → Medium → Low)
- **Accessibility Features**:
  - Large text (18-28px adjustable)
  - Minimum 44px touch targets
  - High contrast mode
  - Dyslexia-friendly font option
  - Full keyboard navigation
  - Screen reader support
- **Persistent Storage**: All data saved locally using Zustand with persist middleware
- **Modern UI**: Built with shadcn/ui components and Framer Motion animations

## Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS with accessibility defaults
- **shadcn/ui** - Accessible component library built on Radix primitives
- **TanStack Router** - Type-safe routing with excellent DX
- **Zustand** - Lightweight state management with persistence
- **react-hook-form** - Form handling and validation
- **date-fns** - Date utilities
- **Lucide React** - Icon library
- **Framer Motion** - Smooth animations and transitions

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd moms-day-planner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── tasks/          # Task-related components
│   ├── goals/          # Goal-related components
│   ├── backofmind/     # Back-of-mind note components
│   └── layout/         # Layout components
├── features/           # Feature-specific code (future expansion)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
│   ├── utils.ts        # General utilities (cn, etc.)
│   └── sort.ts         # Priority sorting logic
├── pages/              # Page components
│   ├── HomeScreen.tsx
│   ├── TaskListScreen.tsx
│   ├── AddTaskScreen.tsx
│   ├── GoalsScreen.tsx
│   ├── BackOfMindScreen.tsx
│   └── SettingsScreen.tsx
├── stores/             # Zustand stores
│   ├── task-store.ts
│   ├── goal-store.ts
│   ├── backofmind-store.ts
│   └── settings-store.ts
├── ui/                 # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── select.tsx
│   └── ...
├── App.tsx             # Main app component with routing
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Usage

### Adding Tasks

1. Navigate to "Tasks" or click "Add Task" from the home screen
2. Fill in the task title (required)
3. Optionally add a description
4. Select a priority level (High, Medium, Low)
5. Click "Add Task"

Tasks are automatically sorted by priority: High → Medium → Low

### Managing Goals

1. Go to the "Goals" page
2. Click "Add Goal" and enter your goal
3. Check off goals as you complete them
4. Delete goals you no longer need

### Back-of-Mind Notes

1. Navigate to "Notes" (Back of Mind)
2. Click "Add Note" and write down your thoughts
3. Notes are displayed in reverse chronological order (newest first)

### Settings

Access the Settings page to customize:

- **Font Size**: Adjust from 18px to 28px
- **High Contrast Mode**: Toggle for better visibility
- **Dyslexia-Friendly Font**: Enable Comic Sans-style font
- **Theme**: Switch between light and dark mode

## Priority Colors

- **High Priority**: #EF4444 (Red)
- **Medium Priority**: #F59E0B (Amber)
- **Low Priority**: #10B981 (Emerald)
- **Back-of-Mind Notes**: #3B82F6 (Blue)

## Accessibility

This app is designed with accessibility as a core principle:

- **WCAG AA Compliance**: All color contrasts meet WCAG AA standards
- **Large Touch Targets**: Minimum 44px for all interactive elements
- **Keyboard Navigation**: Full keyboard support throughout
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Customizable Text Size**: Adjustable from 18px to 28px
- **High Contrast Mode**: Enhanced visibility option
- **Dyslexia-Friendly Font**: Optional font for easier reading

## Data Persistence

All data (tasks, goals, notes, and settings) is automatically saved to browser localStorage using Zustand's persist middleware. Your data persists across browser sessions.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development

### Linting

```bash
npm run lint
```

### Type Checking

TypeScript will check types during build. For development, your IDE should provide real-time type checking.

## Future Enhancements

Potential features for future versions:

- Browser notifications for high-priority tasks
- Daily goal reminders
- Task due dates
- Task categories/tags
- Export/import functionality
- Cloud sync
- Mobile app version

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for accessibility and ease of use.

