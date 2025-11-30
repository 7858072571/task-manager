'use client';

import { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { KanbanBoard } from '../../components/KanbanBoard';
import { useTasks } from '../../contexts/TaskContext';
import { SidebarMode } from '../../types';

export default function KanbanPage() {
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>('full');
  const { columns } = useTasks();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar mode={sidebarMode} onModeChange={setSidebarMode} />

      <div className="flex-1 overflow-auto">
        <KanbanBoard columns={columns} />
      </div>
    </div>
  );
}
