import React from 'react';
import { MapPin, Clock, DollarSign, Briefcase, Star, Bookmark } from 'lucide-react';
import { Job } from '../utils/types';

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
  onSave: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply, onSave }) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const getCategoryStyle = (category: string) => {
    return category === 'white-collar' 
      ? 'bg-blue-100 text-blue-800'
      : 'bg-teal-100 text-teal-800';
  };

  const getTypeStyle = (type: string) => {
    const styles = {
      'full-time': 'bg-green-100 text-green-800',
      'part-time': 'bg-yellow-100 text-yellow-800',
      'internship': 'bg-purple-100 text-purple-800',
      'contract': 'bg-gray-100 text-gray-800'
    };
    return styles[type as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  // Generate structured data for job posting
  const jobStructuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "identifier": {
      "@type": "PropertyValue",
      "name": "KaamKhojo Job ID",
      "value": job.id
    },
    "datePosted": job.postedDate.toISOString(),
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location.split(',')[0],
        "addressRegion": job.location.split(',')[1]?.trim(),
        "addressCountry": "IN"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "value": job.salary
      }
    },
    "employmentType": job.type.toUpperCase().replace('-', '_'),
    "skills": job.skills,
    "url": `https://kaamkhojo.com/jobs/${job.id}`
  };

  return (
    <article 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 group"
      itemScope 
      itemType="https://schema.org/JobPosting"
    >
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jobStructuredData)}
      </script>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 
              className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors"
              itemProp="title"
            >
              {job.title}
            </h3>
            {job.urgent && (
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                Urgent
              </span>
            )}
          </div>
          <p className="text-gray-600 font-medium mb-1" itemProp="hiringOrganization" itemScope itemType="https://schema.org/Organization">
            <span itemProp="name">{job.company}</span>
          </p>
          <div className="flex items-center text-gray-500 text-sm" itemProp="jobLocation" itemScope itemType="https://schema.org/Place">
            <MapPin className="h-4 w-4 mr-1" />
            <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="addressLocality">{job.location}</span>
            </span>
          </div>
        </div>
        <button
          onClick={() => onSave(job.id)}
          className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
          aria-label={`Save ${job.title} job`}
        >
          <Bookmark className="h-5 w-5" />
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryStyle(job.category)}`}>
          {job.category === 'white-collar' ? 'Professional' : 'Skilled Labor'}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeStyle(job.type)}`} itemProp="employmentType">
          {job.type.replace('-', ' ').toUpperCase()}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          {job.experience}
        </span>
      </div>

      {/* Job Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600" itemProp="baseSalary" itemScope itemType="https://schema.org/MonetaryAmount">
          <DollarSign className="h-4 w-4 mr-2 text-green-600" />
          <span className="font-medium" itemProp="value">{job.salary}</span>
          <meta itemProp="currency" content="INR" />
        </div>
        
        <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed" itemProp="description">
          {job.description}
        </p>

        {/* Skills */}
        {job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {job.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded border"
                itemProp="skills"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded border">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <time dateTime={job.postedDate.toISOString()} itemProp="datePosted">
            Posted {formatDate(job.postedDate)}
          </time>
        </div>
        
        <div className="flex gap-2">
          <button 
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
            aria-label={`View details for ${job.title}`}
          >
            View Details
          </button>
          <button
            onClick={() => onApply(job.id)}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium transform hover:scale-105"
            aria-label={`Apply for ${job.title} at ${job.company}`}
          >
            Apply Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default JobCard;