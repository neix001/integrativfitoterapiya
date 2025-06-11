import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';
import { t } from '../data/translations';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, isLanguageSelected } = useLanguage();

  if (isLanguageSelected) return null;

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">İnteqrativ Fitoterapiya</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">{t('lang.select', 'en')}</h2>
          <p className="text-gray-600">{t('lang.choose', 'en')}</p>
        </div>
        
        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium text-gray-800 group-hover:text-green-700">
                  {lang.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;