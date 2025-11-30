export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: User;
  columnId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface DashboardMetrics {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
}

export type SidebarMode = 'full' | 'compact' | 'hidden';

export interface SidebarProps {
  mode: SidebarMode;
  onModeChange: (mode: SidebarMode) => void;
}

export interface UserProfileProps {
  collapsed: boolean;
}

export interface Activity {
  id: string;
  taskId: string;
  taskTitle: string;
  action: string;
  timestamp: Date;
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
