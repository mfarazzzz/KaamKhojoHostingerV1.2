import { Metadata } from 'next';
import NewsPage from '@/components/pages/NewsPage';

export const metadata: Metadata = {
  title: 'Employment News & Updates - Latest Government Jobs, Results, Admit Cards | KaamKhojo.com',
  description: 'Stay updated with latest employment news, government job notifications, exam results, admit cards, answer keys, and career opportunities. Get breaking news on SSC, UPSC, Railway, Banking jobs and more.',
  keywords: [
    'employment news',
    'government jobs',
    'exam results',
    'job notifications',
    'SSC CGL',
    'UPSC',
    'railway jobs',
    'banking jobs',
    'admit card',
    'answer keys',
    'job alerts',
    'career news',
    'employment updates',
    'sarkari result'
  ],
  openGraph: {
    title: 'Employment News & Updates - Latest Government Jobs, Results | KaamKhojo.com',
    description: 'Stay updated with latest employment news, government job notifications, exam results, admit cards, and career opportunities.',
    url: 'https://kaamkhojo.com/news',
    images: [
      {
        url: '/og-news.jpg',
        width: 1200,
        height: 630,
        alt: 'Employment News on KaamKhojo.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Employment News & Updates - Latest Government Jobs | KaamKhojo.com',
    description: 'Get breaking news on government jobs, exam results, and career opportunities.',
    images: ['/twitter-news.jpg'],
  },
  alternates: {
    canonical: 'https://kaamkhojo.com/news',
  },
};

export default function News() {
  return <NewsPage />;
}