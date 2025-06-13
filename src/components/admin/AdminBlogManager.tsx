import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { BlogPost } from '../../types';

const AdminBlogManager: React.FC = () => {
  const { blogPosts, createBlogPost, updateBlogPost, deleteBlogPost } = useData();
  const { language } = useLanguage();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title_en: '',
    title_az: '',
    title_ru: '',
    content_en: '',
    content_az: '',
    content_ru: '',
    excerpt_en: '',
    excerpt_az: '',
    excerpt_ru: '',
    image: '',
    author: ''
  });

  const resetForm = () => {
    setFormData({
      title_en: '',
      title_az: '',
      title_ru: '',
      content_en: '',
      content_az: '',
      content_ru: '',
      excerpt_en: '',
      excerpt_az: '',
      excerpt_ru: '',
      image: '',
      author: ''
    });
  };

  const handleCreate = () => {
    setIsCreating(true);
    resetForm();
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setFormData({
      title_en: post.title.en,
      title_az: post.title.az,
      title_ru: post.title.ru,
      content_en: post.content.en,
      content_az: post.content.az,
      content_ru: post.content.ru,
      excerpt_en: post.excerpt.en,
      excerpt_az: post.excerpt.az,
      excerpt_ru: post.excerpt.ru,
      image: post.image,
      author: post.author
    });
  };

  const handleSave = async () => {
    try {
      const postData = {
        title: {
          en: formData.title_en,
          az: formData.title_az,
          ru: formData.title_ru
        },
        content: {
          en: formData.content_en,
          az: formData.content_az,
          ru: formData.content_ru
        },
        excerpt: {
          en: formData.excerpt_en,
          az: formData.excerpt_az,
          ru: formData.excerpt_ru
        },
        image: formData.image,
        author: formData.author,
        date: new Date().toISOString().split('T')[0]
      };

      if (isCreating) {
        await createBlogPost(postData);
        setIsCreating(false);
      } else if (editingId) {
        await updateBlogPost(editingId, postData);
        setEditingId(null);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Error saving blog post');
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlogPost(id);
      } catch (error) {
        console.error('Error deleting blog post:', error);
        alert('Error deleting blog post');
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Post</span>
        </button>
      </div>

      {(isCreating || editingId) && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {isCreating ? 'Create New Post' : 'Edit Post'}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* English */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">English</h4>
              <input
                type="text"
                placeholder="Title (English)"
                value={formData.title_en}
                onChange={(e) => handleChange('title_en', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <textarea
                placeholder="Excerpt (English)"
                value={formData.excerpt_en}
                onChange={(e) => handleChange('excerpt_en', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <textarea
                placeholder="Content (English)"
                value={formData.content_en}
                onChange={(e) => handleChange('content_en', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Azerbaijani */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Azərbaycan</h4>
              <input
                type="text"
                placeholder="Title (Azərbaycan)"
                value={formData.title_az}
                onChange={(e) => handleChange('title_az', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <textarea
                placeholder="Excerpt (Azərbaycan)"
                value={formData.excerpt_az}
                onChange={(e) => handleChange('excerpt_az', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <textarea
                placeholder="Content (Azərbaycan)"
                value={formData.content_az}
                onChange={(e) => handleChange('content_az', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Russian */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Русский</h4>
              <input
                type="text"
                placeholder="Title (Русский)"
                value={formData.title_ru}
                onChange={(e) => handleChange('title_ru', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <textarea
                placeholder="Excerpt (Русский)"
                value={formData.excerpt_ru}
                onChange={(e) => handleChange('excerpt_ru', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <textarea
                placeholder="Content (Русский)"
                value={formData.content_ru}
                onChange={(e) => handleChange('content_ru', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) => handleChange('author', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title[language]}
                </h3>
                <p className="text-gray-600 mb-3">{post.excerpt[language]}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(post)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogManager;