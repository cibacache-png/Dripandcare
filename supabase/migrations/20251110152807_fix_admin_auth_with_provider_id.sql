/*
  # Fix Admin Authentication with Provider ID

  1. Changes
    - Deletes and recreates the admin user with all required fields including provider_id
    - Ensures auth.identities table is properly populated
    - Sets up the user exactly as Supabase Auth expects

  2. Security
    - Email: admin@dripandcare.com
    - Password: 123456
    - Fully confirmed and ready to use
*/

-- Delete existing admin user and related data
DELETE FROM auth.identities WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'admin@dripandcare.com'
);
DELETE FROM auth.users WHERE email = 'admin@dripandcare.com';

-- Create the admin user
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Generate a new UUID for the user
  new_user_id := gen_random_uuid();
  
  -- Insert into auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    'admin@dripandcare.com',
    crypt('123456', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  );

  -- Insert into auth.identities with provider_id
  INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    new_user_id,
    new_user_id::text,
    format('{"sub":"%s","email":"admin@dripandcare.com","email_verified":true,"provider":"email"}', new_user_id)::jsonb,
    'email',
    NOW(),
    NOW(),
    NOW()
  );

  RAISE NOTICE 'Admin user created successfully with ID: %', new_user_id;
END $$;