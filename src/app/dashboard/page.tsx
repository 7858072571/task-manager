'use client';

import { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Dashboard as DashboardComponent } from '../../components/Dashboard';
import { useTasks } from '../../contexts/TaskContext';
import { SidebarMode } from '../../types';

export default function DashboardPage() {
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>('full');
  const { metrics, activities } = useTasks();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar mode={sidebarMode} onModeChange={setSidebarMode} />

      <div className="flex-1 overflow-auto">
        <DashboardComponent metrics={metrics} activities={activities} />
      </div>
    </div>
  );
}
