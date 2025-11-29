import { useState } from 'react';
import { Task } from '../types';
import Image from 'next/image';

interface TaskCardProps {
  task: Task;
  onDragStart?: () => void;
  isEditing?: boolean;
  onSave?: (taskId: string, updates: Partial<Task>) => void;
  onCancel?: () => void;
}

export function TaskCard({ task, onDragStart, isEditing = false, onSave, onCancel }: TaskCardProps) {
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editPriority, setEditPriority] = useState(task.priority);
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const handleSave = () => {
    if (onSave) {
      onSave(task.id, { title: editTitle, description: editDescription, priority: editPriority });
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditPriority(task.priority);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      draggable={!isEditing}
      onDragStart={onDragStart}
    >
      {isEditing ? (
        <>
          <div className="mb-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-semibold"
              placeholder="Task title"
              autoFocus
            />
          </div>
          <div className="mb-3">
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              placeholder="Task description"
              rows={2}
            />
          </div>
          <div className="mb-3">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Task['priority'])}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{task.title}</h3>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}
            >
              {task.priority}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-3">{task.description}</p>

          {task.assignee && (
            <div className="flex items-center">
              <Image
                src={task.assignee.avatar || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiM2MzY2RjEiLz4KPHBhdGggZD0iTTEyIDEyQzEzLjc2MTQgMTIgMTUgMTAuNzYxNCAxNSA5QzE1IDYuMjM4NiAxMy43NjE0IDUgMTIgNUMxMC4yMzg2IDUgOSA2LjIzODYgOSA5QzkgMTAuNzYxNCAxMC4yMzg2IDEyIDEyIDEyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+'}
                alt={task.assignee.name}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-sm text-gray-500">{task.assignee.name}</span>
            </div>
          )}

          <div className="text-xs text-gray-400 mt-2">
            Updated: {task.updatedAt.toLocaleDateString()}
          </div>
        </>
      )}
    </div>
  );
}
