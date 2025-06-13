import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, BarChart3, Settings, BookOpen, Calendar, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { t } from '../data/translations';
import AdminBlogManager from '../components/admin/AdminBlogManager';
import AdminProgramManager from '../components/admin/AdminProgramManager';
import AdminClassManager from '../components/admin/AdminClassManager';

const AdminPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const { blogPosts, dietPrograms, liveClasses, refreshData } = useData();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<any[]>([]);
  const [supportTickets, setSupportTickets] = useState<any[]>([]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchSupportTickets();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchSupportTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSupportTickets(data || []);
    } catch (error) {
      console.error('Error fetching support tickets:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Access Denied' : language === 'az' ? 'Giriş Qadağandır' : 'Доступ Запрещен'}
          </h1>
          <p className="text-gray-600">
            {language === 'en' ? 'You do not have admin privileges.' : language === 'az' ? 'Admin hüququnuz yoxdur.' : 'У вас нет прав администратора.'}
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: language === 'en' ? 'Overview' : language === 'az' ? 'Ümumi Baxış' : 'Обзор', icon: BarChart3 },
    { id: 'blog', label: language === 'en' ? 'Blog Posts' : language === 'az' ? 'Bloq Yazıları' : 'Посты Блога', icon: BookOpen },
    { id: 'programs', label: language === 'en' ? 'Diet Programs' : language === 'az' ? 'Diet Proqramları' : 'Диетические Программы', icon: ShoppingBag },
    { id: 'classes', label: language === 'en' ? 'Live Classes' : language === 'az' ? 'Canlı Dərslər' : 'Живые Занятия', icon: Calendar },
    { id: 'users', label: language === 'en' ? 'Users' : language === 'az' ? 'İstifadəçilər' : 'Пользователи', icon: Users },
    { id: 'support', label: language === 'en' ? 'Support' : language === 'az' ? 'Dəstək' : 'Поддержка', icon: MessageSquare }
  ];

  const stats = [
    {
      label: language === 'en' ? 'Total Users' : language === 'az' ? 'Ümumi İstifadəçilər' : 'Всего Пользователей',
      value: users.length,
      color: 'bg-blue-500'
    },
    {
      label: language === 'en' ? 'Blog Posts' : language === 'az' ? 'Bloq Yazıları' : 'Посты Блога',
      value: blogPosts.length,
      color: 'bg-green-500'
    },
    {
      label: language === 'en' ? 'Diet Programs' : language === 'az' ? 'Diet Proqramları' : 'Диетические Программы',
      value: dietPrograms.length,
      color: 'bg-purple-500'
    },
    {
      label: language === 'en' ? 'Live Classes' : language === 'az' ? 'Canlı Dərslər' : 'Живые Занятия',
      value: liveClasses.length,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('admin.title', language)}
          </h1>
          <p className="text-gray-600">
            {language === 'en' && 'Manage your nutrition platform content and users.'}
            {language === 'az' && 'Qida platformanızın məzmununu və istifadəçilərini idarə edin.'}
            {language === 'ru' && 'Управляйте контентом и пользователями вашей платформы питания.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {language === 'en' ? 'Recent Users' : language === 'az' ? 'Son İstifadəçilər' : 'Недавние Пользователи'}
                </h2>
                <div className="space-y-4">
                  {users.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'blog' && <AdminBlogManager />}
          {activeTab === 'programs' && <AdminProgramManager />}
          {activeTab === 'classes' && <AdminClassManager />}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {t('admin.manage_users', language)}
              </h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'User' : language === 'az' ? 'İstifadəçi' : 'Пользователь'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Role' : language === 'az' ? 'Rol' : 'Роль'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Joined' : language === 'az' ? 'Qoşulub' : 'Присоединился'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.is_admin ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {user.is_admin ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {language === 'en' ? 'Support Tickets' : language === 'az' ? 'Dəstək Biletləri' : 'Тикеты Поддержки'}
              </h2>
              
              <div className="space-y-4">
                {supportTickets.length > 0 ? (
                  supportTickets.map((ticket) => (
                    <div key={ticket.id} className="border border-gray-200 rounded-xl p-4 hover:border-green-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{ticket.user_name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              ticket.status === 'open' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {ticket.status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{ticket.user_email}</p>
                          <div className="text-sm text-gray-500">
                            {new Date(ticket.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {language === 'en' ? 'No support tickets yet' : language === 'az' ? 'Hələ dəstək bileti yoxdur' : 'Пока нет тикетов поддержки'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;