'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import News from '@/pages/News';

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState('news');

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
      <News />
      <Footer />
    </div>
  );
}