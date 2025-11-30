import { User } from '../types';

export class DataService {
  private static readonly USERS_KEY = 'task-manager-users';
  private static readonly AVATARS_KEY = 'task-manager-avatars';

  // Initialize default users from JSON file
  static initializeDefaultUsers(): void {
    const existingUsers = this.getUsers();
    if (existingUsers.length === 0) {
      // Load default users from the JSON file (simulated)
      const defaultUsers: User[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          role: 'Project Manager',
          avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2RjEiLz4KPHBhdGggZD0iTTIwIDIwQzIyLjc2MTQgMjAgMjUgMTcuNzYxNCAyNSAxNUMyNSAxMi4yMzg2IDIyLjc2MTQgMTAgMjAgMTBDMTcuMjM4NiAxMCAxNSAxMi4yMzg2IDE1IDE1QzE1IDE3Ljc2MTQgMTcuNzYxNCAyMCAyMFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
          createdAt: '2024-01-01T00:00:00.000Z'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          password: 'password123',
          role: 'Developer',
          avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2RjEiLz4KPHBhdGggZD0iTTIwIDIwQzIyLjc2MTQgMjAgMjUgMTcuNzYxNCAyNSAxNUMyNSAxMi4yMzg2IDIyLjc2MTQgMTAgMjAgMTBDMTcuMjM4NiAxMCAxNSAxMi4yMzg2IDE1IDE1QzE1IDE3Ljc2MTQgMTcuNzYxNCAyMCAyMFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
          createdAt: '2024-01-02T00:00:00.000Z'
        }
      ];
      localStorage.setItem(this.USERS_KEY, JSON.stringify(defaultUsers));
    }
  }

  // Get all users from localStorage
  static getUsers(): User[] {
    try {
      const usersJson = localStorage.getItem(this.USERS_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];

      // Handle both compressed and uncompressed formats
      return users.map((user: any) => {
        // Check if user is in compressed format (has 'i' instead of 'id')
        if (user.i) {
          return {
            id: user.i,
            name: user.n,
            email: user.e,
            password: user.p,
            role: user.r,
            createdAt: user.c,
            avatar: this.getAvatar(user.i) || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2RjEiLz4KPHBhdGggZD0iTTIwIDIwQzIyLjc2MTQgMjAgMjUgMTcuNzYxNCAyNSAxNUMyNSAxMi4yMzg2IDIyLjc2MTQgMTAgMjAgMTBDMTcuMjM4NiAxMCAxNSAxMi4yMzg2IDE1IDE1QzE1IDE3Ljc2MTQgMTcuNzYxNCAyMCAyMFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo='
          };
        } else {
          // Original format
          return {
            ...user,
            avatar: this.getAvatar(user.id) || user.avatar
          };
        }
      });
    } catch (error) {
      console.error('Error reading users from localStorage:', error);
      return [];
    }
  }

  // Save users to localStorage
  static saveUsers(users: User[]): void {
    try {
      // Separate avatars from user data to avoid quota limits
      const usersWithoutAvatars = users.map(user => {
        const { avatar, ...userWithoutAvatar } = user;
        // Save avatar separately if it's a base64 image
        if (avatar && avatar.startsWith('data:image/')) {
          this.saveAvatar(user.id, avatar);
        }
        return userWithoutAvatar;
      });

      // Compress the data by removing unnecessary fields and using shorter keys
      const compressedUsers = usersWithoutAvatars.map(user => ({
        i: user.id,
        n: user.name,
        e: user.email,
        p: user.password,
        r: user.role,
        c: user.createdAt
      }));

      localStorage.setItem(this.USERS_KEY, JSON.stringify(compressedUsers));
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
      // If still failing, try to clear old data and save minimal data
      try {
        localStorage.removeItem(this.USERS_KEY);
        localStorage.removeItem(this.AVATARS_KEY);
        // Save only essential user data
        const minimalUsers = users.slice(-5).map(user => ({
          i: user.id,
          n: user.name,
          e: user.email,
          p: user.password,
          r: user.role,
          c: user.createdAt
        }));
        localStorage.setItem(this.USERS_KEY, JSON.stringify(minimalUsers));
        console.log('Saved minimal user data due to storage limits');
      } catch (fallbackError) {
        console.error('Failed to save even minimal data:', fallbackError);
      }
    }
  }

  // Save avatar separately
  static saveAvatar(userId: string, avatarData: string): void {
    try {
      const avatars = this.getAllAvatars();
      avatars[userId] = avatarData;
      localStorage.setItem(this.AVATARS_KEY, JSON.stringify(avatars));
    } catch (error) {
      console.error('Error saving avatar to localStorage:', error);
    }
  }

  // Get avatar for a user
  static getAvatar(userId: string): string | null {
    try {
      const avatars = this.getAllAvatars();
      return avatars[userId] || null;
    } catch (error) {
      console.error('Error reading avatar from localStorage:', error);
      return null;
    }
  }

  // Get all avatars
  static getAllAvatars(): Record<string, string> {
    try {
      const avatarsJson = localStorage.getItem(this.AVATARS_KEY);
      return avatarsJson ? JSON.parse(avatarsJson) : {};
    } catch (error) {
      console.error('Error reading avatars from localStorage:', error);
      return {};
    }
  }

  // Validate login credentials
  static validateLogin(email: string, password: string): User | null {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    return user || null;
  }

  // Register a new user
  static registerUser(name: string, email: string, password: string, avatar?: string): User | null {
    const users = this.getUsers();

    // Check if email already exists
    if (users.some(u => u.email === email)) {
      return null;
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'User',
      avatar: avatar || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2RjEiLz4KPHBhdGggZD0iTTIwIDIwQzIyLjc2MTQgMjAgMjUgMTcuNzYxNCAyNSAxNUMyNSAxMi4yMzg2IDIyLjc2MTQgMTAgMjAgMTBDMTcuMjM4NiAxMCAxNSAxMi4yMzg2IDE1IDE1QzE1IDE3Ljc2MTQgMTcuNzYxNCAyMCAyMFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
      createdAt: new Date().toISOString()
    };

    // Add to users array and save
    users.push(newUser);
    this.saveUsers(users);

    return newUser;
  }

  // Get user by ID
  static getUserById(id: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  // Get current user from localStorage
  static getCurrentUser(): User | null {
    try {
      const userId = localStorage.getItem('currentUserId');
      if (userId) {
        return this.getUserById(userId);
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Update user
  static updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return null;
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    this.saveUsers(users);
    return users[userIndex];
  }

  // Delete user
  static deleteUser(id: string): boolean {
    const users = this.getUsers();
    const filteredUsers = users.filter(u => u.id !== id);

    if (filteredUsers.length === users.length) {
      return false; // User not found
    }

    this.saveUsers(filteredUsers);
    return true;
  }
}
