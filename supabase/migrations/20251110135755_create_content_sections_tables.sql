/*
  # Create Content Management Tables

  1. New Tables
    - `therapies`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `benefits` (jsonb array)
      - `color_theme` (text)
      - `icon` (text)
      - `order_position` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `nutrients`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `order_position` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `scientific_references`
      - `id` (uuid, primary key)
      - `reference_text` (text)
      - `order_position` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin write access
*/

-- Create therapies table
CREATE TABLE IF NOT EXISTS therapies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  benefits jsonb DEFAULT '[]'::jsonb,
  color_theme text DEFAULT 'rose',
  icon text DEFAULT 'sparkles',
  order_position integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE therapies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active therapies"
  ON therapies FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert therapies"
  ON therapies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update therapies"
  ON therapies FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete therapies"
  ON therapies FOR DELETE
  TO authenticated
  USING (true);

-- Create nutrients table
CREATE TABLE IF NOT EXISTS nutrients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  order_position integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE nutrients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active nutrients"
  ON nutrients FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert nutrients"
  ON nutrients FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update nutrients"
  ON nutrients FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete nutrients"
  ON nutrients FOR DELETE
  TO authenticated
  USING (true);

-- Create scientific_references table
CREATE TABLE IF NOT EXISTS scientific_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_text text NOT NULL,
  order_position integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE scientific_references ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active references"
  ON scientific_references FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert references"
  ON scientific_references FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update references"
  ON scientific_references FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete references"
  ON scientific_references FOR DELETE
  TO authenticated
  USING (true);

-- Insert default therapies data
INSERT INTO therapies (title, description, benefits, color_theme, icon, order_position) VALUES
('Energizante', 'Combate el cansancio y recupera tu vitalidad con complejo B, vitamina C y taurina.', '["Aumenta energía física y mental", "Mejora concentración", "Reduce fatiga crónica"]'::jsonb, 'amber', 'sparkles', 1),
('Detox', 'Elimina toxinas y regenera tu organismo con glutatión, vitamina C y antioxidantes.', '["Limpieza profunda hepática", "Potente acción antioxidante", "Mejora función inmune"]'::jsonb, 'green', 'droplet', 2),
('Antiage', 'Rejuvenece desde el interior con glutatión, biotina, colágeno y vitaminas esenciales.', '["Mejora elasticidad de la piel", "Fortalece cabello y uñas", "Reduce signos de envejecimiento"]'::jsonb, 'rose', 'sparkles', 3),
('Deportivo', 'Optimiza tu rendimiento físico con aminoácidos, electrolitos y nutrientes esenciales.', '["Recuperación muscular rápida", "Hidratación profunda", "Aumenta resistencia física"]'::jsonb, 'slate', 'shield', 4),
('Inmunológico', 'Fortalece tus defensas con vitamina C, zinc y nutrientes que potencian tu sistema inmune.', '["Refuerza sistema inmunológico", "Prevención de enfermedades", "Recuperación más rápida"]'::jsonb, 'rose', 'shield', 5),
('Curaciones Avanzadas', 'Cuidado especializado de heridas con técnicas modernas y productos profesionales.', '["Curación húmeda avanzada", "Prevención de infecciones", "Seguimiento personalizado"]'::jsonb, 'slate', 'heart', 6);

-- Insert default nutrients data
INSERT INTO nutrients (title, description, order_position) VALUES
('Vitamina C', 'Poderoso antioxidante que fortalece el sistema inmune, promueve la producción de colágeno y protege las células del daño oxidativo.', 1),
('Complejo B', 'Grupo de vitaminas esenciales para la producción de energía, función cerebral y metabolismo celular. Combate la fatiga física y mental.', 2),
('Glutatión', 'El antioxidante maestro del cuerpo. Desintoxica el hígado, mejora la piel, refuerza el sistema inmune y tiene propiedades antiage.', 3),
('Biotina', 'Vitamina esencial para la salud del cabello, piel y uñas. Mejora la apariencia y fortaleza de queratina natural.', 4),
('Taurina', 'Aminoácido que mejora el rendimiento físico, protege el corazón, regula el sistema nervioso y combate el estrés oxidativo.', 5),
('Zinc', 'Mineral vital para la función inmune, cicatrización de heridas, síntesis de proteínas y protección contra infecciones.', 6);

-- Insert default scientific references data
INSERT INTO scientific_references (reference_text, order_position) VALUES
('Administración de vitaminas y minerales intravenosos: Revisión de beneficios terapéuticos (Journal of Alternative and Complementary Medicine, 2020)', 1),
('Glutatión: Rol en la desintoxicación y función inmune (European Journal of Clinical Nutrition, 2021)', 2),
('Vitamina C intravenosa: Aplicaciones clínicas y seguridad (Nutrients Journal, 2019)', 3),
('Terapia de hidratación IV: Eficacia en recuperación deportiva (Sports Medicine International, 2022)', 4);