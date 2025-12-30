import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  noIndex?: boolean;
  alternateLanguages?: Array<{lang: string, url: string}>;
  breadcrumbs?: Array<{name: string, url: string}>;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "KaamKhojo.com - India's Premier 360° Job Portal | Jobs, Services, Freelance, Learning",
  description = "India's complete career ecosystem. Find jobs, hire services, freelance projects, professional networking, skill development, and employment news. Your one-stop platform for career success.",
  keywords = "jobs in India, government jobs, IT jobs, blue collar jobs, skilled labor, job search, employment, career, naukri, job portal, freelance, services, professional networking, skill development, employment news, home services, gig economy",
  canonical,
  ogImage = "https://kaamkhojo.com/og-image.jpg",
  ogType = "website",
  structuredData,
  noIndex = false,
  alternateLanguages = [],
  breadcrumbs = []
}) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://kaamkhojo.com';
  const canonicalUrl = canonical || currentUrl;

  // Generate breadcrumb structured data
  const breadcrumbStructuredData = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  // Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KaamKhojo.com",
    "alternateName": "Kaam Khojo",
    "url": "https://kaamkhojo.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://kaamkhojo.com/logo.png",
      "width": 300,
      "height": 100
    },
    "description": "India's premier 360-degree job portal offering comprehensive career solutions",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-9876543210",
        "contactType": "customer service",
        "email": "contact@kaamkhojo.com",
        "availableLanguage": ["English", "Hindi", "Tamil", "Telugu", "Bengali"]
      }
    ],
    "sameAs": [
      "https://www.facebook.com/kaamkhojo",
      "https://www.twitter.com/kaamkhojo",
      "https://www.linkedin.com/company/kaamkhojo",
      "https://www.instagram.com/kaamkhojo",
      "https://www.youtube.com/c/kaamkhojo"
    ],
    "foundingDate": "2024",
    "numberOfEmployees": "50-100",
    "slogan": "Your 360° Career Ecosystem"
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="KaamKhojo.com" />
      <meta name="publisher" content="KaamKhojo.com" />
      <meta name="copyright" content="© 2024 KaamKhojo.com. All rights reserved." />
      
      {/* Robots and Indexing */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Language and Locale */}
      <meta name="language" content="English" />
      <meta httpEquiv="content-language" content="en-IN" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Alternate Language URLs */}
      {alternateLanguages.map((alt, index) => (
        <link key={index} rel="alternate" hrefLang={alt.lang} href={alt.url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href="https://kaamkhojo.com" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="KaamKhojo.com" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="hi_IN" />
      <meta property="og:locale:alternate" content="ta_IN" />
      <meta property="og:locale:alternate" content="te_IN" />
      <meta property="og:locale:alternate" content="bn_IN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@KaamKhojo" />
      <meta name="twitter:creator" content="@KaamKhojo" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="KaamKhojo" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.pexels.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
      
      {/* Breadcrumb Structured Data */}
      {breadcrumbStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      )}
      
      {/* Custom Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;