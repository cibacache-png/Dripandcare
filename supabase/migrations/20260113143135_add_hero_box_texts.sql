/*
  # Add Hero Box Editable Texts
  
  1. Changes
    - Add new text entries for hero section box content
      - main_title: "RECUPERA Y REGENERA" (main headline with gradient Rs)
      - subtitle: "tu salud con sueroterapia y curaciones avanzadas a domicilio"
      - bottom_tagline: "La regeneración comienza en la célula."
  
  2. Notes
    - These texts will replace hardcoded content in the hero box
    - Allows admin to edit the main hero message
*/

INSERT INTO page_texts (section_key, text_key, text_value, text_type, order_index) VALUES
  ('hero', 'main_title', 'RECUPERA Y REGENERA', 'title', 3),
  ('hero', 'subtitle', 'tu salud con sueroterapia y curaciones avanzadas a domicilio', 'subtitle', 4),
  ('hero', 'bottom_tagline', 'La regeneración comienza en la célula.', 'body', 4)
ON CONFLICT (section_key, text_key) DO UPDATE SET
  text_value = EXCLUDED.text_value,
  updated_at = now();