import React, { useState } from 'react';
import { Mail, Bell, CheckCircle } from 'lucide-react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail('');
    }, 1000);
  };

  if (subscribed) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Successfully Subscribed!
          </h3>
          <p className="text-sm text-green-700">
            You'll receive the latest employment news and job notifications in your inbox.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-6 text-white mb-6">
      <div className="text-center mb-4">
        <Bell className="h-8 w-8 mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
        <p className="text-blue-100 text-sm">
          Get the latest job notifications, exam updates, and results directly in your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-200" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm disabled:opacity-50"
        >
          {loading ? 'Subscribing...' : 'Subscribe to Updates'}
        </button>
      </form>

      <div className="mt-4 text-xs text-blue-100 text-center">
        <p>📧 Daily job alerts • 🔔 Exam notifications • 📊 Result updates</p>
        <p className="mt-1">Unsubscribe anytime. We respect your privacy.</p>
      </div>
    </div>
  );
};

export default NewsletterSignup;