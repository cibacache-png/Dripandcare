/*
  # Update Admin Password

  1. Changes
    - Updates the admin user password to ensure it works correctly with Supabase Auth
    - Uses proper password hashing compatible with Supabase

  2. Security
    - Password is properly hashed using Supabase's auth.users requirements
*/

-- Update the admin password using Supabase's crypt function
UPDATE auth.users
SET 
  encrypted_password = crypt('123456', gen_salt('bf')),
  updated_at = NOW()
WHERE email = 'admin@dripandcare.com';