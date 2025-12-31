'use client';

import { useRouter, useSearchParams } from 'next/navigation';
const params = useSearchParams();
type Filters = {
  keyword?: string;
  location?: string;
  category?: string;
  jobType?: string;
};

const updateURL = (updates: Partial<Filters>) => {
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
};
