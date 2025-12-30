'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostJob from '@/pages/PostJob';

export default function PostJobPage() {
  const [currentPage, setCurrentPage] = useState('post-job');

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
      <PostJob />
      <Footer />
    </div>
  );
}