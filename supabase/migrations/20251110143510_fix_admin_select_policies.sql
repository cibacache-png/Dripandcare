/*
  # Fix Admin Select Policies

  1. Changes
    - Update SELECT policies to allow authenticated users to view all records (active and inactive)
    - Keep anonymous users restricted to viewing only active records
    - This enables the admin panel to display and edit both active and inactive items

  2. Security
    - Anonymous users can only see active content (is_active = true)
    - Authenticated users can see all content for management purposes
*/

-- Drop existing SELECT policies
DROP POLICY IF EXISTS "Anyone can view active therapies" ON therapies;
DROP POLICY IF EXISTS "Anyone can view active nutrients" ON nutrients;
DROP POLICY IF EXISTS "Anyone can view active references" ON scientific_references;

-- Create new SELECT policies for therapies
CREATE POLICY "Anyone can view active therapies"
  ON therapies FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all therapies"
  ON therapies FOR SELECT
  TO authenticated
  USING (true);

-- Create new SELECT policies for nutrients
CREATE POLICY "Anyone can view active nutrients"
  ON nutrients FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all nutrients"
  ON nutrients FOR SELECT
  TO authenticated
  USING (true);

-- Create new SELECT policies for scientific_references
CREATE POLICY "Anyone can view active references"
  ON scientific_references FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all references"
  ON scientific_references FOR SELECT
  TO authenticated
  USING (true);