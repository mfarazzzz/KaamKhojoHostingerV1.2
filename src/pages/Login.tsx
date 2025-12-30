'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, Briefcase, Wrench, Shield } from 'lucide-react';
// import { useAuthStore } from '../store/authStore';
// import { useLanguage } from '../hooks/useLanguage';

interface LoginProps {
  onPageChange: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onPageChange }) => {
  // const { login } = useAuthStore();
  // const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'jobseeker' | 'employer'>('jobseeker');
  const [jobCategory, setJobCategory] = useState<'white-collar' | 'blue-collar'>('white-collar');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!isLogin && !formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    // Simulate login/registration
    const user = {
      id: Date.now().toString(),
      name: formData.name || 'Demo User',
      email: formData.email,
      phone: formData.phone,
      type: userType,
      category: userType === 'jobseeker' ? jobCategory : undefined,
      preferences: {
        language: 'en' as const,
        location: '',
        jobAlerts: true
      }
    };

    // login(user);
    console.log('User logged in:', user);
    onPageChange('home');
  };

  const handleDemoLogin = (demoType: string) => {
    console.log('Demo login:', demoType);
    onPageChange('home');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6 text-white text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold">KaamKhojo.com</h1>
            <p className="text-blue-100 mt-1">
              {isLogin ? 'Welcome back!' : 'Join our community'}
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            {/* Toggle Login/Register */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  isLogin 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  !isLogin 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Register
              </button>
            </div>

            {/* User Type Selection (for registration) */}
            {!isLogin && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  I am a:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType('jobseeker')}
                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                      userType === 'jobseeker'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <User className="h-6 w-6 mx-auto mb-1" />
                    <div className="text-sm font-medium">Job Seeker</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('employer')}
                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                      userType === 'employer'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Briefcase className="h-6 w-6 mx-auto mb-1" />
                    <div className="text-sm font-medium">Employer</div>
                  </button>
                </div>
              </div>
            )}

            {/* Job Category Selection (for job seekers) */}
            {!isLogin && userType === 'jobseeker' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Job Category:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setJobCategory('white-collar')}
                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                      jobCategory === 'white-collar'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Briefcase className="h-6 w-6 mx-auto mb-1" />
                    <div className="text-sm font-medium">Professional</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setJobCategory('blue-collar')}
                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                      jobCategory === 'blue-collar'
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Wrench className="h-6 w-6 mx-auto mb-1" />
                    <div className="text-sm font-medium">Skilled Labor</div>
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name (for registration) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Phone (for registration) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your phone number"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (for registration) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Terms and Conditions (for registration) */}
              {!isLogin && (
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 font-semibold transform hover:scale-105"
              >
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            {/* Forgot Password (for login) */}
            {isLogin && (
              <div className="text-center mt-4">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot your password?
                </a>
              </div>
            )}

            {/* Demo Login */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center mb-3">Quick Demo Login:</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    login({
                      id: '1',
                      name: 'Demo Job Seeker',
                      email: 'jobseeker@demo.com',
                      phone: '+91 9876543210',
                      type: 'jobseeker',
                      category: 'white-collar',
                      preferences: { language: 'en', location: 'Bangalore', jobAlerts: true }
                    });
                    onPageChange('home');
                  }}
                  className="px-3 py-2 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                >
                  Job Seeker
                </button>
                <button
                  onClick={() => {
                    login({
                      id: '2',
                      name: 'Demo Employer',
                      email: 'employer@demo.com',
                      phone: '+91 9876543211',
                      type: 'employer',
                      preferences: { language: 'en', location: 'Mumbai', jobAlerts: false }
                    });
                    onPageChange('home');
                  }}
                  className="px-3 py-2 text-xs bg-teal-100 text-teal-600 rounded hover:bg-teal-200 transition-colors"
                >
                  Employer
                </button>
                <button
                  onClick={() => {
                    login({
                      id: '3',
                      name: 'Admin User',
                      email: 'admin@kaamkhojo.com',
                      phone: '+91 9876543212',
                      type: 'admin',
                      preferences: { language: 'en', location: 'Delhi', jobAlerts: false }
                    });
                    onPageChange('admin');
                  }}
                  className="px-3 py-2 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors flex items-center justify-center"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;