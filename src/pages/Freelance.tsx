import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign, 
  Filter,
  Code,
  Palette,
  PenTool,
  Camera,
  TrendingUp,
  Globe,
  Users,
  CheckCircle,
  MessageCircle,
  Bookmark,
  Eye,
  Award
} from 'lucide-react';

interface FreelanceProject {
  id: string;
  title: string;
  client: string;
  category: string;
  budget: string;
  duration: string;
  description: string;
  skills: string[];
  proposals: number;
  postedDate: Date;
  urgent: boolean;
  verified: boolean;
  location: string;
  type: 'fixed' | 'hourly';
}

interface Freelancer {
  id: string;
  name: string;
  title: string;
  category: string;
  hourlyRate: string;
  rating: number;
  reviews: number;
  completedProjects: number;
  skills: string[];
  location: string;
  avatar: string;
  verified: boolean;
  responseTime: string;
  successRate: number;
}

const Freelance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'freelancers'>('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [location, setLocation] = useState('');

  const freelanceCategories = [
    { id: 'all', label: 'All Categories', icon: Globe },
    { id: 'web-development', label: 'Web Development', icon: Code },
    { id: 'mobile-development', label: 'Mobile Development', icon: Code },
    { id: 'design', label: 'Design & Creative', icon: Palette },
    { id: 'writing', label: 'Writing & Content', icon: PenTool },
    { id: 'marketing', label: 'Digital Marketing', icon: TrendingUp },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'data-science', label: 'Data Science', icon: TrendingUp },
  ];

  const projects: FreelanceProject[] = [
    {
      id: '1',
      title: 'E-commerce Website Development with React & Node.js',
      client: 'TechStartup Solutions',
      category: 'web-development',
      budget: '₹50,000 - ₹80,000',
      duration: '2-3 months',
      description: 'Looking for an experienced full-stack developer to build a modern e-commerce platform with payment integration, admin panel, and mobile responsiveness.',
      skills: ['React', 'Node.js', 'MongoDB', 'Payment Gateway', 'AWS'],
      proposals: 12,
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      urgent: true,
      verified: true,
      location: 'Remote',
      type: 'fixed'
    },
    {
      id: '2',
      title: 'Mobile App UI/UX Design for Food Delivery App',
      client: 'FoodieExpress',
      category: 'design',
      budget: '₹25,000 - ₹40,000',
      duration: '3-4 weeks',
      description: 'Need a creative designer to design intuitive and modern UI/UX for our food delivery mobile application. Should include user flow, wireframes, and final designs.',
      skills: ['UI/UX Design', 'Figma', 'Mobile Design', 'Prototyping'],
      proposals: 8,
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      urgent: false,
      verified: true,
      location: 'Bangalore',
      type: 'fixed'
    },
    {
      id: '3',
      title: 'Content Writing for Tech Blog - Ongoing Project',
      client: 'TechInsights Media',
      category: 'writing',
      budget: '₹500 - ₹1,000/article',
      duration: 'Ongoing',
      description: 'Seeking experienced tech writers to create engaging articles about latest technology trends, AI, blockchain, and software development.',
      skills: ['Content Writing', 'Technical Writing', 'SEO', 'Research'],
      proposals: 15,
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      urgent: false,
      verified: true,
      location: 'Remote',
      type: 'hourly'
    },
    {
      id: '4',
      title: 'Social Media Marketing Campaign for Fashion Brand',
      client: 'StyleHub Fashion',
      category: 'marketing',
      budget: '₹30,000 - ₹50,000',
      duration: '2 months',
      description: 'Looking for a digital marketing expert to create and manage social media campaigns across Instagram, Facebook, and YouTube for our fashion brand.',
      skills: ['Social Media Marketing', 'Content Creation', 'Instagram Marketing', 'Analytics'],
      proposals: 6,
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      urgent: true,
      verified: true,
      location: 'Mumbai',
      type: 'fixed'
    }
  ];

  const freelancers: Freelancer[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      title: 'Full Stack Developer',
      category: 'web-development',
      hourlyRate: '₹800-1200/hour',
      rating: 4.9,
      reviews: 156,
      completedProjects: 89,
      skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB'],
      location: 'Bangalore, Karnataka',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      verified: true,
      responseTime: '2 hours',
      successRate: 98
    },
    {
      id: '2',
      name: 'Arjun Patel',
      title: 'UI/UX Designer',
      category: 'design',
      hourlyRate: '₹600-900/hour',
      rating: 4.8,
      reviews: 134,
      completedProjects: 67,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      location: 'Mumbai, Maharashtra',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      verified: true,
      responseTime: '1 hour',
      successRate: 96
    },
    {
      id: '3',
      name: 'Sneha Reddy',
      title: 'Content Writer & SEO Specialist',
      category: 'writing',
      hourlyRate: '₹400-600/hour',
      rating: 4.9,
      reviews: 203,
      completedProjects: 145,
      skills: ['Content Writing', 'SEO', 'Copywriting', 'Blog Writing', 'Technical Writing'],
      location: 'Hyderabad, Telangana',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      verified: true,
      responseTime: '30 minutes',
      successRate: 99
    },
    {
      id: '4',
      name: 'Rahul Kumar',
      title: 'Digital Marketing Expert',
      category: 'marketing',
      hourlyRate: '₹500-800/hour',
      rating: 4.7,
      reviews: 98,
      completedProjects: 56,
      skills: ['Google Ads', 'Facebook Marketing', 'SEO', 'Analytics', 'Content Strategy'],
      location: 'Delhi, Delhi',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      verified: true,
      responseTime: '3 hours',
      successRate: 94
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = !searchQuery || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = !searchQuery || 
      freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || freelancer.category === selectedCategory;
    const matchesLocation = !location || freelancer.location.toLowerCase().includes(location.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleApplyProject = (projectId: string) => {
    alert(`Applying to project ${projectId}. This would open the proposal submission form.`);
  };

  const handleContactFreelancer = (freelancerId: string) => {
    alert(`Contacting freelancer ${freelancerId}. This would open the messaging interface.`);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Freelance Marketplace</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with top freelancers or find your next project. Build your career in the gig economy.
            </p>
          </header>

          {/* Search Bar */}
          <section className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects, skills, freelancers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold">
                Search
              </button>
            </div>
          </section>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-8">
            <div className="flex">
              <button
                onClick={() => setActiveTab('projects')}
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'projects'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Briefcase className="h-5 w-5 mr-2" />
                Find Projects ({filteredProjects.length})
              </button>
              <button
                onClick={() => setActiveTab('freelancers')}
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'freelancers'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="h-5 w-5 mr-2" />
                Hire Freelancers ({filteredFreelancers.length})
              </button>
            </div>
          </div>

          {/* Categories */}
          <section className="mb-8">
            <div className="flex flex-wrap gap-3">
              {freelanceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.label}
                </button>
              ))}
            </div>
          </section>

          {/* Content */}
          {activeTab === 'projects' ? (
            <section className="space-y-6">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        {project.urgent && (
                          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                            Urgent
                          </span>
                        )}
                        {project.verified && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-gray-600 font-medium mb-2">{project.client}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {project.budget}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {project.duration}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {project.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {project.proposals} proposals
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleApplyProject(project.id)}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium"
                    >
                      Apply Now
                    </button>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Posted {formatDate(project.postedDate)}</span>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        project.type === 'fixed' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {project.type === 'fixed' ? 'Fixed Price' : 'Hourly Rate'}
                      </span>
                      <button className="text-gray-400 hover:text-blue-600">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFreelancers.map((freelancer) => (
                <article
                  key={freelancer.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={freelancer.avatar}
                        alt={freelancer.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900">{freelancer.name}</h3>
                          {freelancer.verified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-gray-600 font-medium">{freelancer.title}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700 ml-1">
                            {freelancer.rating} ({freelancer.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Hourly Rate:</span>
                        <div className="font-semibold text-gray-900">{freelancer.hourlyRate}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Success Rate:</span>
                        <div className="font-semibold text-green-600">{freelancer.successRate}%</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Projects:</span>
                        <div className="font-semibold text-gray-900">{freelancer.completedProjects}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Response:</span>
                        <div className="font-semibold text-gray-900">{freelancer.responseTime}</div>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPin className="h-3 w-3 mr-1" />
                      {freelancer.location}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {freelancer.skills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded border"
                        >
                          {skill}
                        </span>
                      ))}
                      {freelancer.skills.length > 4 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded border">
                          +{freelancer.skills.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                        <Eye className="h-4 w-4 mr-1" />
                        View Profile
                      </button>
                      <button
                        onClick={() => handleContactFreelancer(freelancer.id)}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold">
              Load More {activeTab === 'projects' ? 'Projects' : 'Freelancers'}
            </button>
          </div>

          {/* CTA Sections */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Post Your Project</h2>
              <p className="text-blue-100 mb-6">
                Get your work done by talented freelancers. Post your project and receive proposals from experts.
              </p>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                Post a Project
              </button>
            </section>

            <section className="bg-gradient-to-r from-teal-600 to-green-600 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Start Freelancing</h2>
              <p className="text-teal-100 mb-6">
                Turn your skills into income. Join thousands of freelancers earning on our platform.
              </p>
              <button className="px-6 py-3 bg-white text-teal-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                Become a Freelancer
              </button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Freelance;