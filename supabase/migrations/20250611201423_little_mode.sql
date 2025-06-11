/*
  # Initial Schema Setup for Nutrition Platform

  1. New Tables
    - `profiles` - User profiles linked to auth.users
    - `blog_posts` - Blog posts with multi-language support
    - `diet_programs` - Diet programs with multi-language support
    - `live_classes` - Live classes with multi-language support
    - `support_tickets` - Support tickets for customer service
    - `chat_messages` - Messages within support tickets

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add admin-only policies for management tables
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_az text NOT NULL,
  title_ru text NOT NULL,
  content_en text NOT NULL,
  content_az text NOT NULL,
  content_ru text NOT NULL,
  excerpt_en text NOT NULL,
  excerpt_az text NOT NULL,
  excerpt_ru text NOT NULL,
  image text NOT NULL,
  author text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create diet_programs table
CREATE TABLE IF NOT EXISTS diet_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_az text NOT NULL,
  title_ru text NOT NULL,
  description_en text NOT NULL,
  description_az text NOT NULL,
  description_ru text NOT NULL,
  price decimal(10,2) NOT NULL,
  image text NOT NULL,
  duration text NOT NULL,
  features_en text[] NOT NULL DEFAULT '{}',
  features_az text[] NOT NULL DEFAULT '{}',
  features_ru text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create live_classes table
CREATE TABLE IF NOT EXISTS live_classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_az text NOT NULL,
  title_ru text NOT NULL,
  description_en text NOT NULL,
  description_az text NOT NULL,
  description_ru text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  duration integer NOT NULL,
  price decimal(10,2) NOT NULL,
  max_participants integer NOT NULL,
  current_participants integer DEFAULT 0,
  instructor text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create support_tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email text NOT NULL,
  user_name text NOT NULL,
  status text CHECK (status IN ('open', 'closed')) DEFAULT 'open',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES support_tickets(id) ON DELETE CASCADE,
  text text NOT NULL,
  sender text CHECK (sender IN ('user', 'support')) NOT NULL,
  sender_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE diet_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Blog posts policies (public read, admin write)
CREATE POLICY "Anyone can read blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Diet programs policies (public read, admin write)
CREATE POLICY "Anyone can read diet programs"
  ON diet_programs
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage diet programs"
  ON diet_programs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Live classes policies (public read, admin write)
CREATE POLICY "Anyone can read live classes"
  ON live_classes
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage live classes"
  ON live_classes
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Support tickets policies
CREATE POLICY "Users can read own tickets"
  ON support_tickets
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create tickets"
  ON support_tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can read all tickets"
  ON support_tickets
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Admins can update tickets"
  ON support_tickets
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Chat messages policies
CREATE POLICY "Users can read messages from own tickets"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE id = ticket_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in own tickets"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE id = ticket_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Admins can create messages"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Create function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, name, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    CASE WHEN NEW.email = 'admin@gmail.com' THEN true ELSE false END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert sample data
INSERT INTO blog_posts (title_en, title_az, title_ru, content_en, content_az, content_ru, excerpt_en, excerpt_az, excerpt_ru, image, author) VALUES
('The Science of Healthy Eating', 'Sağlam Qida Elmi', 'Наука Здорового Питания', 
'Understanding the fundamentals of nutrition is crucial for maintaining a healthy lifestyle. This comprehensive guide explores the latest research in nutritional science...', 
'Qida əsaslarını başa düşmək sağlam yaşam tərzi üçün çox vacibdir. Bu ətraflı bələdçi qida elmlərində ən son araşdırmaları araşdırır...', 
'Понимание основ питания имеет решающее значение для поддержания здорового образа жизни. Это подробное руководство исследует последние исследования в области науки о питании...', 
'Discover the latest scientific insights into healthy eating and nutrition.', 
'Sağlam qida və qida haqqında ən son elmi fikirlər tapın.', 
'Откройте для себя последние научные идеи о здоровом питании и питании.', 
'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 'Dr. Sarah Johnson');

INSERT INTO diet_programs (title_en, title_az, title_ru, description_en, description_az, description_ru, price, image, duration, features_en, features_az, features_ru) VALUES
('Complete Weight Loss Program', 'Tam Çəki İtirmə Proqramı', 'Полная Программа Похудения',
'A comprehensive 12-week program designed to help you lose weight safely and sustainably through proper nutrition and lifestyle changes.',
'12 həftəlik ətraflı proqram düzgün qida və həyat tərzi dəyişiklikləri vasitəsilə təhlükəsiz və dayanıqlı şəkildə çəki itirməyə kömək etmək üçün nəzərdə tutulmuşdur.',
'Комплексная 12-недельная программа, разработанная для безопасного и устойчивого похудения через правильное питание и изменения образа жизни.',
199, 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg', '12 weeks',
ARRAY['Personalized meal plans', 'Weekly progress tracking', 'Exercise guidelines', '24/7 support chat'],
ARRAY['Fərdi yemək planları', 'Həftəlik inkişaf izləməsi', 'Məşq təlimatları', '24/7 dəstək söhbəti'],
ARRAY['Персональные планы питания', 'Еженедельное отслеживание прогресса', 'Рекомендации по упражнениям', 'Чат поддержки 24/7']);

INSERT INTO live_classes (title_en, title_az, title_ru, description_en, description_az, description_ru, date, time, duration, price, max_participants, current_participants, instructor) VALUES
('Nutrition Fundamentals Workshop', 'Qida Əsasları Seminarı', 'Семинар по Основам Питания',
'Learn the basics of nutrition science and how to apply them to your daily life for better health outcomes.',
'Qida elminin əsaslarını və onları daha yaxşı sağlamlıq nəticələri üçün gündəlik həyatınızda necə tətbiq etməyi öyrənin.',
'Изучите основы науки о питании и как применять их в повседневной жизни для улучшения здоровья.',
'2024-02-15', '18:00', 90, 49, 50, 23, 'Dr. Sarah Johnson');