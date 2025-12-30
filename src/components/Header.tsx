'use client';

import React, { useState } from 'react';
import {
  Search,
  Menu,
  X,
  User as UserIcon,
  Briefcase,
  Bell,
  LogOut,
  Settings,
  FileText,
  Bookmark,
  Shield,
  Users,
  Zap,
  BookOpen,
  MessageCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

/* ================= TYPES ================= */

type UserRole = 'admin' | 'employer' | 'candidate';

interface User {
  id: string;
  name: string;
  email: string;
  type: UserRole;
  category?: string;
}

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

/* ================= COMPONENT ================= */

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const router = useRouter();

  /* 🔐 TEMP AUTH MOCK (replace later with store / NextAuth) */
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = user !== null;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  /* ================= NAV DATA ================= */

  const navItems = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'jobs', label: 'Jobs', icon: Search },
    { id: 'news', label: 'News', icon: Bell },
    { id: 'services', label: 'Services', icon: Zap },
    { id: 'freelance', label: 'Freelance', icon: Users },
    { id: 'learning', label: 'Learn', icon: BookOpen },
    { id: 'post-job', label: 'Post Job', icon: Briefcase },
    { id: 'connect', label: 'Connect', icon: MessageCircle },
  ];

  const baseUserMenuItems = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'saved-jobs', label: 'Saved Jobs', icon: Bookmark },
    { id: 'job-alerts', label: 'Job Alerts', icon: Bell },
    { id: 'my-services', label: 'My Services', icon: Zap },
    { id: 'freelance-projects', label: 'My Projects', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const userMenuItems = [...baseUserMenuItems];

  /* ✅ SAFE admin check (NO `never` error) */
  if (user?.type === 'admin') {
    userMenuItems.unshift({
      id: 'admin',
      label: 'Admin Dashboard',
      icon: Shield,
    });
  }

  /* ================= HANDLERS ================= */

  const handleNavigation = (page: string) => {
    router.push(page === 'home' ? '/' : `/${page}`);
  };

  const handleLogout = () => {
    setUser(null);
    setIsUserMenuOpen(false);
    onPageChange('home');
  };

  /* ================= UI ================= */

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg mr-3">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                KaamKhojo<span className="text-orange-500">.com</span>
              </h1>
              <p className="text-xs text-gray-500">360° Job Portal</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium ${
                  currentPage === item.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.icon && <item.icon className="inline h-3 w-3 mr-1" />}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="relative">
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-40 pl-8 pr-3 py-2 border rounded-lg text-xs"
              />
              <Search className="absolute left-2 top-2.5 h-3 w-3 text-gray-400" />
            </div>

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-xs"
                >
                  <span className="mr-2 font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  {user.name}
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow">
                    <div className="p-3 border-b">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full capitalize">
                        {user.type}
                      </span>
                    </div>

                    {userMenuItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleNavigation(item.id)}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        {item.label}
                      </button>
                    ))}

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNavigation('login')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
