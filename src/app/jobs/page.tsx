import { Metadata } from 'next';
import JobsPage from '@/components/pages/JobsPage';

export const metadata: Metadata = {
  title: 'Find Jobs in India - Latest Job Openings | KaamKhojo.com',
  description: 'Browse latest job openings in India. Find professional jobs, blue collar jobs, government jobs, and private sector opportunities. Apply now and advance your career.',
  keywords: [
    'jobs in India',
    'job search',
    'employment opportunities',
    'career',
    'hiring',
    'job vacancies',
    'job portal India',
    'government jobs',
    'private jobs',
    'blue collar jobs',
    'professional jobs'
  ],
  openGraph: {
    title: 'Find Jobs in India - Latest Job Openings | KaamKhojo.com',
    description: 'Browse latest job openings in India. Find professional jobs, blue collar jobs, government jobs, and private sector opportunities.',
    url: 'https://kaamkhojo.com/jobs',
    images: [
      {
        url: '/og-jobs.jpg',
        width: 1200,
        height: 630,
        alt: 'Job Search on KaamKhojo.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Jobs in India - Latest Job Openings | KaamKhojo.com',
    description: 'Browse latest job openings in India. Apply to top companies and find your dream job today.',
    images: ['/twitter-jobs.jpg'],
  },
  alternates: {
    canonical: 'https://kaamkhojo.com/jobs',
  },
};

export default function Jobs() {
  return <JobsPage />;
}