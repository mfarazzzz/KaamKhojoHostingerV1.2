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

  // 🔐 TEMP MOCK (replace later with auth store)
  const user: User | null = null;
  const isAuthenticated = Boolean(user);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const userMenuItems = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'saved-jobs', label: 'Saved Jobs', icon: Bookmark },
    { id: 'job-alerts', label: 'Job Alerts', icon: Bell },
    { id: 'my-services', label: 'My Services', icon: Zap },
    { id: 'freelance-projects', label: 'My Projects', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // ✅ SAFE admin check (NO TS ERROR)
  if (user?.type === 'admin') {
    userMenuItems.unshift({
      id: 'admin',
      label: 'Admin Dashboard',
      icon: Shield,
    });
  }

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    onPageChange('home');
  };

  const handleNavigation = (page: string) => {
    router.push(page === 'home' ? '/' : `/${page}`);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg mr-3">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              KaamKhojo<span className="text-orange-500">.com</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`px-2 py-2 text-xs rounded-lg ${
                  currentPage === item.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.icon && <item.icon className="h-3 w-3 mr-1 inline" />}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden lg:flex items-center space-x-2">
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-40 px-3 py-2 border rounded-lg text-xs"
            />

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs"
                >
                  {user.name}
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow">
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
                className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
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
