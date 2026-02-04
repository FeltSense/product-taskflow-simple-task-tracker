# TaskFlow - Simple Task Tracker

To provide the simplest yet effective task tracking experience that helps users stay organized and productive without getting lost in feature complexity.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taskflow---simple-task-tracker
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables (see below)

4. Run the development server:
```bash
npm run dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── forgot-password/
│   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── settings/
│   │   └── [features]/
│   ├── api/               # API routes
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Reusable UI components
│   └── layout/            # Layout components
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
├── providers/             # Context providers
└── supabase/
    └── migrations/        # Database migrations
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Features

- **Task Management**: Users can create, edit, and delete tasks with essential information including title, description, due date, and priority level. This is the core functionality that allows users to capture and manage their to-do items. Tasks can be marked as complete or incomplete, providing a sense of progress and accomplishment. The interface should be clean and focused on quick task entry and updates.
- **Task Status Tracking**: Users can mark tasks as complete or incomplete with visual indicators showing the current status. Completed tasks should be visually distinguished from active tasks while remaining accessible for reference. The system should track completion timestamps for basic progress insights. This feature provides the satisfying experience of checking off completed work.
- **Task Prioritization**: Users can assign priority levels (High, Medium, Low) to tasks with visual indicators like colors or icons. High-priority tasks should be prominently displayed to help users focus on what matters most. The system should allow easy priority changes as circumstances evolve. This feature helps users make better decisions about task ordering and focus.
- **Due Date Management**: Users can set due dates for tasks with calendar picker interface and visual indicators for upcoming or overdue items. The system should highlight overdue tasks prominently and show approaching deadlines. Due dates should be optional but when set, they provide crucial context for task prioritization. Clear visual cues help users manage time-sensitive work effectively.
- **Task Organization**: Users can create custom categories or lists to organize tasks by project, context, or any personal system. Tasks can be moved between categories easily through drag-and-drop or menu selection. Each category should be clearly labeled and collapsible for better screen real estate management. This feature enables users to group related tasks and reduce mental load.
- **User Authentication**: Simple user registration and login system that allows users to securely access their personal task data across sessions and devices. The system should include password reset functionality and basic security measures. User data should be private and accessible only to the account owner. This feature enables persistent task storage and future collaboration features.

## License

MIT

---

Generated with [Product Builder](https://github.com/product-builder)
