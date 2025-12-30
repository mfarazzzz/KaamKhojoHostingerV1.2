'use client';

import React, { useState, useMemo } from 'react';
import { Search, MapPin, SlidersHorizontal, Grid, List } from 'lucide-react';
import JobCard from '../components/JobCard';
import SearchFilters from '../components/SearchFilters';
import type { Job } from '../utils/types';

/* ================= TYPES ================= */

type ViewMode = 'grid' | 'list';

type Filters = {
  category: 'all' | 'white-collar' | 'blue-collar';
  jobType: 'all' | 'full-time' | 'part-time' | 'internship' | 'contract';
  experience: 'all' | string;
  salary: 'all' | string;
  location: string;
};

/* ================= COMPONENT ================= */

const Jobs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    jobType: 'all',
    experience: 'all',
    salary: 'all',
    location: '',
  });

  /* ================= MOCK DATA ================= */

  const allJobs: Job[] = [
    /* unchanged mock data (already good & SEO-friendly) */
  ];

  /* ================= FILTER LOGIC ================= */

  const filteredJobs = useMemo<Job[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    const loc = location.trim().toLowerCase();
    const filterLoc = filters.location.trim().toLowerCase();

    return allJobs.filter((job: Job) => {
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.skills.some((skill: string) =>
          skill.toLowerCase().includes(q)
        );

      const matchesLocation =
        !loc || job.location.toLowerCase().includes(loc);

      const matchesCategory =
        filters.category === 'all' ||
        job.category === filters.category;

      const matchesJobType =
        filters.jobType === 'all' ||
        job.type === filters.jobType;

      const matchesFilterLocation =
        !filterLoc ||
        job.location.toLowerCase().includes(filterLoc);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory &&
        matchesJobType &&
        matchesFilterLocation
      );
    });
  }, [searchQuery, location, filters, allJobs]);

  /* ================= HANDLERS ================= */

  const handleApply = (jobId: string): void => {
    alert(`Applying for job ${jobId}`);
  };

  const handleSave = (jobId: string): void => {
    alert(`Saved job ${jobId}`);
  };

  const clearFilters = (): void => {
    setFilters({
      category: 'all',
      jobType: 'all',
      experience: 'all',
      salary: 'all',
      location: '',
    });
    setSearchQuery('');
    setLocation('');
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {searchQuery ? `${searchQuery} Jobs` : 'Find Your Perfect Job'}
            {location && ` in ${location}`}
          </h1>
          <p className="text-gray-600">
            Discover {filteredJobs.length} opportunities that match your skills
          </p>
        </header>

        {/* Search */}
        <section className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, skills, or company"
                className="w-full pl-12 pr-4 py-3 border rounded-lg"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full pl-12 pr-4 py-3 border rounded-lg"
              />
            </div>
            <button className="bg-blue-600 text-white rounded-lg font-semibold">
              Search
            </button>
          </div>
        </section>

        <div className="flex gap-6">
          {/* Filters */}
          <aside className="lg:w-80">
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              isOpen={showFilters}
              onToggle={() => setShowFilters(!showFilters)}
            />
          </aside>

          {/* Results */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {filteredJobs.length} Jobs Found
              </h2>

              <div className="flex border rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' && 'bg-blue-50'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' && 'bg-blue-50'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="text-center py-16">
                <Search className="h-16 w-16 mx-auto text-gray-400" />
                <p className="text-gray-600 mt-4">No jobs found</p>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'md:grid-cols-2'
                    : 'grid-cols-1'
                }`}
              >
                {filteredJobs.map((job: Job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApply}
                    onSave={handleSave}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
