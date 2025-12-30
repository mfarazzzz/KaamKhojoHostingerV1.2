import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Upload, 
  Download, 
  Search, 
  Filter,
  MapPin,
  DollarSign,
  Clock,
  Building,
  Save,
  X,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  category: 'white-collar' | 'blue-collar';
  experience: string;
  description: string;
  requirements: string[];
  skills: string[];
  status: 'active' | 'paused' | 'expired' | 'draft';
  urgent: boolean;
  featured: boolean;
  postedDate: string;
  expiryDate: string;
  applications: number;
  views: number;
  contactEmail: string;
  contactPhone: string;
  companyLogo?: string;
}

const JobManagement: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Software Engineer - React & Node.js',
      company: 'TechCorp India',
      location: 'Bangalore, Karnataka',
      salary: '₹12-18 LPA',
      type: 'full-time',
      category: 'white-collar',
      experience: '3-5 years',
      description: 'Join our dynamic team as a Senior Software Engineer specializing in React and Node.js.',
      requirements: ['React', 'Node.js', 'MongoDB', 'AWS'],
      skills: ['React', 'JavaScript', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
      status: 'active',
      urgent: true,
      featured: true,
      postedDate: '2024-01-15',
      expiryDate: '2024-02-15',
      applications: 145,
      views: 2340,
      contactEmail: 'hr@techcorp.com',
      contactPhone: '+91 9876543210'
    },
    {
      id: '2',
      title: 'Experienced Cook - North & South Indian Cuisine',
      company: 'Sharma Family',
      location: 'Delhi, Delhi',
      salary: '₹25,000-35,000/month',
      type: 'full-time',
      category: 'blue-collar',
      experience: '2+ years',
      description: 'Seeking an experienced cook proficient in North Indian and South Indian cuisine.',
      requirements: ['Cooking experience', 'North Indian cuisine', 'South Indian cuisine'],
      skills: ['North Indian Cooking', 'South Indian Cooking', 'Kitchen Management'],
      status: 'active',
      urgent: false,
      featured: false,
      postedDate: '2024-01-14',
      expiryDate: '2024-02-14',
      applications: 67,
      views: 890,
      contactEmail: 'contact@sharmafamily.com',
      contactPhone: '+91 9876543211'
    }
  ]);

  const [showEditor, setShowEditor] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showBulkImport, setShowBulkImport] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: 'full-time' as const,
    category: 'white-collar' as const,
    experience: '',
    description: '',
    requirements: '',
    skills: '',
    status: 'active' as const,
    urgent: false,
    featured: false,
    expiryDate: '',
    contactEmail: '',
    contactPhone: '',
    companyLogo: ''
  });

  const jobTypes = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' }
  ];

  const experienceLevels = [
    'Fresher (0-1 years)',
    'Junior (1-3 years)',
    'Mid Level (3-5 years)',
    'Senior (5+ years)',
    'Expert (8+ years)'
  ];

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      type: job.type,
      category: job.category,
      experience: job.experience,
      description: job.description,
      requirements: job.requirements.join(', '),
      skills: job.skills.join(', '),
      status: job.status,
      urgent: job.urgent,
      featured: job.featured,
      expiryDate: job.expiryDate,
      contactEmail: job.contactEmail,
      contactPhone: job.contactPhone,
      companyLogo: job.companyLogo || ''
    });
    setShowEditor(true);
  };

  const handleSave = () => {
    const jobData = {
      ...formData,
      id: editingJob?.id || Date.now().toString(),
      requirements: formData.requirements.split(',').map(req => req.trim()),
      skills: formData.skills.split(',').map(skill => skill.trim()),
      postedDate: editingJob?.postedDate || new Date().toISOString().split('T')[0],
      applications: editingJob?.applications || 0,
      views: editingJob?.views || 0
    };

    if (editingJob) {
      setJobs(jobs.map(job => 
        job.id === editingJob.id ? { ...job, ...jobData } : job
      ));
    } else {
      setJobs([...jobs, jobData as Job]);
    }

    setShowEditor(false);
    setEditingJob(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this job posting?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      salary: '',
      type: 'full-time',
      category: 'white-collar',
      experience: '',
      description: '',
      requirements: '',
      skills: '',
      status: 'active',
      urgent: false,
      featured: false,
      expiryDate: '',
      contactEmail: '',
      contactPhone: '',
      companyLogo: ''
    });
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || job.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleBulkImport = () => {
    setShowBulkImport(true);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(jobs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'job-listings.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleCSVImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target?.result as string;
        // Parse CSV and convert to job objects
        // This is a simplified example - in production, you'd use a proper CSV parser
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
        const newJobs = lines.slice(1).map((line, index) => {
          const values = line.split(',');
          return {
            id: (Date.now() + index).toString(),
            title: values[0] || '',
            company: values[1] || '',
            location: values[2] || '',
            salary: values[3] || '',
            type: (values[4] as any) || 'full-time',
            category: (values[5] as any) || 'white-collar',
            experience: values[6] || '',
            description: values[7] || '',
            requirements: values[8] ? values[8].split(';') : [],
            skills: values[9] ? values[9].split(';') : [],
            status: 'active' as const,
            urgent: false,
            featured: false,
            postedDate: new Date().toISOString().split('T')[0],
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            applications: 0,
            views: 0,
            contactEmail: values[10] || '',
            contactPhone: values[11] || ''
          };
        }).filter(job => job.title); // Filter out empty rows

        setJobs([...jobs, ...newJobs]);
        setShowBulkImport(false);
        alert(`Successfully imported ${newJobs.length} jobs`);
      };
      reader.readAsText(file);
    }
  };

  if (showBulkImport) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Bulk Import Jobs</h2>
            <button
              onClick={() => setShowBulkImport(false)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <FileSpreadsheet className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Import Jobs from CSV</h3>
              <p className="text-gray-600">Upload a CSV file with job listings to import multiple jobs at once.</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">CSV Format Requirements</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your CSV file should have the following columns in order:
                  </p>
                  <ul className="text-sm text-yellow-700 mt-2 list-disc list-inside">
                    <li>Title, Company, Location, Salary, Type, Category, Experience</li>
                    <li>Description, Requirements (semicolon separated), Skills (semicolon separated)</li>
                    <li>Contact Email, Contact Phone</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".csv"
                onChange={handleCSVImport}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <span className="text-lg font-medium text-gray-900 mb-2">Choose CSV file</span>
                <span className="text-sm text-gray-500">or drag and drop here</span>
              </label>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setShowBulkImport(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <a
                href="data:text/csv;charset=utf-8,Title,Company,Location,Salary,Type,Category,Experience,Description,Requirements,Skills,Contact Email,Contact Phone%0ASenior Developer,Tech Corp,Bangalore,12-18 LPA,full-time,white-collar,3-5 years,Software development role,React;Node.js;MongoDB,JavaScript;React;Node.js,hr@techcorp.com,9876543210"
                download="job-template.csv"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Download Template
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showEditor) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
            </h2>
            <button
              onClick={() => {
                setShowEditor(false);
                setEditingJob(null);
                resetForm();
              }}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., TechCorp India"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Bangalore, Karnataka"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range *</label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., ₹12-18 LPA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {jobTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="white-collar">Professional Jobs</option>
                    <option value="blue-collar">Skilled Labor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the role, responsibilities, and requirements..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                <input
                  type="text"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, Node.js, MongoDB (comma separated)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills & Keywords</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="JavaScript, React, Node.js (comma separated)"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email *</label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="hr@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Settings */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-4">Job Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="draft">Draft</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured Job</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.urgent}
                        onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Urgent Hiring</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Company Logo */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-4">Company Logo</h3>
                <input
                  type="url"
                  value={formData.companyLogo}
                  onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Job
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Job Management</h2>
            <p className="text-gray-600">Manage job postings and applications</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleBulkImport}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              Bulk Import
            </button>
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button
              onClick={() => setShowEditor(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Job
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="expired">Expired</option>
            <option value="draft">Draft</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="white-collar">Professional Jobs</option>
            <option value="blue-collar">Skilled Labor</option>
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            <Building className="h-4 w-4 mr-2" />
            {filteredJobs.length} jobs found
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900">{job.title}</h3>
                        {job.featured && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Featured</span>
                        )}
                        {job.urgent && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Urgent</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-3 w-3 mr-1" />
                          {job.salary}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {job.type}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          job.category === 'white-collar' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-teal-100 text-teal-800'
                        }`}>
                          {job.category === 'white-collar' ? 'Professional' : 'Skilled Labor'}
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                          {job.experience}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {job.companyLogo && (
                        <img
                          src={job.companyLogo}
                          alt={job.company}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{job.company}</div>
                        <div className="text-sm text-gray-500">{job.contactEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                      job.status === 'active' ? 'bg-green-100 text-green-800' :
                      job.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      job.status === 'expired' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.applications}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(`/jobs/${job.id}`, '_blank')}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Job"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(job)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit Job"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Job"
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

export default JobManagement;