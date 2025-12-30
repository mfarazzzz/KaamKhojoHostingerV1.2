import { Metadata } from 'next';
import LearningPage from '@/components/pages/LearningPage';

export const metadata: Metadata = {
  title: 'Learn & Grow - Online Courses, Skill Development | KaamKhojo.com',
  description: 'Enhance your skills with online courses in programming, design, marketing, and more. Get certified and advance your career with expert-led training.',
  keywords: [
    'online courses',
    'skill development',
    'programming courses',
    'design courses',
    'digital marketing',
    'certification',
    'career growth',
    'learning platform',
    'professional development',
    'skill training'
  ],
  openGraph: {
    title: 'Learn & Grow - Online Courses, Skill Development | KaamKhojo.com',
    description: 'Enhance your skills with online courses in programming, design, marketing, and more. Get certified and advance your career.',
    url: 'https://kaamkhojo.com/learning',
    images: [
      {
        url: '/og-learning.jpg',
        width: 1200,
        height: 630,
        alt: 'Online Learning on KaamKhojo.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn & Grow - Online Courses | KaamKhojo.com',
    description: 'Get certified and advance your career with expert-led training courses.',
    images: ['/twitter-learning.jpg'],
  },
  alternates: {
    canonical: 'https://kaamkhojo.com/learning',
  },
};

export default function Learning() {
  return <LearningPage />;
}