import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  MessageCircle, 
  Users,
  Briefcase,
  Award,
  TrendingUp,
  Code,
  Palette,
  Camera,
  PenTool,
  Globe,
  CheckCircle,
  Phone,
  Video,
  Calendar,
  Clock,
  DollarSign,
  Filter
} from 'lucide-react';

interface Professional {
  id: string;
  name: string;
  title: string;
  company: string;
  category: string;
  location: string;
  experience: string;
  rating: number;
  reviews: number;
  connections: number;
  skills: string[];
  avatar: string;
  verified: boolean;
  premium: boolean;
  responseTime: string;
  hourlyRate?: string;
  availability: 'available' | 'busy' | 'offline';
  bio: string;
  achievements: string[];
}

interface NetworkingEvent {
  id: string;
  title: string;
  type: 'webinar' | 'workshop' | 'networking' | 'conference';
  date: string;
  time: string;
  duration: string;
  attendees: number;
  maxAttendees: number;
  price: string;
  image: string;
  description: string;
  speakers: string[];
  category: string;
}

const Connect: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'professionals' | 'events' | 'groups'>('professionals');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [location, setLocation] = useState('');

  const categories = [
    { id: 'all', label: 'All Professionals', icon: Globe },
    { id: 'technology', label: 'Technology', icon: Code },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'marketing', label: 'Marketing', icon: TrendingUp },
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'writing', label: 'Writing', icon: PenTool },
  ];

  const professionals: Professional[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      title: 'Senior Software Architect',
      company: 'Google India',
      category: 'technology',
      location: 'Bangalore, Karnataka',
      experience: '8+ years',
      rating: 4.9,
      reviews: 234,
      connections: 1250,
      skills: ['React', 'Node.js', 'System Design', 'AWS', 'Microservices'],
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      verified: true,
      premium: true,
      responseTime: '1 hour',
      hourlyRate: '₹2,000-3,000/hour',
      availability: 'available',
      bio: 'Passionate software architect with expertise in building scalable systems. Love mentoring and sharing knowledge.',
      achievements: ['Google Cloud Certified', 'AWS Solutions Architect', 'Tech Speaker']
    },
    {
      id: '2',
      name: 'Arjun Patel',
      title: 'Creative Director',
      company: 'Ogilvy & Mather',
      category: 'design',
      location: 'Mumbai, Maharashtra',
      experience: '6+ years',
      rating: 4.8,
      reviews: 189,
      connections: 890,
      skills: ['Brand Design', 'Creative Strategy', 'Adobe Creative Suite', 'UI/UX', 'Art Direction'],
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      verified: true,
      premium: false,
      responseTime: '2 hours',
      hourlyRate: '₹1,500-2,500/hour',
      availability: 'busy',
      bio: 'Award-winning creative director specializing in brand identity and digital experiences.',
      achievements: ['Cannes Lions Winner', 'D&AD Pencil', 'Brand Impact Award']
    },
    {
      id: '3',
      name: 'Sneha Reddy',
      title: 'Digital Marketing Head',
      company: 'Flipkart',
      category: 'marketing',
      location: 'Hyderabad, Telangana',
      experience: '7+ years',
      rating: 4.9,
      reviews: 312,
      connections: 1580,
      skills: ['Performance Marketing', 'SEO/SEM', 'Social Media', 'Analytics', 'Growth Hacking'],
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      verified: true,
      premium: true,
      responseTime: '30 minutes',
      hourlyRate: '₹1,800-2,800/hour',
      availability: 'available',
      bio: 'Growth-focused digital marketer with proven track record of scaling businesses from startup to IPO.',
      achievements: ['Google Premier Partner', 'Facebook Marketing Expert', 'Growth Hacker Award']
    },
    {
      id: '4',
      name: 'Rahul Kumar',
      title: 'Business Strategy Consultant',
      company: 'McKinsey & Company',
      category: 'business',
      location: 'Delhi, Delhi',
      experience: '10+ years',
      rating: 4.8,
      reviews: 156,
      connections: 2100,
      skills: ['Strategy Consulting', 'Business Analysis', 'Market Research', 'Financial Modeling', 'Operations'],
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      verified: true,
      premium: true,
      responseTime: '4 hours',
      hourlyRate: '₹3,000-5,000/hour',
      availability: 'available',
      bio: 'Strategic business consultant helping companies navigate complex challenges and drive growth.',
      achievements: ['MBA Harvard', 'Strategy Excellence Award', 'Top Consultant 2023']
    }
  ];

  const events: NetworkingEvent[] = [
    {
      id: '1',
      title: 'Future of AI in Indian Startups',
      type: 'webinar',
      date: '2024-01-25',
      time: '7:00 PM',
      duration: '2 hours',
      attendees: 1250,
      maxAttendees: 2000,
      price: 'Free',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Join industry leaders discussing the impact of AI on Indian startup ecosystem and future opportunities.',
      speakers: ['Dr. Radhika Gupta', 'Vikram Chandra', 'Priya Nair'],
      category: 'technology'
    },
    {
      id: '2',
      title: 'Design Thinking Workshop',
      type: 'workshop',
      date: '2024-01-28',
      time: '10:00 AM',
      duration: '6 hours',
      attendees: 45,
      maxAttendees: 50,
      price: '₹2,999',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Hands-on workshop on design thinking methodology with real-world case studies and practical exercises.',
      speakers: ['Arjun Patel', 'Meera Shah'],
      category: 'design'
    },
    {
      id: '3',
      title: 'Startup Founders Networking Meetup',
      type: 'networking',
      date: '2024-01-30',
      time: '6:00 PM',
      duration: '3 hours',
      attendees: 120,
      maxAttendees: 150,
      price: '₹500',
      image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Connect with fellow entrepreneurs, share experiences, and build meaningful business relationships.',
      speakers: ['Various Founders'],
      category: 'business'
    }
  ];

  const filteredProfessionals = professionals.filter(professional => {
    const matchesSearch = !searchQuery || 
      professional.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      professional.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      professional.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || professional.category === selectedCategory;
    const matchesLocation = !location || professional.location.toLowerCase().includes(location.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleConnect = (professionalId: string) => {
    alert(`Sending connection request to professional ${professionalId}.`);
  };

  const handleMessage = (professionalId: string) => {
    alert(`Opening chat with professional ${professionalId}.`);
  };

  const handleJoinEvent = (eventId: string) => {
    alert(`Joining event ${eventId}. This would redirect to registration.`);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Connect</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build meaningful professional relationships, find mentors, and grow your network with industry experts.
            </p>
          </header>

          {/* Search Bar */}
          <section className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search professionals, skills, companies..."
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
                onClick={() => setActiveTab('professionals')}
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'professionals'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="h-5 w-5 mr-2" />
                Professionals ({filteredProfessionals.length})
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'events'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Events ({events.length})
              </button>
              <button
                onClick={() => setActiveTab('groups')}
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'groups'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="h-5 w-5 mr-2" />
                Groups
              </button>
            </div>
          </div>

          {/* Categories */}
          <section className="mb-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
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
          {activeTab === 'professionals' && (
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfessionals.map((professional) => (
                <article
                  key={professional.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={professional.avatar}
                            alt={professional.name}
                            className="w-16 h-16 rounded-full object-cover"
                            loading="lazy"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getAvailabilityColor(professional.availability)}`}></div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-900">{professional.name}</h3>
                            {professional.verified && (
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            )}
                            {professional.premium && (
                              <Award className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                          <p className="text-gray-600 font-medium text-sm">{professional.title}</p>
                          <p className="text-gray-500 text-sm">{professional.company}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getAvailabilityColor(professional.availability)} text-white`}>
                        {getAvailabilityText(professional.availability)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Experience:</span>
                        <div className="font-semibold text-gray-900">{professional.experience}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Rating:</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                          <span className="font-semibold text-gray-900">{professional.rating}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Connections:</span>
                        <div className="font-semibold text-gray-900">{professional.connections.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Response:</span>
                        <div className="font-semibold text-gray-900">{professional.responseTime}</div>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPin className="h-3 w-3 mr-1" />
                      {professional.location}
                    </div>

                    {professional.hourlyRate && (
                      <div className="flex items-center text-sm text-green-600 mb-4">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {professional.hourlyRate}
                      </div>
                    )}

                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">{professional.bio}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {professional.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded border"
                        >
                          {skill}
                        </span>
                      ))}
                      {professional.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded border">
                          +{professional.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleConnect(professional.id)}
                        className="flex-1 flex items-center justify-center px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                      >
                        <Users className="h-4 w-4 mr-1" />
                        Connect
                      </button>
                      <button
                        onClick={() => handleMessage(professional.id)}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}

          {activeTab === 'events' && (
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <article
                  key={event.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        event.type === 'webinar' ? 'bg-blue-100 text-blue-600' :
                        event.type === 'workshop' ? 'bg-green-100 text-green-600' :
                        event.type === 'networking' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                      <span className="text-lg font-bold text-gray-900">{event.price}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {event.time}
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">{event.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {event.attendees}/{event.maxAttendees} attending
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {event.duration}
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      ></div>
                    </div>

                    <button
                      onClick={() => handleJoinEvent(event.id)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium"
                    >
                      {event.price === 'Free' ? 'Join Free' : 'Register Now'}
                    </button>
                  </div>
                </article>
              ))}
            </section>
          )}

          {activeTab === 'groups' && (
            <section className="text-center py-16">
              <Users className="h-24 w-24 text-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Groups</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join industry-specific groups to connect with like-minded professionals and stay updated with trends.
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tech Leaders India</h3>
                  <p className="text-gray-600 text-sm mb-3">15,234 members</p>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Join Group
                  </button>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Startup Founders</h3>
                  <p className="text-gray-600 text-sm mb-3">8,567 members</p>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Join Group
                  </button>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Design Community</h3>
                  <p className="text-gray-600 text-sm mb-3">12,890 members</p>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Join Group
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Load More */}
          {activeTab !== 'groups' && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold">
                Load More {activeTab === 'professionals' ? 'Professionals' : 'Events'}
              </button>
            </div>
          )}

          {/* CTA Section */}
          <section className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Become a Mentor</h2>
            <p className="text-xl text-indigo-100 mb-6">
              Share your expertise and help others grow while building your professional brand.
            </p>
            <button className="px-8 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
              Start Mentoring
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default Connect;