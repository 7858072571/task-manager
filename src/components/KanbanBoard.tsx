'use client';

import { useState } from 'react';
import { TaskCard } from './TaskCard';
import { Column, Task } from '../types';
import { useTasks } from '../contexts/TaskContext';

interface KanbanBoardProps {
  columns: Column[];
}

export function KanbanBoard({ columns }: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const { moveTask, addTask, updateTask, deleteTask } = useTasks();

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedTask) return;

    const sourceColumnId = draggedTask.columnId;
    if (sourceColumnId === targetColumnId) return;

    moveTask(draggedTask.id, targetColumnId);
    setDraggedTask(null);
  };

  const handleAddTask = (columnId: string) => {
    const newTaskId = addTask(columnId);
    setEditingTaskId(newTaskId);
  };

  const handleSaveTask = (taskId: string, updates: Partial<Task>) => {
    updateTask(taskId, updates);
    setEditingTaskId(null);
  };

  const handleCancelEdit = () => {
    if (editingTaskId) {
      // Check if this is a new task (title is still "New Task")
      const task = columns.flatMap(col => col.tasks).find(t => t.id === editingTaskId);
      if (task && task.title === 'New Task') {
        deleteTask(editingTaskId);
      }
    }
    setEditingTaskId(null);
  };

  const handleBoardDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedTask) {
      setTaskToDelete(draggedTask);
      setShowDeleteConfirm(true);
      setDraggedTask(null);
    }
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="flex gap-6 p-6 overflow-x-auto min-h-screen bg-gray-50 dark:bg-gray-900" onDrop={handleBoardDrop} onDragOver={handleDragOver}>
      {columns.map(column => (
        <div
          key={column.id}
          className="flex-shrink-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center justify-between">
              {column.title}
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {column.tasks.length}
              </span>
            </h3>
          </div>

          <div className="p-4 space-y-3 min-h-[400px]">
            {column.tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onDragStart={() => handleDragStart(task)}
                isEditing={editingTaskId === task.id}
                onSave={handleSaveTask}
                onCancel={handleCancelEdit}
              />
            ))}

            {column.tasks.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-2">📋</div>
                <p>No tasks in {column.title.toLowerCase()}</p>
              </div>
            )}

            {column.id === 'todo' && (
              <button
                onClick={() => handleAddTask(column.id)}
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>+</span>
                Add Task
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && taskToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Delete Task
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete "{taskToDelete.title}"?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
