'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Task, Column, DashboardMetrics, Activity } from '../types';
import { mockTasks, mockColumns } from '../mockData';

interface TaskContextType {
  tasks: Task[];
  columns: Column[];
  metrics: DashboardMetrics;
  activities: Activity[];
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  moveTask: (taskId: string, newColumnId: string) => void;
  addTask: (columnId: string) => void;
  deleteTask: (taskId: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [columns, setColumns] = useState<Column[]>(mockColumns);
  const [activities, setActivities] = useState<Activity[]>([]);

  const metrics: DashboardMetrics = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.status === 'done').length,
    inProgressTasks: tasks.filter(task => task.status === 'in-progress').length,
    todoTasks: tasks.filter(task => task.status === 'todo').length,
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updates, updatedAt: new Date() } : task
      )
    );
  };

  const addActivity = (taskId: string, taskTitle: string, action: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      taskId,
      taskTitle,
      action,
      timestamp: new Date(),
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 10)); // Keep only last 10 activities
  };

  const moveTask = (taskId: string, newColumnId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newStatus = newColumnId as Task['status'];
    updateTask(taskId, { columnId: newColumnId, status: newStatus });

    const statusText = newStatus === 'in-progress' ? 'In Progress' : newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
    addActivity(taskId, task.title, `moved to ${statusText}`);

    setColumns(prevColumns =>
      prevColumns.map(column => {
        if (column.id === task.columnId) {
          return {
            ...column,
            tasks: column.tasks.filter(t => t.id !== taskId)
          };
        }
        if (column.id === newColumnId) {
          const updatedTask = { ...task, columnId: newColumnId, status: newStatus };
          return {
            ...column,
            tasks: [...column.tasks, updatedTask]
          };
        }
        return column;
      })
    );
  };

  const addTask = (columnId: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: 'New Task',
      description: '',
      status: columnId as Task['status'],
      priority: 'medium',
      columnId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    addActivity(newTask.id, newTask.title, 'created');
    return newTask.id;
  };

  const deleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    addActivity(taskId, task.title, 'deleted');
  };

  useEffect(() => {
    setColumns(prevColumns =>
      prevColumns.map(column => ({
        ...column,
        tasks: tasks
          .filter(task => task.columnId === column.id)
          .sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          })
      }))
    );
  }, [tasks]);

  // Load tasks and activities from localStorage when user session changes
  useEffect(() => {
    if (session?.user?.email) {
      const userKey = `tasks_${session.user.email}`;
      const savedTasks = localStorage.getItem(userKey);
      if (savedTasks) {
        try {
          const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
          }));
          setTasks(parsedTasks);
        } catch (error) {
          console.error('Error loading tasks from localStorage:', error);
        }
      }

      const activitiesKey = `activities_${session.user.email}`;
      const savedActivities = localStorage.getItem(activitiesKey);
      if (savedActivities) {
        try {
          const parsedActivities = JSON.parse(savedActivities).map((activity: any) => ({
            ...activity,
            timestamp: new Date(activity.timestamp),
          }));
          setActivities(parsedActivities);
        } catch (error) {
          console.error('Error loading activities from localStorage:', error);
        }
      }
    } else {
      // Reset to mock data when no session
      setTasks(mockTasks);
      setActivities([]);
    }
  }, [session?.user?.email]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (session?.user?.email && tasks.length > 0) {
      const userKey = `tasks_${session.user.email}`;
      localStorage.setItem(userKey, JSON.stringify(tasks));
    }
  }, [tasks, session?.user?.email]);

  // Save activities to localStorage whenever activities change
  useEffect(() => {
    if (session?.user?.email && activities.length > 0) {
      const activitiesKey = `activities_${session.user.email}`;
      localStorage.setItem(activitiesKey, JSON.stringify(activities));
    }
  }, [activities, session?.user?.email]);

  return (
    <TaskContext.Provider value={{ tasks, columns, metrics, activities, updateTask, moveTask, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
