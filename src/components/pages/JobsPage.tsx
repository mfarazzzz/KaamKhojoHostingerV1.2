'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Jobs from '@/pages/Jobs';
import { useSearchParams } from 'next/navigation';

export default function JobsPage() {
  const [currentPage, setCurrentPage] = useState('jobs');
  const searchParams = useSearchParams();

  useEffect(() => {
    // Handle search parameters from URL
    const query = searchParams.get('q');
    const location = searchParams.get('location');
    const category = searchParams.get('category');
    
    if (query || location || category) {
      console.log('Search params:', { query, location, category });
      // You can pass these to the Jobs component or handle them as needed
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <Jobs />
      <Footer />
    </div>
  );
}