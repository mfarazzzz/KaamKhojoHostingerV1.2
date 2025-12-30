import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://kaamkhojo.com'),
  title: {
    default: "KaamKhojo.com - India's Premier 360° Job Portal | Jobs, Services, Freelance, Learning",
    template: '%s | KaamKhojo.com'
  },
  description: "India's complete career ecosystem. Find jobs, hire services, freelance projects, professional networking, skill development, and employment news. Your one-stop platform for career success.",
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
    'freelance',
    'services',
    'professional networking',
    'skill development',
    'employment news',
    'home services',
    'gig economy'
  ],
  authors: [{ name: 'KaamKhojo.com' }],
  creator: 'KaamKhojo.com',
  publisher: 'KaamKhojo.com',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://kaamkhojo.com',
    siteName: 'KaamKhojo.com',
    title: "KaamKhojo.com - India's Premier 360° Job Portal",
    description: "India's complete career ecosystem. Find jobs, hire services, freelance projects, professional networking, skill development, and employment news.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KaamKhojo.com - Your 360° Career Ecosystem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KaamKhojo',
    creator: '@KaamKhojo',
    title: "KaamKhojo.com - India's Premier Job Portal",
    description: "Find jobs, hire services, freelance projects, and grow your career with India's complete career ecosystem.",
    images: ['/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://kaamkhojo.com',
    languages: {
      'en-IN': 'https://kaamkhojo.com',
      'hi-IN': 'https://kaamkhojo.com/hi',
      'ta-IN': 'https://kaamkhojo.com/ta',
      'te-IN': 'https://kaamkhojo.com/te',
      'bn-IN': 'https://kaamkhojo.com/bn',
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'business',
  classification: 'Job Portal',
  other: {
    'msapplication-TileColor': '#2563eb',
    'theme-color': '#2563eb',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://images.pexels.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "KaamKhojo.com",
              "alternateName": "Kaam Khojo",
              "url": "https://kaamkhojo.com",
              "description": "India's leading job portal connecting job seekers with employers across all sectors including government jobs, IT jobs, and blue collar jobs.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://kaamkhojo.com/jobs?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "sameAs": [
                "https://www.facebook.com/kaamkhojo",
                "https://www.twitter.com/kaamkhojo",
                "https://www.linkedin.com/company/kaamkhojo",
                "https://www.instagram.com/kaamkhojo"
              ]
            })
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "KaamKhojo.com",
              "url": "https://kaamkhojo.com",
              "logo": "https://kaamkhojo.com/logo.png",
              "description": "India's premier job portal offering comprehensive job search solutions for all sectors.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressLocality": "New Delhi",
                "addressRegion": "Delhi"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9876543210",
                "contactType": "customer service",
                "email": "contact@kaamkhojo.com"
              }
            })
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}