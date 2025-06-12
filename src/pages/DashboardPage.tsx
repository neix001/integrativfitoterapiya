import React from 'react';
import { Calendar, BookOpen, Clock, User, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../data/translations';

const DashboardPage: React.FC = () => {
  const { profile } = useAuth();
  const { userPurchases, userTickets, dietPrograms, liveClasses } = useData();
  const { language } = useLanguage();

  const getUserPrograms = () => {
    return userPurchases.map(purchase => {
      const program = dietPrograms.find(p => p.id === purchase.programId);
      return program ? { ...program, purchaseDate: purchase.purchaseDate, status: purchase.status } : null;
    }).filter(Boolean);
  };

  const getUserClasses = () => {
    return userTickets.map(ticket => {
      const liveClass = liveClasses.find(c => c.id === ticket.classId);
      return liveClass ? { ...liveClass, purchaseDate: ticket.purchaseDate, status: ticket.status } : null;
    }).filter(Boolean);
  };

  const upcomingClasses = getUserClasses().filter(liveClass => 
    liveClass && new Date(liveClass.date) >= new Date()
  );

  const stats = [
    {
      icon: BookOpen,
      label: language === 'en' ? 'Active Programs' : language === 'az' ? 'Aktiv Proqramlar' : 'Активные Программы',
      value: getUserPrograms().length,
      color: 'bg-blue-500'
    },
    {
      icon: Calendar,
      label: language === 'en' ? 'Upcoming Classes' : language === 'az' ? 'Gələcək Dərslər' : 'Предстоящие Занятия',
      value: upcomingClasses.length,
      color: 'bg-green-500'
    },
    {
      icon: Clock,
      label: language === 'en' ? 'Total Classes' : language === 'az' ? 'Ümumi Dərslər' : 'Всего Занятий',
      value: getUserClasses().length,
      color: 'bg-purple-500'
    },
    {
      icon: Award,
      label: language === 'en' ? 'Achievements' : language === 'az' ? 'Nailiyyətlər' : 'Достижения',
      value: getUserPrograms().length + getUserClasses().length,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('dashboard.welcome', language)}, {profile?.name}!
              </h1>
              <p className="text-gray-600">
                {language === 'en' && 'Track your progress and manage your nutrition journey.'}
                {language === 'az' && 'İnkişafınızı izləyin və qida səyahətinizi idarə edin.'}
                {language === 'ru' && 'Отслеживайте свой прогресс и управляйте своим путешествием к здоровью.'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Programs */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {t('dashboard.programs', language)}
              </h2>
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>

            {getUserPrograms().length > 0 ? (
              <div className="space-y-4">
                {getUserPrograms().map((program) => (
                  <div key={program.id} className="border border-gray-200 rounded-xl p-4 hover:border-green-300 transition-colors">
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
                          <span className="text-xs text-gray-500">
                            {language === 'en' ? 'Purchased' : language === 'az' ? 'Alınıb' : 'Куплено'}: {new Date(program.purchaseDate).toLocaleDateString()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            program.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {program.status === 'active' ? 
                              (language === 'en' ? 'Active' : language === 'az' ? 'Aktiv' : 'Активный') :
                              (language === 'en' ? 'Completed' : language === 'az' ? 'Tamamlandı' : 'Завершен')
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">{t('dashboard.no_programs', language)}</p>
              </div>
            )}
          </div>

          {/* Upcoming Classes */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {language === 'en' ? 'Upcoming Classes' : language === 'az' ? 'Gələcək Dərslər' : 'Предстоящие Занятия'}
              </h2>
              <Calendar className="w-6 h-6 text-green-600" />
            </div>

            {upcomingClasses.length > 0 ? (
              <div className="space-y-4">
                {upcomingClasses.map((liveClass) => (
                  <div key={liveClass.id} className="border border-gray-200 rounded-xl p-4 hover:border-green-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {liveClass.title[language]}
                      </h3>
                      <span className="text-sm font-medium text-green-600">
                        ${liveClass.price}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(liveClass.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{liveClass.time} ({liveClass.duration} min)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{liveClass.instructor}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {language === 'en' ? 'No upcoming classes' : language === 'az' ? 'Gələcək dərs yoxdur' : 'Нет предстоящих занятий'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {language === 'en' ? 'Your Progress' : language === 'az' ? 'İnkişafınız' : 'Ваш Прогресс'}
            </h2>
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'en' ? 'Programs Completed' : language === 'az' ? 'Tamamlanan Proqramlar' : 'Завершенные Программы'}
              </h3>
              <p className="text-2xl font-bold text-green-600">
                {getUserPrograms().filter(p => p.status === 'completed').length}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'en' ? 'Classes Attended' : language === 'az' ? 'İştirak Edilən Dərslər' : 'Посещенные Занятия'}
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {getUserClasses().filter(c => new Date(c.date) < new Date()).length}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'en' ? 'Total Investment' : language === 'az' ? 'Ümumi İnvestisiya' : 'Общие Инвестиции'}
              </h3>
              <p className="text-2xl font-bold text-purple-600">
                ${getUserPrograms().reduce((sum, p) => sum + p.price, 0) + getUserClasses().reduce((sum, c) => sum + c.price, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;