/*
  # Fix Authentication Trigger

  1. Drop and recreate the trigger function with proper error handling
  2. Ensure the trigger works correctly for user registration
  3. Add proper admin user setup
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create improved function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    CASE WHEN NEW.email = 'admin@gmail.com' THEN true ELSE false END
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log the error but don't fail the user creation
    RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Ensure admin user exists in profiles if auth user exists
DO $$
BEGIN
  -- Check if admin user exists in auth.users and create profile if missing
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@gmail.com') THEN
    INSERT INTO public.profiles (id, email, name, is_admin)
    SELECT id, email, 'Admin User', true
    FROM auth.users 
    WHERE email = 'admin@gmail.com'
    AND NOT EXISTS (SELECT 1 FROM public.profiles WHERE email = 'admin@gmail.com');
  END IF;
END $$;