import { Metadata } from 'next';
import ConnectPage from '@/components/pages/ConnectPage';

export const metadata: Metadata = {
  title: 'Professional Connect - Network with Industry Experts | KaamKhojo.com',
  description: 'Connect with industry professionals, join networking events, and grow your career network. Find mentors, collaborators, and business partners.',
  keywords: [
    'professional networking',
    'industry experts',
    'mentors',
    'business networking',
    'career growth',
    'professional connections',
    'networking events',
    'community',
    'collaboration',
    'mentorship'
  ],
  openGraph: {
    title: 'Professional Connect - Network with Industry Experts | KaamKhojo.com',
    description: 'Connect with industry professionals, join networking events, and grow your career network.',
    url: 'https://kaamkhojo.com/connect',
    images: [
      {
        url: '/og-connect.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Networking on KaamKhojo.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Connect - Network with Experts | KaamKhojo.com',
    description: 'Find mentors, collaborators, and business partners in your industry.',
    images: ['/twitter-connect.jpg'],
  },
  alternates: {
    canonical: 'https://kaamkhojo.com/connect',
  },
};

export default function Connect() {
  return <ConnectPage />;
}