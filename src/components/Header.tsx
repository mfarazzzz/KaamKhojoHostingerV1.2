'use client';

import React, { useState } from 'react';
import { Search, Menu, X, User, Briefcase, Bell, MapPin, LogOut, Settings, FileText, Bookmark, Shield, Users, Zap, BookOpen, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import { useAuthStore } from '../store/authStore';
// import { useLanguage } from '../hooks/useLanguage';
// import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const router = useRouter();
  // const { user, isAuthenticated, logout } = useAuthStore();
  // const { t } = useLanguage();
  const user = null;
  const isAuthenticated = false;
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
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'saved-jobs', label: 'Saved Jobs', icon: Bookmark },
    { id: 'job-alerts', label: 'Job Alerts', icon: Bell },
    { id: 'my-services', label: 'My Services', icon: Zap },
    { id: 'freelance-projects', label: 'My Projects', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Add admin menu item for admin users
  if (user?.type === 'admin') {
    userMenuItems.unshift({ id: 'admin', label: 'Admin Dashboard', icon: Shield });
  }

  const handleLogout = () => {
    // logout();
    setIsUserMenuOpen(false);
    onPageChange('home');
  };

  const handleNavigation = (page: string) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavigation('home')}
          >
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg mr-3 group-hover:from-blue-700 group-hover:to-teal-700 transition-all duration-300">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                KaamKhojo<span className="text-orange-500">.com</span>
              </h1>
              <p className="text-xs text-gray-500 leading-none">360° Job Portal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex items-center px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:bg-gray-50 whitespace-nowrap ${
                  currentPage === item.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.icon && <item.icon className="h-3 w-3 mr-1" />}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* Quick Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-xs"
              />
              <Search className="absolute left-2 top-2.5 h-3 w-3 text-gray-400" />
            </div>

            {/* Language Switcher */}
            {/* <LanguageSwitcher /> */}

            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-xs"
                >
                  <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-1">
                    <span className="text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium max-w-16 truncate">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                    <div className="p-3 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full capitalize">
                        {user.type} {user.category && `• ${user.category.replace('-', ' ')}`}
                      </span>
                    </div>
                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            handleNavigation(item.id);
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <item.icon className="h-4 w-4 mr-3" />
                          {item.label}
                        </button>
                      ))}
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => handleNavigation('login')}
                className="flex items-center px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-xs font-medium"
              >
                <User className="h-3 w-3 mr-1" />
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Search */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search jobs, services, freelancers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              {/* Navigation Items */}
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavigation(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                  {item.label}
                </button>
              ))}

              {/* Language Switcher */}
              <div className="pt-2 border-t border-gray-200">
                {/* <LanguageSwitcher /> */}
              </div>

              {/* User Section */}
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated && user ? (
                  <div>
                    <div className="px-3 py-2 mb-2">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    {userMenuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          handleNavigation(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </button>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg mt-2"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      handleNavigation('login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    <User className="h-5 w-5 mr-3" />
                    Login / Register
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;