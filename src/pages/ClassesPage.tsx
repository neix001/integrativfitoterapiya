import React from 'react';
import { Calendar, Clock, Users, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { t } from '../data/translations';

const ClassesPage: React.FC = () => {
  const { language } = useLanguage();
  const { liveClasses, purchaseTicket } = useData();
  const { user } = useAuth();

  const handlePurchaseTicket = (classId: string) => {
    if (!user) {
      alert(language === 'en' ? 'Please login to purchase tickets' : language === 'az' ? 'Bilet almaq üçün giriş edin' : 'Войдите для покупки билетов');
      return;
    }
    
    purchaseTicket(classId);
    alert(
      language === 'en' 
        ? 'Ticket purchased successfully! Check your email for class details and access link.' 
        : language === 'az' 
        ? 'Bilet uğurla satın alındı! Sinif təfərrüatları və giriş linki üçün e-poçtunuzu yoxlayın.'
        : 'Билет успешно куплен! Проверьте вашу электронную почту для получения подробностей о классе и ссылки для доступа.'
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : language === 'az' ? 'az-AZ' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isClassFull = (liveClass: any) => {
    return liveClass.currentParticipants >= liveClass.maxParticipants;
  };

  const isPastClass = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('nav.classes', language)}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'en' && 'Join our expert nutritionists for interactive live sessions designed to help you achieve your health goals.'}
            {language === 'az' && 'Sağlamlıq məqsədlərinizə nail olmaq üçün nəzərdə tutulmuş interaktiv canlı sessiyalar üçün ekspert qida mütəxəssislərimizə qoşulun.'}
            {language === 'ru' && 'Присоединяйтесь к нашим экспертам-нутрициологам для интерактивных живых сессий, разработанных для достижения ваших целей в области здоровья.'}
          </p>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {liveClasses.map((liveClass) => {
            const isFullyBooked = isClassFull(liveClass);
            const isExpired = isPastClass(liveClass.date);
            const canPurchase = !isFullyBooked && !isExpired;

            return (
              <div
                key={liveClass.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                  canPurchase ? 'hover:shadow-xl transform hover:-translate-y-2' : 'opacity-75'
                }`}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {liveClass.title[language]}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {liveClass.description[language]}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ${liveClass.price}
                      </div>
                      {isExpired && (
                        <span className="text-sm text-red-500 font-medium">
                          {language === 'en' ? 'Expired' : language === 'az' ? 'Müddəti keçib' : 'Истекший'}
                        </span>
                      )}
                      {isFullyBooked && !isExpired && (
                        <span className="text-sm text-orange-500 font-medium">
                          {language === 'en' ? 'Full' : language === 'az' ? 'Dolu' : 'Заполнен'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Class Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="text-sm text-gray-500">{t('common.date', language)}</div>
                        <div className="font-medium text-gray-900">
                          {formatDate(liveClass.date)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="text-sm text-gray-500">{t('common.time', language)}</div>
                        <div className="font-medium text-gray-900">
                          {liveClass.time} ({liveClass.duration} min)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="text-sm text-gray-500">{t('common.instructor', language)}</div>
                        <div className="font-medium text-gray-900">
                          {liveClass.instructor}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="text-sm text-gray-500">{t('common.participants', language)}</div>
                        <div className="font-medium text-gray-900">
                          {liveClass.currentParticipants}/{liveClass.maxParticipants}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        {language === 'en' ? 'Available Spots' : language === 'az' ? 'Mövcud Yerlər' : 'Доступные Места'}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {liveClass.maxParticipants - liveClass.currentParticipants} / {liveClass.maxParticipants}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isFullyBooked ? 'bg-red-500' : 'bg-green-600'
                        }`}
                        style={{
                          width: `${(liveClass.currentParticipants / liveClass.maxParticipants) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <button
                    onClick={() => canPurchase && handlePurchaseTicket(liveClass.id)}
                    disabled={!canPurchase}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                      canPurchase
                        ? 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isExpired
                      ? (language === 'en' ? 'Class Expired' : language === 'az' ? 'Sinif Müddəti Keçib' : 'Класс Истек')
                      : isFullyBooked
                      ? (language === 'en' ? 'Fully Booked' : language === 'az' ? 'Tam Rezerv' : 'Полностью Забронирован')
                      : (language === 'en' ? 'Book Now' : language === 'az' ? 'İndi Rezerv Et' : 'Забронировать Сейчас')
                    }
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {liveClasses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {language === 'en' && 'No live classes scheduled yet'}
              {language === 'az' && 'Hələ canlı dərs planlaşdırılmayıb'}
              {language === 'ru' && 'Пока не запланировано живых занятий'}
            </h3>
            <p className="text-gray-500">
              {language === 'en' && 'Check back soon for upcoming sessions!'}
              {language === 'az' && 'Gələcək sessiyalar üçün yenidən yoxlayın!'}
              {language === 'ru' && 'Скоро появятся новые сессии!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassesPage;