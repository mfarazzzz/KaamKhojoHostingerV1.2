import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign, 
  Filter,
  Wrench,
  Home,
  Car,
  Laptop,
  Scissors,
  Camera,
  Briefcase,
  Heart,
  GraduationCap,
  Zap,
  Shield,
  CheckCircle,
  MessageCircle,
  Phone
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  provider: string;
  category: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  skills: string[];
  verified: boolean;
  responseTime: string;
  completedJobs: number;
}

const Services: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  const serviceCategories = [
    { id: 'all', label: 'All Services', icon: Zap },
    { id: 'home-services', label: 'Home Services', icon: Home },
    { id: 'automotive', label: 'Automotive', icon: Car },
    { id: 'tech-repair', label: 'Tech & Repair', icon: Laptop },
    { id: 'beauty-wellness', label: 'Beauty & Wellness', icon: Scissors },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'business', label: 'Business Services', icon: Briefcase },
    { id: 'healthcare', label: 'Healthcare', icon: Heart },
    { id: 'education', label: 'Education & Training', icon: GraduationCap },
  ];

  const services: Service[] = [
    {
      id: '1',
      title: 'Professional House Cleaning Service',
      provider: 'CleanPro Services',
      category: 'home-services',
      location: 'Bangalore, Karnataka',
      price: '₹500-1500/visit',
      rating: 4.8,
      reviews: 245,
      image: 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Professional deep cleaning service for homes and offices. Eco-friendly products, trained staff.',
      skills: ['Deep Cleaning', 'Sanitization', 'Eco-friendly'],
      verified: true,
      responseTime: '2 hours',
      completedJobs: 1200
    },
    {
      id: '2',
      title: 'AC Installation & Repair Expert',
      provider: 'CoolTech Solutions',
      category: 'home-services',
      location: 'Mumbai, Maharashtra',
      price: '₹300-2000/service',
      rating: 4.9,
      reviews: 189,
      image: 'https://images.pexels.com/photos/8005394/pexels-photo-8005394.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Expert AC installation, repair, and maintenance. All brands supported with warranty.',
      skills: ['AC Repair', 'Installation', 'Maintenance'],
      verified: true,
      responseTime: '1 hour',
      completedJobs: 850
    },
    {
      id: '3',
      title: 'Mobile & Laptop Repair Specialist',
      provider: 'TechFix Pro',
      category: 'tech-repair',
      location: 'Delhi, Delhi',
      price: '₹200-5000/repair',
      rating: 4.7,
      reviews: 312,
      image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Quick and reliable mobile and laptop repair services. Genuine parts with warranty.',
      skills: ['Mobile Repair', 'Laptop Repair', 'Data Recovery'],
      verified: true,
      responseTime: '30 minutes',
      completedJobs: 2100
    },
    {
      id: '4',
      title: 'Professional Wedding Photography',
      provider: 'Moments Studio',
      category: 'photography',
      location: 'Chennai, Tamil Nadu',
      price: '₹15,000-50,000/event',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Capture your special moments with professional wedding photography and videography.',
      skills: ['Wedding Photography', 'Videography', 'Photo Editing'],
      verified: true,
      responseTime: '4 hours',
      completedJobs: 450
    },
    {
      id: '5',
      title: 'Car Wash & Detailing Service',
      provider: 'AutoCare Express',
      category: 'automotive',
      location: 'Hyderabad, Telangana',
      price: '₹200-1500/service',
      rating: 4.6,
      reviews: 278,
      image: 'https://images.pexels.com/photos/3354648/pexels-photo-3354648.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Professional car washing and detailing services at your doorstep.',
      skills: ['Car Wash', 'Detailing', 'Interior Cleaning'],
      verified: true,
      responseTime: '2 hours',
      completedJobs: 980
    },
    {
      id: '6',
      title: 'Home Salon Services for Women',
      provider: 'BeautyAtHome',
      category: 'beauty-wellness',
      location: 'Pune, Maharashtra',
      price: '₹300-2500/service',
      rating: 4.8,
      reviews: 423,
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Professional beauty services at home including haircut, facial, manicure, pedicure.',
      skills: ['Hair Styling', 'Facial', 'Manicure', 'Pedicure'],
      verified: true,
      responseTime: '3 hours',
      completedJobs: 1650
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = !searchQuery || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesLocation = !location || service.location.toLowerCase().includes(location.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleBookService = (serviceId: string) => {
    alert(`Booking service ${serviceId}. This would open the booking modal.`);
  };

  const handleContactProvider = (serviceId: string) => {
    alert(`Contacting provider for service ${serviceId}. This would open chat/call options.`);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with trusted local service providers for all your needs. From home services to professional expertise.
            </p>
          </header>

          {/* Search Bar */}
          <section className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services, providers..."
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
                Search Services
              </button>
            </div>
          </section>

          {/* Service Categories */}
          <section className="mb-8">
            <div className="flex flex-wrap gap-3">
              {serviceCategories.map((category) => (
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

          {/* Services Grid */}
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {service.verified && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {service.price}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700 ml-1">{service.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 font-medium mb-2">{service.provider}</p>
                  <p className="text-gray-500 text-sm mb-3 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {service.location}
                  </p>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{service.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Responds in {service.responseTime}
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      {service.completedJobs} jobs completed
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleContactProvider(service.id)}
                      className="flex-1 flex items-center justify-center px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Contact
                    </button>
                    <button
                      onClick={() => handleBookService(service.id)}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold">
              Load More Services
            </button>
          </div>

          {/* Become a Service Provider CTA */}
          <section className="mt-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Become a Service Provider</h2>
            <p className="text-xl text-teal-100 mb-6">
              Join thousands of professionals earning with their skills. Start your service business today.
            </p>
            <button className="px-8 py-3 bg-white text-teal-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
              Start Providing Services
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default Services;