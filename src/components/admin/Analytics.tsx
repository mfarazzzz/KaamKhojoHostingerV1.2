import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Eye, 
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const overviewStats = [
    { 
      title: 'Total Page Views', 
      value: '1,234,567', 
      change: '+12.5%', 
      trend: 'up',
      icon: Eye,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    { 
      title: 'New Users', 
      value: '45,678', 
      change: '+8.2%', 
      trend: 'up',
      icon: Users,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    { 
      title: 'Job Applications', 
      value: '23,456', 
      change: '+15.7%', 
      trend: 'up',
      icon: Briefcase,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    { 
      title: 'Active Jobs', 
      value: '12,890', 
      change: '+5.3%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    }
  ];

  const topPages = [
    { page: '/jobs', views: 456789, percentage: 35 },
    { page: '/', views: 234567, percentage: 18 },
    { page: '/news', views: 123456, percentage: 12 },
    { page: '/post-job', views: 98765, percentage: 8 },
    { page: '/login', views: 87654, percentage: 7 }
  ];

  const topJobCategories = [
    { category: 'IT & Software', jobs: 4567, applications: 23456 },
    { category: 'Sales & Marketing', jobs: 2345, applications: 12345 },
    { category: 'Engineering', jobs: 1890, applications: 9876 },
    { category: 'Healthcare', jobs: 1567, applications: 7890 },
    { category: 'Blue Collar', jobs: 2890, applications: 15678 }
  ];

  const userGrowth = [
    { month: 'Jan', jobseekers: 1200, employers: 150 },
    { month: 'Feb', jobseekers: 1450, employers: 180 },
    { month: 'Mar', jobseekers: 1680, employers: 220 },
    { month: 'Apr', jobseekers: 1920, employers: 250 },
    { month: 'May', jobseekers: 2150, employers: 290 },
    { month: 'Jun', jobseekers: 2380, employers: 320 }
  ];

  const deviceStats = [
    { device: 'Mobile', percentage: 65, users: 156780 },
    { device: 'Desktop', percentage: 28, users: 67890 },
    { device: 'Tablet', percentage: 7, users: 16890 }
  ];

  const locationStats = [
    { city: 'Bangalore', users: 45678, percentage: 18.5 },
    { city: 'Mumbai', users: 38901, percentage: 15.8 },
    { city: 'Delhi', users: 34567, percentage: 14.0 },
    { city: 'Chennai', users: 28934, percentage: 11.7 },
    { city: 'Hyderabad', users: 25678, percentage: 10.4 },
    { city: 'Pune', users: 22345, percentage: 9.1 },
    { city: 'Others', users: 50897, percentage: 20.5 }
  ];

  const handleExportReport = () => {
    const reportData = {
      overview: overviewStats,
      topPages,
      topJobCategories,
      userGrowth,
      deviceStats,
      locationStats,
      generatedAt: new Date().toISOString(),
      dateRange: `Last ${dateRange} days`
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
            <p className="text-gray-600">Track performance and user engagement</p>
          </div>
          <div className="flex gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
            <button
              onClick={handleExportReport}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last period
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {userGrowth.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 w-12">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="flex gap-1">
                    <div 
                      className="bg-blue-500 h-6 rounded"
                      style={{ width: `${(data.jobseekers / 2500) * 100}%` }}
                      title={`Job Seekers: ${data.jobseekers}`}
                    ></div>
                    <div 
                      className="bg-green-500 h-6 rounded"
                      style={{ width: `${(data.employers / 400) * 100}%` }}
                      title={`Employers: ${data.employers}`}
                    ></div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div className="text-blue-600">{data.jobseekers}</div>
                  <div className="text-green-600">{data.employers}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              Job Seekers
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              Employers
            </div>
          </div>
        </div>

        {/* Device Usage */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Device Usage</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {deviceStats.map((device, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded mr-3 ${
                    device.device === 'Mobile' ? 'bg-blue-500' :
                    device.device === 'Desktop' ? 'bg-green-500' : 'bg-orange-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900">{device.device}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{device.percentage}%</div>
                  <div className="text-xs text-gray-500">{device.users.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Pages</h3>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{page.page}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${page.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm font-semibold text-gray-900">{page.views.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{page.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Job Categories */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Job Categories</h3>
          <div className="space-y-4">
            {topJobCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-900">{category.category}</div>
                  <div className="text-xs text-gray-500">{category.jobs} jobs posted</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-blue-600">{category.applications.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">applications</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Stats */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Users by Location</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {locationStats.map((location, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{location.city}</span>
                <span className="text-xs text-gray-500">{location.percentage}%</span>
              </div>
              <div className="text-lg font-bold text-blue-600">{location.users.toLocaleString()}</div>
              <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                <div 
                  className="bg-blue-600 h-1 rounded-full" 
                  style={{ width: `${location.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Real-time Activity</h3>
          <div className="flex items-center text-green-600">
            <Activity className="h-4 w-4 mr-1" />
            <span className="text-sm">Live</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">247</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">89</div>
            <div className="text-sm text-gray-600">Job Views (last hour)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">23</div>
            <div className="text-sm text-gray-600">Applications (last hour)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;