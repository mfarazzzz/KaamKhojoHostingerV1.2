import React from 'react';
import { Filter, X, MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';

interface Filters {
  category: string;
  jobType: string;
  experience: string;
  salary: string;
  location: string;
}

interface SearchFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  isOpen,
  onToggle
}) => {
  const updateFilter = (key: keyof Filters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const filterOptions = {
    category: [
      { value: 'all', label: 'All Categories' },
      { value: 'white-collar', label: 'Professional Jobs' },
      { value: 'blue-collar', label: 'Skilled Labor' }
    ],
    jobType: [
      { value: 'all', label: 'All Types' },
      { value: 'full-time', label: 'Full Time' },
      { value: 'part-time', label: 'Part Time' },
      { value: 'internship', label: 'Internship' },
      { value: 'contract', label: 'Contract' }
    ],
    experience: [
      { value: 'all', label: 'All Experience' },
      { value: 'fresher', label: 'Fresher (0-1 years)' },
      { value: 'junior', label: 'Junior (1-3 years)' },
      { value: 'mid', label: 'Mid Level (3-5 years)' },
      { value: 'senior', label: 'Senior (5+ years)' }
    ],
    salary: [
      { value: 'all', label: 'All Salaries' },
      { value: '0-3', label: '₹0 - ₹3 LPA' },
      { value: '3-6', label: '₹3 - ₹6 LPA' },
      { value: '6-10', label: '₹6 - ₹10 LPA' },
      { value: '10-20', label: '₹10 - ₹20 LPA' },
      { value: '20+', label: '₹20+ LPA' }
    ]
  };

  const popularLocations = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'
  ];

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all' && value !== '');

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <button
          onClick={onToggle}
          className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
        >
          <Filter className="h-5 w-5 mr-2" />
          <span className="font-medium">Filters</span>
          {hasActiveFilters && (
            <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center text-gray-500 hover:text-red-600 transition-colors text-sm"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </button>
        )}
      </div>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-4 space-y-6">
          {/* Job Category */}
          <div>
            <div className="flex items-center mb-3">
              <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Job Category</label>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {filterOptions.category.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={option.value}
                    checked={filters.category === option.value}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div>
            <div className="flex items-center mb-3">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Job Type</label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.jobType.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="jobType"
                    value={option.value}
                    checked={filters.jobType === option.value}
                    onChange={(e) => updateFilter('jobType', e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center mb-3">
              <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Experience Level</label>
            </div>
            <select
              value={filters.experience}
              onChange={(e) => updateFilter('experience', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filterOptions.experience.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div>
            <div className="flex items-center mb-3">
              <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Salary Range</label>
            </div>
            <select
              value={filters.salary}
              onChange={(e) => updateFilter('salary', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filterOptions.salary.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <div className="flex items-center mb-3">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Location</label>
            </div>
            <input
              type="text"
              placeholder="Enter city or state"
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            />
            <div className="flex flex-wrap gap-1">
              {popularLocations.map((location) => (
                <button
                  key={location}
                  onClick={() => updateFilter('location', location)}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;