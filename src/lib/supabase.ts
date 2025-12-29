import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  color_theme: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Therapy = {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  color_theme: string;
  icon: string;
  order_position: number;
  is_active: boolean;
  subtitle?: string;
  components?: string[];
  physiological_effects?: { title: string; description: string }[];
  important_considerations?: string;
  created_at: string;
  updated_at: string;
};

export type Nutrient = {
  id: string;
  title: string;
  description: string;
  order_position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ScientificReference = {
  id: string;
  reference_text: string;
  order_position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
