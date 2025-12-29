/*
  # Create Glossary and FAQ Tables

  1. New Tables
    - `glossary_terms`
      - `id` (uuid, primary key)
      - `term` (text) - The term name
      - `definition` (text) - Brief definition
      - `order_position` (integer) - Display order
      - `is_active` (boolean) - Visibility control
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `faq_items`
      - `id` (uuid, primary key)
      - `question` (text) - The question
      - `answer` (text) - The answer
      - `order_position` (integer) - Display order
      - `is_active` (boolean) - Visibility control
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Public read access for active items
    - Admin-only write access
*/

-- Create glossary_terms table
CREATE TABLE IF NOT EXISTS glossary_terms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  term text NOT NULL,
  definition text NOT NULL,
  order_position integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create faq_items table
CREATE TABLE IF NOT EXISTS faq_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  order_position integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE glossary_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;

-- Glossary Terms Policies
CREATE POLICY "Anyone can view active glossary terms"
  ON glossary_terms FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all glossary terms"
  ON glossary_terms FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert glossary terms"
  ON glossary_terms FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update glossary terms"
  ON glossary_terms FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete glossary terms"
  ON glossary_terms FOR DELETE
  TO authenticated
  USING (true);

-- FAQ Items Policies
CREATE POLICY "Anyone can view active FAQ items"
  ON faq_items FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all FAQ items"
  ON faq_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert FAQ items"
  ON faq_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update FAQ items"
  ON faq_items FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete FAQ items"
  ON faq_items FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample data for glossary
INSERT INTO glossary_terms (term, definition, order_position, is_active)
VALUES
  ('Hidratación intravenosa', 'Administración de líquidos directamente al torrente sanguíneo para restaurar el balance hídrico del cuerpo.', 1, true),
  ('Antioxidantes', 'Sustancias que protegen las células del daño causado por los radicales libres, retrasando el envejecimiento celular.', 2, true),
  ('Electrolitos', 'Minerales esenciales que ayudan a mantener el equilibrio de fluidos y la función nerviosa y muscular.', 3, true);

-- Insert sample data for FAQ
INSERT INTO faq_items (question, answer, order_position, is_active)
VALUES
  ('¿Cuánto dura una sesión de sueroterapia?', 'Una sesión típica dura entre 30 y 60 minutos, dependiendo del tipo de tratamiento y las necesidades individuales del paciente.', 1, true),
  ('¿Es segura la sueroterapia?', 'Sí, cuando es administrada por profesionales capacitados. Utilizamos protocolos seguros certificados y productos de la más alta calidad.', 2, true),
  ('¿Con qué frecuencia puedo recibir tratamientos?', 'La frecuencia varía según tus objetivos. Algunos pacientes se benefician de sesiones semanales, mientras que otros optan por tratamientos mensuales. Te asesoraremos personalizadamente.', 3, true);
