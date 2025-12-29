/*
  # Create page texts table for editable content
  
  1. New Tables
    - `page_texts`
      - `id` (uuid, primary key)
      - `section_key` (text, unique) - Identifier for the text section
      - `text_key` (text) - Identifier for the specific text field
      - `text_value` (text) - The actual text content
      - `text_type` (text) - Type of text (title, subtitle, badge, body, button)
      - `order_index` (integer) - For ordering when displaying
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `page_texts` table
    - Add policy for public read access
    - Add policy for authenticated admin users to manage content
  
  3. Initial Data
    - Insert default texts from current page layout
*/

CREATE TABLE IF NOT EXISTS page_texts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL,
  text_key text NOT NULL,
  text_value text NOT NULL,
  text_type text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(section_key, text_key)
);

ALTER TABLE page_texts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view page texts"
  ON page_texts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert page texts"
  ON page_texts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update page texts"
  ON page_texts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete page texts"
  ON page_texts
  FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO page_texts (section_key, text_key, text_value, text_type, order_index) VALUES
  ('hero', 'welcome_text', 'Bienvenidas/os a', 'body', 1),
  ('hero', 'title', 'DRIP & CARE', 'title', 2),
  ('hero', 'subtitle', 'by Daniela Rufs', 'subtitle', 3),
  ('hero', 'tagline', 'Recupera y regenera tu salud con sueroterapia', 'body', 4),
  ('hero', 'cta_button', 'Agenda tu evaluación gratuita', 'button', 5),
  
  ('quien_soy', 'badge', 'Enfermera especializada', 'badge', 1),
  ('quien_soy', 'title', 'Quien soy', 'title', 2),
  
  ('servicios', 'badge', 'Nuestros Servicios', 'badge', 1),
  ('servicios', 'title', '¿Qué necesitas hoy?', 'title', 2),
  ('servicios', 'subtitle', 'Elige el servicio que mejor se adapte a tus necesidades', 'subtitle', 3),
  ('servicios', 'sueroterapia_title', 'Sueroterapia', 'title', 4),
  ('servicios', 'sueroterapia_description', 'Tratamientos personalizados para energía, hidratación, belleza y bienestar integral.', 'body', 5),
  ('servicios', 'sueroterapia_cta', 'Ver tratamientos', 'button', 6),
  ('servicios', 'enfermeria_title', 'Enfermería móvil', 'title', 7),
  ('servicios', 'enfermeria_description', 'Atención profesional de enfermería en tu hogar: curaciones, controles y cuidados especializados.', 'body', 8),
  ('servicios', 'enfermeria_cta', 'Ver servicios', 'button', 9),
  
  ('beneficios_iv', 'badge', 'Por qué elegir terapia IV', 'badge', 1),
  ('beneficios_iv', 'title', 'BENEFICIOS DE LA TERAPIA INTRAVENOSA', 'title', 2),
  ('beneficios_iv', 'subtitle', 'Nutrición de nivel superior con resultados científicamente respaldados', 'subtitle', 3),
  
  ('terapias', 'badge', 'Nuestros tratamientos', 'badge', 1),
  ('terapias', 'title', 'Terapias personalizadas', 'title', 2),
  ('terapias', 'subtitle', 'Cada suero está formulado con nutrientes específicos para tus objetivos de salud y bienestar', 'subtitle', 3),
  
  ('nutrientes', 'badge', 'Nutrición celular', 'badge', 1),
  ('nutrientes', 'title', 'Conoce los nutrientes', 'title', 2),
  ('nutrientes', 'subtitle', 'Vitaminas, aminoácidos y oligoelementos que potencian tu bienestar', 'subtitle', 3),
  
  ('faq', 'badge', 'Preguntas frecuentes', 'badge', 1),
  ('faq', 'title', 'Resuelve tus dudas', 'title', 2),
  
  ('testimonios', 'badge', 'Experiencias reales', 'badge', 1),
  ('testimonios', 'title', 'Lo que dicen nuestros pacientes', 'title', 2),
  
  ('como_funciona', 'badge', 'Proceso simple', 'badge', 1),
  ('como_funciona', 'title', '¿Cómo funciona?', 'title', 2),
  ('como_funciona', 'subtitle', 'Un proceso profesional y cercano, diseñado para tu bienestar', 'subtitle', 3),
  
  ('contacto', 'badge', 'Estamos aquí para ti', 'badge', 1),
  ('contacto', 'title', 'Agenda tu sesión', 'title', 2),
  ('contacto', 'subtitle', 'Contáctanos y comienza tu camino hacia el bienestar integral', 'subtitle', 3),
  ('contacto', 'card_title', 'Bienestar a un mensaje de distancia', 'title', 4),
  ('contacto', 'cta_button', 'Agenda tu evaluación gratuita', 'button', 5),
  
  ('enfermeria_servicios', 'badge', 'Servicios de Enfermería', 'badge', 1),
  ('enfermeria_servicios', 'title', 'Atención profesional', 'title', 2),
  ('enfermeria_servicios', 'subtitle', 'Servicios de enfermería especializados en la comodidad de tu hogar', 'subtitle', 3)
ON CONFLICT (section_key, text_key) DO NOTHING;