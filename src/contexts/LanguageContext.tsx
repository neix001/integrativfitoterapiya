import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLanguageSelected: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
      setIsLanguageSelected(true);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsLanguageSelected(true);
    localStorage.setItem('selectedLanguage', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, isLanguageSelected }}>
      {children}
    </LanguageContext.Provider>
  );
};