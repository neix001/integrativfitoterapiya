import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Clock, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../data/translations';

const HomePage: React.FC = () => {
  const { language } = useLanguage();

  const features = [
    {
      icon: Heart,
      titleKey: 'features.programs.title',
      descKey: 'features.programs.desc',
      link: '/shop'
    },
    {
      icon: Users,
      titleKey: 'features.classes.title',
      descKey: 'features.classes.desc',
      link: '/classes'
    },
    {
      icon: Clock,
      titleKey: 'features.support.title',
      descKey: 'features.support.desc',
      link: '/contact'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {t('home.hero.title', language)}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {t('home.hero.subtitle', language)}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center group"
                >
                  {t('home.cta.explore', language)}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/classes"
                  className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                >
                  {t('home.cta.classes', language)}
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                  alt="Healthy nutrition"
                  className="rounded-2xl shadow-2xl w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-green-400 to-blue-400 rounded-2xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' && 'Why Choose NutriLife?'}
              {language === 'az' && 'Niyə NutriLife Seçməlisiniz?'}
              {language === 'ru' && 'Почему Выбрать NutriLife?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en' && 'We provide comprehensive nutrition solutions tailored to your unique needs and lifestyle.'}
              {language === 'az' && 'Biz sizin unikal ehtiyaclarınıza və həyat tərzinizə uyğun hərtərəfli qida həlləri təqdim edirik.'}
              {language === 'ru' && 'Мы предоставляем комплексные решения по питанию, адаптированные к вашим уникальным потребностям и образу жизни.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group p-8 bg-white rounded-2xl border border-gray-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {t(feature.titleKey, language)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(feature.descKey, language)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: language === 'en' ? 'Happy Clients' : language === 'az' ? 'Məmnun Müştərilər' : 'Довольных Клиентов' },
              { number: '500+', label: language === 'en' ? 'Success Stories' : language === 'az' ? 'Uğur Hekayələri' : 'Истории Успеха' },
              { number: '50+', label: language === 'en' ? 'Expert Nutritionists' : language === 'az' ? 'Ekspert Qida Mütəxəssisləri' : 'Эксперты-Нутрициологи' },
              { number: '24/7', label: language === 'en' ? 'Support Available' : language === 'az' ? 'Dəstək Mövcuddur' : 'Поддержка Доступна' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {language === 'en' && 'Ready to Transform Your Health?'}
            {language === 'az' && 'Sağlamlığınızı Dəyişdirməyə Hazırsınız?'}
            {language === 'ru' && 'Готовы Преобразить Свое Здоровье?'}
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            {language === 'en' && 'Join thousands of satisfied clients who have achieved their health goals with our expert guidance.'}
            {language === 'az' && 'Ekspert rehbərliyimizlə sağlamlıq məqsədlərinə nail olan minlərlə məmnun müştəriyə qoşulun.'}
            {language === 'ru' && 'Присоединяйтесь к тысячам довольных клиентов, которые достигли своих целей в области здоровья с нашим экспертным руководством.'}
          </p>
          <Link
            to="/shop"
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 inline-flex items-center"
          >
            {language === 'en' && 'Start Your Journey'}
            {language === 'az' && 'Səyahətinizə Başlayın'}
            {language === 'ru' && 'Начните Свой Путь'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;