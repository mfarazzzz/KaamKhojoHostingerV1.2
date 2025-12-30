import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'jobseeker' | 'employer' | 'admin';
  category?: 'white-collar' | 'blue-collar';
  profile?: any;
  preferences?: {
    language: 'en' | 'hi' | 'ta' | 'te' | 'bn';
    location: string;
    jobAlerts: boolean;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  setLanguage: (language: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },
      setLanguage: (language) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              preferences: {
                ...currentUser.preferences,
                language: language as any
              }
            }
          });
        }
      }
    }),
    {
      name: 'kaamkhojo-auth'
    }
  )
);