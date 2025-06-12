/*
  # Insert Sample Data

  1. Sample blog posts in multiple languages
  2. Sample diet programs with features
  3. Sample live classes with scheduling
  4. Create admin user (you'll need to register first)
*/

-- Insert sample blog posts
INSERT INTO blog_posts (
  title_en, title_az, title_ru,
  content_en, content_az, content_ru,
  excerpt_en, excerpt_az, excerpt_ru,
  image, author
) VALUES
(
  'The Science of Healthy Eating',
  'Sağlam Qida Elmi',
  'Наука Здорового Питания',
  'Understanding the fundamentals of nutrition is crucial for maintaining a healthy lifestyle. This comprehensive guide explores the latest research in nutritional science, covering macronutrients, micronutrients, and their impact on our overall health. We delve into the importance of balanced meals, proper hydration, and the role of supplements in modern nutrition.',
  'Qida əsaslarını başa düşmək sağlam yaşam tərzi üçün çox vacibdir. Bu ətraflı bələdçi qida elmlərində ən son araşdırmaları araşdırır, makronutrientlər, mikronutrientlər və onların ümumi sağlamlığımıza təsirini əhatə edir. Biz balanslaşdırılmış yeməklərin, düzgün hidratasiyanın və müasir qidada əlavələrin rolunun vacibliyini araşdırırıq.',
  'Понимание основ питания имеет решающее значение для поддержания здорового образа жизни. Это подробное руководство исследует последние исследования в области науки о питании, охватывая макронутриенты, микронутриенты и их влияние на наше общее здоровье. Мы углубляемся в важность сбалансированного питания, правильной гидратации и роли добавок в современном питании.',
  'Discover the latest scientific insights into healthy eating and nutrition.',
  'Sağlam qida və qida haqqında ən son elmi fikirlər tapın.',
  'Откройте для себя последние научные идеи о здоровом питании и питании.',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
  'Dr. Sarah Johnson'
),
(
  'Mediterranean Diet Benefits',
  'Aralıq Dənizi Dietinin Faydaları',
  'Преимущества Средиземноморской Диеты',
  'The Mediterranean diet has been extensively studied and proven to provide numerous health benefits. This eating pattern emphasizes whole foods, healthy fats, and fresh ingredients. Research shows it can reduce the risk of heart disease, improve brain function, and support healthy aging. Learn about the key components and how to implement this lifestyle.',
  'Aralıq dənizi dieti geniş şəkildə öyrənilmiş və çoxsaylı sağlamlıq faydaları təmin etdiyi sübut edilmişdir. Bu qida modeli tam qidalar, sağlam yağlar və təzə inqredientlər üzərində durur. Araşdırmalar göstərir ki, bu ürək xəstəliyi riskini azalda bilər, beyin funksiyasını yaxşılaşdıra bilər və sağlam qocalmanı dəstəkləyə bilər.',
  'Средиземноморская диета была тщательно изучена и доказала, что она обеспечивает многочисленные преимущества для здоровья. Этот режим питания делает упор на цельные продукты, полезные жиры и свежие ингредиенты. Исследования показывают, что она может снизить риск сердечных заболеваний, улучшить функцию мозга и поддержать здоровое старение.',
  'Explore the proven health benefits of the Mediterranean diet and lifestyle.',
  'Aralıq dənizi dietinin və həyat tərzinin sübut edilmiş sağlamlıq faydalarını araşdırın.',
  'Изучите доказанные преимущества средиземноморской диеты и образа жизни для здоровья.',
  'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
  'Maria Rodriguez'
),
(
  'Plant-Based Nutrition Guide',
  'Bitki Əsaslı Qida Bələdçisi',
  'Руководство по Растительному Питанию',
  'Plant-based nutrition is gaining popularity for its health and environmental benefits. This comprehensive guide covers everything you need to know about transitioning to a plant-based diet, including protein sources, meal planning, and nutritional considerations. Discover how to maintain optimal health while following a plant-based lifestyle.',
  'Bitki əsaslı qida sağlamlıq və ətraf mühit faydaları üçün populyarlıq qazanır. Bu ətraflı bələdçi bitki əsaslı dietə keçid haqqında bilməli olduğunuz hər şeyi əhatə edir, o cümlədən protein mənbələri, yemək planlaması və qida nəzəriyyələri. Bitki əsaslı həyat tərzini izləyərkən optimal sağlamlığı necə saxlamağı kəşf edin.',
  'Растительное питание набирает популярность благодаря своим преимуществам для здоровья и окружающей среды. Это подробное руководство охватывает все, что вам нужно знать о переходе на растительную диету, включая источники белка, планирование питания и пищевые соображения. Узнайте, как поддерживать оптимальное здоровье, следуя растительному образу жизни.',
  'A comprehensive guide to plant-based nutrition and its benefits.',
  'Bitki əsaslı qida və onun faydaları üzrə ətraflı bələdçi.',
  'Полное руководство по растительному питанию и его преимуществам.',
  'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg',
  'Dr. Michael Green'
);

-- Insert sample diet programs
INSERT INTO diet_programs (
  title_en, title_az, title_ru,
  description_en, description_az, description_ru,
  price, image, duration,
  features_en, features_az, features_ru
) VALUES
(
  'Complete Weight Loss Program',
  'Tam Çəki İtirmə Proqramı',
  'Полная Программа Похудения',
  'A comprehensive 12-week program designed to help you lose weight safely and sustainably through proper nutrition and lifestyle changes.',
  '12 həftəlik ətraflı proqram düzgün qida və həyat tərzi dəyişiklikləri vasitəsilə təhlükəsiz və dayanıqlı şəkildə çəki itirməyə kömək etmək üçün nəzərdə tutulmuşdur.',
  'Комплексная 12-недельная программа, разработанная для безопасного и устойчивого похудения через правильное питание и изменения образа жизни.',
  199.00,
  'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg',
  '12 weeks',
  ARRAY['Personalized meal plans', 'Weekly progress tracking', 'Exercise guidelines', '24/7 support chat'],
  ARRAY['Fərdi yemək planları', 'Həftəlik inkişaf izləməsi', 'Məşq təlimatları', '24/7 dəstək söhbəti'],
  ARRAY['Персональные планы питания', 'Еженедельное отслеживание прогресса', 'Рекомендации по упражнениям', 'Чат поддержки 24/7']
),
(
  'Muscle Building Nutrition',
  'Əzələ Qurmaq üçün Qida',
  'Питание для Набора Мышечной Массы',
  'Optimize your nutrition for muscle growth with this 8-week program focusing on protein intake, timing, and recovery nutrition.',
  'Protein qəbulu, vaxt və bərpa qidası üzərində diqqət yetirən bu 8 həftəlik proqramla əzələ artımı üçün qidanızı optimallaşdırın.',
  'Оптимизируйте свое питание для роста мышц с помощью этой 8-недельной программы, сосредоточенной на потреблении белка, времени приема и питании для восстановления.',
  149.00,
  'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
  '8 weeks',
  ARRAY['High-protein meal plans', 'Pre/post workout nutrition', 'Supplement guidance', 'Progress photos tracking'],
  ARRAY['Yüksək proteinli yemək planları', 'Məşqdən əvvəl/sonra qida', 'Əlavə təlimatları', 'İnkişaf foto izləməsi'],
  ARRAY['Высокобелковые планы питания', 'Питание до/после тренировки', 'Рекомендации по добавкам', 'Отслеживание фото прогресса']
),
(
  'Healthy Family Nutrition',
  'Sağlam Ailə Qidası',
  'Здоровое Семейное Питание',
  'Learn how to prepare nutritious, family-friendly meals that everyone will love while maintaining optimal health for all family members.',
  'Bütün ailə üzvləri üçün optimal sağlamlığı saxlayaraq hər kəsin sevəcəyi qidalı, ailə dostu yeməklər hazırlamağı öyrənin.',
  'Узнайте, как готовить питательные, семейные блюда, которые понравятся всем, поддерживая оптимальное здоровье для всех членов семьи.',
  129.00,
  'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg',
  '6 weeks',
  ARRAY['Family meal planning', 'Kid-friendly recipes', 'Budget-conscious options', 'Meal prep strategies'],
  ARRAY['Ailə yemək planlaması', 'Uşaq dostu reseptlər', 'Büdcəyə uyğun seçimlər', 'Yemək hazırlıq strategiyaları'],
  ARRAY['Планирование семейных блюд', 'Детские рецепты', 'Бюджетные варианты', 'Стратегии приготовления еды']
);

-- Insert sample live classes
INSERT INTO live_classes (
  title_en, title_az, title_ru,
  description_en, description_az, description_ru,
  date, time, duration, price, max_participants, current_participants, instructor
) VALUES
(
  'Nutrition Fundamentals Workshop',
  'Qida Əsasları Seminarı',
  'Семинар по Основам Питания',
  'Learn the basics of nutrition science and how to apply them to your daily life for better health outcomes.',
  'Qida elminin əsaslarını və onları daha yaxşı sağlamlıq nəticələri üçün gündəlik həyatınızda necə tətbiq etməyi öyrənin.',
  'Изучите основы науки о питании и как применять их в повседневной жизни для улучшения здоровья.',
  '2024-02-15',
  '18:00',
  90,
  49.00,
  50,
  23,
  'Dr. Sarah Johnson'
),
(
  'Meal Planning Masterclass',
  'Yemək Planlaması Master Sinfi',
  'Мастер-класс по Планированию Питания',
  'Master the art of meal planning to save time, money, and improve your nutrition with practical strategies and tools.',
  'Praktik strategiyalar və alətlərlə vaxt, pul qənaət etmək və qidanızı yaxşılaşdırmaq üçün yemək planlaması sənətini mənimsəyin.',
  'Овладейте искусством планирования питания, чтобы экономить время, деньги и улучшить питание с помощью практических стратегий и инструментов.',
  '2024-02-20',
  '19:00',
  120,
  69.00,
  30,
  18,
  'Maria Rodriguez'
),
(
  'Sports Nutrition Essentials',
  'İdman Qidası Əsasları',
  'Основы Спортивного Питания',
  'Optimize your athletic performance with proper nutrition timing, hydration strategies, and recovery protocols.',
  'Düzgün qida vaxtı, hidratasiya strategiyaları və bərpa protokolları ilə atletik performansınızı optimallaşdırın.',
  'Оптимизируйте свои спортивные результаты с помощью правильного времени питания, стратегий гидратации и протоколов восстановления.',
  '2024-02-25',
  '17:00',
  105,
  59.00,
  40,
  31,
  'Dr. Michael Green'
);