'use client';

import Link from 'next/link';
import { Sidebar } from '../../components/Sidebar';
import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { SidebarMode, User } from '../../types';
import { DataService } from '../../services/dataService';

export default function UserHome() {
  const [activeMenu, setActiveMenu] = useState('profile');
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>('full');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme || 'light';

  useEffect(() => {
    const user = DataService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'help', label: 'Help', icon: '❓' },
    { id: 'logout', label: 'Logout', icon: '🚪' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar mode={sidebarMode} onModeChange={setSidebarMode} />

      <div className="flex-1 overflow-auto p-6">
        <h1 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          User Home
        </h1>

        <div className="flex space-x-4 mb-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                activeMenu === item.id
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-600'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div>
                {activeMenu === 'profile' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      Profile
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        {currentUser?.avatar && currentUser.avatar.startsWith('data:') && !currentUser.avatar.includes('svg+xml') ? (
                          <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
                            👤
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{currentUser?.name || 'User'}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{currentUser?.email || 'user@example.com'}</p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            defaultValue={currentUser?.name?.split(' ')[0] || 'John'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            defaultValue={currentUser?.name?.split(' ')[1] || 'Doe'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        Update Profile
                      </button>
                    </div>
                  </div>
                )}

                {activeMenu === 'settings' && (
                  <div>
                    <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Settings
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className={`text-lg font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Notifications
                        </h3>
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="mr-3" />
                            <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email notifications</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="mr-3" />
                            <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Task reminders</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Weekly reports</span>
                          </label>
                        </div>
                      </div>

                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        Save Settings
                      </button>
                    </div>
                  </div>
                )}

                {activeMenu === 'help' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      Help & Support
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                          Getting Started
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          Learn how to use the Task Manager effectively.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                          <li>Create your first task</li>
                          <li>Organize tasks in Kanban boards</li>
                          <li>Track progress with the dashboard</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                          FAQ
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">How do I create a new task?</p>
                            <p className="text-gray-600 dark:text-gray-300">Click the "Add Task" button in the Kanban board.</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">How do I move tasks between columns?</p>
                            <p className="text-gray-600 dark:text-gray-300">Drag and drop tasks to different columns.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                          Contact Support
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Need more help? Contact our support team at support@taskmanager.com
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeMenu === 'logout' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      Logout
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Are you sure you want to logout? You will be redirected to the login page.
                    </p>
                    <div className="flex space-x-4">
                      <Link
                        href="/login"
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Logout
                      </Link>
                      <button
                        onClick={() => setActiveMenu('profile')}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
        </div>
      </div>
    </div>
  );
}

