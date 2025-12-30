import React, { useMemo, useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  Building,
  MapPin,
} from 'lucide-react';
import { useJobStore } from '../store/jobStore';

/* ================= TYPES ================= */

type ApplicationStatus =
  | 'applied'
  | 'under-review'
  | 'shortlisted'
  | 'interview-scheduled'
  | 'rejected'
  | 'hired';

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: Date;
  status: ApplicationStatus;
  lastUpdate: Date;
  notes?: string;
}

type StatusConfig = {
  [key in ApplicationStatus]: {
    icon: React.ElementType;
    color: string;
    bg: string;
    label: string;
  };
};

/* ================= COMPONENT ================= */

const ApplicationTracker: React.FC = () => {
  const { appliedJobs } = useJobStore();

  const [applications] = useState<Application[]>([
    {
      id: '1',
      jobId: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'TechCorp India',
      location: 'Bangalore, Karnataka',
      appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'under-review',
      lastUpdate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      notes: 'Application submitted with portfolio',
    },
    {
      id: '2',
      jobId: '3',
      jobTitle: 'Digital Marketing Manager',
      company: 'Growth Marketing Co.',
      location: 'Mumbai, Maharashtra',
      appliedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      status: 'interview-scheduled',
      lastUpdate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      notes: 'Interview scheduled for tomorrow at 2 PM',
    },
    {
      id: '3',
      jobId: '5',
      jobTitle: 'Product Manager',
      company: 'StartupXYZ',
      location: 'Hyderabad, Telangana',
      appliedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      status: 'rejected',
      lastUpdate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      notes: 'Position filled by internal candidate',
    },
  ]);

  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | 'all'>('all');

  /* ================= STATUS CONFIG ================= */

  const statusConfig: StatusConfig = {
    applied: {
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      label: 'Applied',
    },
    'under-review': {
      icon: Clock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      label: 'Under Review',
    },
    shortlisted: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-100',
      label: 'Shortlisted',
    },
    'interview-scheduled': {
      icon: Calendar,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      label: 'Interview Scheduled',
    },
    rejected: {
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-100',
      label: 'Rejected',
    },
    hired: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-100',
      label: 'Hired',
    },
  };

  /* ================= DERIVED DATA ================= */

  const statusCounts = useMemo(() => {
    const base: Record<ApplicationStatus, number> = {
      applied: 0,
      'under-review': 0,
      shortlisted: 0,
      'interview-scheduled': 0,
      rejected: 0,
      hired: 0,
    };

    for (const app of applications) {
      base[app.status]++;
    }

    return {
      total: applications.length,
      ...base,
    };
  }, [applications]);

  const filteredApplications =
    selectedStatus === 'all'
      ? applications
      : applications.filter(app => app.status === selectedStatus);

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FileText className="h-6 w-6 mr-3 text-blue-600" />
            Application Tracker
          </h1>
          <p className="text-gray-600 mt-1">
            Track the status of your job applications
          </p>
        </div>

        {/* Status Overview */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div
              onClick={() => setSelectedStatus('all')}
              className={`p-4 rounded-lg border-2 cursor-pointer ${
                selectedStatus === 'all'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">{statusCounts.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>

            {(Object.keys(statusConfig) as ApplicationStatus[]).map(status => {
              const config = statusConfig[status];
              return (
                <div
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`p-4 rounded-lg border-2 cursor-pointer ${
                    selectedStatus === status
                      ? `${config.bg} border-gray-400`
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {statusCounts[status]}
                    </div>
                    <div className="text-sm text-gray-600">{config.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Applications */}
        <div className="p-6 space-y-4">
          {filteredApplications.map(app => {
            const StatusIcon = statusConfig[app.status].icon;

            return (
              <div
                key={app.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{app.jobTitle}</h3>
                    <div className="flex gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {app.company}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {app.location}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 mt-2">
                      Applied: {formatDate(app.appliedDate)} · Last update:{' '}
                      {formatDate(app.lastUpdate)}
                    </div>

                    {app.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        {app.notes}
                      </div>
                    )}
                  </div>

                  <button className="flex items-center text-blue-600">
                    <Eye className="h-4 w-4 mr-1" />
                    View Job
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracker;
