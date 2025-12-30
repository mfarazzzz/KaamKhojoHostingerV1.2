'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Learning from '@/pages/Learning';

export default function LearningPage() {
  const [currentPage, setCurrentPage] = useState('learning');

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
      <Learning />
      <Footer />
    </div>
  );
}