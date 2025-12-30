import React, { useState } from 'react';
import { Bell, Plus, Edit, Trash2, MapPin, Briefcase, DollarSign } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface JobAlert {
  id: string;
  title: string;
  keywords: string[];
  location: string;
  category: string;
  salary: string;
  frequency: 'daily' | 'weekly' | 'instant';
  isActive: boolean;
  createdAt: Date;
}

const JobAlerts: React.FC = () => {
  const { user } = useAuthStore();
  const [alerts, setAlerts] = useState<JobAlert[]>([
    {
      id: '1',
      title: 'Software Engineer Jobs',
      keywords: ['React', 'JavaScript', 'Frontend'],
      location: 'Bangalore',
      category: 'white-collar',
      salary: '5-15 LPA',
      frequency: 'daily',
      isActive: true,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Cook Jobs',
      keywords: ['Cook', 'Chef', 'Kitchen'],
      location: 'Delhi',
      category: 'blue-collar',
      salary: '20000-40000',
      frequency: 'weekly',
      isActive: true,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: '',
    keywords: '',
    location: '',
    category: 'white-collar',
    salary: '',
    frequency: 'daily' as const
  });

  const handleCreateAlert = () => {
    const alert: JobAlert = {
      id: Date.now().toString(),
      title: newAlert.title,
      keywords: newAlert.keywords.split(',').map(k => k.trim()),
      location: newAlert.location,
      category: newAlert.category,
      salary: newAlert.salary,
      frequency: newAlert.frequency,
      isActive: true,
      createdAt: new Date()
    };

    setAlerts([...alerts, alert]);
    setNewAlert({
      title: '',
      keywords: '',
      location: '',
      category: 'white-collar',
      salary: '',
      frequency: 'daily'
    });
    setShowCreateForm(false);
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Bell className="h-6 w-6 mr-3 text-blue-600" />
                Job Alerts
              </h1>
              <p className="text-gray-600 mt-1">
                Get notified when new jobs match your preferences
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </button>
          </div>
        </div>

        {/* Create Alert Form */}
        {showCreateForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Job Alert</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alert Title</label>
                <input
                  type="text"
                  value={newAlert.title}
                  onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                  placeholder="e.g., Software Engineer Jobs"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                <input
                  type="text"
                  value={newAlert.keywords}
                  onChange={(e) => setNewAlert({ ...newAlert, keywords: e.target.value })}
                  placeholder="React, JavaScript, Frontend (comma separated)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newAlert.location}
                  onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                  placeholder="City, State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newAlert.category}
                  onChange={(e) => setNewAlert({ ...newAlert, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="white-collar">Professional Jobs</option>
                  <option value="blue-collar">Skilled Labor</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                <input
                  type="text"
                  value={newAlert.salary}
                  onChange={(e) => setNewAlert({ ...newAlert, salary: e.target.value })}
                  placeholder="e.g., 5-15 LPA or 20000-40000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select
                  value={newAlert.frequency}
                  onChange={(e) => setNewAlert({ ...newAlert, frequency: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="instant">Instant</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleCreateAlert}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Alert
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Alerts List */}
        <div className="p-6">
          {alerts.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Job Alerts</h3>
              <p className="text-gray-600 mb-4">Create your first job alert to get notified about relevant opportunities</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Alert
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`border rounded-lg p-4 transition-all ${
                    alert.isActive 
                      ? 'border-blue-200 bg-blue-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.isActive 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {alert.isActive ? 'Active' : 'Paused'}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium capitalize">
                          {alert.frequency}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-2" />
                          <span>{alert.keywords.join(', ')}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          <span>{alert.salary}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-2">
                        Created on {formatDate(alert.createdAt)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleAlert(alert.id)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          alert.isActive
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {alert.isActive ? 'Pause' : 'Activate'}
                      </button>
                      <button
                        onClick={() => deleteAlert(alert.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobAlerts;