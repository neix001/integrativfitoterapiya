import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { t } from '../data/translations';
import { Language } from '../types';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {profile?.name}
                  </span>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{t('nav.dashboard', language)}</span>
                    </Link>
                    {profile?.is_admin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{t('nav.admin', language)}</span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        handleSignOut();
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{t('nav.logout', language)}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  {t('nav.login', language)}
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {t('nav.register', language)}
                </Link>
              </div>
            )}

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
              
              {user && (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.dashboard', language)}
                  </Link>
                  {profile?.is_admin && (
                    <Link
                      to="/admin"
                      className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.admin', language)}
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleSignOut();
                    }}
                    className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left"
                  >
                    {t('nav.logout', language)}
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;