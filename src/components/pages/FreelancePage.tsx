'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Freelance from '@/pages/Freelance';

export default function FreelancePage() {
  const [currentPage, setCurrentPage] = useState('freelance');

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
      <Freelance />
      <Footer />
    </div>
  );
}