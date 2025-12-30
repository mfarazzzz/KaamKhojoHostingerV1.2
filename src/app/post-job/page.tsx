import { Metadata } from 'next';
import PostJobPage from '@/components/pages/PostJobPage';

export const metadata: Metadata = {
  title: 'Post a Job - Hire Top Talent | KaamKhojo.com',
  description: 'Post your job openings and connect with talented professionals and skilled workers. Choose from our flexible pricing plans and find the right candidates.',
  keywords: [
    'post job',
    'hire talent',
    'job posting',
    'recruitment',
    'hiring',
    'employer',
    'job board',
    'talent acquisition',
    'workforce',
    'staffing'
  ],
  openGraph: {
    title: 'Post a Job - Hire Top Talent | KaamKhojo.com',
    description: 'Post your job openings and connect with talented professionals and skilled workers.',
    url: 'https://kaamkhojo.com/post-job',
    images: [
      {
        url: '/og-post-job.jpg',
        width: 1200,
        height: 630,
        alt: 'Post Job on KaamKhojo.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Post a Job - Hire Top Talent | KaamKhojo.com',
    description: 'Connect with talented professionals and skilled workers. Post your job today.',
    images: ['/twitter-post-job.jpg'],
  },
  alternates: {
    canonical: 'https://kaamkhojo.com/post-job',
  },
};

export default function PostJob() {
  return <PostJobPage />;
}