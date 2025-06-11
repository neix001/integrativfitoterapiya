export const t = (key: string, language: string): string => {
  const translations: Record<string, Record<string, string>> = {
    // Navigation
    'nav.home': {
      en: 'Home',
      az: 'Ana Səhifə',
      ru: 'Главная'
    },
    'nav.blog': {
      en: 'Blog',
      az: 'Bloq',
      ru: 'Блог'
    },
    'nav.shop': {
      en: 'Programs',
      az: 'Proqramlar',
      ru: 'Программы'
    },
    'nav.classes': {
      en: 'Live Classes',
      az: 'Canlı Dərslər',
      ru: 'Живые Занятия'
    },
    'nav.contact': {
      en: 'Contact',
      az: 'Əlaqə',
      ru: 'Контакт'
    },
    'nav.login': {
      en: 'Login',
      az: 'Giriş',
      ru: 'Вход'
    },
    'nav.logout': {
      en: 'Logout',
      az: 'Çıxış',
      ru: 'Выход'
    },
    'nav.dashboard': {
      en: 'Dashboard',
      az: 'Panel',
      ru: 'Панель'
    },
    'nav.admin': {
      en: 'Admin',
      az: 'Admin',
      ru: 'Админ'
    },

    // Home page
    'home.hero.title': {
      en: 'Transform Your Health with Expert Nutrition',
      az: 'Ekspert Qida ilə Sağlamlığınızı Dəyişdirin',
      ru: 'Преобразите Свое Здоровье с Экспертным Питанием'
    },
    'home.hero.subtitle': {
      en: 'Discover personalized nutrition programs, expert guidance, and live classes designed to help you achieve your wellness goals.',
      az: 'Sağlamlıq məqsədlərinizə nail olmaq üçün nəzərdə tutulmuş fərdi qida proqramları, ekspert rehbərliyi və canlı dərslər kəşf edin.',
      ru: 'Откройте для себя персонализированные программы питания, экспертное руководство и живые занятия, разработанные для достижения ваших целей в области здоровья.'
    },
    'home.cta.explore': {
      en: 'Explore Programs',
      az: 'Proqramları Araşdır',
      ru: 'Изучить Программы'
    },
    'home.cta.classes': {
      en: 'Live Classes',
      az: 'Canlı Dərslər',
      ru: 'Живые Занятия'
    },

    // Features
    'features.programs.title': {
      en: 'Personalized Programs',
      az: 'Fərdi Proqramlar',
      ru: 'Персонализированные Программы'
    },
    'features.programs.desc': {
      en: 'Tailored nutrition plans designed specifically for your goals, lifestyle, and dietary preferences.',
      az: 'Məqsədləriniz, həyat tərziniz və qida üstünlükləriniz üçün xüsusi olaraq hazırlanmış qida planları.',
      ru: 'Индивидуальные планы питания, разработанные специально для ваших целей, образа жизни и диетических предпочтений.'
    },
    'features.classes.title': {
      en: 'Live Expert Classes',
      az: 'Canlı Ekspert Dərslər',
      ru: 'Живые Экспертные Занятия'
    },
    'features.classes.desc': {
      en: 'Interactive sessions with certified nutritionists to learn, ask questions, and get real-time guidance.',
      az: 'Öyrənmək, sual vermək və real vaxt rehbərliyi almaq üçün sertifikatlı qida mütəxəssisləri ilə interaktiv sessiyalar.',
      ru: 'Интерактивные сессии с сертифицированными нутрициологами для обучения, вопросов и получения руководства в реальном времени.'
    },
    'features.support.title': {
      en: '24/7 Support',
      az: '24/7 Dəstək',
      ru: 'Поддержка 24/7'
    },
    'features.support.desc': {
      en: 'Get continuous support from our team of experts whenever you need guidance on your health journey.',
      az: 'Sağlamlıq səyahətinizdə rehbərliyə ehtiyacınız olduqda ekspert komandamızdan davamlı dəstək alın.',
      ru: 'Получайте постоянную поддержку от нашей команды экспертов, когда вам нужно руководство в вашем путешествии к здоровью.'
    },

    // Authentication
    'auth.login': {
      en: 'Login',
      az: 'Giriş',
      ru: 'Вход'
    },
    'auth.register': {
      en: 'Register',
      az: 'Qeydiyyat',
      ru: 'Регистрация'
    },
    'auth.email': {
      en: 'Email',
      az: 'E-poçt',
      ru: 'Email'
    },
    'auth.password': {
      en: 'Password',
      az: 'Şifrə',
      ru: 'Пароль'
    },
    'auth.name': {
      en: 'Full Name',
      az: 'Tam Ad',
      ru: 'Полное Имя'
    },
    'auth.login_btn': {
      en: 'Sign In',
      az: 'Daxil Ol',
      ru: 'Войти'
    },
    'auth.register_btn': {
      en: 'Create Account',
      az: 'Hesab Yarat',
      ru: 'Создать Аккаунт'
    },
    'auth.no_account': {
      en: "Don't have an account?",
      az: 'Hesabınız yoxdur?',
      ru: 'Нет аккаунта?'
    },
    'auth.have_account': {
      en: 'Already have an account?',
      az: 'Artıq hesabınız var?',
      ru: 'Уже есть аккаунт?'
    },

    // Dashboard
    'dashboard.welcome': {
      en: 'Welcome',
      az: 'Xoş gəlmisiniz',
      ru: 'Добро пожаловать'
    },
    'dashboard.programs': {
      en: 'My Programs',
      az: 'Mənim Proqramlarım',
      ru: 'Мои Программы'
    },
    'dashboard.tickets': {
      en: 'My Classes',
      az: 'Mənim Dərslərim',
      ru: 'Мои Занятия'
    },
    'dashboard.no_programs': {
      en: 'No programs purchased yet',
      az: 'Hələ proqram alınmayıb',
      ru: 'Пока не куплено программ'
    },
    'dashboard.no_tickets': {
      en: 'No class tickets purchased yet',
      az: 'Hələ dərs bileti alınmayıb',
      ru: 'Пока не куплено билетов на занятия'
    },

    // Admin
    'admin.title': {
      en: 'Admin Dashboard',
      az: 'Admin Paneli',
      ru: 'Панель Администратора'
    },
    'admin.manage_blog': {
      en: 'Manage Blog',
      az: 'Bloqu İdarə Et',
      ru: 'Управление Блогом'
    },
    'admin.manage_programs': {
      en: 'Manage Programs',
      az: 'Proqramları İdarə Et',
      ru: 'Управление Программами'
    },
    'admin.manage_classes': {
      en: 'Manage Classes',
      az: 'Dərsləri İdarə Et',
      ru: 'Управление Занятиями'
    },
    'admin.manage_users': {
      en: 'Manage Users',
      az: 'İstifadəçiləri İdarə Et',
      ru: 'Управление Пользователями'
    },
    'admin.add_new': {
      en: 'Add New',
      az: 'Yeni Əlavə Et',
      ru: 'Добавить Новый'
    },

    // Contact
    'contact.title': {
      en: 'Contact Us',
      az: 'Bizimlə Əlaqə',
      ru: 'Свяжитесь с Нами'
    },
    'contact.chat': {
      en: 'Live Chat Support',
      az: 'Canlı Söhbət Dəstəyi',
      ru: 'Поддержка в Чате'
    },
    'contact.type': {
      en: 'Type your message...',
      az: 'Mesajınızı yazın...',
      ru: 'Введите ваше сообщение...'
    },
    'contact.send': {
      en: 'Send',
      az: 'Göndər',
      ru: 'Отправить'
    },

    // Common
    'common.read_more': {
      en: 'Read More',
      az: 'Daha Çox Oxu',
      ru: 'Читать Далее'
    },
    'common.buy': {
      en: 'Purchase Program',
      az: 'Proqram Al',
      ru: 'Купить Программу'
    },
    'common.date': {
      en: 'Date',
      az: 'Tarix',
      ru: 'Дата'
    },
    'common.time': {
      en: 'Time',
      az: 'Vaxt',
      ru: 'Время'
    },
    'common.instructor': {
      en: 'Instructor',
      az: 'Müəllim',
      ru: 'Инструктор'
    },
    'common.participants': {
      en: 'Participants',
      az: 'İştirakçılar',
      ru: 'Участники'
    },
    'common.cancel': {
      en: 'Cancel',
      az: 'Ləğv Et',
      ru: 'Отмена'
    },
    'common.save': {
      en: 'Save',
      az: 'Saxla',
      ru: 'Сохранить'
    },

    // Language selector
    'lang.select': {
      en: 'Select Language',
      az: 'Dil Seçin',
      ru: 'Выберите Язык'
    },
    'lang.choose': {
      en: 'Choose your preferred language to continue',
      az: 'Davam etmək üçün üstünlük verdiyiniz dili seçin',
      ru: 'Выберите предпочитаемый язык для продолжения'
    }
  };

  return translations[key]?.[language] || key;
};