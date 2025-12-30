import React, { useState } from 'react';
import { Building, MapPin, DollarSign, Clock, Users, FileText, Tags, AlertCircle } from 'lucide-react';

const PostJob: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    category: 'white-collar',
    jobType: 'full-time',
    experience: '',
    salary: '',
    description: '',
    requirements: '',
    skills: '',
    urgent: false,
    contactEmail: '',
    contactPhone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job posting data:', formData);
    alert('Job posted successfully! It will be reviewed and published within 24 hours.');
  };

  const jobTypeOptions = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' }
  ];

  const experienceOptions = [
    { value: 'fresher', label: 'Fresher (0-1 years)' },
    { value: 'junior', label: 'Junior (1-3 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior (5+ years)' },
    { value: 'expert', label: 'Expert (8+ years)' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post a Job</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with talented professionals and skilled workers. Fill out the form below to post your job opening.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic</h3>
            <div className="text-3xl font-bold text-blue-600 mb-4">Free</div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 30-day listing</li>
              <li>• Standard visibility</li>
              <li>• Basic support</li>
            </ul>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 border-2 border-blue-600 transform scale-105">
            <h3 className="text-lg font-semibold mb-2">Premium</h3>
            <div className="text-3xl font-bold mb-4">₹999</div>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>• 60-day listing</li>
              <li>• Featured placement</li>
              <li>• Priority support</li>
              <li>• Resume database access</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-orange-300 transition-colors cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h3>
            <div className="text-3xl font-bold text-orange-600 mb-4">₹2999</div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 90-day listing</li>
              <li>• Top placement</li>
              <li>• Dedicated support</li>
              <li>• Advanced analytics</li>
            </ul>
          </div>
        </div>

        {/* Job Posting Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Building className="h-6 w-6 mr-3 text-blue-600" />
                  Basic Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Senior Software Engineer"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Tech Solutions Pvt Ltd"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Bangalore, Karnataka"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="white-collar">Professional Jobs</option>
                      <option value="blue-collar">Skilled Labor</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FileText className="h-6 w-6 mr-3 text-blue-600" />
                  Job Details
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Type *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {jobTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select experience level</option>
                        {experienceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary Range *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., ₹5-8 LPA or ₹25,000-35,000/month"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requirements
                    </label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="List the key requirements, qualifications, and certifications needed..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills & Keywords
                    </label>
                    <div className="relative">
                      <Tags className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        placeholder="e.g., React, JavaScript, Node.js (comma separated)"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Add relevant skills and keywords to help candidates find your job
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Users className="h-6 w-6 mr-3 text-blue-600" />
                  Contact Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                      placeholder="hr@company.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="urgent"
                    checked={formData.urgent}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-3 flex items-center text-sm font-medium text-gray-700">
                    <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                    Mark as urgent hiring
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2 ml-7">
                  Urgent jobs get highlighted and appear at the top of search results
                </p>
              </div>

              {/* Submit Button */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <button
                    type="button"
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold transform hover:scale-105"
                  >
                    Post Job
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-8 border border-blue-100">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Need Help?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Writing Effective Job Posts</h4>
              <p className="text-blue-700 text-sm">
                Learn how to write compelling job descriptions that attract the right candidates.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Pricing & Features</h4>
              <p className="text-blue-700 text-sm">
                Compare our posting packages and choose the one that fits your hiring needs.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Contact our hiring experts →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;