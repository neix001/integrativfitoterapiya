import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../data/translations';

const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">İ</span>
              </div>
              <span className="text-xl font-bold">İnteqrativ Fitoterapiya</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {language === 'en' && 'Transform your life with professional phytotherapy guidance, personalized diet programs, and expert support.'}
              {language === 'az' && 'Peşəkar fitoterapiya rehbərliyi, fərdi diet proqramları və ekspert dəstəyi ilə həyatınızı dəyişdirin.'}
              {language === 'ru' && 'Преобразите свою жизнь с помощью профессиональных рекомендаций по фитотерапии, персонализированных диетических программ и экспертной поддержки.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'en' && 'Quick Links'}
              {language === 'az' && 'Sürətli Keçidlər'}
              {language === 'ru' && 'Быстрые Ссылки'}
            </h3>
            <nav className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-green-400 transition-colors">
                {t('nav.home', language)}
              </Link>
              <Link to="/blog" className="block text-gray-300 hover:text-green-400 transition-colors">
                {t('nav.blog', language)}
              </Link>
              <Link to="/shop" className="block text-gray-300 hover:text-green-400 transition-colors">
                {t('nav.shop', language)}
              </Link>
              <Link to="/classes" className="block text-gray-300 hover:text-green-400 transition-colors">
                {t('nav.classes', language)}
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-green-400 transition-colors">
                {t('nav.contact', language)}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'en' && 'Contact Info'}
              {language === 'az' && 'Əlaqə Məlumatları'}
              {language === 'ru' && 'Контактная Информация'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">info@integfito.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">+994 (55) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">
                  {language === 'en' && 'Baku, Azerbaijan'}
                  {language === 'az' && 'Bakı, Azərbaycan'}
                  {language === 'ru' && 'Баку, Азербайджан'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 İnteqrativ Fitoterapiya. 
            {language === 'en' && ' All rights reserved.'}
            {language === 'az' && ' Bütün hüquqlar qorunur.'}
            {language === 'ru' && ' Все права защищены.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;