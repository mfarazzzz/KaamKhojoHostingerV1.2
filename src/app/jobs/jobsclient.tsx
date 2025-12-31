'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

/* ================= TYPES ================= */

type Filters = {
  keyword?: string;
  location?: string;
  category?: string;
  jobType?: string;
};

/* ================= COMPONENT ================= */

export default function JobsClient() {
  const router = useRouter();
  const params = useSearchParams();

  /**
   * Update URL query params safely
   * - Removes empty / "all" values
   * - Preserves existing params
   */
  const updateURL = useCallback(
    (updates: Partial<Filters>) => {
      const newParams = new URLSearchParams(
        params ? params.toString() : ''
      );

      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value === 'all') {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      router.push(`/jobs?${newParams.toString()}`);
    },
    [params, router]
  );

  /* ================= UI (EXAMPLE USAGE) ================= */

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Jobs Filters</h1>

      <div className="grid grid-cols-2 gap-4">
        {/* Keyword */}
        <input
          placeholder="Job title or skill"
          defaultValue={params?.get('keyword') ?? ''}
          onChange={(e) =>
            updateURL({ keyword: e.target.value })
          }
          className="border p-2 rounded"
        />

        {/* Location */}
        <input
          placeholder="Location"
          defaultValue={params?.get('location') ?? ''}
          onChange={(e) =>
            updateURL({ location: e.target.value })
          }
          className="border p-2 rounded"
        />

        {/* Job Type */}
        <select
          defaultValue={params?.get('jobType') ?? 'all'}
          onChange={(e) =>
            updateURL({ jobType: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="all">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="internship">Internship</option>
          <option value="contract">Contract</option>
        </select>

        {/* Category */}
        <select
          defaultValue={params?.get('category') ?? 'all'}
          onChange={(e) =>
            updateURL({ category: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="all">All Categories</option>
          <option value="white-collar">White Collar</option>
          <option value="blue-collar">Blue Collar</option>
        </select>
      </div>
    </div>
  );
}
