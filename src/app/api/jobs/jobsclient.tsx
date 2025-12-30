'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import JobCard from '@/components/JobCard';
import type { Job } from '@/types/job';

type Filters = {
  keyword: string;
  location: string;
  category: string;
  jobType: string;
};

interface Props {
  initialJobs: Job[];
  initialFilters: Filters;
}

export default function JobsClient({ initialJobs, initialFilters }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const updateURL = (updates: Partial<Filters>) => {
    const newParams = new URLSearchParams(params.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === 'all') newParams.delete(key);
      else newParams.set(key, value);
    });

    router.push(`/jobs?${newParams.toString()}`);
  };

  const filteredJobs = useMemo(() => {
    const q = initialFilters.keyword.toLowerCase();
    const loc = initialFilters.location.toLowerCase();

    return initialJobs.filter((job) => {
      return (
        (!q ||
          job.title.toLowerCase().includes(q) ||
          job.skills.some((s) => s.toLowerCase().includes(q))) &&
        (!loc || job.location.toLowerCase().includes(loc)) &&
        (initialFilters.category === 'all' ||
          job.category === initialFilters.category) &&
        (initialFilters.jobType === 'all' ||
          job.type === initialFilters.jobType)
      );
    });
  }, [initialJobs, initialFilters]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Job</h1>

      {/* Search */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <input
          defaultValue={initialFilters.keyword}
          placeholder="Job title or skill"
          onChange={(e) =>
            updateURL({ keyword: e.target.value })
          }
          className="border p-3 rounded"
        />

        <input
          defaultValue={initialFilters.location}
          placeholder="Location"
          onChange={(e) =>
            updateURL({ location: e.target.value })
          }
          className="border p-3 rounded"
        />
      </div>

      <p className="mb-4">{filteredJobs.length} jobs found</p>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
