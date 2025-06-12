import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../data/translations';
import { Language } from '../types';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const location = useLocation();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">İ</span>
            </div>
            <span className="text-xl font-bold text-gray-800">İnteqrativ Fitoterapiya</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t('nav.home', language)}
            </Link>
            <Link
              to="/blog"
              className={`font-medium transition-colors ${
                isActive('/blog') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t('nav.blog', language)}
            </Link>
            <Link
              to="/shop"
              className={`font-medium transition-colors ${
                isActive('/shop') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t('nav.shop', language)}
            </Link>
            <Link
              to="/classes"
              className={`font-medium transition-colors ${
                isActive('/classes') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t('nav.classes', language)}
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors ${
                isActive('/contact') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t('nav.contact', language)}
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm">
                  {languages.find(l => l.code === language)?.flag}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {language.toUpperCase()}
                </span>
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm text-gray-700">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/') ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home', language)}
              </Link>
              <Link
                to="/blog"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/blog') ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.blog', language)}
              </Link>
              <Link
                to="/shop"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/shop') ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.shop', language)}
              </Link>
              <Link
                to="/classes"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/classes') ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.classes', language)}
              </Link>
              <Link
                to="/contact"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/contact') ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact', language)}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;