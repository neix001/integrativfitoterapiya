/*
  # Complete Authentication and Content Management System

  1. New Tables
    - `profiles` - User profiles with admin flag
    - `blog_posts` - Multi-language blog content
    - `diet_programs` - Diet programs with features
    - `live_classes` - Scheduled live classes
    - `support_tickets` - Customer support system
    - `chat_messages` - Support chat messages

  2. Security
    - Enable RLS on all tables
    - Add policies for user access control
    - Admin-only policies for content management
    - User-specific policies for personal data

  3. Functions
    - Auto-create profile on user registration
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
  price numeric(10,2) NOT NULL,
  image text NOT NULL,
  duration text NOT NULL,
  features_en text[] DEFAULT '{}',
  features_az text[] DEFAULT '{}',
  features_ru text[] DEFAULT '{}',
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
  price numeric(10,2) NOT NULL,
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
  status text DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES support_tickets(id) ON DELETE CASCADE,
  text text NOT NULL,
  sender text NOT NULL CHECK (sender IN ('user', 'support')),
  sender_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE diet_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Anyone can read blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can manage blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can read diet programs" ON diet_programs;
DROP POLICY IF EXISTS "Admins can manage diet programs" ON diet_programs;
DROP POLICY IF EXISTS "Anyone can read live classes" ON live_classes;
DROP POLICY IF EXISTS "Admins can manage live classes" ON live_classes;
DROP POLICY IF EXISTS "Users can create tickets" ON support_tickets;
DROP POLICY IF EXISTS "Users can read own tickets" ON support_tickets;
DROP POLICY IF EXISTS "Admins can read all tickets" ON support_tickets;
DROP POLICY IF EXISTS "Admins can update tickets" ON support_tickets;
DROP POLICY IF EXISTS "Users can create messages in own tickets" ON chat_messages;
DROP POLICY IF EXISTS "Users can read messages from own tickets" ON chat_messages;
DROP POLICY IF EXISTS "Admins can read all messages" ON chat_messages;
DROP POLICY IF EXISTS "Admins can create messages" ON chat_messages;

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

-- Blog posts policies
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

-- Diet programs policies
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

-- Live classes policies
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
CREATE POLICY "Users can create tickets"
  ON support_tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can read own tickets"
  ON support_tickets
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

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
CREATE POLICY "Users can create messages in own tickets"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE id = chat_messages.ticket_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can read messages from own tickets"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE id = chat_messages.ticket_id AND user_id = auth.uid()
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

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();