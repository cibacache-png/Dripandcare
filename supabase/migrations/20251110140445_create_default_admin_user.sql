/*
  # Create Default Admin User

  1. User Creation
    - Creates admin user with email: admin@dripandcare.com
    - Password: 123456
    - Auto-confirmed and ready to use
  
  2. Security
    - User is created in auth.users table
    - Password is properly hashed
    - Email is confirmed automatically
*/

-- Create admin user function
DO $$
DECLARE
  admin_id uuid;
BEGIN
  -- Check if admin user already exists
  SELECT id INTO admin_id FROM auth.users WHERE email = 'admin@dripandcare.com';
  
  -- Only create if doesn't exist
  IF admin_id IS NULL THEN
    -- Insert the admin user
    INSERT INTO auth.users (
      id,
      instance_id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token,
      email_change_token_new
    ) VALUES (
      gen_random_uuid(),
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'admin@dripandcare.com',
      crypt('123456', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      NOW(),
      NOW(),
      '',
      '',
      ''
    );
    
    RAISE NOTICE 'Admin user created successfully';
  ELSE
    RAISE NOTICE 'Admin user already exists';
  END IF;
END $$;