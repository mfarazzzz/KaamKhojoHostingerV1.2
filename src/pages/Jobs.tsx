import React, { useState, useMemo } from 'react';
import { Search, MapPin, SlidersHorizontal, Grid, List } from 'lucide-react';
import JobCard from '../components/JobCard';
import SearchFilters from '../components/SearchFilters';
import { Job } from '../utils/types';

const Jobs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    category: 'all',
    jobType: 'all',
    experience: 'all',
    salary: 'all',
    location: ''
  });

  // Mock job data with enhanced SEO-friendly content
  const allJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer - React & Node.js',
      company: 'TechCorp India',
      location: 'Bangalore, Karnataka',
      salary: '₹12-18 LPA',
      type: 'full-time',
      category: 'white-collar',
      experience: '3-5 years',
      description: 'Join our dynamic team as a Senior Software Engineer specializing in React and Node.js. You will be responsible for developing scalable web applications, mentoring junior developers, and implementing best practices in modern web development.',
      requirements: ['React', 'Node.js', 'MongoDB', 'AWS'],
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      skills: ['React', 'JavaScript', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
      urgent: true
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
      description: 'Seeking an experienced cook proficient in North Indian and South Indian cuisine. Live-in accommodation available. Must have experience in preparing traditional Indian dishes and managing kitchen operations.',
      requirements: ['Cooking experience', 'North Indian cuisine', 'South Indian cuisine'],
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      skills: ['North Indian Cooking', 'South Indian Cooking', 'Kitchen Management']
    },
    {
      id: '3',
      title: 'Digital Marketing Manager - SEO & SEM Expert',
      company: 'Growth Marketing Co.',
      location: 'Mumbai, Maharashtra',
      salary: '₹8-12 LPA',
      type: 'full-time',
      category: 'white-collar',
      experience: '2-4 years',
      description: 'Lead our digital marketing initiatives including SEO optimization, social media marketing, and paid advertising campaigns. Drive growth through data-driven marketing strategies and performance optimization.',
      requirements: ['Digital Marketing', 'SEO', 'Social Media', 'Google Ads'],
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      skills: ['SEO', 'Google Ads', 'Social Media Marketing', 'Analytics', 'Content Marketing']
    },
    {
      id: '4',
      title: 'Licensed Electrician - Residential & Commercial',
      company: 'City Electrical Services',
      location: 'Pune, Maharashtra',
      salary: '₹20,000-30,000/month',
      type: 'full-time',
      category: 'blue-collar',
      experience: '1-3 years',
      description: 'Perform electrical installation, maintenance, and repair work for residential and commercial properties. Must have relevant certifications and strong knowledge of electrical safety protocols.',
      requirements: ['Electrical certification', 'Safety knowledge', 'Problem-solving'],
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      skills: ['Electrical Wiring', 'Safety Protocols', 'Troubleshooting', 'Installation']
    },
    {
      id: '5',
      title: 'Product Manager - SaaS Platform',
      company: 'StartupXYZ',
      location: 'Hyderabad, Telangana',
      salary: '₹15-25 LPA',
      type: 'full-time',
      category: 'white-collar',
      experience: '4-6 years',
      description: 'Drive product strategy and roadmap for our innovative SaaS platform. Work closely with engineering and design teams to deliver exceptional user experiences and drive business growth.',
      requirements: ['Product Management', 'Agile', 'Data Analysis', 'Stakeholder Management'],
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      skills: ['Product Strategy', 'Agile', 'SQL', 'Wireframing', 'Market Research']
    },
    {
      id: '6',
      title: 'Professional Driver - Corporate Transportation',
      company: 'Transport Solutions',
      location: 'Chennai, Tamil Nadu',
      salary: '₹18,000-25,000/month',
      type: 'full-time',
      category: 'blue-collar',
      experience: '2+ years',
      description: 'Experienced driver needed for corporate transportation services. Must have a clean driving record, excellent knowledge of local routes, and professional demeanor.',
      requirements: ['Valid driving license', 'Clean record', 'Local area knowledge'],
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      skills: ['Driving', 'Route Planning', 'Customer Service', 'Vehicle Maintenance']
    }
  ];

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const matchesSearch = !searchQuery || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesLocation = !location || 
        job.location.toLowerCase().includes(location.toLowerCase());
      
      const matchesCategory = filters.category === 'all' || job.category === filters.category;
      const matchesJobType = filters.jobType === 'all' || job.type === filters.jobType;
      const matchesFiltersLocation = !filters.location || 
        job.location.toLowerCase().includes(filters.location.toLowerCase());

      return matchesSearch && matchesLocation && matchesCategory && matchesJobType && matchesFiltersLocation;
    });
  }, [searchQuery, location, filters, allJobs]);

  const handleApply = (jobId: string) => {
    alert(`Applying for job ${jobId}. This would open the application modal.`);
  };

  const handleSave = (jobId: string) => {
    alert(`Job ${jobId} saved to your favorites.`);
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      jobType: 'all',
      experience: 'all',
      salary: 'all',
      location: ''
    });
    setSearchQuery('');
    setLocation('');
  };

  // Generate dynamic SEO content based on search
  const generateSEOTitle = () => {
    let title = 'Find Jobs in India';
    if (searchQuery) title = `${searchQuery} Jobs`;
    if (location) title += ` in ${location}`;
    if (filters.category !== 'all') {
      title += filters.category === 'white-collar' ? ' - Professional Jobs' : ' - Blue Collar Jobs';
    }
    return `${title} | KaamKhojo.com`;
  };

  const generateSEODescription = () => {
    let desc = `Browse ${filteredJobs.length} job openings`;
    if (searchQuery) desc += ` for ${searchQuery}`;
    if (location) desc += ` in ${location}`;
    desc += ' on KaamKhojo.com. Apply to top companies and find your dream job today.';
    return desc;
  };

  const jobListingStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Job Listings",
    "description": "Latest job openings on KaamKhojo.com",
    "numberOfItems": filteredJobs.length,
    "itemListElement": filteredJobs.map((job, index) => ({
      "@type": "JobPosting",
      "position": index + 1,
      "title": job.title,
      "description": job.description,
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.company
      },
      "jobLocation": {
        "@type": "Place",
        "address": job.location
      },
      "datePosted": job.postedDate.toISOString(),
      "url": `https://kaamkhojo.com/jobs/${job.id}`
    }))
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {searchQuery ? `${searchQuery} Jobs` : 'Find Your Perfect Job'}
              {location && ` in ${location}`}
            </h1>
            <p className="text-gray-600">
              Discover {filteredJobs.length} opportunities that match your skills and preferences
            </p>
          </header>

          {/* Search Bar */}
          <section className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, skills, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Search for jobs by title, skills, or company"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Search jobs by location"
                />
              </div>
              <button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold"
                aria-label="Search for jobs"
              >
                Search
              </button>
            </div>
          </section>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:w-80" role="complementary" aria-label="Job filters">
              <SearchFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
                isOpen={showFilters}
                onToggle={() => setShowFilters(!showFilters)}
              />
            </aside>

            {/* Main Content */}
            <main className="flex-1" role="main">
              {/* Results Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {filteredJobs.length} Jobs Found
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {searchQuery && `Results for "${searchQuery}"`}
                    {location && ` in ${location}`}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    aria-label="Toggle job filters"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </button>
                  
                  <div className="hidden md:flex border border-gray-300 rounded-lg overflow-hidden" role="group" aria-label="View mode selection">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      aria-label="Grid view"
                      aria-pressed={viewMode === 'grid'}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      aria-label="List view"
                      aria-pressed={viewMode === 'list'}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Job Results */}
              {filteredJobs.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    aria-label="Clear all job search filters"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <section className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onApply={handleApply}
                      onSave={handleSave}
                    />
                  ))}
                </section>
              )}

              {/* Load More */}
              {filteredJobs.length > 0 && (
                <div className="text-center mt-12">
                  <button 
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    aria-label="Load more job listings"
                  >
                    Load More Jobs
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;