/*
  # Fix Testimonials RLS Policies

  1. Security Changes
    - Remove duplicate SELECT policies for authenticated users
    - Keep single SELECT policy for public users (active testimonials only)
    - Keep authenticated users' INSERT, UPDATE, DELETE policies
  
  2. Changes Made
    - DROP duplicate "Authenticated users can view all testimonials" policy
    - Keep "Anyone can view active testimonials" for public access
    - All other policies remain unchanged
*/

-- Drop the duplicate authenticated SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view all testimonials" ON testimonials;

-- The "Anyone can view active testimonials" policy remains active for public users
-- This allows unauthenticated users to see active testimonials
-- Authenticated users (admins) will also see active testimonials through this policy
-- For admin panel to see all testimonials, we rely on service role key or additional logic
