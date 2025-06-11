import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Users, BookOpen, Calendar, ShoppingBag, MessageCircle, Send, X, Eye, EyeOff, Key } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { supabase } from '../lib/supabase';
import { t } from '../data/translations';
import { BlogPost, DietProgram, LiveClass, Language, ChatMessage } from '../types';

const AdminPage: React.FC = () => {
  const { language } = useLanguage();
  const { user, isAdmin } = useAuth();
  const { 
    blogPosts, 
    dietPrograms, 
    liveClasses,
    supportTickets,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    addDietProgram,
    updateDietProgram,
    deleteDietProgram,
    addLiveClass,
    updateLiveClass,
    deleteLiveClass,
    addMessageToTicket,
    updateTicketStatus,
    refreshData
  } = useData();

  const [activeTab, setActiveTab] = useState<'blog' | 'programs' | 'classes' | 'users' | 'support'>('blog');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Form states - simplified to single language (Azerbaijani)
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
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

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Access Denied' : language === 'az' ? 'Giriş Qadağandır' : 'Доступ Запрещен'}
          </h1>
          <p className="text-gray-600">
            {language === 'en' ? 'Admin access required.' : language === 'az' ? 'Admin girişi tələb olunur.' : 'Требуется доступ администратора.'}
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'blog', label: t('admin.manage_blog', language), icon: BookOpen },
    { id: 'programs', label: t('admin.manage_programs', language), icon: ShoppingBag },
    { id: 'classes', label: t('admin.manage_classes', language), icon: Calendar },
    { id: 'users', label: t('admin.manage_users', language), icon: Users },
    { id: 'support', label: language === 'en' ? 'Live Support' : language === 'az' ? 'Canlı Dəstək' : 'Живая Поддержка', icon: MessageCircle }
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    // Convert multi-language content to single Azerbaijani content for editing
    if (item.title && typeof item.title === 'object') {
      setFormData({
        ...item,
        title: item.title.az || '',
        content: item.content?.az || '',
        excerpt: item.excerpt?.az || '',
        description: item.description?.az || '',
        features: item.features?.az?.join('\n') || ''
      });
    } else {
      setFormData(item);
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(language === 'en' ? 'Are you sure?' : language === 'az' ? 'Əminsiniz?' : 'Вы уверены?')) {
      setLoading(true);
      try {
        switch (activeTab) {
          case 'blog':
            await deleteBlogPost(id);
            break;
          case 'programs':
            await deleteDietProgram(id);
            break;
          case 'classes':
            await deleteLiveClass(id);
            break;
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!formData) return;

    setLoading(true);
    try {
      switch (activeTab) {
        case 'blog':
          const blogPost: Omit<BlogPost, 'id' | 'date'> = {
            title: {
              en: formData.title || '',
              az: formData.title || '',
              ru: formData.title || ''
            },
            content: {
              en: formData.content || '',
              az: formData.content || '',
              ru: formData.content || ''
            },
            excerpt: {
              en: formData.excerpt || '',
              az: formData.excerpt || '',
              ru: formData.excerpt || ''
            },
            image: formData.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
            author: formData.author || 'Admin'
          };
          
          if (editingItem) {
            await updateBlogPost({ ...blogPost, id: editingItem.id, date: editingItem.date });
          } else {
            await addBlogPost(blogPost);
          }
          break;

        case 'programs':
          const program: Omit<DietProgram, 'id'> = {
            title: {
              en: formData.title || '',
              az: formData.title || '',
              ru: formData.title || ''
            },
            description: {
              en: formData.description || '',
              az: formData.description || '',
              ru: formData.description || ''
            },
            price: Number(formData.price) || 0,
            image: formData.image || 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg',
            duration: formData.duration || '4 weeks',
            features: {
              en: formData.features?.split('\n') || [],
              az: formData.features?.split('\n') || [],
              ru: formData.features?.split('\n') || []
            }
          };
          
          if (editingItem) {
            await updateDietProgram({ ...program, id: editingItem.id });
          } else {
            await addDietProgram(program);
          }
          break;

        case 'classes':
          const liveClass: Omit<LiveClass, 'id'> = {
            title: {
              en: formData.title || '',
              az: formData.title || '',
              ru: formData.title || ''
            },
            description: {
              en: formData.description || '',
              az: formData.description || '',
              ru: formData.description || ''
            },
            date: formData.date || new Date().toISOString().split('T')[0],
            time: formData.time || '18:00',
            duration: Number(formData.duration) || 60,
            price: Number(formData.price) || 0,
            maxParticipants: Number(formData.maxParticipants) || 50,
            currentParticipants: editingItem?.currentParticipants || 0,
            instructor: formData.instructor || 'Expert Instructor'
          };
          
          if (editingItem) {
            await updateLiveClass({ ...liveClass, id: editingItem.id });
          } else {
            await addLiveClass(liveClass);
          }
          break;
      }

      setIsModalOpen(false);
      setFormData({});
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = async (ticketId: string) => {
    if (!replyMessage.trim()) return;

    try {
      await addMessageToTicket(ticketId, {
        text: replyMessage,
        sender: 'support',
        senderName: 'Admin'
      });
      setReplyMessage('');
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const handleCloseTicket = async (ticketId: string) => {
    try {
      await updateTicketStatus(ticketId, 'closed');
    } catch (error) {
      console.error('Error closing ticket:', error);
    }
  };

  const handleToggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !currentStatus })
        .eq('id', userId);

      if (error) throw error;
      
      await fetchUsers();
      alert(language === 'en' ? 'Admin status updated successfully!' : language === 'az' ? 'Admin statusu uğurla yeniləndi!' : 'Статус администратора успешно обновлен!');
    } catch (error) {
      console.error('Error updating admin status:', error);
    }
  };

  const openTickets = supportTickets.filter(ticket => ticket.status === 'open');
  const closedTickets = supportTickets.filter(ticket => ticket.status === 'closed');

  const renderForm = () => {
    if (activeTab === 'blog') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Başlıq</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qısa məzmun</label>
            <textarea
              value={formData.excerpt || ''}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Məzmun</label>
            <textarea
              value={formData.content || ''}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şəkil URL</label>
              <input
                type="url"
                value={formData.image || ''}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Müəllif</label>
              <input
                type="text"
                value={formData.author || ''}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'programs') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Başlıq</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Təsvir</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Xüsusiyyətlər (hər sətirdə bir)</label>
            <textarea
              value={formData.features || ''}
              onChange={(e) => setFormData({...formData, features: e.target.value})}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qiymət ($)</label>
              <input
                type="number"
                value={formData.price || ''}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Müddət</label>
              <input
                type="text"
                value={formData.duration || ''}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                placeholder="məs., 8 həftə"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şəkil URL</label>
              <input
                type="url"
                value={formData.image || ''}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'classes') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Başlıq</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Təsvir</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tarix</label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vaxt</label>
              <input
                type="time"
                value={formData.time || ''}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Müddət (dəq)</label>
              <input
                type="number"
                value={formData.duration || ''}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qiymət ($)</label>
              <input
                type="number"
                value={formData.price || ''}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maks İştirakçı</label>
              <input
                type="number"
                value={formData.maxParticipants || ''}
                onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Müəllim</label>
            <input
              type="text"
              value={formData.instructor || ''}
              onChange={(e) => setFormData({...formData, instructor: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      );
    }

    return null;
  };

  const renderBlogPosts = () => (
    <div className="space-y-4">
      {blogPosts.map((post) => (
        <div key={post.id} className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={post.image} alt={post.title[language]} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <h3 className="font-semibold text-gray-900">{post.title[language]}</h3>
              <p className="text-sm text-gray-600">{post.author} • {new Date(post.date).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleEdit(post)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(post.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPrograms = () => (
    <div className="space-y-4">
      {dietPrograms.map((program) => (
        <div key={program.id} className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={program.image} alt={program.title[language]} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <h3 className="font-semibold text-gray-900">{program.title[language]}</h3>
              <p className="text-sm text-gray-600">{program.duration} • ${program.price}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleEdit(program)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(program.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderClasses = () => (
    <div className="space-y-4">
      {liveClasses.map((liveClass) => (
        <div key={liveClass.id} className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{liveClass.title[language]}</h3>
            <p className="text-sm text-gray-600">
              {new Date(liveClass.date).toLocaleDateString()} • {liveClass.time} • ${liveClass.price}
            </p>
            <p className="text-sm text-gray-500">
              {liveClass.currentParticipants}/{liveClass.maxParticipants} participants
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleEdit(liveClass)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(liveClass.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-4">
      {users.map((user: any) => (
        <div key={user.id} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <div className="mt-2 flex items-center space-x-4">
                <span className={`text-sm px-2 py-1 rounded-full ${
                  user.is_admin 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.is_admin 
                    ? (language === 'en' ? 'Admin' : language === 'az' ? 'Admin' : 'Админ')
                    : (language === 'en' ? 'User' : language === 'az' ? 'İstifadəçi' : 'Пользователь')
                  }
                </span>
                <span className="text-sm text-gray-500">
                  {language === 'en' ? 'Joined:' : language === 'az' ? 'Qoşulub:' : 'Присоединился:'} {new Date(user.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleToggleAdminStatus(user.id, user.is_admin)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  user.is_admin
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {user.is_admin 
                  ? (language === 'en' ? 'Remove Admin' : language === 'az' ? 'Admin Sil' : 'Убрать Админа')
                  : (language === 'en' ? 'Make Admin' : language === 'az' ? 'Admin Et' : 'Сделать Админом')
                }
              </button>
            </div>
          </div>
        </div>
      ))}
      {users.length === 0 && (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            {language === 'en' ? 'No users registered yet' : language === 'az' ? 'Hələ qeydiyyatlı istifadəçi yoxdur' : 'Пока нет зарегистрированных пользователей'}
          </p>
        </div>
      )}
    </div>
  );

  const renderSupport = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Tickets List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Support Tickets' : language === 'az' ? 'Dəstək Biletləri' : 'Тикеты Поддержки'}
          </h3>
          
          {/* Open Tickets */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              {language === 'en' ? 'Open Tickets' : language === 'az' ? 'Açıq Biletlər' : 'Открытые Тикеты'} ({openTickets.length})
            </h4>
            <div className="space-y-2">
              {openTickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedTicket === ticket.id
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{ticket.userName}</div>
                  <div className="text-sm text-gray-600">{ticket.userEmail}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {language === 'en' ? 'Open' : language === 'az' ? 'Açıq' : 'Открыт'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {ticket.messages.length} {language === 'en' ? 'messages' : language === 'az' ? 'mesaj' : 'сообщений'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Closed Tickets */}
          {closedTickets.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                {language === 'en' ? 'Closed Tickets' : language === 'az' ? 'Bağlı Biletlər' : 'Закрытые Тикеты'} ({closedTickets.length})
              </h4>
              <div className="space-y-2">
                {closedTickets.slice(0, 5).map((ticket) => (
                  <button
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors opacity-75 ${
                      selectedTicket === ticket.id
                        ? 'border-gray-400 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{ticket.userName}</div>
                    <div className="text-sm text-gray-600">{ticket.userEmail}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      {language === 'en' ? 'Closed' : language === 'az' ? 'Bağlı' : 'Закрыт'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {supportTickets.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {language === 'en' ? 'No support tickets yet' : language === 'az' ? 'Hələ dəstək bileti yoxdur' : 'Пока нет тикетов поддержки'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-2">
        {selectedTicket ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {(() => {
              const ticket = supportTickets.find(t => t.id === selectedTicket);
              if (!ticket) return null;

              return (
                <>
                  {/* Chat Header */}
                  <div className="bg-green-600 p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">{ticket.userName}</h3>
                      <p className="text-green-100 text-sm">{ticket.userEmail}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {ticket.status === 'open' && (
                        <button
                          onClick={() => handleCloseTicket(ticket.id)}
                          className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-lg text-sm hover:bg-opacity-30 transition-colors"
                        >
                          {language === 'en' ? 'Close Ticket' : language === 'az' ? 'Bileti Bağla' : 'Закрыть Тикет'}
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedTicket(null)}
                        className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {ticket.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-gray-100 text-gray-900'
                              : 'bg-green-600 text-white'
                          }`}
                        >
                          {message.senderName && (
                            <p className={`text-xs mb-1 ${
                              message.sender === 'user' ? 'text-gray-500' : 'text-green-100'
                            }`}>
                              {message.senderName}
                            </p>
                          )}
                          <p className="text-sm">{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-gray-500' : 'text-green-100'
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Input */}
                  {ticket.status === 'open' && (
                    <div className="p-4 border-t">
                      <div className="flex space-x-4">
                        <input
                          type="text"
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendReply(ticket.id)}
                          placeholder={language === 'en' ? 'Type your reply...' : language === 'az' ? 'Cavabınızı yazın...' : 'Введите ваш ответ...'}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => handleSendReply(ticket.id)}
                          disabled={!replyMessage.trim()}
                          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>{language === 'en' ? 'Send' : language === 'az' ? 'Göndər' : 'Отправить'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {language === 'en' ? 'Select a Ticket' : language === 'az' ? 'Bilet Seçin' : 'Выберите Тикет'}
            </h3>
            <p className="text-gray-600">
              {language === 'en' ? 'Choose a support ticket from the list to view and respond to messages.' : language === 'az' ? 'Mesajları görmək və cavab vermək üçün siyahıdan dəstək bileti seçin.' : 'Выберите тикет поддержки из списка для просмотра и ответа на сообщения.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('admin.title', language)}
          </h1>
          <p className="text-gray-600">
            {language === 'en' && 'Manage your phytotherapy platform content, users, and support tickets.'}
            {language === 'az' && 'Fitoterapiya platformanızın məzmununu, istifadəçilərini və dəstək biletlərini idarə edin.'}
            {language === 'ru' && 'Управляйте контентом, пользователями и тикетами поддержки вашей платформы фитотерапии.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors relative ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.id === 'support' && openTickets.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {openTickets.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Add Button */}
            {activeTab !== 'users' && activeTab !== 'support' && (
              <div className="mb-6">
                <button
                  onClick={handleAdd}
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('admin.add_new', language)}</span>
                </button>
              </div>
            )}

            {/* Content */}
            {activeTab === 'blog' && renderBlogPosts()}
            {activeTab === 'programs' && renderPrograms()}
            {activeTab === 'classes' && renderClasses()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'support' && renderSupport()}
          </div>
        </div>
      </div>

      {/* Modal for adding/editing */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingItem 
                  ? (language === 'en' ? 'Edit Item' : language === 'az' ? 'Elementi Redaktə Et' : 'Редактировать Элемент')
                  : (language === 'en' ? 'Add New Item' : language === 'az' ? 'Yeni Element Əlavə Et' : 'Добавить Новый Элемент')
                }
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {renderForm()}
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {t('common.cancel', language)}
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? (language === 'en' ? 'Saving...' : language === 'az' ? 'Saxlanır...' : 'Сохранение...') : t('common.save', language)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;