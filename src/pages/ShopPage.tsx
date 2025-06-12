import React from 'react';
import { Clock, Star, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { t } from '../data/translations';

const ShopPage: React.FC = () => {
  const { language } = useLanguage();
  const { dietPrograms, purchaseProgram } = useData();

  const handlePurchase = (programId: string) => {
    purchaseProgram(programId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('nav.shop', language)}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'en' && 'Choose from our professionally designed diet programs tailored to your specific health and fitness goals.'}
            {language === 'az' && 'Xüsusi sağlamlıq və fitness məqsədlərinizə uyğun peşəkar şəkildə hazırlanmış diet proqramlarımızdan seçin.'}
            {language === 'ru' && 'Выберите из наших профессионально разработанных диетических программ, адаптированных к вашим конкретным целям здоровья и фитнеса.'}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dietPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title[language]}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${program.price}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{program.duration}</span>
                  <div className="flex items-center space-x-1 ml-auto">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.9</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {program.title[language]}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {program.description[language]}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {program.features[language].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Purchase Button */}
                <button
                  onClick={() => handlePurchase(program.id)}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors transform hover:scale-105 duration-200"
                >
                  {t('common.buy', language)}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {dietPrograms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Star className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {language === 'en' && 'No programs available yet'}
              {language === 'az' && 'Hələ proqram mövcud deyil'}
              {language === 'ru' && 'Пока нет доступных программ'}
            </h3>
            <p className="text-gray-500">
              {language === 'en' && 'Check back soon for new programs!'}
              {language === 'az' && 'Yeni proqramlar üçün yenidən yoxlayın!'}
              {language === 'ru' && 'Скоро появятся новые программы!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;