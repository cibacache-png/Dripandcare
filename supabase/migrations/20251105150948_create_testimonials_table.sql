/*
  # Create testimonials table

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text) - Name of the person giving testimonial
      - `role` (text) - Role or description (e.g., "Profesional, 34 años")
      - `content` (text) - The testimonial text
      - `rating` (integer) - Rating out of 5
      - `color_theme` (text) - Color theme for the card (e.g., "rose", "blue", "amber")
      - `is_active` (boolean) - Whether testimonial is visible on the site
      - `created_at` (timestamptz) - Timestamp of creation
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `testimonials` table
    - Add policy for public read access for active testimonials
    - Add policy for authenticated users to manage testimonials
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  content text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  color_theme text DEFAULT 'rose',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active testimonials
CREATE POLICY "Anyone can view active testimonials"
  ON testimonials
  FOR SELECT
  USING (is_active = true);

-- Allow authenticated users to view all testimonials (for admin panel)
CREATE POLICY "Authenticated users can view all testimonials"
  ON testimonials
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert testimonials
CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update testimonials
CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete testimonials
CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert default testimonials
INSERT INTO testimonials (name, role, content, rating, color_theme, is_active) VALUES
  ('María José R.', 'Profesional, 34 años', 'La atención es excepcional. Me sentí en buenas manos desde el primer momento. El suero energizante me devolvió la vitalidad que necesitaba.', 5, 'rose', true),
  ('Carolina P.', 'Empresaria, 42 años', 'Profesionalismo total. El tratamiento antiage ha mejorado visiblemente mi piel. Lo recomiendo sin dudarlo.', 5, 'blue', true),
  ('Andrés M.', 'Atleta, 29 años', 'Como deportista, el suero deportivo ha sido clave en mi recuperación. Servicio a domicilio impecable y resultados inmediatos.', 5, 'amber', true);
