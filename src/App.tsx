import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Services from './pages/Services';
import Freelance from './pages/Freelance';
import PostJob from './pages/PostJob';
import News from './pages/News';
import Learning from './pages/Learning';
import Connect from './pages/Connect';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './components/UserProfile';
import JobAlerts from './components/JobAlerts';
import ApplicationTracker from './components/ApplicationTracker';
import { useAuthStore } from './store/authStore';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { isAuthenticated, user } = useAuthStore();

  const handleSearchJobs = (query: string, location: string, category: string) => {
    setCurrentPage('jobs');
    // In a real app, you would pass these search parameters to the Jobs component
    console.log('Search params:', { query, location, category });
  };

  const renderCurrentPage = () => {
    // Admin access
    if (currentPage === 'admin') {
      if (!isAuthenticated || user?.type !== 'admin') {
        return <Login onPageChange={setCurrentPage} />;
      }
      return <AdminDashboard />;
    }

    // Redirect to login if trying to access protected pages
    const protectedPages = ['profile', 'applications', 'saved-jobs', 'job-alerts', 'settings', 'my-services', 'freelance-projects'];
    if (protectedPages.includes(currentPage) && !isAuthenticated) {
      return <Login onPageChange={setCurrentPage} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onSearchJobs={handleSearchJobs} onPageChange={setCurrentPage} />;
      case 'jobs':
        return <Jobs />;
      case 'services':
        return <Services />;
      case 'freelance':
        return <Freelance />;
      case 'post-job':
        return <PostJob />;
      case 'news':
        return <News />;
      case 'learning':
        return <Learning />;
      case 'connect':
        return <Connect />;
      case 'login':
        return <Login onPageChange={setCurrentPage} />;
      case 'profile':
        return <UserProfile />;
      case 'job-alerts':
        return <JobAlerts />;
      case 'applications':
        return <ApplicationTracker />;
      case 'saved-jobs':
        return <div className="min-h-screen bg-gray-50 py-12"><div className="max-w-4xl mx-auto px-4 text-center"><h1 className="text-2xl font-bold text-gray-900 mb-4">Saved Jobs</h1><p className="text-gray-600">This feature is coming soon!</p></div></div>;
      case 'my-services':
        return <div className="min-h-screen bg-gray-50 py-12"><div className="max-w-4xl mx-auto px-4 text-center"><h1 className="text-2xl font-bold text-gray-900 mb-4">My Services</h1><p className="text-gray-600">Manage your service offerings and bookings here.</p></div></div>;
      case 'freelance-projects':
        return <div className="min-h-screen bg-gray-50 py-12"><div className="max-w-4xl mx-auto px-4 text-center"><h1 className="text-2xl font-bold text-gray-900 mb-4">My Projects</h1><p className="text-gray-600">Track your freelance projects and proposals here.</p></div></div>;
      case 'settings':
        return <div className="min-h-screen bg-gray-50 py-12"><div className="max-w-4xl mx-auto px-4 text-center"><h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1><p className="text-gray-600">This feature is coming soon!</p></div></div>;
      default:
        return <Home onSearchJobs={handleSearchJobs} onPageChange={setCurrentPage} />;
    }
  };

  // Don't show header/footer for admin dashboard
  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-white">
        {renderCurrentPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;