import { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';

export const metadata: Metadata = {
  title: "KaamKhojo.com - India's Premier 360° Job Portal | Find Your Dream Job",
  description: "Find your dream job on KaamKhojo.com - India's leading job portal. Browse 50,000+ jobs including government jobs, IT jobs, blue collar jobs, and skilled labor opportunities across all major cities.",
  keywords: [
    'jobs in India',
    'government jobs',
    'IT jobs',
    'blue collar jobs',
    'skilled labor',
    'job search',
    'employment',
    'career',
    'naukri',
    'job portal',
    'job vacancies',
    'job opportunities',
    'fresher jobs',
    'experienced jobs',
    'Delhi jobs',
    'Mumbai jobs',
    'Bangalore jobs',
    'Chennai jobs'
  ],
  openGraph: {
    title: "KaamKhojo.com - India's Premier Job Portal",
    description: "Find your dream job on KaamKhojo.com - India's leading job portal with 50,000+ active jobs across all sectors.",
    url: 'https://kaamkhojo.com',
    siteName: 'KaamKhojo.com',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'KaamKhojo.com Homepage',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "KaamKhojo.com - India's Premier Job Portal",
    description: "Find your dream job on KaamKhojo.com - India's leading job portal with 50,000+ active jobs across all sectors.",
    images: ['/twitter-home.jpg'],
  },
  alternates: {
    canonical: 'https://kaamkhojo.com',
  },
};

export default function Home() {
  return <HomePage />;
}