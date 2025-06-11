import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { t } from '../data/translations';

const LoginPage: React.FC = () => {
  const { language } = useLanguage();
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        success = await register(formData.email, formData.password, formData.name);
      }

      if (success) {
        navigate('/dashboard');
      } else {
        setError(
          isLogin
            ? (language === 'en' ? 'Invalid email or password' : language === 'az' ? 'Yanlış e-poçt və ya şifrə' : 'Неверный email или пароль')
            : (language === 'en' ? 'Registration failed. Please try again.' : language === 'az' ? 'Qeydiyyat uğursuz oldu. Yenidən cəhd edin.' : 'Регистрация не удалась. Попробуйте еще раз.')
        );
      }
    } catch (err) {
      setError(
        language === 'en' ? 'An error occurred. Please try again.' 
        : language === 'az' ? 'Xəta baş verdi. Yenidən cəhd edin.'
        : 'Произошла ошибка. Попробуйте еще раз.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleDemoLogin = (email: string, password: string) => {
    setFormData({ email, password, name: '' });
    setIsLogin(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {language === 'en' ? 'Loading...' : language === 'az' ? 'Yüklənir...' : 'Загрузка...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">İ</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">İnteqrativ Fitoterapiya</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? t('auth.login', language) : t('auth.register', language)}
          </h1>
          <p className="text-gray-600">
            {isLogin
              ? (language === 'en' ? 'Welcome back! Please sign in to continue.' : language === 'az' ? 'Xoş gəlmisiniz! Davam etmək üçün giriş edin.' : 'Добро пожаловать! Войдите для продолжения.')
              : (language === 'en' ? 'Create your account to get started.' : language === 'az' ? 'Başlamaq üçün hesabınızı yaradın.' : 'Создайте аккаунт для начала работы.')
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field (only for registration) */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.name', language)}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder={language === 'en' ? 'Enter your name' : language === 'az' ? 'Adınızı daxil edin' : 'Введите ваше имя'}
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.email', language)}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder={language === 'en' ? 'Enter your email' : language === 'az' ? 'E-poçtunuzu daxil edin' : 'Введите ваш email'}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.password', language)}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder={language === 'en' ? 'Enter your password' : language === 'az' ? 'Şifrənizi daxil edin' : 'Введите ваш пароль'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting
                ? (language === 'en' ? 'Loading...' : language === 'az' ? 'Yüklənir...' : 'Загрузка...')
                : isLogin
                ? t('auth.login_btn', language)
                : t('auth.register_btn', language)
              }
            </button>

            {/* Toggle between login and register */}
            <div className="text-center">
              <p className="text-gray-600">
                {isLogin ? t('auth.no_account', language) : t('auth.have_account', language)}
                {' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setFormData({ email: '', password: '', name: '' });
                  }}
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                >
                  {isLogin ? t('auth.register', language) : t('auth.login', language)}
                </button>
              </p>
            </div>
          </form>

          {/* Demo credentials info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              {language === 'en' ? 'Demo Instructions:' : language === 'az' ? 'Demo Təlimatları:' : 'Демо Инструкции:'}
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>1. {language === 'en' ? 'Create Admin Account:' : language === 'az' ? 'Admin Hesabı Yaradın:' : 'Создайте Админ Аккаунт:'}</strong>
              </p>
              <p className="ml-4">
                {language === 'en' ? 'Register with email: admin@gmail.com' : language === 'az' ? 'E-poçt ilə qeydiyyat: admin@gmail.com' : 'Зарегистрируйтесь с email: admin@gmail.com'}
              </p>
              <p className="ml-4">
                {language === 'en' ? '(Will automatically get admin privileges)' : language === 'az' ? '(Avtomatik admin hüquqları alacaq)' : '(Автоматически получит права админа)'}
              </p>
              
              <p className="mt-3">
                <strong>2. {language === 'en' ? 'Or create any user account:' : language === 'az' ? 'Və ya istənilən istifadəçi hesabı yaradın:' : 'Или создайте любой пользовательский аккаунт:'}</strong>
              </p>
              <p className="ml-4">
                {language === 'en' ? 'Use any email and password combination' : language === 'az' ? 'İstənilən e-poçt və şifrə kombinasiyası istifadə edin' : 'Используйте любую комбинацию email и пароля'}
              </p>
            </div>
            
            {isLogin && (
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('admin@gmail.com', 'admin123')}
                  className="w-full text-left px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  {language === 'en' ? '🔧 Fill Admin Demo (if account exists)' : language === 'az' ? '🔧 Admin Demo Doldur (hesab varsa)' : '🔧 Заполнить Админ Демо (если аккаунт существует)'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;