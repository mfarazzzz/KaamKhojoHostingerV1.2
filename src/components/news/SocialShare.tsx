import React, { useState } from 'react';
import { 
  X, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  MessageCircle,
  Send,
  Copy,
  Check,
  Download,
  Mail
} from 'lucide-react';

interface SocialShareProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    seoKeywords: string;
  };
  onClose: () => void;
}

const SocialShare: React.FC<SocialShareProps> = ({ article, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const articleUrl = `https://kaamkhojo.com/news/${article.slug}`;
  const shareText = `${article.title}\n\n${article.excerpt}\n\nRead more: ${articleUrl}`;

  const socialPlatforms = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      bulkSupported: true
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}&quote=${encodeURIComponent(article.title)}`,
      bulkSupported: true
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}&hashtags=${encodeURIComponent(article.seoKeywords.split(',').join(','))}`,
      bulkSupported: true
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
      bulkSupported: true
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: Send,
      color: 'bg-blue-500 hover:bg-blue-600',
      url: `https://t.me/share/url?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`,
      bulkSupported: true
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      url: '#',
      bulkSupported: false,
      note: 'Copy link to share in Instagram story'
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      url: `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareText)}`,
      bulkSupported: true
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform: typeof socialPlatforms[0]) => {
    if (platform.id === 'instagram') {
      handleCopyLink();
      return;
    }
    
    window.open(platform.url, '_blank', 'width=600,height=400');
  };

  const handleBulkShare = () => {
    if (selectedPlatforms.length === 0) {
      alert('Please select at least one platform for bulk sharing');
      return;
    }

    selectedPlatforms.forEach(platformId => {
      const platform = socialPlatforms.find(p => p.id === platformId);
      if (platform && platform.bulkSupported) {
        setTimeout(() => {
          window.open(platform.url, '_blank', 'width=600,height=400');
        }, 500);
      }
    });

    // Simulate API call for automated posting
    console.log('Bulk sharing to:', selectedPlatforms);
    alert(`Sharing to ${selectedPlatforms.length} platforms. This would integrate with social media APIs for automated posting.`);
  };

  const togglePlatformSelection = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Share Article</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Article Preview */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-4">
            <img
              src={article.image}
              alt={article.title}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                {article.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {article.excerpt}
              </p>
            </div>
          </div>
        </div>

        {/* Copy Link */}
        <div className="p-6 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Article Link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={articleUrl}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
            />
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                copied 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1 inline" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1 inline" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Platforms */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Share on Social Media</h4>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedPlatforms(socialPlatforms.filter(p => p.bulkSupported).map(p => p.id))}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Select All
              </button>
              <button
                onClick={() => setSelectedPlatforms([])}
                className="text-sm text-gray-600 hover:text-gray-700 font-medium"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {socialPlatforms.map((platform) => (
              <div key={platform.id} className="relative">
                <button
                  onClick={() => handleShare(platform)}
                  className={`w-full flex items-center justify-center p-4 rounded-lg text-white font-medium transition-all duration-200 ${platform.color}`}
                >
                  <platform.icon className="h-5 w-5 mr-2" />
                  {platform.name}
                </button>
                
                {platform.bulkSupported && (
                  <label className="absolute top-2 right-2">
                    <input
                      type="checkbox"
                      checked={selectedPlatforms.includes(platform.id)}
                      onChange={() => togglePlatformSelection(platform.id)}
                      className="w-4 h-4 text-blue-600 border-white rounded focus:ring-blue-500"
                    />
                  </label>
                )}
                
                {platform.note && (
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    {platform.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Bulk Share */}
          {selectedPlatforms.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-blue-900">
                    Bulk Share ({selectedPlatforms.length} platforms)
                  </h5>
                  <p className="text-sm text-blue-700">
                    Share to multiple platforms at once
                  </p>
                </div>
                <button
                  onClick={handleBulkShare}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Share All
                </button>
              </div>
            </div>
          )}

          {/* Automated Posting Note */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <Download className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <h5 className="font-medium text-yellow-800">Automated Social Media Posting</h5>
                <p className="text-sm text-yellow-700 mt-1">
                  For content managers: This feature can be configured to automatically post to your social media accounts and messaging channels when new articles are published.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;