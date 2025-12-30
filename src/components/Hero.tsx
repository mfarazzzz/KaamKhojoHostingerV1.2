'use client';

import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Wrench, TrendingUp, Users, Zap, MessageCircle, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeroProps {
  onSearchJobs: (query: string, location: string, category: string) => void;
  onPageChange: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearchJobs, onPageChange }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = () => {
    onSearchJobs(searchQuery, location, selectedCategory);
  };

  const handlePageNavigation = (pageId: string) => {
    if (pageId === 'home') {
      router.push('/');
    } else {
      router.push(`/${pageId}`);
    }
  };
  const stats = [
    { icon: Briefcase, label: 'Active Jobs', value: '50,000+', color: 'text-blue-600' },
    { icon: Users, label: 'Registered Users', value: '2L+', color: 'text-teal-600' },
    { icon: TrendingUp, label: 'Success Rate', value: '85%', color: 'text-orange-600' },
  ];

  const platformFeatures = [
    {
      id: 'jobs',
      title: 'Job Portal',
      description: 'Traditional & Blue-collar Jobs',
      icon: Briefcase,
      gradient: 'from-blue-500 to-indigo-600',
      jobs: '50,000+'
    },
    {
      id: 'services',
      title: 'Service Marketplace',
      description: 'Home Services & Professional Help',
      icon: Zap,
      gradient: 'from-green-500 to-teal-600',
      jobs: '25,000+'
    },
    {
      id: 'freelance',
      title: 'Freelance Hub',
      description: 'Projects & Gig Economy',
      icon: Users,
      gradient: 'from-purple-500 to-pink-600',
      jobs: '15,000+'
    },
    {
      id: 'connect',
      title: 'Professional Network',
      description: 'Connect & Collaborate',
      icon: MessageCircle,
      gradient: 'from-orange-500 to-red-600',
      jobs: '10,000+'
    },
    {
      id: 'learning',
      title: 'Skill Development',
      description: 'Courses & Certifications',
      icon: BookOpen,
      gradient: 'from-indigo-500 to-purple-600',
      jobs: '500+'
    },
    {
      id: 'news',
      title: 'Employment News',
      description: 'Latest Updates & Notifications',
      icon: TrendingUp,
      gradient: 'from-teal-500 to-cyan-600',
      jobs: '1,000+'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50"></div>
      
      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            India's Complete
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
              Career Ecosystem
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Your 360° career platform - Find jobs, hire services, freelance, network with professionals, 
            learn new skills, and stay updated with employment news. Everything you need for career success.
          </p>

          {/* Platform Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
            {platformFeatures.map((feature) => (
              <div
                key={feature.id}
                onClick={() => handlePageNavigation(feature.id)}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-3 text-sm">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{feature.jobs} opportunities</span>
                  <span className="text-sm font-semibold text-blue-600">
                    Explore →
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, skills, services, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold transform hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Search
              </button>
            </div>
            
            {/* Popular Searches */}
            <div className="mt-4 text-sm text-gray-600">
              <span className="font-medium">Popular searches:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Software Developer', 'Cook', 'Driver', 'Marketing Manager', 'Electrician', 'Nurse', 'Freelance Writer', 'Home Cleaning'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors text-xs"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex p-4 rounded-full bg-white shadow-lg mb-4`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;