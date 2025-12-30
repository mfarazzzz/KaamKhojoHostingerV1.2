import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  label: string;
  icon: any;
  color: string;
  subCategories?: Array<{
    id: string;
    label: string;
  }>;
}

interface CategorySidebarProps {
  categories: Category[];
  activeCategory: string;
  activeSubCategory: string;
  onCategoryChange: (categoryId: string) => void;
  onSubCategoryChange: (subCategoryId: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  activeCategory,
  activeSubCategory,
  onCategoryChange,
  onSubCategoryChange
}) => {
  const activeMainCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <div className="space-y-6">
      {/* Main Categories */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              onCategoryChange('all');
              onSubCategoryChange('all');
            }}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Categories
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onCategoryChange(category.id);
                onSubCategoryChange('all');
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <category.icon className={`h-4 w-4 mr-3 ${
                  activeCategory === category.id ? 'text-white' : category.color
                }`} />
                <span className="text-sm font-medium">{category.label}</span>
              </div>
              {category.subCategories && category.subCategories.length > 0 && (
                <ChevronRight className={`h-4 w-4 transition-transform ${
                  activeCategory === category.id ? 'rotate-90' : ''
                }`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sub Categories */}
      {activeMainCategory && activeMainCategory.subCategories && activeMainCategory.subCategories.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {activeMainCategory.label} - Subcategories
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => onSubCategoryChange('all')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                activeSubCategory === 'all'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All {activeMainCategory.label}
            </button>
            
            {activeMainCategory.subCategories.map((subCategory) => (
              <button
                key={subCategory.id}
                onClick={() => onSubCategoryChange(subCategory.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                  activeSubCategory === subCategory.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {subCategory.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Tags */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'SSC CGL', 'UPSC', 'Railway Jobs', 'Banking', 'Results 2024',
            'Admit Card', 'Answer Keys', 'Government Jobs', 'Private Jobs',
            'Exam Dates', 'Syllabus', 'Notifications'
          ].map((tag, index) => (
            <button
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Important Links */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Important Links</h3>
        <div className="space-y-3">
          {[
            'SSC Official Website',
            'UPSC Official Website',
            'Railway Recruitment Board',
            'IBPS Official Website',
            'SBI Careers Portal'
          ].map((link, index) => (
            <a
              key={index}
              href="#"
              className="block text-sm text-orange-100 hover:text-white transition-colors"
            >
              • {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;