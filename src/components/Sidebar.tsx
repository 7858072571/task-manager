'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTheme } from '../contexts/ThemeContext';
import { UserProfile } from './UserProfile';
import { SidebarMode, User } from '../types';
import { DataService } from '../services/dataService';

interface SidebarProps {
  mode: SidebarMode;
  onModeChange: (mode: SidebarMode) => void;
}

export function Sidebar({ mode, onModeChange }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(mode === 'compact');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (session?.user) {
      // Use session user for SSO login
      setCurrentUser({
        id: session.user.id || session.user.email || 'google-user',
        name: session.user.name || 'Google User',
        email: session.user.email || '',
        password: '', // Not used for SSO
        role: 'user',
        avatar: session.user.image ?? undefined,
        createdAt: new Date().toISOString(),
      });
    } else {
      // Load current user using DataService for email/password login
      const user = DataService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    }
  }, [pathname, session]);

  const navigation = [
    { name: 'Home', href: '/user', icon: '🏠' },
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Kanban', href: '/kanban', icon: '📋' },
  ];

  const toggleSidebar = () => {
    if (mode === 'full') {
      onModeChange('compact');
      setIsCollapsed(true);
    } else if (mode === 'compact') {
      onModeChange('full');
      setIsCollapsed(false);
    }
  };

  const hideSidebar = () => {
    onModeChange('hidden');
  };

  const showSidebar = () => {
    onModeChange('full');
    setIsCollapsed(false);
  };

  if (mode === 'hidden') {
    return (
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={showSidebar}
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          title="Show sidebar"
        >
          ☰
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Task Manager
            </h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        <button
          onClick={hideSidebar}
          className="w-full p-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          title="Hide sidebar"
        >
          {isCollapsed ? '×' : 'Hide Sidebar'}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              <span className="text-lg mr-3">{item.icon}</span>
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center p-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors mb-4"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
          {!isCollapsed && <span className="ml-2">{theme === 'light' ? 'Dark' : 'Light'}</span>}
        </button>

        <UserProfile collapsed={isCollapsed} user={currentUser} />
      </div>
    </div>
  );
}
