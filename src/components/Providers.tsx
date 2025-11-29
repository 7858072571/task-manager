'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { TaskProvider } from '../contexts/TaskContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <TaskProvider>
          {children}
        </TaskProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
