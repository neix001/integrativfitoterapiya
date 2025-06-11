import { BlogPost, DietProgram, LiveClass } from '../types';

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: {
      en: 'The Science of Healthy Eating',
      az: 'Sağlam Qida Elmi',
      ru: 'Наука Здорового Питания'
    },
    content: {
      en: 'Understanding the fundamentals of nutrition is crucial for maintaining a healthy lifestyle. This comprehensive guide explores the latest research in nutritional science...',
      az: 'Qida əsaslarını başa düşmək sağlam yaşam tərzi üçün çox vacibdir. Bu ətraflı bələdçi qida elmlərində ən son araşdırmaları araşdırır...',
      ru: 'Понимание основ питания имеет решающее значение для поддержания здорового образа жизни. Это подробное руководство исследует последние исследования в области науки о питании...'
    },
    excerpt: {
      en: 'Discover the latest scientific insights into healthy eating and nutrition.',
      az: 'Sağlam qida və qida haqqında ən son elmi fikirlər tapın.',
      ru: 'Откройте для себя последние научные идеи о здоровом питании и питании.'
    },
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    date: '2024-01-15',
    author: 'Dr. Sarah Johnson'
  },
  {
    id: '2',
    title: {
      en: 'Mediterranean Diet Benefits',
      az: 'Aralıq Dənizi Dietinin Faydaları',
      ru: 'Преимущества Средиземноморской Диеты'
    },
    content: {
      en: 'The Mediterranean diet has been extensively studied and proven to provide numerous health benefits. Learn about the key components and how to implement this lifestyle...',
      az: 'Aralıq dənizi dieti geniş şəkildə öyrənilmiş və çoxsaylı sağlamlıq faydaları təmin etdiyi sübut edilmişdir. Əsas komponentlər və bu həyat tərzini necə tətbiq etmək haqqında öyrənin...',
      ru: 'Средиземноморская диета была тщательно изучена и доказала, что она обеспечивает многочисленные преимущества для здоровья. Узнайте о ключевых компонентах и как внедрить этот образ жизни...'
    },
    excerpt: {
      en: 'Explore the proven health benefits of the Mediterranean diet and lifestyle.',
      az: 'Aralıq dənizi dietinin və həyat tərzinin sübut edilmiş sağlamlıq faydalarını araşdırın.',
      ru: 'Изучите доказанные преимущества средиземноморской диеты и образа жизни для здоровья.'
    },
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
    date: '2024-01-10',
    author: 'Maria Rodriguez'
  },
  {
    id: '3',
    title: {
      en: 'Plant-Based Nutrition Guide',
      az: 'Bitki Əsaslı Qida Bələdçisi',
      ru: 'Руководство по Растительному Питанию'
    },
    content: {
      en: 'Plant-based nutrition is gaining popularity for its health and environmental benefits. This guide covers everything you need to know about transitioning to a plant-based diet...',
      az: 'Bitki əsaslı qida sağlamlıq və ətraf mühit faydaları üçün populyarlıq qazanır. Bu bələdçi bitki əsaslı dietə keçid haqqında bilməli olduğunuz hər şeyi əhatə edir...',
      ru: 'Растительное питание набирает популярность благодаря своим преимуществам для здоровья и окружающей среды. Это руководство охватывает все, что вам нужно знать о переходе на растительную диету...'
    },
    excerpt: {
      en: 'A comprehensive guide to plant-based nutrition and its benefits.',
      az: 'Bitki əsaslı qida və onun faydaları üzrə ətraflı bələdçi.',
      ru: 'Полное руководство по растительному питанию и его преимуществам.'
    },
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg',
    date: '2024-01-05',
    author: 'Dr. Michael Green'
  }
];

export const mockDietPrograms: DietProgram[] = [
  {
    id: '1',
    title: {
      en: 'Complete Weight Loss Program',
      az: 'Tam Çəki İtirmə Proqramı',
      ru: 'Полная Программа Похудения'
    },
    description: {
      en: 'A comprehensive 12-week program designed to help you lose weight safely and sustainably through proper nutrition and lifestyle changes.',
      az: '12 həftəlik ətraflı proqram düzgün qida və həyat tərzi dəyişiklikləri vasitəsilə təhlükəsiz və dayanıqlı şəkildə çəki itirməyə kömək etmək üçün nəzərdə tutulmuşdur.',
      ru: 'Комплексная 12-недельная программа, разработанная для безопасного и устойчивого похудения через правильное питание и изменения образа жизни.'
    },
    price: 199,
    image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg',
    duration: '12 weeks',
    features: {
      en: ['Personalized meal plans', 'Weekly progress tracking', 'Exercise guidelines', '24/7 support chat'],
      az: ['Fərdi yemək planları', 'Həftəlik inkişaf izləməsi', 'Məşq təlimatları', '24/7 dəstək söhbəti'],
      ru: ['Персональные планы питания', 'Еженедельное отслеживание прогресса', 'Рекомендации по упражнениям', 'Чат поддержки 24/7']
    }
  },
  {
    id: '2',
    title: {
      en: 'Muscle Building Nutrition',
      az: 'Əzələ Qurmaq üçün Qida',
      ru: 'Питание для Набора Мышечной Массы'
    },
    description: {
      en: 'Optimize your nutrition for muscle growth with this 8-week program focusing on protein intake, timing, and recovery nutrition.',
      az: 'Protein qəbulu, vaxt və bərpa qidası üzərində diqqət yetirən bu 8 həftəlik proqramla əzələ artımı üçün qidanızı optimallaşdırın.',
      ru: 'Оптимизируйте свое питание для роста мышц с помощью этой 8-недельной программы, сосредоточенной на потреблении белка, времени приема и питании для восстановления.'
    },
    price: 149,
    image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
    duration: '8 weeks',
    features: {
      en: ['High-protein meal plans', 'Pre/post workout nutrition', 'Supplement guidance', 'Progress photos tracking'],
      az: ['Yüksək proteinli yemək planları', 'Məşqdən əvvəl/sonra qida', 'Əlavə təlimatları', 'İnkişaf foto izləməsi'],
      ru: ['Высокобелковые планы питания', 'Питание до/после тренировки', 'Рекомендации по добавкам', 'Отслеживание фото прогресса']
    }
  },
  {
    id: '3',
    title: {
      en: 'Healthy Family Nutrition',
      az: 'Sağlam Ailə Qidası',
      ru: 'Здоровое Семейное Питание'
    },
    description: {
      en: 'Learn how to prepare nutritious, family-friendly meals that everyone will love while maintaining optimal health for all family members.',
      az: 'Bütün ailə üzvləri üçün optimal sağlamlığı saxlayarken hər kəsin sevəcəyi qidalı, ailə dostu yeməklər hazırlamağı öyrənin.',
      ru: 'Узнайте, как готовить питательные, семейные блюда, которые понравятся всем, поддерживая оптимальное здоровье для всех членов семьи.'
    },
    price: 129,
    image: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg',
    duration: '6 weeks',
    features: {
      en: ['Family meal planning', 'Kid-friendly recipes', 'Budget-conscious options', 'Meal prep strategies'],
      az: ['Ailə yemək planlaması', 'Uşaq dostu reseptlər', 'Büdcəyə uyğun seçimlər', 'Yemək hazırlıq strategiyaları'],
      ru: ['Планирование семейных блюд', 'Детские рецепты', 'Бюджетные варианты', 'Стратегии приготовления еды']
    }
  }
];

export const mockLiveClasses: LiveClass[] = [
  {
    id: '1',
    title: {
      en: 'Nutrition Fundamentals Workshop',
      az: 'Qida Əsasları Seminarı',
      ru: 'Семинар по Основам Питания'
    },
    description: {
      en: 'Learn the basics of nutrition science and how to apply them to your daily life for better health outcomes.',
      az: 'Qida elminin əsaslarını və onları daha yaxşı sağlamlıq nəticələri üçün gündəlik həyatınızda necə tətbiq etməyi öyrənin.',
      ru: 'Изучите основы науки о питании и как применять их в повседневной жизни для улучшения здоровья.'
    },
    date: '2024-02-15',
    time: '18:00',
    duration: 90,
    price: 49,
    maxParticipants: 50,
    currentParticipants: 23,
    instructor: 'Dr. Sarah Johnson'
  },
  {
    id: '2',
    title: {
      en: 'Meal Planning Masterclass',
      az: 'Yemək Planlaması Master Sinfi',
      ru: 'Мастер-класс по Планированию Питания'
    },
    description: {
      en: 'Master the art of meal planning to save time, money, and improve your nutrition with practical strategies and tools.',
      az: 'Praktik strategiyalar və alətlərlə vaxt, pul qənaət etmək və qidanızı yaxşılaşdırmaq üçün yemək planlaması sənətini mənimsəyin.',
      ru: 'Овладейте искусством планирования питания, чтобы экономить время, деньги и улучшить питание с помощью практических стратегий и инструментов.'
    },
    date: '2024-02-20',
    time: '19:00',
    duration: 120,
    price: 69,
    maxParticipants: 30,
    currentParticipants: 18,
    instructor: 'Maria Rodriguez'
  },
  {
    id: '3',
    title: {
      en: 'Sports Nutrition Essentials',
      az: 'İdman Qidası Əsasları',
      ru: 'Основы Спортивного Питания'
    },
    description: {
      en: 'Optimize your athletic performance with proper nutrition timing, hydration strategies, and recovery protocols.',
      az: 'Düzgün qida vaxtı, hidratasiya strategiyaları və bərpa protokolları ilə atletik performansınızı optimallaşdırın.',
      ru: 'Оптимизируйте свои спортивные результаты с помощью правильного времени питания, стратегий гидратации и протоколов восстановления.'
    },
    date: '2024-02-25',
    time: '17:00',
    duration: 105,
    price: 59,
    maxParticipants: 40,
    currentParticipants: 31,
    instructor: 'Dr. Michael Green'
  }
];