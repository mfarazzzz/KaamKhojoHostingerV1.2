'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Login from '@/pages/Login';

export default function LoginPage() {
  const [currentPage, setCurrentPage] = useState('login');

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
      <Login onPageChange={setCurrentPage} />
      <Footer />
    </div>
  );
}