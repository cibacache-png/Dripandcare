/*
  # Add Extended Fields to Therapies Table

  ## Description
  Adds comprehensive fields to the therapies table for detailed therapy information display.

  ## New Columns
  - `subtitle` (text) - Descriptive subtitle that appears below the therapy title
  - `components` (jsonb array) - List of components/ingredients in the therapy
  - `physiological_effects` (jsonb array) - Array of objects with title and description for each physiological effect
  - `important_considerations` (text) - Important information and considerations about the therapy

  ## Changes
  - ALTER TABLE therapies ADD COLUMN subtitle
  - ALTER TABLE therapies ADD COLUMN components  
  - ALTER TABLE therapies ADD COLUMN physiological_effects
  - ALTER TABLE therapies ADD COLUMN important_considerations

  ## Notes
  - All fields are optional and can be NULL
  - Existing records will have NULL values for new fields
  - physiological_effects structure: [{"title": "string", "description": "string"}]
  - components structure: ["component1", "component2", ...]
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'therapies' AND column_name = 'subtitle'
  ) THEN
    ALTER TABLE therapies ADD COLUMN subtitle text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'therapies' AND column_name = 'components'
  ) THEN
    ALTER TABLE therapies ADD COLUMN components jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'therapies' AND column_name = 'physiological_effects'
  ) THEN
    ALTER TABLE therapies ADD COLUMN physiological_effects jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'therapies' AND column_name = 'important_considerations'
  ) THEN
    ALTER TABLE therapies ADD COLUMN important_considerations text;
  END IF;
END $$;

-- Update the Energizante therapy with example data based on the image
UPDATE therapies 
SET 
  subtitle = 'Combate el cansancio y recupera tu vitalidad con complejo B, vitamina C y taurina.',
  components = '["Complejo B (B1, B2, B3, B5, B6, B12)", "Vitamina C", "Taurina", "Magnesio"]'::jsonb,
  physiological_effects = '[
    {"title": "Mejora concentración", "description": "Las vitaminas B son cofactores esenciales para la producción de neurotransmisores y la función cognitiva óptima."},
    {"title": "Reduce fatiga crónica", "description": "El complejo B y la taurina mejoran el metabolismo energético celular, reduciendo la sensación de agotamiento físico y mental."}
  ]'::jsonb,
  important_considerations = 'Ideal para periodos de alta exigencia mental o física. No recomendado antes de dormir por su efecto energizante. Consulta con tu médico si estás embarazada o en período de lactancia.'
WHERE title = 'Energizante';