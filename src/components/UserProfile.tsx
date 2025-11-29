import { UserProfileProps, User } from '../types';
import { mockUser } from '../mockData';
import Image from 'next/image';

export function UserProfile({ collapsed, user }: UserProfileProps & { user?: User | null }) {
  const displayUser = user || mockUser;
  const menuItems = [
    { name: 'Profile', action: () => console.log('Profile clicked') },
    { name: 'Settings', action: () => console.log('Settings clicked') },
    { name: 'Help', action: () => console.log('Help clicked') },
    { name: 'Logout', action: () => {
      localStorage.removeItem('currentUserId');
      window.location.href = '/login';
    }},
  ];

  const renderAvatar = (size: string, className: string) => {
    if (displayUser.avatar && displayUser.avatar.startsWith('data:') && !displayUser.avatar.includes('svg+xml')) {
      return (
        <img
          src={displayUser.avatar}
          alt={displayUser.name}
          className={`${size} ${className}`}
        />
      );
    } else {
      return (
        <div className={`${size} ${className} bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl`}>
          👤
        </div>
      );
    }
  };

  if (collapsed) {
    return (
      <div className="flex flex-col items-center">
        {renderAvatar('w-8 h-8', 'rounded-full mb-2')}
        <div className="w-full">
          <button
            onClick={() => {
              localStorage.removeItem('currentUserId');
              window.location.href = '/login';
            }}
            className="w-full text-left p-1 text-xs hover:bg-gray-700 rounded mb-1"
            title="Logout"
          >
            🔓
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-4">
        {renderAvatar('w-10 h-10', 'rounded-full mr-3')}
        <div className="flex-1">
          <p className="text-sm font-medium text-white">{displayUser.name}</p>
          <p className="text-xs text-gray-400">{displayUser.email}</p>
          <p className="text-xs text-gray-500">{displayUser.role}</p>
        </div>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem('currentUserId');
          window.location.href = '/login';
        }}
        className="w-full p-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        title="Logout"
      >
        Logout
      </button>
    </div>
  );
}
