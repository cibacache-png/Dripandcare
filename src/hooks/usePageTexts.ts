import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface PageTexts {
  [section: string]: {
    [key: string]: string;
  };
}

export function usePageTexts() {
  const [texts, setTexts] = useState<PageTexts>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTexts();

    const channel = supabase
      .channel('page_texts_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'page_texts' }, () => {
        loadTexts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadTexts() {
    try {
      const { data, error } = await supabase
        .from('page_texts')
        .select('*');

      if (error) throw error;

      const grouped: PageTexts = {};
      data?.forEach((text) => {
        if (!grouped[text.section_key]) {
          grouped[text.section_key] = {};
        }
        grouped[text.section_key][text.text_key] = text.text_value;
      });

      setTexts(grouped);
    } catch (error) {
      console.error('Error loading page texts:', error);
    } finally {
      setLoading(false);
    }
  }

  const getText = (section: string, key: string, defaultValue: string = '') => {
    return texts[section]?.[key] || defaultValue;
  };

  return { texts, loading, getText };
}
