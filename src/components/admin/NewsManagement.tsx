import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Upload, 
  Download, 
  Search, 
  Filter,
  Calendar,
  Tag,
  Globe,
  Save,
  X,
  Image as ImageIcon,
  FileText
} from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  urgent: boolean;
  publishDate: string;
  lastModified: string;
  views: number;
  image: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

const NewsManagement: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([
    {
      id: '1',
      title: 'SSC CGL 2024: 17,727 Vacancies Announced for Various Posts',
      slug: 'ssc-cgl-2024-17727-vacancies-announced',
      excerpt: 'Staff Selection Commission announces Combined Graduate Level Examination 2024 with increased number of vacancies.',
      content: 'Full article content here...',
      category: 'government',
      tags: ['SSC', 'CGL', 'Government Jobs', '2024'],
      author: 'Admin',
      status: 'published',
      featured: true,
      urgent: true,
      publishDate: '2024-01-15',
      lastModified: '2024-01-15',
      views: 15420,
      image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg',
      seoTitle: 'SSC CGL 2024 Notification: 17,727 Vacancies | Apply Now',
      seoDescription: 'SSC CGL 2024 notification released with 17,727 vacancies. Check eligibility, exam dates, application process and more.',
      seoKeywords: 'SSC CGL 2024, government jobs, SSC notification, CGL exam'
    },
    {
      id: '2',
      title: 'IT Sector Shows 15% Growth in Job Openings This Quarter',
      slug: 'it-sector-15-percent-growth-job-openings',
      excerpt: 'Major IT companies announce massive hiring drives for freshers and experienced professionals.',
      content: 'Full article content here...',
      category: 'private',
      tags: ['IT Jobs', 'Hiring', 'Technology', 'Growth'],
      author: 'Admin',
      status: 'published',
      featured: false,
      urgent: false,
      publishDate: '2024-01-14',
      lastModified: '2024-01-14',
      views: 8930,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      seoTitle: 'IT Jobs Growth 2024: 15% Increase in Openings | Latest Trends',
      seoDescription: 'IT sector hiring surge with 15% growth in job openings. Explore latest opportunities in technology sector.',
      seoKeywords: 'IT jobs, technology hiring, software jobs, IT growth'
    }
  ]);

  const [showEditor, setShowEditor] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showBulkSocial, setShowBulkSocial] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'government',
    tags: '',
    status: 'draft' as const,
    featured: false,
    urgent: false,
    publishDate: new Date().toISOString().split('T')[0],
    image: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });

  const categories = [
    { value: 'govt-jobs', label: 'Latest Govt Jobs' },
    { value: 'results', label: 'Results' },
    { value: 'syllabus', label: 'Syllabus' },
    { value: 'admit-card', label: 'Admit Card' },
    { value: 'answer-keys', label: 'Answer Keys' },
    { value: 'private-jobs', label: 'Private Jobs' },
    { value: 'admissions', label: 'Admissions News' }
  ];

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      tags: article.tags.join(', '),
      status: article.status,
      featured: article.featured,
      urgent: article.urgent,
      publishDate: article.publishDate,
      image: article.image,
      seoTitle: article.seoTitle,
      seoDescription: article.seoDescription,
      seoKeywords: article.seoKeywords
    });
    setShowEditor(true);
  };

  const handleSave = () => {
    const articleData = {
      ...formData,
      id: editingArticle?.id || Date.now().toString(),
      tags: formData.tags.split(',').map(tag => tag.trim()),
      author: 'Admin',
      lastModified: new Date().toISOString().split('T')[0],
      views: editingArticle?.views || 0
    };

    if (editingArticle) {
      setArticles(articles.map(article => 
        article.id === editingArticle.id ? { ...article, ...articleData } : article
      ));
    } else {
      setArticles([...articles, articleData as NewsArticle]);
    }

    setShowEditor(false);
    setEditingArticle(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'government',
      tags: '',
      status: 'draft',
      featured: false,
      urgent: false,
      publishDate: new Date().toISOString().split('T')[0],
      image: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: ''
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
      seoTitle: title.length > 60 ? title.substring(0, 57) + '...' : title
    });
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || article.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || article.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleBulkImport = () => {
    alert('Bulk import functionality - Upload CSV/Excel files with article data');
  };

  const handleBulkSocialPost = () => {
    if (selectedArticles.length === 0) {
      alert('Please select articles to post on social media');
      return;
    }
    setShowBulkSocial(true);
  };

  const handleSocialMediaPost = (platforms: string[]) => {
    // Simulate social media posting
    console.log('Posting to platforms:', platforms);
    console.log('Selected articles:', selectedArticles);
    
    alert(`Posting ${selectedArticles.length} articles to ${platforms.length} social media platforms. This would integrate with social media APIs for automated posting.`);
    setSelectedArticles([]);
    setShowBulkSocial(false);
  };
  const handleExport = () => {
    // Simulate export functionality
    const dataStr = JSON.stringify(articles, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'news-articles.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (showEditor) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingArticle ? 'Edit Article' : 'Create New Article'}
            </h2>
            <button
              onClick={() => {
                setShowEditor(false);
                setEditingArticle(null);
                resetForm();
              }}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter article title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="article-url-slug"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the article"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write your article content here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Settings */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-4">Publish Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                    <input
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured Article</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.urgent}
                        onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Urgent News</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* SEO Settings */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-4">SEO Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="SEO optimized title"
                      maxLength={60}
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.seoTitle.length}/60 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label>
                    <textarea
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="SEO meta description"
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.seoDescription.length}/160 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO Keywords</label>
                    <input
                      type="text"
                      value={formData.seoKeywords}
                      onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Article
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">News Management</h2>
            <p className="text-gray-600">Manage employment news and articles</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleBulkImport}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              Bulk Import
            </button>
            {selectedArticles.length > 0 && (
              <button
                onClick={handleBulkSocialPost}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Globe className="h-4 w-4 mr-2" />
                Post to Social ({selectedArticles.length})
              </button>
            )}
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button
              onClick={() => setShowEditor(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            {filteredArticles.length} articles found
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedArticles.length === filteredArticles.length && filteredArticles.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedArticles(filteredArticles.map(a => a.id));
                      } else {
                        setSelectedArticles([]);
                      }
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Article</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedArticles.includes(article.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedArticles([...selectedArticles, article.id]);
                        } else {
                          setSelectedArticles(selectedArticles.filter(id => id !== article.id));
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium text-gray-900">{article.title}</h3>
                          {article.featured && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Featured</span>
                          )}
                          {article.urgent && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Urgent</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{article.excerpt.substring(0, 100)}...</p>
                        <div className="flex items-center gap-2 mt-2">
                          {article.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
                      {article.category.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                      article.status === 'published' ? 'bg-green-100 text-green-800' :
                      article.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {article.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(article.publishDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(`/news/${article.slug}`, '_blank')}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Article"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(article)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit Article"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Article"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Social Media Posting Modal */}
      {showBulkSocial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Bulk Social Media Posting</h3>
              <button
                onClick={() => setShowBulkSocial(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Post {selectedArticles.length} selected articles to social media platforms and messaging channels.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { id: 'facebook', name: 'Facebook', color: 'bg-blue-600' },
                  { id: 'twitter', name: 'Twitter', color: 'bg-sky-500' },
                  { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700' },
                  { id: 'instagram', name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
                  { id: 'whatsapp', name: 'WhatsApp Business', color: 'bg-green-500' },
                  { id: 'telegram', name: 'Telegram Channel', color: 'bg-blue-500' }
                ].map((platform) => (
                  <label key={platform.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
                    />
                    <div className={`w-4 h-4 rounded mr-3 ${platform.color}`}></div>
                    <span className="font-medium text-gray-900">{platform.name}</span>
                  </label>
                ))}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">Posting Schedule</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-800 mb-1">Start Time</label>
                    <input
                      type="datetime-local"
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      defaultValue={new Date().toISOString().slice(0, 16)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-800 mb-1">Interval (minutes)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      defaultValue={30}
                      min={5}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowBulkSocial(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSocialMediaPost(['facebook', 'twitter', 'linkedin', 'whatsapp', 'telegram'])}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Schedule Posts
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManagement;