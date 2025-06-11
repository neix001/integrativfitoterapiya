import { Language } from '../types';

export const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', az: 'Ana Səhifə', ru: 'Главная' },
  'nav.blog': { en: 'Blog', az: 'Bloq', ru: 'Блог' },
  'nav.shop': { en: 'Shop', az: 'Mağaza', ru: 'Магазин' },
  'nav.classes': { en: 'Live Classes', az: 'Canlı Dərslər', ru: 'Живые Классы' },
  'nav.contact': { en: 'Contact', az: 'Əlaqə', ru: 'Контакты' },
  'nav.login': { en: 'Login', az: 'Giriş', ru: 'Вход' },
  'nav.dashboard': { en: 'Dashboard', az: 'Panel', ru: 'Панель' },
  'nav.admin': { en: 'Admin', az: 'Admin', ru: 'Админ' },
  'nav.logout': { en: 'Logout', az: 'Çıxış', ru: 'Выход' },

  // Language Selection
  'lang.select': { en: 'Select Language', az: 'Dil Seçin', ru: 'Выберите Язык' },
  'lang.welcome': { en: 'Welcome to NutriLife', az: 'NutriLife-a Xoş Gəlmisiniz', ru: 'Добро пожаловать в NutriLife' },
  'lang.choose': { en: 'Please choose your preferred language to continue', az: 'Davam etmək üçün üstünlük verdiyiniz dili seçin', ru: 'Пожалуйста, выберите предпочитаемый язык для продолжения' },

  // Homepage
  'home.hero.title': { en: 'Transform Your Life with Nutrition', az: 'Qidamla Həyatınızı Dəyişdirin', ru: 'Преобразите Свою Жизнь с Питанием' },
  'home.hero.subtitle': { en: 'Professional diet programs, live classes, and expert guidance for a healthier you', az: 'Daha sağlam sizin üçün peşəkar diet proqramları, canlı dərslər və ekspert rehbərliyi', ru: 'Профессиональные диетические программы, живые занятия и экспертное руководство для более здорового вас' },
  'home.cta.explore': { en: 'Explore Programs', az: 'Proqramları Araşdırın', ru: 'Изучить Программы' },
  'home.cta.classes': { en: 'View Classes', az: 'Dərsləri Görün', ru: 'Посмотреть Классы' },

  // Features
  'features.programs.title': { en: 'Diet Programs', az: 'Diet Proqramları', ru: 'Диетические Программы' },
  'features.programs.desc': { en: 'Personalized nutrition plans designed by experts', az: 'Ekspertlər tərəfindən hazırlanmış fərdi qida planları', ru: 'Персонализированные планы питания, разработанные экспертами' },
  'features.classes.title': { en: 'Live Classes', az: 'Canlı Dərslər', ru: 'Живые Классы' },
  'features.classes.desc': { en: 'Join interactive sessions with nutrition professionals', az: 'Qida mütəxəssisləri ilə interaktiv sessiyalara qoşulun', ru: 'Присоединяйтесь к интерактивным сессиям с профессионалами по питанию' },
  'features.support.title': { en: '24/7 Support', az: '24/7 Dəstək', ru: 'Поддержка 24/7' },
  'features.support.desc': { en: 'Get help whenever you need it from our experts', az: 'Ekspertlərimizdən ehtiyacınız olanda kömək alın', ru: 'Получайте помощь от наших экспертов когда вам нужно' },

  // Common
  'common.price': { en: 'Price', az: 'Qiymət', ru: 'Цена' },
  'common.buy': { en: 'Buy Now', az: 'İndi Al', ru: 'Купить Сейчас' },
  'common.read_more': { en: 'Read More', az: 'Daha Çox Oxu', ru: 'Читать Далее' },
  'common.date': { en: 'Date', az: 'Tarix', ru: 'Дата' },
  'common.time': { en: 'Time', az: 'Vaxt', ru: 'Время' },
  'common.duration': { en: 'Duration', az: 'Müddət', ru: 'Продолжительность' },
  'common.instructor': { en: 'Instructor', az: 'Müəllim', ru: 'Инструктор' },
  'common.participants': { en: 'Participants', az: 'İştirakçılar', ru: 'Участники' },
  'common.loading': { en: 'Loading...', az: 'Yüklənir...', ru: 'Загрузка...' },
  'common.search': { en: 'Search', az: 'Axtar', ru: 'Поиск' },
  'common.filter': { en: 'Filter', az: 'Filtr', ru: 'Фильтр' },
  'common.save': { en: 'Save', az: 'Saxla', ru: 'Сохранить' },
  'common.cancel': { en: 'Cancel', az: 'Ləğv et', ru: 'Отменить' },
  'common.edit': { en: 'Edit', az: 'Redaktə et', ru: 'Редактировать' },
  'common.delete': { en: 'Delete', az: 'Sil', ru: 'Удалить' },

  // Auth
  'auth.login': { en: 'Login', az: 'Giriş', ru: 'Вход' },
  'auth.register': { en: 'Register', az: 'Qeydiyyat', ru: 'Регистрация' },
  'auth.email': { en: 'Email', az: 'E-poçt', ru: 'Электронная почта' },
  'auth.password': { en: 'Password', az: 'Şifrə', ru: 'Пароль' },
  'auth.name': { en: 'Name', az: 'Ad', ru: 'Имя' },
  'auth.login_btn': { en: 'Login', az: 'Daxil ol', ru: 'Войти' },
  'auth.register_btn': { en: 'Register', az: 'Qeydiyyatdan keç', ru: 'Зарегистрироваться' },
  'auth.no_account': { en: "Don't have an account?", az: 'Hesabınız yoxdur?', ru: 'Нет аккаунта?' },
  'auth.have_account': { en: 'Already have an account?', az: 'Artıq hesabınız var?', ru: 'Уже есть аккаунт?' },

  // Dashboard
  'dashboard.welcome': { en: 'Welcome back', az: 'Xoş gəlmisiniz', ru: 'Добро пожаловать' },
  'dashboard.programs': { en: 'My Programs', az: 'Mənim Proqramlarım', ru: 'Мои Программы' },
  'dashboard.tickets': { en: 'My Tickets', az: 'Mənim Biletlərim', ru: 'Мои Билеты' },
  'dashboard.no_programs': { en: 'No programs purchased yet', az: 'Hələ heç bir proqram alınmayıb', ru: 'Пока не куплено программ' },
  'dashboard.no_tickets': { en: 'No tickets purchased yet', az: 'Hələ heç bir bilet alınmayıb', ru: 'Пока не куплено билетов' },

  // Contact
  'contact.title': { en: 'Contact Us', az: 'Bizimlə Əlaqə', ru: 'Свяжитесь с Нами' },
  'contact.chat': { en: 'Live Chat', az: 'Canlı Söhbət', ru: 'Живой Чат' },
  'contact.type': { en: 'Type your message...', az: 'Mesajınızı yazın...', ru: 'Введите ваше сообщение...' },
  'contact.send': { en: 'Send', az: 'Göndər', ru: 'Отправить' },

  // Admin
  'admin.title': { en: 'Admin Panel', az: 'Admin Panel', ru: 'Админ Панель' },
  'admin.manage_blog': { en: 'Manage Blog Posts', az: 'Bloq Yazılarını İdarə et', ru: 'Управлять Постами Блога' },
  'admin.manage_programs': { en: 'Manage Diet Programs', az: 'Diet Proqramlarını İdarə et', ru: 'Управлять Диетическими Программами' },
  'admin.manage_classes': { en: 'Manage Live Classes', az: 'Canlı Dərsləri İdarə et', ru: 'Управлять Живыми Классами' },
  'admin.manage_users': { en: 'Manage Users', az: 'İstifadəçiləri İdarə et', ru: 'Управлять Пользователями' },
  'admin.add_new': { en: 'Add New', az: 'Yeni Əlavə et', ru: 'Добавить Новый' },
};

export const t = (key: string, language: Language): string => {
  return translations[key]?.[language] || key;
};