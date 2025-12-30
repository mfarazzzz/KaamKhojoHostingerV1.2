import React, { useState } from 'react';
import { FileText, Clock, CheckCircle, XCircle, Eye, Calendar, Building, MapPin } from 'lucide-react';
import { useJobStore } from '../store/jobStore';

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: Date;
  status: 'applied' | 'under-review' | 'shortlisted' | 'interview-scheduled' | 'rejected' | 'hired';
  lastUpdate: Date;
  notes?: string;
}

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
      notes: 'Application submitted with portfolio'
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
      notes: 'Interview scheduled for tomorrow at 2 PM'
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
      notes: 'Position filled by internal candidate'
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const statusConfig = {
    'applied': { 
      icon: FileText, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100', 
      label: 'Applied' 
    },
    'under-review': { 
      icon: Clock, 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100', 
      label: 'Under Review' 
    },
    'shortlisted': { 
      icon: CheckCircle, 
      color: 'text-green-600', 
      bg: 'bg-green-100', 
      label: 'Shortlisted' 
    },
    'interview-scheduled': { 
      icon: Calendar, 
      color: 'text-purple-600', 
      bg: 'bg-purple-100', 
      label: 'Interview Scheduled' 
    },
    'rejected': { 
      icon: XCircle, 
      color: 'text-red-600', 
      bg: 'bg-red-100', 
      label: 'Rejected' 
    },
    'hired': { 
      icon: CheckCircle, 
      color: 'text-green-600', 
      bg: 'bg-green-100', 
      label: 'Hired' 
    }
  };

  const filteredApplications = selectedStatus === 'all' 
    ? applications 
    : applications.filter(app => app.status === selectedStatus);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusCounts = () => {
    const counts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total: applications.length,
      ...counts
    };
  };

  const statusCounts = getStatusCounts();

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
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedStatus === 'all' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{statusCounts.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
            
            {Object.entries(statusConfig).map(([status, config]) => (
              <div
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedStatus === status 
                    ? `border-${config.color.split('-')[1]}-500 ${config.bg}` 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {statusCounts[status] || 0}
                  </div>
                  <div className="text-sm text-gray-600">{config.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications List */}
        <div className="p-6">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {selectedStatus === 'all' ? 'No Applications Yet' : `No ${statusConfig[selectedStatus as keyof typeof statusConfig]?.label} Applications`}
              </h3>
              <p className="text-gray-600">
                {selectedStatus === 'all' 
                  ? 'Start applying to jobs to track your applications here'
                  : 'No applications with this status found'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application) => {
                const StatusIcon = statusConfig[application.status].icon;
                
                return (
                  <div
                    key={application.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.jobTitle}
                          </h3>
                          <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[application.status].bg} ${statusConfig[application.status].color}`}>
                            <StatusIcon className="h-4 w-4 mr-1" />
                            {statusConfig[application.status].label}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-1" />
                            {application.company}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {application.location}
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Applied:</span> {formatDate(application.appliedDate)}
                          </div>
                          <div>
                            <span className="font-medium">Last Update:</span> {formatDate(application.lastUpdate)}
                          </div>
                        </div>
                        
                        {application.notes && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{application.notes}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <button className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Job
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracker;