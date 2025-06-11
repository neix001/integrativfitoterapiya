import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { t } from '../data/translations';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { blogPosts } = useData();

  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'en' && 'Post Not Found'}
            {language === 'az' && 'Yazı Tapılmadı'}
            {language === 'ru' && 'Пост Не Найден'}
          </h1>
          <Link
            to="/blog"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            {language === 'en' && 'Back to Blog'}
            {language === 'az' && 'Bloqa Qayıt'}
            {language === 'ru' && 'Вернуться к Блогу'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold mb-8 group"
        >
          <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {language === 'en' && 'Back to Blog'}
          {language === 'az' && 'Bloqa Qayıt'}
          {language === 'ru' && 'Вернуться к Блогу'}
        </Link>

        {/* Article */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-64 lg:h-96">
            <img
              src={post.image}
              alt={post.title[language]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title[language]}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content[language]}
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {language === 'en' && 'Related Posts'}
            {language === 'az' && 'Əlaqəli Yazılar'}
            {language === 'ru' && 'Похожие Посты'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-40">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      {relatedPost.title[language]}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {relatedPost.excerpt[language]}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;