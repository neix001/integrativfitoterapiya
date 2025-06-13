/*
  # Create user purchases and tickets tables

  1. New Tables
    - `user_purchases`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `program_id` (uuid, foreign key to diet_programs)
      - `status` (text, default 'active')
      - `created_at` (timestamp)
    - `user_tickets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `class_id` (uuid, foreign key to live_classes)
      - `status` (text, default 'confirmed')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for users to manage their own purchases and tickets
    - Add policies for admins to view all purchases and tickets
*/

-- Create user_purchases table
CREATE TABLE IF NOT EXISTS user_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  program_id uuid REFERENCES diet_programs(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  created_at timestamptz DEFAULT now()
);

-- Create user_tickets table
CREATE TABLE IF NOT EXISTS user_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  class_id uuid REFERENCES live_classes(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'attended', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tickets ENABLE ROW LEVEL SECURITY;

-- User purchases policies
CREATE POLICY "Users can read own purchases"
  ON user_purchases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own purchases"
  ON user_purchases
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can read all purchases"
  ON user_purchases
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- User tickets policies
CREATE POLICY "Users can read own tickets"
  ON user_tickets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tickets"
  ON user_tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can read all tickets"
  ON user_tickets
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS user_purchases_user_id_idx ON user_purchases(user_id);
CREATE INDEX IF NOT EXISTS user_purchases_program_id_idx ON user_purchases(program_id);
CREATE INDEX IF NOT EXISTS user_tickets_user_id_idx ON user_tickets(user_id);
CREATE INDEX IF NOT EXISTS user_tickets_class_id_idx ON user_tickets(class_id);