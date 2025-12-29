/*
  # Crear tabla de nutrientes

  1. Nueva Tabla
    - `nutrients`
      - `id` (uuid, primary key) - Identificador único
      - `name` (text) - Nombre del nutriente
      - `active_ingredient` (text) - Principio activo
      - `description` (text) - Descripción completa del nutriente
      - `registry_number` (text) - Número de registro ISP
      - `order_index` (integer) - Orden de visualización
      - `created_at` (timestamptz) - Fecha de creación
      - `updated_at` (timestamptz) - Fecha de última actualización

  2. Seguridad
    - Habilitar RLS en tabla `nutrients`
    - Políticas para lectura pública
    - Políticas para administradores autenticados (escritura)
*/

CREATE TABLE IF NOT EXISTS nutrients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  active_ingredient text NOT NULL,
  description text NOT NULL,
  registry_number text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE nutrients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos pueden ver nutrientes"
  ON nutrients FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Usuarios autenticados pueden insertar nutrientes"
  ON nutrients FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuarios autenticados pueden actualizar nutrientes"
  ON nutrients FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Usuarios autenticados pueden eliminar nutrientes"
  ON nutrients FOR DELETE
  TO authenticated
  USING (true);