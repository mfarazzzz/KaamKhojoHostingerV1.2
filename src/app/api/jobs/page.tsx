import JobsClient from '../../jobs/jobsclient';
import type { Job } from '@/types/job';

interface Props {
  searchParams: {
    q?: string;
    location?: string;
    category?: string;
    type?: string;
  };
}

export const metadata = {
  title: 'Find Jobs in India | KaamKhojo',
  description: 'Search latest jobs by location, type, and category',
};

export default async function JobsPage({ searchParams }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`, {
    cache: 'no-store',
  });

  const jobs: Job[] = await res.json();

  return (
    <JobsClient
      initialJobs={jobs}
      initialFilters={{
        keyword: searchParams.q ?? '',
        location: searchParams.location ?? '',
        category: (searchParams.category as any) ?? 'all',
        jobType: (searchParams.type as any) ?? 'all',
      }}
    />
  );
}
