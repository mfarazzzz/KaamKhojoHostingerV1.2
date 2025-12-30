import { Metadata } from 'next';
import FreelancePage from '@/components/pages/FreelancePage';

export const metadata: Metadata = {
  title: 'Freelance Projects & Freelancers - Find Work or Hire Talent | KaamKhojo.com',
  description: 'Discover freelance projects and hire top freelancers in India. Web development, design, writing, marketing and more. Post projects or find freelance work.',
  keywords: [
    'freelance projects',
    'freelancers India',
    'hire freelancers',
    'freelance work',
    'web development',
    'design',
    'writing',
    'digital marketing',
    'remote work',
    'gig economy'
  ],
  openGraph: {
    title: 'Freelance Projects & Freelancers - Find Work or Hire Talent | KaamKhojo.com',
    description: 'Discover freelance projects and hire top freelancers in India. Web development, design, writing, marketing and more.',
    url: 'https://kaamkhojo.com/freelance',
    images: [
      {
        url: '/og-freelance.jpg',
        width: 1200,
        height: 630,
        alt: 'Freelance Marketplace on KaamKhojo.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freelance Projects & Freelancers | KaamKhojo.com',
    description: 'Post projects or find freelance work on India\'s leading freelance marketplace.',
    images: ['/twitter-freelance.jpg'],
  },
  alternates: {
    canonical: 'https://kaamkhojo.com/freelance',
  },
};

export default function Freelance() {
  return <FreelancePage />;
}