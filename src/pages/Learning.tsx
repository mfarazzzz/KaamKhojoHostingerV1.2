import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Play, 
  Clock, 
  Star, 
  Users,
  Award,
  TrendingUp,
  Code,
  Palette,
  TrendingDown,
  Globe,
  Briefcase,
  CheckCircle,
  Download,
  Eye
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  rating: number;
  reviews: number;
  students: number;
  price: string;
  originalPrice?: string;
  image: string;
  description: string;
  skills: string[];
  certificate: boolean;
  trending: boolean;
  free: boolean;
}

interface SkillPath {
  id: string;
  title: string;
  description: string;
  courses: number;
  duration: string;
  level: string;
  icon: any;
  color: string;
  jobs: number;
}

const Learning: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [activeTab, setActiveTab] = useState<'courses' | 'paths' | 'certifications'>('courses');

  const categories = [
    { id: 'all', label: 'All Categories', icon: Globe },
    { id: 'programming', label: 'Programming', icon: Code },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'marketing', label: 'Marketing', icon: TrendingUp },
    { id: 'data-science', label: 'Data Science', icon: TrendingDown },
  ];

  const courses: Course[] = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp 2024',
      instructor: 'Rajesh Kumar',
      category: 'programming',
      level: 'beginner',
      duration: '40 hours',
      rating: 4.8,
      reviews: 2340,
      students: 15678,
      price: '₹2,999',
      originalPrice: '₹9,999',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and get job-ready.',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
      certificate: true,
      trending: true,
      free: false
    },
    {
      id: '2',
      title: 'UI/UX Design Masterclass - Figma to Prototype',
      instructor: 'Priya Sharma',
      category: 'design',
      level: 'intermediate',
      duration: '25 hours',
      rating: 4.9,
      reviews: 1890,
      students: 8934,
      price: '₹1,999',
      originalPrice: '₹6,999',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Master UI/UX design principles, learn Figma, create stunning designs, and build interactive prototypes.',
      skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Design Systems'],
      certificate: true,
      trending: true,
      free: false
    },
    {
      id: '3',
      title: 'Digital Marketing Complete Course',
      instructor: 'Amit Verma',
      category: 'marketing',
      level: 'beginner',
      duration: '30 hours',
      rating: 4.7,
      reviews: 3456,
      students: 12890,
      price: 'Free',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Learn SEO, Google Ads, Facebook Marketing, Content Marketing, and Analytics. Start your digital marketing career.',
      skills: ['SEO', 'Google Ads', 'Social Media', 'Content Marketing', 'Analytics'],
      certificate: true,
      trending: false,
      free: true
    },
    {
      id: '4',
      title: 'Data Science with Python - Complete Guide',
      instructor: 'Dr. Sneha Reddy',
      category: 'data-science',
      level: 'intermediate',
      duration: '50 hours',
      rating: 4.8,
      reviews: 1567,
      students: 6789,
      price: '₹4,999',
      originalPrice: '₹12,999',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Master Python, Pandas, NumPy, Matplotlib, Machine Learning, and build real data science projects.',
      skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Data Visualization'],
      certificate: true,
      trending: true,
      free: false
    },
    {
      id: '5',
      title: 'Business Communication & Leadership Skills',
      instructor: 'Arjun Patel',
      category: 'business',
      level: 'beginner',
      duration: '15 hours',
      rating: 4.6,
      reviews: 2890,
      students: 11234,
      price: '₹1,499',
      originalPrice: '₹4,999',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Develop essential business communication skills, leadership qualities, and professional presentation abilities.',
      skills: ['Communication', 'Leadership', 'Presentation', 'Team Management', 'Negotiation'],
      certificate: true,
      trending: false,
      free: false
    },
    {
      id: '6',
      title: 'Mobile App Development with React Native',
      instructor: 'Vikash Singh',
      category: 'programming',
      level: 'advanced',
      duration: '35 hours',
      rating: 4.9,
      reviews: 987,
      students: 4567,
      price: '₹3,999',
      originalPrice: '₹8,999',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Build cross-platform mobile apps with React Native. Learn navigation, state management, and app deployment.',
      skills: ['React Native', 'JavaScript', 'Mobile Development', 'Redux', 'Firebase'],
      certificate: true,
      trending: true,
      free: false
    }
  ];

  const skillPaths: SkillPath[] = [
    {
      id: '1',
      title: 'Full Stack Web Developer',
      description: 'Complete path to become a full-stack web developer with modern technologies',
      courses: 8,
      duration: '6 months',
      level: 'Beginner to Advanced',
      icon: Code,
      color: 'from-blue-500 to-purple-600',
      jobs: 15000
    },
    {
      id: '2',
      title: 'UI/UX Designer',
      description: 'Master design thinking, user research, and create beautiful user experiences',
      courses: 6,
      duration: '4 months',
      level: 'Beginner to Intermediate',
      icon: Palette,
      color: 'from-pink-500 to-red-600',
      jobs: 8500
    },
    {
      id: '3',
      title: 'Digital Marketing Specialist',
      description: 'Learn all aspects of digital marketing from SEO to social media advertising',
      courses: 7,
      duration: '3 months',
      level: 'Beginner to Advanced',
      icon: TrendingUp,
      color: 'from-green-500 to-teal-600',
      jobs: 12000
    },
    {
      id: '4',
      title: 'Data Scientist',
      description: 'Master data analysis, machine learning, and AI to solve business problems',
      courses: 9,
      duration: '8 months',
      level: 'Intermediate to Advanced',
      icon: TrendingDown,
      color: 'from-orange-500 to-yellow-600',
      jobs: 6500
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = !searchQuery || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleEnrollCourse = (courseId: string) => {
    alert(`Enrolling in course ${courseId}. This would redirect to the course enrollment page.`);
  };

  const handleStartPath = (pathId: string) => {
    alert(`Starting skill path ${pathId}. This would redirect to the learning path.`);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Learn & Grow</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advance your career with expert-led courses, skill paths, and industry certifications. 
              Learn at your own pace and get job-ready.
            </p>
          </header>

          {/* Search Bar */}
          <section className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, skills, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </section>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-8">
            <div className="flex">
              <button
                onClick={() => setActiveTab('courses')}
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'courses'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Courses ({filteredCourses.length})
              </button>
              <button
                onClick={() => setActiveTab('paths')}
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'paths'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Skill Paths ({skillPaths.length})
              </button>
              <button
                onClick={() => setActiveTab('certifications')}
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'certifications'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Award className="h-5 w-5 mr-2" />
                Certifications
              </button>
            </div>
          </div>

          {/* Content */}
          {activeTab === 'courses' && (
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <article
                  key={course.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {course.trending && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Trending
                      </div>
                    )}
                    {course.free && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Free
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {course.duration}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        course.level === 'beginner' ? 'bg-green-100 text-green-600' :
                        course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700 ml-1">
                          {course.rating} ({course.reviews})
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-2">by {course.instructor}</p>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">{course.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded border"
                        >
                          {skill}
                        </span>
                      ))}
                      {course.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded border">
                          +{course.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {course.students.toLocaleString()} students
                      </div>
                      {course.certificate && (
                        <div className="flex items-center">
                          <Award className="h-3 w-3 mr-1" />
                          Certificate
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-gray-900">{course.price}</span>
                        {course.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleEnrollCourse(course.id)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium"
                      >
                        {course.free ? 'Start Free' : 'Enroll Now'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}

          {activeTab === 'paths' && (
            <section className="grid md:grid-cols-2 gap-6">
              {skillPaths.map((path) => (
                <article
                  key={path.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className={`h-32 bg-gradient-to-r ${path.color} flex items-center justify-center`}>
                    <path.icon className="h-16 w-16 text-white" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{path.title}</h3>
                    <p className="text-gray-600 mb-4">{path.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Courses:</span>
                        <div className="font-semibold text-gray-900">{path.courses} courses</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <div className="font-semibold text-gray-900">{path.duration}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Level:</span>
                        <div className="font-semibold text-gray-900">{path.level}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Job Openings:</span>
                        <div className="font-semibold text-green-600">{path.jobs.toLocaleString()}+</div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleStartPath(path.id)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium"
                    >
                      Start Learning Path
                    </button>
                  </div>
                </article>
              ))}
            </section>
          )}

          {activeTab === 'certifications' && (
            <section className="text-center py-16">
              <Award className="h-24 w-24 text-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Certifications</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Get certified by industry leaders and validate your skills with recognized credentials.
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Google Certified</h3>
                  <p className="text-gray-600 text-sm">Digital Marketing & Analytics</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Microsoft Certified</h3>
                  <p className="text-gray-600 text-sm">Azure & Office 365</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AWS Certified</h3>
                  <p className="text-gray-600 text-sm">Cloud Computing</p>
                </div>
              </div>
            </section>
          )}

          {/* Load More */}
          {activeTab !== 'certifications' && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold">
                Load More {activeTab === 'courses' ? 'Courses' : 'Skill Paths'}
              </button>
            </div>
          )}

          {/* CTA Section */}
          <section className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Become an Instructor</h2>
            <p className="text-xl text-purple-100 mb-6">
              Share your expertise and earn by teaching thousands of students worldwide.
            </p>
            <button className="px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
              Start Teaching
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default Learning;