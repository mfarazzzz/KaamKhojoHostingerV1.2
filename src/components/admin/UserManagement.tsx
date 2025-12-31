'use client';

import React, { useMemo, useState } from 'react';
import {
  Users,
  Search,
  Eye,
  Trash2,
  Ban,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Briefcase,
  Download,
  UserCheck
} from 'lucide-react';

/* ================= TYPES ================= */

type UserType = 'jobseeker' | 'employer';
type UserStatus = 'active' | 'suspended' | 'pending';
type UserCategory = 'white-collar' | 'blue-collar';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: UserType;
  category?: UserCategory;
  status: UserStatus;
  verified: boolean;
  joinDate: string;
  lastLogin: string;
  location: string;
  profileComplete: number;
  jobsApplied?: number;
  jobsPosted?: number;
}

/* ================= COMPONENT ================= */

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
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | UserType>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | UserStatus>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  /* ================= FILTERING ================= */

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const q = searchQuery.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.location.toLowerCase().includes(q);

      const matchesType =
        filterType === 'all' || user.type === filterType;

      const matchesStatus =
        filterStatus === 'all' || user.status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [users, searchQuery, filterType, filterStatus]);

  /* ================= ACTIONS ================= */

  const handleStatusChange = (id: string, status: UserStatus) => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, status } : u))
    );
  };

  const handleVerifyUser = (id: string) => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, verified: true } : u))
    );
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Delete this user permanently?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(users, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ================= STATS ================= */

  const stats = {
    total: users.length,
    jobseekers: users.filter(u => u.type === 'jobseeker').length,
    employers: users.filter(u => u.type === 'employer').length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    verified: users.filter(u => u.verified).length
  };

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white p-4 rounded border">
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm text-gray-600 capitalize">{key}</div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="bg-white p-6 rounded border flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-gray-600">Manage job seekers & employers</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 border rounded"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-6 rounded border grid md:grid-cols-3 gap-4">
        <input
          placeholder="Search users…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value as any)}
          className="border p-2 rounded"
        >
          <option value="all">All Types</option>
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as any)}
          className="border p-2 rounded"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-t">
                <td className="p-3">
                  <div className="font-medium flex items-center gap-2">
                    {user.name}
                    {user.verified && (
                      <CheckCircle className="h-4 w-4 text-green-500">
                        <title>Verified</title>
                      </CheckCircle>
                    )}
                  </div>
                  <div className="text-gray-500">{user.email}</div>
                </td>
                <td className="p-3 capitalize">{user.type}</td>
                <td className="p-3 capitalize">{user.status}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleVerifyUser(user.id)}>
                    <UserCheck className="h-4 w-4 text-green-600" />
                  </button>
                  <button onClick={() => handleStatusChange(user.id, 'suspended')}>
                    <Ban className="h-4 w-4 text-yellow-600" />
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
