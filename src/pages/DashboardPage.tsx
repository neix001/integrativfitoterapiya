import React from 'react';
import { Calendar, ShoppingBag, Clock, User, Star, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { t } from '../data/translations';

const DashboardPage: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { dietPrograms, liveClasses } = useData();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Access Denied' : language === 'az' ? 'Giriş Qadağandır' : 'Доступ Запрещен'}
          </h1>
          <p className="text-gray-600">
            {language === 'en' ? 'Please login to access your dashboard.' : language === 'az' ? 'Panelinizə daxil olmaq üçün giriş edin.' : 'Войдите для доступа к панели.'}
          </p>
        </div>
      </div>
    );
  }

  // Mock user purchases and tickets for demo
  const userPrograms = dietPrograms.slice(0, 2);
  const userTickets = liveClasses.slice(0, 1);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard.welcome', language)}, {user.name}!
          </h1>
          <p className="text-gray-600">
            {language === 'en' && 'Manage your nutrition programs and upcoming classes from your personal dashboard.'}
            {language === 'az' && 'Şəxsi panelinizden qida proqramlarınızı və gələcək dərslərinizi idarə edin.'}
            {language === 'ru' && 'Управляйте своими программами питания и предстоящими занятиями из личной панели.'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'en' ? 'Active Programs' : language === 'az' ? 'Aktiv Proqramlar' : 'Активные Программы'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{userPrograms.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'en' ? 'Upcoming Classes' : language === 'az' ? 'Gələcək Dərslər' : 'Предстоящие Занятия'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{userTickets.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'en' ? 'Total Spent' : language === 'az' ? 'Ümumi Xərc' : 'Общие Расходы'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${userPrograms.reduce((sum, p) => sum + p.price, 0) + userTickets.reduce((sum, t) => sum + t.price, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Programs */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {t('dashboard.programs', language)}
              </h2>
              <ShoppingBag className="w-5 h-5 text-gray-400" />
            </div>

            {userPrograms.length > 0 ? (
              <div className="space-y-4">
                {userPrograms.map((program) => (
                  <div key={program.id} className="border border-gray-200 rounded-xl p-4 hover:border-green-400 transition-colors">
                    <div className="flex items-start space-x-4">
                      <img
                        src={program.image}
                        alt={program.title[language]}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {program.title[language]}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {program.duration}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 font-semibold">${program.price}</span>
                          <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center space-x-1">
                            <Download className="w-4 h-4" />
                            <span>
                              {language === 'en' ? 'Download' : language === 'az' ? 'Yüklə' : 'Скачать'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">{t('dashboard.no_programs', language)}</p>
              </div>
            )}
          </div>

          {/* My Tickets */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {t('dashboard.tickets', language)}
              </h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>

            {userTickets.length > 0 ? (
              <div className="space-y-4">
                {userTickets.map((ticket) => (
                  <div key={ticket.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-gray-900">
                          {ticket.title[language]}
                        </h3>
                        <span className="text-blue-600 font-semibold">${ticket.price}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            {new Date(ticket.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{ticket.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{ticket.instructor}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{ticket.duration} min</span>
                        </div>
                      </div>

                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        {language === 'en' ? 'Join Class' : language === 'az' ? 'Dərsə Qoşul' : 'Присоединиться к Классу'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">{t('dashboard.no_tickets', language)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;