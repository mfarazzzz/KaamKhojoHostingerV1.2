import React from 'react';
import { Briefcase, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'For Job Seekers',
      links: [
        'Browse Jobs',
        'Career Advice',
        'Resume Builder',
        'Skill Assessment',
        'Interview Tips',
        'Salary Calculator'
      ]
    },
    {
      title: 'For Employers',
      links: [
        'Post a Job',
        'Search Resumes',
        'Pricing Plans',
        'Recruitment Solutions',
        'Bulk Hiring',
        'Campus Hiring'
      ]
    },
    {
      title: 'Job Categories',
      links: [
        'IT & Software',
        'Sales & Marketing',
        'Banking & Finance',
        'Engineering',
        'Healthcare',
        'Blue Collar Jobs'
      ]
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Contact Us',
        'Privacy Policy',
        'Terms of Service',
        'Help Center',
        'Success Stories'
      ]
    }
  ];

  const cities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 
    'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Indore', 'Chandigarh'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg mr-3">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  KaamKhojo<span className="text-orange-500">.com</span>
                </h3>
                <p className="text-sm text-gray-400">Find Your Dream Job</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              India's leading job portal connecting talented professionals and skilled workers 
              with their ideal career opportunities.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cities Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h4 className="font-semibold text-white mb-4">Top Cities</h4>
          <div className="flex flex-wrap gap-2">
            {cities.map((city, index) => (
              <a
                key={index}
                href="#"
                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 hover:text-white transition-colors"
              >
                {city}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-800 grid md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-white">contact@kaamkhojo.com</p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <p className="text-white">+91 9876543210</p>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-red-500 mr-3" />
            <div>
              <p className="text-sm text-gray-400">Address</p>
              <p className="text-white">New Delhi, India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 KaamKhojo.com. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;