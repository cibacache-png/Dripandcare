/*
  # Actualizar esquema de tabla nutrients

  1. Modificaciones
    - Agregar columna `active_ingredient` (text) - Principio activo del nutriente
    - Agregar columna `registry_number` (text) - Número de registro ISP
    - Cambiar nombre de `title` a `name` para consistencia
    
  2. Notas
    - Se preservan los datos existentes
    - Se mantienen todas las políticas RLS existentes
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'nutrients' AND column_name = 'title'
  ) THEN
    ALTER TABLE nutrients RENAME COLUMN title TO name;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'nutrients' AND column_name = 'active_ingredient'
  ) THEN
    ALTER TABLE nutrients ADD COLUMN active_ingredient text NOT NULL DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'nutrients' AND column_name = 'registry_number'
  ) THEN
    ALTER TABLE nutrients ADD COLUMN registry_number text NOT NULL DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'nutrients' AND column_name = 'order_position'
  ) THEN
    ALTER TABLE nutrients RENAME COLUMN order_position TO order_index;
  END IF;
END $$;