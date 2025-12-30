import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Ban, 
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Download,
  UserCheck,
  UserX
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'jobseeker' | 'employer';
  category?: 'white-collar' | 'blue-collar';
  status: 'active' | 'suspended' | 'pending';
  verified: boolean;
  joinDate: string;
  lastLogin: string;
  location: string;
  profileComplete: number;
  jobsApplied?: number;
  jobsPosted?: number;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543210',
      type: 'jobseeker',
      category: 'white-collar',
      status: 'active',
      verified: true,
      joinDate: '2024-01-10',
      lastLogin: '2024-01-15',
      location: 'Bangalore, Karnataka',
      profileComplete: 85,
      jobsApplied: 12
    },
    {
      id: '2',
      name: 'TechCorp India',
      email: 'hr@techcorp.com',
      phone: '+91 9876543211',
      type: 'employer',
      status: 'active',
      verified: true,
      joinDate: '2024-01-05',
      lastLogin: '2024-01-15',
      location: 'Mumbai, Maharashtra',
      profileComplete: 95,
      jobsPosted: 8
    },
    {
      id: '3',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 9876543212',
      type: 'jobseeker',
      category: 'blue-collar',
      status: 'active',
      verified: false,
      joinDate: '2024-01-12',
      lastLogin: '2024-01-14',
      location: 'Delhi, Delhi',
      profileComplete: 60,
      jobsApplied: 5
    },
    {
      id: '4',
      name: 'StartupXYZ',
      email: 'contact@startupxyz.com',
      phone: '+91 9876543213',
      type: 'employer',
      status: 'pending',
      verified: false,
      joinDate: '2024-01-14',
      lastLogin: '2024-01-14',
      location: 'Hyderabad, Telangana',
      profileComplete: 70,
      jobsPosted: 2
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || user.type === filterType;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleStatusChange = (userId: string, newStatus: 'active' | 'suspended' | 'pending') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleVerifyUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, verified: true } : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) {
      alert('Please select users first');
      return;
    }

    switch (action) {
      case 'activate':
        setUsers(users.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: 'active' } : user
        ));
        break;
      case 'suspend':
        setUsers(users.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: 'suspended' } : user
        ));
        break;
      case 'verify':
        setUsers(users.map(user => 
          selectedUsers.includes(user.id) ? { ...user, verified: true } : user
        ));
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
          setUsers(users.filter(user => !selectedUsers.includes(user.id)));
        }
        break;
    }
    setSelectedUsers([]);
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(users, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'users-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const stats = {
    total: users.length,
    jobseekers: users.filter(u => u.type === 'jobseeker').length,
    employers: users.filter(u => u.type === 'employer').length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    verified: users.filter(u => u.verified).length
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{stats.jobseekers}</div>
          <div className="text-sm text-gray-600">Job Seekers</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{stats.employers}</div>
          <div className="text-sm text-gray-600">Employers</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-emerald-600">{stats.active}</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">{stats.verified}</div>
          <div className="text-sm text-gray-600">Verified</div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
            <p className="text-gray-600">Manage job seekers and employers</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Bulk Actions */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search and Filters */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="jobseeker">Job Seekers</option>
              <option value="employer">Employers</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('activate')}
                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction('suspend')}
                className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
              >
                Suspend
              </button>
              <button
                onClick={() => handleBulkAction('verify')}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Verify
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {selectedUsers.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            {selectedUsers.length} user(s) selected
          </div>
        )}
      </div>

      {/* Users List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, user.id]);
                        } else {
                          setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
                          {user.verified && (
                            <CheckCircle className="h-4 w-4 text-green-500" title="Verified" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {user.phone}
                          </div>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {user.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                        user.type === 'jobseeker' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.type === 'jobseeker' ? 'Job Seeker' : 'Employer'}
                      </span>
                      {user.category && (
                        <div className="mt-1">
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded capitalize">
                            {user.category.replace('-', ' ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Joined: {new Date(user.joinDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        Last: {new Date(user.lastLogin).toLocaleDateString()}
                      </div>
                      {user.type === 'jobseeker' && (
                        <div className="flex items-center mt-1">
                          <Briefcase className="h-3 w-3 mr-1" />
                          Applied: {user.jobsApplied}
                        </div>
                      )}
                      {user.type === 'employer' && (
                        <div className="flex items-center mt-1">
                          <Briefcase className="h-3 w-3 mr-1" />
                          Posted: {user.jobsPosted}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${user.profileComplete}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{user.profileComplete}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(`/profile/${user.id}`, '_blank')}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Profile"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      {!user.verified && (
                        <button
                          onClick={() => handleVerifyUser(user.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Verify User"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                      
                      {user.status === 'active' ? (
                        <button
                          onClick={() => handleStatusChange(user.id, 'suspended')}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Suspend User"
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(user.id, 'active')}
                          className="text-green-600 hover:text-green-900"
                          title="Activate User"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;