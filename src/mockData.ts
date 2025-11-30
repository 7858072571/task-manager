import { User, Task, Column, DashboardMetrics } from './types';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password123',
  role: 'Project Manager',
  avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2RjEiLz4KPHBhdGggZD0iTTIwIDIwQzIyLjc2MTQgMjAgMjUgMTcuNzYxNCAyNSAxNUMyNSAxMi4yMzg2IDIyLjc2MTQgMTAgMjAgMTBDMTcuMjM4NiAxMCAxNSAxMi4yMzg2IDE1IDE1QzE1IDE3Ljc2MTQgMTcuNzYxNCAyMCAyMFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
  createdAt: '2024-01-01T00:00:00.000Z'
};

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create wireframes and mockups for the new landing page',
    status: 'todo',
    priority: 'high',
    assignee: mockUser,
    columnId: 'todo',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Add login and registration functionality',
    status: 'in-progress',
    priority: 'high',
    assignee: mockUser,
    columnId: 'in-progress',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-03'),
  },
  {
    id: '3',
    title: 'Write unit tests',
    description: 'Add comprehensive unit tests for core components',
    status: 'done',
    priority: 'medium',
    assignee: mockUser,
    columnId: 'done',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-04'),
  },
  {
    id: '4',
    title: 'Optimize database queries',
    description: 'Improve performance of slow database queries',
    status: 'todo',
    priority: 'low',
    columnId: 'todo',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
];

export const mockColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: mockTasks.filter(task => task.status === 'todo'),
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: mockTasks.filter(task => task.status === 'in-progress'),
  },
  {
    id: 'done',
    title: 'Done',
    tasks: mockTasks.filter(task => task.status === 'done'),
  },
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalTasks: mockTasks.length,
  completedTasks: mockTasks.filter(task => task.status === 'done').length,
  inProgressTasks: mockTasks.filter(task => task.status === 'in-progress').length,
  todoTasks: mockTasks.filter(task => task.status === 'todo').length,
};
