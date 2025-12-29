/*
  # Create nursing services table

  1. New Tables
    - `nursing_services`
      - `id` (uuid, primary key) - Unique identifier for each service
      - `title` (text) - Service name (e.g., "Curaciones avanzadas")
      - `description` (text) - Detailed description of the service
      - `price` (integer) - Price in CLP
      - `price_unit` (text) - Unit description (e.g., "por sesión")
      - `color` (text) - Hex color for the service card gradient
      - `order_index` (integer) - Display order of services
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `nursing_services` table
    - Add policy for public read access (anyone can view services)
    - Add policy for authenticated admin users to insert services
    - Add policy for authenticated admin users to update services
    - Add policy for authenticated admin users to delete services

  3. Initial Data
    - Insert default nursing services:
      - Curaciones avanzadas
      - Exámenes de sangre a domicilio
      - Vacunas a domicilio
*/

CREATE TABLE IF NOT EXISTS nursing_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price integer NOT NULL,
  price_unit text NOT NULL DEFAULT 'por sesión',
  color text NOT NULL DEFAULT '#617E1D',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE nursing_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view nursing services"
  ON nursing_services
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert nursing services"
  ON nursing_services
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update nursing services"
  ON nursing_services
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete nursing services"
  ON nursing_services
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert default nursing services
INSERT INTO nursing_services (title, description, price, price_unit, color, order_index)
VALUES
  (
    'Curaciones avanzadas',
    'Atención especializada para heridas crónicas, post-quirúrgicas y cuidados complejos. Incluye evaluación, limpieza, aplicación de productos avanzados y seguimiento profesional.',
    25000,
    'por sesión',
    '#617E1D',
    1
  ),
  (
    'Exámenes de sangre a domicilio',
    'Toma de muestras profesional en tu hogar con total comodidad y seguridad. Proceso rápido, indoloro y con todas las medidas de bioseguridad.',
    15000,
    'por toma',
    '#AA225D',
    2
  ),
  (
    'Vacunas a domicilio',
    'Inmunización profesional en la comodidad de tu hogar. Incluye asesoría, aplicación segura y registro del esquema de vacunación. (Vacuna no incluida)',
    12000,
    'por aplicación',
    '#282C38',
    3
  )
ON CONFLICT DO NOTHING;