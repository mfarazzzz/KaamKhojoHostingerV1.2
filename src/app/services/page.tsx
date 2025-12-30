import { Metadata } from 'next';
import ServicesPage from '@/components/pages/ServicesPage';

export const metadata: Metadata = {
  title: 'Professional Services - Home Services, Repair, Beauty & More | KaamKhojo.com',
  description: 'Find trusted local service providers for home services, repairs, beauty, automotive, and more. Book verified professionals with ratings and reviews.',
  keywords: [
    'home services',
    'repair services',
    'beauty services',
    'professional services',
    'local services',
    'service providers',
    'home maintenance',
    'automotive services',
    'tech repair',
    'beauty wellness'
  ],
  openGraph: {
    title: 'Professional Services - Home Services, Repair, Beauty & More | KaamKhojo.com',
    description: 'Find trusted local service providers for home services, repairs, beauty, automotive, and more.',
    url: 'https://kaamkhojo.com/services',
    images: [
      {
        url: '/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Services on KaamKhojo.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Services - Home Services & More | KaamKhojo.com',
    description: 'Book verified professionals with ratings and reviews for all your service needs.',
    images: ['/twitter-services.jpg'],
  },
  alternates: {
    canonical: 'https://kaamkhojo.com/services',
  },
};

export default function Services() {
  return <ServicesPage />;
}