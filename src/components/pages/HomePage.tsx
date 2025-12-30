'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { Star, Shield, Users, Zap, TrendingUp, Award } from 'lucide-react';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleSearchJobs = useCallback((query: string, location: string, category: string) => {
    // Navigate to jobs page with search parameters
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    if (location) searchParams.set('location', location);
    if (category && category !== 'all') searchParams.set('category', category);
    
    const url = `/jobs${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    window.location.href = url;
  }, []);

  const handlePageChange = useCallback((page: string) => {
    window.location.href = `/${page === 'home' ? '' : page}`;
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Verified Jobs',
      description: 'All job postings are verified to ensure authenticity and prevent scams.',
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      icon: Zap,
      title: 'Quick Apply',
      description: 'Apply to multiple jobs with a single click using your saved profile.',
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      icon: Users,
      title: 'Direct Connect',
      description: 'Connect directly with employers and get faster response times.',
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Access skill development resources and career advancement tips.',
      color: 'text-teal-600',
      bg: 'bg-teal-100'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer',
      company: 'Tech Solutions Pvt Ltd',
      content: 'Found my dream job within 2 weeks! The platform made it so easy to connect with the right employers.',
      rating: 5,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Electrician',
      company: 'Home Services',
      content: 'As a skilled worker, I appreciate how this platform values blue-collar jobs. Great experience!',
      rating: 5,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Anjali Verma',
      role: 'Marketing Manager',
      company: 'Digital Agency',
      content: 'The job alerts feature is fantastic. I received notifications for relevant positions immediately.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Jobs', icon: TrendingUp },
    { number: '2 Lakh+', label: 'Registered Users', icon: Users },
    { number: '500+', label: 'Companies', icon: Award },
    { number: '85%', label: 'Success Rate', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1">
        {/* Hero Section */}
        <section itemScope itemType="https://schema.org/WebPageElement">
          <Hero onSearchJobs={handleSearchJobs} onPageChange={setCurrentPage} />
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white" itemScope itemType="https://schema.org/WebPageElement">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose KaamKhojo.com?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're revolutionizing job search in India with innovative features designed for both 
                professional and skilled workers.
              </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <article key={index} className="text-center group" itemScope itemType="https://schema.org/Service">
                  <div className={`inline-flex p-4 rounded-2xl ${feature.bg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3" itemProp="name">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed" itemProp="description">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600" itemScope itemType="https://schema.org/WebPageElement">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center text-white" itemScope itemType="https://schema.org/Statistic">
                  <div className="inline-flex p-3 bg-white bg-opacity-20 rounded-full mb-4">
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <div className="text-4xl font-bold mb-2" itemProp="value">{stat.number}</div>
                  <div className="text-blue-100 font-medium" itemProp="name">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50" itemScope itemType="https://schema.org/WebPageElement">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600">
                Hear from job seekers who found their perfect match through our platform
              </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <article 
                  key={index} 
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                  itemScope 
                  itemType="https://schema.org/Review"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name} - ${testimonial.role}`}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      loading="lazy"
                    />
                    <div itemScope itemType="https://schema.org/Person">
                      <h4 className="font-semibold text-gray-900" itemProp="name">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600" itemProp="jobTitle">{testimonial.role}</p>
                      <p className="text-xs text-gray-500" itemProp="worksFor">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-3" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                    <meta itemProp="bestRating" content="5" />
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed italic" itemProp="reviewBody">"{testimonial.content}"</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600" itemScope itemType="https://schema.org/WebPageElement">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Find Your Next Opportunity?
            </h2>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Join thousands of job seekers who have already found their dream jobs through KaamKhojo.com
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage('jobs')}
                className="px-8 py-4 bg-white text-orange-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
                aria-label="Browse all available jobs on KaamKhojo.com"
              >
                Browse Jobs
              </button>
              <button 
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-orange-600 transition-colors font-semibold text-lg"
                aria-label="Create your profile on KaamKhojo.com"
              >
                Create Profile
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}