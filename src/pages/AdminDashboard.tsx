import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  FileText, 
  BarChart3, 
  Settings, 
  Bell,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  Search,
  Filter
} from 'lucide-react';
import NewsManagement from '../components/admin/NewsManagement';
import JobManagement from '../components/admin/JobManagement';
import UserManagement from '../components/admin/UserManagement';
import Analytics from '../components/admin/Analytics';
import SystemSettings from '../components/admin/SystemSettings';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const adminTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'jobs', label: 'Job Management', icon: Briefcase },
    { id: 'news', label: 'News Management', icon: FileText },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const stats = [
    { 
      title: 'Total Jobs', 
      value: '12,547', 
      change: '+12%', 
      icon: Briefcase, 
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    { 
      title: 'Active Users', 
      value: '2,45,678', 
      change: '+8%', 
      icon: Users, 
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    { 
      title: 'News Articles', 
      value: '1,234', 
      change: '+15%', 
      icon: FileText, 
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    { 
      title: 'Applications', 
      value: '45,892', 
      change: '+22%', 
      icon: TrendingUp, 
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'New job posted', details: 'Senior Software Engineer at TechCorp', time: '2 minutes ago', type: 'job' },
    { id: 2, action: 'News article published', details: 'SSC CGL 2024 Notification Released', time: '15 minutes ago', type: 'news' },
    { id: 3, action: 'User registered', details: 'New employer account created', time: '1 hour ago', type: 'user' },
    { id: 4, action: 'Job application', details: '25 new applications received', time: '2 hours ago', type: 'application' },
    { id: 5, action: 'System update', details: 'Database optimization completed', time: '3 hours ago', type: 'system' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bg}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 ${
                          activity.type === 'job' ? 'bg-blue-500' :
                          activity.type === 'news' ? 'bg-purple-500' :
                          activity.type === 'user' ? 'bg-green-500' :
                          activity.type === 'application' ? 'bg-orange-500' : 'bg-gray-500'
                        }`}></div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.details}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'jobs':
        return <JobManagement />;
      case 'news':
        return <NewsManagement />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <SystemSettings />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64">
              <nav className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                <div className="space-y-2">
                  {adminTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="h-5 w-5 mr-3" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {renderTabContent()}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;