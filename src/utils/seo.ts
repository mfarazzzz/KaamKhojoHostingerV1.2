// SEO utility functions for dynamic content optimization

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  structuredData?: object;
}

// Generate dynamic SEO for job listings
export const generateJobSEO = (
  query?: string, 
  location?: string, 
  category?: string,
  totalJobs?: number
): SEOConfig => {
  let title = 'Find Jobs in India';
  let description = 'Browse latest job openings';
  let keywords = 'jobs in India, job search, employment opportunities';

  if (query) {
    title = `${query} Jobs`;
    description = `Find ${query} job opportunities`;
    keywords = `${query} jobs, ${query} careers, ${query} employment`;
  }

  if (location) {
    title += ` in ${location}`;
    description += ` in ${location}`;
    keywords += `, ${location} jobs, jobs in ${location}`;
  }

  if (category) {
    const categoryLabel = category === 'white-collar' ? 'Professional' : 'Blue Collar';
    title += ` - ${categoryLabel} Jobs`;
    description += ` - ${categoryLabel} positions`;
    keywords += `, ${categoryLabel.toLowerCase()} jobs`;
  }

  if (totalJobs) {
    description += `. ${totalJobs}+ active job listings`;
  }

  title += ' | KaamKhojo.com';
  description += ' on India\'s leading job portal. Apply now and advance your career.';

  return {
    title,
    description,
    keywords,
    canonical: generateCanonicalURL('jobs', { query, location, category })
  };
};

// Generate dynamic SEO for services
export const generateServiceSEO = (
  query?: string,
  location?: string,
  category?: string
): SEOConfig => {
  let title = 'Professional Services';
  let description = 'Find trusted local service providers';
  let keywords = 'professional services, local services, service providers';

  if (query) {
    title = `${query} Services`;
    description = `Find reliable ${query} service providers`;
    keywords = `${query} services, ${query} professionals`;
  }

  if (location) {
    title += ` in ${location}`;
    description += ` in ${location}`;
    keywords += `, ${location} services`;
  }

  if (category) {
    const categoryMap: Record<string, string> = {
      'home-services': 'Home Services',
      'automotive': 'Automotive Services',
      'tech-repair': 'Tech Repair Services',
      'beauty-wellness': 'Beauty & Wellness Services'
    };
    const categoryLabel = categoryMap[category] || category;
    title += ` - ${categoryLabel}`;
    keywords += `, ${categoryLabel.toLowerCase()}`;
  }

  title += ' | KaamKhojo.com';
  description += '. Book verified professionals with ratings and reviews.';

  return {
    title,
    description,
    keywords,
    canonical: generateCanonicalURL('services', { query, location, category })
  };
};

// Generate dynamic SEO for freelance
export const generateFreelanceSEO = (
  type: 'projects' | 'freelancers',
  query?: string,
  category?: string
): SEOConfig => {
  let title = type === 'projects' ? 'Freelance Projects' : 'Hire Freelancers';
  let description = type === 'projects' 
    ? 'Find freelance projects and gig opportunities' 
    : 'Hire top freelancers for your projects';
  let keywords = type === 'projects'
    ? 'freelance projects, gig work, remote work, freelance opportunities'
    : 'hire freelancers, freelance talent, remote workers';

  if (query) {
    title = `${query} ${title}`;
    description = `${description} in ${query}`;
    keywords = `${query} ${keywords}`;
  }

  if (category) {
    const categoryMap: Record<string, string> = {
      'web-development': 'Web Development',
      'mobile-development': 'Mobile Development',
      'design': 'Design & Creative',
      'writing': 'Writing & Content',
      'marketing': 'Digital Marketing'
    };
    const categoryLabel = categoryMap[category] || category;
    title += ` - ${categoryLabel}`;
    keywords += `, ${categoryLabel.toLowerCase()}`;
  }

  title += ' | KaamKhojo.com';
  description += ' on India\'s leading freelance marketplace.';

  return {
    title,
    description,
    keywords,
    canonical: generateCanonicalURL('freelance', { query, category, type })
  };
};

// Generate canonical URLs
export const generateCanonicalURL = (
  page: string, 
  params: Record<string, string | undefined>
): string => {
  const baseURL = 'https://kaamkhojo.com';
  const cleanParams = Object.entries(params)
    .filter(([_, value]) => value && value !== 'all')
    .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
    .join('&');
  
  return cleanParams 
    ? `${baseURL}/${page}?${cleanParams}`
    : `${baseURL}/${page}`;
};

// Generate structured data for job postings
export const generateJobStructuredData = (jobs: any[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Job Listings",
  "description": "Latest job openings on KaamKhojo.com",
  "numberOfItems": jobs.length,
  "itemListElement": jobs.map((job, index) => ({
    "@type": "JobPosting",
    "position": index + 1,
    "title": job.title,
    "description": job.description,
    "identifier": {
      "@type": "PropertyValue",
      "name": "KaamKhojo Job ID",
      "value": job.id
    },
    "datePosted": job.postedDate?.toISOString(),
    "validThrough": job.expiryDate?.toISOString(),
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company,
      "logo": job.companyLogo
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location?.split(',')[0],
        "addressRegion": job.location?.split(',')[1]?.trim(),
        "addressCountry": "IN"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "value": job.salary
      }
    },
    "employmentType": job.type?.toUpperCase().replace('-', '_'),
    "skills": job.skills,
    "url": `https://kaamkhojo.com/jobs/${job.id}`,
    "industry": job.category === 'white-collar' ? 'Professional Services' : 'Skilled Labor'
  }))
});

// Generate structured data for services
export const generateServiceStructuredData = (services: any[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Professional Services",
  "description": "Trusted local service providers on KaamKhojo.com",
  "numberOfItems": services.length,
  "itemListElement": services.map((service, index) => ({
    "@type": "Service",
    "position": index + 1,
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": service.provider
    },
    "areaServed": {
      "@type": "Place",
      "name": service.location
    },
    "offers": {
      "@type": "Offer",
      "price": service.price,
      "priceCurrency": "INR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": service.rating,
      "reviewCount": service.reviews
    },
    "url": `https://kaamkhojo.com/services/${service.id}`
  }))
});

// Generate FAQ structured data
export const generateFAQStructuredData = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Generate breadcrumb data
export const generateBreadcrumbs = (path: string[]): Array<{name: string, url: string}> => {
  const breadcrumbs = [{ name: 'Home', url: 'https://kaamkhojo.com' }];
  
  let currentPath = '';
  path.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
    breadcrumbs.push({
      name,
      url: `https://kaamkhojo.com${currentPath}`
    });
  });
  
  return breadcrumbs;
};

// SEO performance tracking
export const trackSEOMetrics = (page: string, searchParams?: Record<string, string>) => {
  // This would integrate with analytics tools
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      custom_parameters: {
        page_type: page,
        search_query: searchParams?.query,
        location: searchParams?.location,
        category: searchParams?.category
      }
    });
  }
};