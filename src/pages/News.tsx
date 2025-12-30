import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  ExternalLink, 
  Search, 
  Bell, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Clock,
  Share2,
  Eye,
  MessageCircle,
  ChevronRight,
  Filter,
  Bookmark,
  Download,
  AlertCircle,
  Users,
  Globe,
  Zap
} from 'lucide-react';
import NewsTicker from '../components/news/NewsTicker';
import SocialShare from '../components/news/SocialShare';
import NewsletterSignup from '../components/news/NewsletterSignup';
import CategorySidebar from '../components/news/CategorySidebar';

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  subCategory?: string;
  tags: string[];
  author: string;
  publishDate: string;
  lastModified: string;
  featured: boolean;
  urgent: boolean;
  trending: boolean;
  views: number;
  likes: number;
  shares: number;
  image: string;
  gallery?: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  readTime: number;
  source?: string;
  externalLink?: string;
  downloadLinks?: Array<{
    title: string;
    url: string;
    type: 'pdf' | 'doc' | 'link';
  }>;
  importantDates?: Array<{
    event: string;
    date: string;
    status: 'upcoming' | 'ongoing' | 'completed';
  }>;
  relatedArticles?: string[];
}

const News: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubCategory, setActiveSubCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // News Categories Structure
  const newsCategories = [
    {
      id: 'govt-jobs',
      label: 'Latest Govt Jobs',
      icon: Award,
      color: 'text-blue-600',
      subCategories: [
        { id: 'central-govt', label: 'Central Government' },
        { id: 'state-govt', label: 'State Government' },
        { id: 'railway', label: 'Railway Jobs' },
        { id: 'banking', label: 'Banking Jobs' },
        { id: 'defence', label: 'Defence Jobs' },
        { id: 'police', label: 'Police Jobs' },
        { id: 'teaching', label: 'Teaching Jobs' },
        { id: 'medical', label: 'Medical Jobs' }
      ]
    },
    {
      id: 'results',
      label: 'Results',
      icon: TrendingUp,
      color: 'text-green-600',
      subCategories: [
        { id: 'ssc-results', label: 'SSC Results' },
        { id: 'upsc-results', label: 'UPSC Results' },
        { id: 'railway-results', label: 'Railway Results' },
        { id: 'banking-results', label: 'Banking Results' },
        { id: 'university-results', label: 'University Results' },
        { id: 'board-results', label: 'Board Results' }
      ]
    },
    {
      id: 'syllabus',
      label: 'Syllabus',
      icon: BookOpen,
      color: 'text-purple-600',
      subCategories: [
        { id: 'ssc-syllabus', label: 'SSC Syllabus' },
        { id: 'upsc-syllabus', label: 'UPSC Syllabus' },
        { id: 'railway-syllabus', label: 'Railway Syllabus' },
        { id: 'banking-syllabus', label: 'Banking Syllabus' },
        { id: 'exam-pattern', label: 'Exam Pattern' }
      ]
    },
    {
      id: 'admit-card',
      label: 'Admit Card',
      icon: Calendar,
      color: 'text-orange-600',
      subCategories: [
        { id: 'ssc-admit', label: 'SSC Admit Card' },
        { id: 'upsc-admit', label: 'UPSC Admit Card' },
        { id: 'railway-admit', label: 'Railway Admit Card' },
        { id: 'banking-admit', label: 'Banking Admit Card' }
      ]
    },
    {
      id: 'answer-keys',
      label: 'Answer Keys',
      icon: ExternalLink,
      color: 'text-red-600',
      subCategories: [
        { id: 'ssc-answer', label: 'SSC Answer Keys' },
        { id: 'upsc-answer', label: 'UPSC Answer Keys' },
        { id: 'railway-answer', label: 'Railway Answer Keys' },
        { id: 'banking-answer', label: 'Banking Answer Keys' }
      ]
    },
    {
      id: 'private-jobs',
      label: 'Private Jobs',
      icon: Users,
      color: 'text-teal-600',
      subCategories: [
        { id: 'it-jobs', label: 'IT Jobs' },
        { id: 'finance-jobs', label: 'Finance Jobs' },
        { id: 'marketing-jobs', label: 'Marketing Jobs' },
        { id: 'hr-jobs', label: 'HR Jobs' },
        { id: 'sales-jobs', label: 'Sales Jobs' }
      ]
    },
    {
      id: 'admissions',
      label: 'Admissions News',
      icon: Globe,
      color: 'text-indigo-600',
      subCategories: [
        { id: 'regular', label: 'Regular Education' },
        { id: 'online-distance', label: 'Online/Distance Education' },
        { id: 'study-abroad', label: 'Study Abroad' },
        { id: 'entrance-exams', label: 'Entrance Exams' },
        { id: 'scholarships', label: 'Scholarships' }
      ]
    }
  ];

  // Sample news articles with comprehensive data
  const newsArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'SSC CGL 2024: 17,727 Vacancies Announced for Combined Graduate Level Posts',
      slug: 'ssc-cgl-2024-17727-vacancies-announced',
      excerpt: 'Staff Selection Commission announces Combined Graduate Level Examination 2024 with increased number of vacancies across different ministries and departments.',
      content: `<div class="prose max-w-none">
        <h2>SSC CGL 2024 Notification Overview</h2>
        <p>The Staff Selection Commission (SSC) has released the official notification for Combined Graduate Level (CGL) Examination 2024, announcing a total of 17,727 vacancies across various Group B and Group C posts in different ministries and departments of the Government of India.</p>
        
        <h3>Key Highlights</h3>
        <ul>
          <li>Total Vacancies: 17,727</li>
          <li>Application Start Date: January 15, 2024</li>
          <li>Application End Date: February 15, 2024</li>
          <li>Tier 1 Exam Date: June 2024 (Tentative)</li>
          <li>Age Limit: 18-32 years (relaxation as per rules)</li>
        </ul>

        <h3>Post-wise Vacancy Distribution</h3>
        <table class="w-full border-collapse border border-gray-300 my-4">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 p-2">Post Name</th>
              <th class="border border-gray-300 p-2">Vacancies</th>
              <th class="border border-gray-300 p-2">Pay Scale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 p-2">Assistant Audit Officer</td>
              <td class="border border-gray-300 p-2">1,200</td>
              <td class="border border-gray-300 p-2">₹44,900-1,42,400</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Income Tax Inspector</td>
              <td class="border border-gray-300 p-2">3,500</td>
              <td class="border border-gray-300 p-2">₹44,900-1,42,400</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Sub Inspector</td>
              <td class="border border-gray-300 p-2">2,800</td>
              <td class="border border-gray-300 p-2">₹35,400-1,12,400</td>
            </tr>
          </tbody>
        </table>

        <h3>How to Apply</h3>
        <ol>
          <li>Visit the official SSC website: ssc.nic.in</li>
          <li>Click on "Apply Online" for CGL 2024</li>
          <li>Register with basic details</li>
          <li>Fill the application form</li>
          <li>Upload required documents</li>
          <li>Pay application fee</li>
          <li>Submit and take printout</li>
        </ol>
      </div>`,
      category: 'govt-jobs',
      subCategory: 'central-govt',
      tags: ['SSC', 'CGL', 'Government Jobs', '2024', 'Central Government'],
      author: 'KaamKhojo Editorial Team',
      publishDate: '2024-01-15',
      lastModified: '2024-01-15',
      featured: true,
      urgent: true,
      trending: true,
      views: 25420,
      likes: 1250,
      shares: 890,
      image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      seoTitle: 'SSC CGL 2024 Notification: 17,727 Vacancies | Apply Online',
      seoDescription: 'SSC CGL 2024 notification released with 17,727 vacancies. Check eligibility, exam dates, application process, syllabus and important dates.',
      seoKeywords: 'SSC CGL 2024, government jobs, SSC notification, CGL exam, central government jobs',
      readTime: 5,
      source: 'SSC Official Website',
      externalLink: 'https://ssc.nic.in',
      downloadLinks: [
        { title: 'Official Notification PDF', url: '#', type: 'pdf' },
        { title: 'Application Form', url: '#', type: 'link' }
      ],
      importantDates: [
        { event: 'Application Start', date: '2024-01-15', status: 'completed' },
        { event: 'Application End', date: '2024-02-15', status: 'upcoming' },
        { event: 'Tier 1 Exam', date: '2024-06-01', status: 'upcoming' }
      ]
    },
    {
      id: '2',
      title: 'UPSC Civil Services Result 2023: Final Results Declared for 1016 Candidates',
      slug: 'upsc-civil-services-result-2023-final-results',
      excerpt: 'Union Public Service Commission declares final results for Civil Services Examination 2023. Check roll numbers and merit list.',
      content: `<div class="prose max-w-none">
        <h2>UPSC CSE 2023 Final Result</h2>
        <p>The Union Public Service Commission (UPSC) has declared the final results of Civil Services Examination 2023. A total of 1,016 candidates have been recommended for appointment to various services.</p>
        
        <h3>Toppers List</h3>
        <ul>
          <li>Rank 1: Aditya Srivastava</li>
          <li>Rank 2: Animesh Pradhan</li>
          <li>Rank 3: Donuru Ananya Reddy</li>
        </ul>
      </div>`,
      category: 'results',
      subCategory: 'upsc-results',
      tags: ['UPSC', 'Civil Services', 'Results', '2023', 'IAS', 'IPS'],
      author: 'News Desk',
      publishDate: '2024-01-14',
      lastModified: '2024-01-14',
      featured: true,
      urgent: false,
      trending: true,
      views: 18900,
      likes: 890,
      shares: 567,
      image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      seoTitle: 'UPSC Civil Services Result 2023: Final Merit List Released',
      seoDescription: 'UPSC CSE 2023 final result declared. Check merit list, toppers, cut-off marks and service allocation details.',
      seoKeywords: 'UPSC result 2023, civil services result, IAS result, merit list, toppers',
      readTime: 3,
      downloadLinks: [
        { title: 'Final Result PDF', url: '#', type: 'pdf' },
        { title: 'Merit List', url: '#', type: 'pdf' }
      ]
    },
    {
      id: '3',
      title: 'Railway Group D Admit Card 2024: Download Hall Ticket for 1.03 Lakh Posts',
      slug: 'railway-group-d-admit-card-2024-download',
      excerpt: 'Indian Railways releases admit card for Group D recruitment 2024. Download hall ticket from official website.',
      content: `<div class="prose max-w-none">
        <h2>Railway Group D Admit Card 2024</h2>
        <p>Indian Railways has released the admit card for Group D recruitment 2024 for 1.03 lakh posts. Candidates can download their hall tickets from the official website.</p>
      </div>`,
      category: 'admit-card',
      subCategory: 'railway-admit',
      tags: ['Railway', 'Group D', 'Admit Card', '2024', 'Hall Ticket'],
      author: 'Railway Correspondent',
      publishDate: '2024-01-13',
      lastModified: '2024-01-13',
      featured: false,
      urgent: true,
      trending: false,
      views: 12500,
      likes: 456,
      shares: 234,
      image: 'https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      seoTitle: 'Railway Group D Admit Card 2024: Download Hall Ticket',
      seoDescription: 'Railway Group D admit card 2024 released. Download hall ticket for 1.03 lakh posts exam from official website.',
      seoKeywords: 'railway group d admit card, hall ticket 2024, railway recruitment',
      readTime: 2
    }
  ];

  // Breaking news ticker items
  const tickerItems = [
    'SSC CGL 2024 Application Extended till Feb 20',
    'UPSC CSE 2024 Notification Expected Soon',
    'Railway Group D Result 2023 Declared',
    'IBPS PO 2024 Registration Starts from Feb 1',
    'SBI Clerk 2024 Notification Released'
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSubCategory = activeSubCategory === 'all' || article.subCategory === activeSubCategory;
    
    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      case 'popular':
        return b.views - a.views;
      case 'trending':
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      default:
        return 0;
    }
  });

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    // Update views
    article.views += 1;
  };

  const handleShare = (article: NewsArticle) => {
    setSelectedArticle(article);
    setShowShareModal(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const newsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Employment News and Government Job Updates",
    "description": "Latest employment news, government job notifications, exam results, and career updates from KaamKhojo.com",
    "numberOfItems": sortedArticles.length,
    "itemListElement": sortedArticles.map((article, index) => ({
      "@type": "NewsArticle",
      "position": index + 1,
      "headline": article.title,
      "description": article.excerpt,
      "datePublished": article.publishDate,
      "dateModified": article.lastModified,
      "url": `https://kaamkhojo.com/news/${article.slug}`,
      "image": article.image,
      "author": {
        "@type": "Organization",
        "name": article.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "KaamKhojo.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://kaamkhojo.com/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://kaamkhojo.com/news/${article.slug}`
      },
      "keywords": article.seoKeywords,
      "articleSection": article.category,
      "wordCount": article.content.length,
      "timeRequired": `PT${article.readTime}M`,
      "interactionStatistic": [
        {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/ReadAction",
          "userInteractionCount": article.views
        },
        {
          "@type": "InteractionCounter", 
          "interactionType": "https://schema.org/LikeAction",
          "userInteractionCount": article.likes
        },
        {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/ShareAction", 
          "userInteractionCount": article.shares
        }
      ]
    }))
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Breaking News Ticker */}
        <NewsTicker items={tickerItems} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Employment News & Updates
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest government job notifications, exam results, 
              admit cards, and career opportunities across India
            </p>
          </header>

          {/* Search and Filters */}
          <section className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news, jobs, results..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="latest">Latest First</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  List
                </button>
              </div>
            </div>

            {/* Quick Category Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All News
              </button>
              {newsCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setActiveSubCategory('all');
                  }}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.label}
                </button>
              ))}
            </div>
          </section>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <CategorySidebar
                categories={newsCategories}
                activeCategory={activeCategory}
                activeSubCategory={activeSubCategory}
                onCategoryChange={setActiveCategory}
                onSubCategoryChange={setActiveSubCategory}
              />
              
              {/* Newsletter Signup */}
              <NewsletterSignup />
              
              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  {[
                    'SSC Official Website',
                    'UPSC Official Website', 
                    'Railway Recruitment',
                    'Banking Jobs Portal',
                    'University Results',
                    'Exam Calendar 2024'
                  ].map((link, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors text-sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              {/* Featured Articles */}
              {sortedArticles.filter(a => a.featured).length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Zap className="h-6 w-6 mr-2 text-yellow-500" />
                    Featured News
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {sortedArticles.filter(a => a.featured).slice(0, 2).map((article) => (
                      <article
                        key={article.id}
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
                        onClick={() => handleArticleClick(article)}
                      >
                        <div className="relative">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4 flex gap-2">
                            {article.urgent && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                Breaking
                              </span>
                            )}
                            {article.trending && (
                              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                Trending
                              </span>
                            )}
                          </div>
                          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                            {article.readTime} min read
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                              {newsCategories.find(c => c.id === article.category)?.label}
                            </span>
                            <span className="text-gray-500 text-xs">
                              {formatDate(article.publishDate)}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {article.title}
                          </h3>

                          <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                {article.views.toLocaleString()}
                              </div>
                              <div className="flex items-center">
                                <Share2 className="h-4 w-4 mr-1" />
                                {article.shares}
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare(article);
                              }}
                              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                            >
                              Share
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* All Articles */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Latest Updates ({sortedArticles.length})
                  </h2>
                </div>

                <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  {sortedArticles.map((article) => (
                    <article
                      key={article.id}
                      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                      onClick={() => handleArticleClick(article)}
                    >
                      <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                        <img
                          src={article.image}
                          alt={article.title}
                          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                            viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                          }`}
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          {article.urgent && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                              Breaking
                            </span>
                          )}
                          {article.trending && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                              Trending
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6 flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                            {newsCategories.find(c => c.id === article.category)?.label}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {formatDate(article.publishDate)}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {article.readTime} min read
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>

                        {/* Important Dates */}
                        {article.importantDates && article.importantDates.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Important Dates:</h4>
                            <div className="space-y-1">
                              {article.importantDates.slice(0, 2).map((date, index) => (
                                <div key={index} className="flex items-center justify-between text-xs">
                                  <span className="text-gray-600">{date.event}</span>
                                  <span className={`font-medium ${
                                    date.status === 'upcoming' ? 'text-orange-600' :
                                    date.status === 'ongoing' ? 'text-green-600' : 'text-gray-500'
                                  }`}>
                                    {date.date}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {article.views.toLocaleString()}
                            </div>
                            <div className="flex items-center">
                              <Share2 className="h-4 w-4 mr-1" />
                              {article.shares}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle bookmark
                              }}
                              className="text-gray-400 hover:text-yellow-500 transition-colors"
                            >
                              <Bookmark className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare(article);
                              }}
                              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                            >
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-12">
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold">
                    Load More Articles
                  </button>
                </div>
              </section>
            </main>
          </div>
        </div>

        {/* Social Share Modal */}
        {showShareModal && selectedArticle && (
          <SocialShare
            article={selectedArticle}
            onClose={() => setShowShareModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default News;