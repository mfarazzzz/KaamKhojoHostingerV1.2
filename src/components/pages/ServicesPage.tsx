'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/pages/Services';

export default function ServicesPage() {
  const [currentPage, setCurrentPage] = useState('services');

  const handlePageChange = (page: string) => {
    if (page === 'home') {
      window.location.href = '/';
    } else {
      window.location.href = `/${page}`;
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      <Services />
      <Footer />
    </div>
  );
}