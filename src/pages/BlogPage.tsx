import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { t } from '../data/translations';

const BlogPage: React.FC = () => {
  const { language } = useLanguage();
  const { blogPosts } = useData();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('nav.blog', language)}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'en' && 'Discover the latest insights, tips, and research in nutrition and wellness from our expert team.'}
            {language === 'az' && 'Ekspert komandamızdan qida və sağlamlıq sahəsində ən son görüşlər, məsləhətlər və araşdırmaları kəşf edin.'}
            {language === 'ru' && 'Откройте для себя последние идеи, советы и исследования в области питания и здоровья от нашей команды экспертов.'}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title[language]}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {post.title[language]}
                </h2>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt[language]}
                </p>
                
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors group"
                >
                  {t('common.read_more', language)}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {language === 'en' && 'No blog posts yet'}
              {language === 'az' && 'Hələ bloq yazısı yoxdur'}
              {language === 'ru' && 'Пока нет постов в блоге'}
            </h3>
            <p className="text-gray-500">
              {language === 'en' && 'Check back soon for new content!'}
              {language === 'az' && 'Yeni məzmun üçün yenidən yoxlayın!'}
              {language === 'ru' && 'Скоро появится новый контент!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;