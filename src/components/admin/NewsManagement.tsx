'use client';

import React, { useMemo, useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Download,
  Search,
  Globe,
  Save,
  X,
  FileText
} from 'lucide-react';

/* ===================== TYPES ===================== */

export type ArticleStatus = 'draft' | 'published' | 'archived';

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  status: ArticleStatus;
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

interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  status: ArticleStatus;
  featured: boolean;
  urgent: boolean;
  publishDate: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

/* ===================== CONSTANTS ===================== */

const CATEGORIES = [
  { value: 'govt-jobs', label: 'Latest Govt Jobs' },
  { value: 'results', label: 'Results' },
  { value: 'syllabus', label: 'Syllabus' },
  { value: 'admit-card', label: 'Admit Card' },
  { value: 'answer-keys', label: 'Answer Keys' },
  { value: 'private-jobs', label: 'Private Jobs' },
  { value: 'admissions', label: 'Admissions News' }
];

const EMPTY_FORM: ArticleFormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'govt-jobs',
  tags: '',
  status: 'draft',
  featured: false,
  urgent: false,
  publishDate: new Date().toISOString().split('T')[0],
  image: '',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: ''
};

/* ===================== COMPONENT ===================== */

export default function NewsManagement() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [formData, setFormData] = useState<ArticleFormData>(EMPTY_FORM);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | ArticleStatus>('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [showBulkSocial, setShowBulkSocial] = useState(false);

  /* ===================== HELPERS ===================== */

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      const matchesSearch =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        filterStatus === 'all' || a.status === filterStatus;

      const matchesCategory =
        filterCategory === 'all' || a.category === filterCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [articles, searchQuery, filterStatus, filterCategory]);

  /* ===================== ACTIONS ===================== */

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
    const baseArticle: NewsArticle = {
      id: editingArticle?.id ?? crypto.randomUUID(),
      author: 'Admin',
      views: editingArticle?.views ?? 0,
      lastModified: new Date().toISOString().split('T')[0],
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim())
    };

    setArticles(prev =>
      editingArticle
        ? prev.map(a => (a.id === editingArticle.id ? baseArticle : a))
        : [...prev, baseArticle]
    );

    setEditingArticle(null);
    setFormData(EMPTY_FORM);
    setShowEditor(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this article?')) {
      setArticles(prev => prev.filter(a => a.id !== id));
    }
  };

  /* ===================== RENDER ===================== */

  if (showEditor) {
    return (
      <div className="bg-white p-6 rounded-xl shadow border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {editingArticle ? 'Edit Article' : 'Create Article'}
          </h2>
          <button onClick={() => setShowEditor(false)}>
            <X />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <input
              className="w-full border p-3 rounded"
              placeholder="Title"
              value={formData.title}
              onChange={e =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                  slug: generateSlug(e.target.value),
                  seoTitle: e.target.value.slice(0, 60)
                })
              }
            />

            <textarea
              className="w-full border p-3 rounded"
              rows={3}
              placeholder="Excerpt"
              value={formData.excerpt}
              onChange={e =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
            />

            <textarea
              className="w-full border p-3 rounded"
              rows={10}
              placeholder="Content"
              value={formData.content}
              onChange={e =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </div>

          <div className="space-y-4">
            <select
              className="w-full border p-2 rounded"
              value={formData.status}
              onChange={e =>
                setFormData({
                  ...formData,
                  status: e.target.value as ArticleStatus
                })
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Article
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow border flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">News Management</h2>
          <p className="text-gray-500">Manage articles</p>
        </div>
        <button
          onClick={() => setShowEditor(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border">
        <div className="flex gap-4">
          <input
            className="border p-2 rounded w-full"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <span className="text-sm text-gray-500 flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            {filteredArticles.length} articles
          </span>
        </div>
      </div>
    </div>
  );
}
