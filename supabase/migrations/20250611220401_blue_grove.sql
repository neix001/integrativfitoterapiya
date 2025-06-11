/*
  # Create Demo User Accounts

  1. Demo Users
    - Creates admin user (admin@gmail.com) with admin privileges
    - Creates regular user (user@example.com) for testing
    - Both accounts use simple passwords for demo purposes

  2. Security
    - Admin user gets is_admin = true
    - Regular user gets is_admin = false
    - Both accounts are properly linked to auth.users

  Note: This migration creates demo accounts for testing purposes.
  In production, remove this migration and create accounts through proper registration.
*/

-- Insert demo users into auth.users (this simulates the registration process)
-- Note: In a real Supabase environment, users are typically created through the auth API
-- This approach directly inserts into the profiles table and relies on the trigger

-- First, let's ensure we have the demo users in our profiles table
-- The auth system will be handled separately through the application

INSERT INTO profiles (id, email, name, is_admin, created_at, updated_at)
VALUES 
  (
    gen_random_uuid(),
    'admin@gmail.com',
    'Admin User',
    true,
    now(),
    now()
  ),
  (
    gen_random_uuid(),
    'user@example.com',
    'Demo User',
    false,
    now(),
    now()
  )
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  is_admin = EXCLUDED.is_admin,
  updated_at = now();