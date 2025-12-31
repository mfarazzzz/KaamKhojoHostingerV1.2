'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type JobFilters = {
  q: string;
  location: string;
  category: string;
};

export default function JobsPage() {
  const params = useSearchParams();

  const [filters, setFilters] = useState<JobFilters>({
    q: '',
    location: '',
    category: ''
  });

  useEffect(() => {
    // ✅ HARD GUARD — TypeScript safe
    if (params === null) return;

    const q = params.get('q') ?? '';
    const location = params.get('location') ?? '';
    const category = params.get('category') ?? '';

    setFilters({ q, location, category });
  }, [params]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Jobs</h1>

      <div className="bg-gray-100 p-4 rounded">
        <p><strong>Keyword:</strong> {filters.q || '—'}</p>
        <p><strong>Location:</strong> {filters.location || '—'}</p>
        <p><strong>Category:</strong> {filters.category || '—'}</p>
      </div>

      <div className="text-gray-500">
        Job listings will be rendered here
      </div>
    </div>
  );
}
