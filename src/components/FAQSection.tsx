import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order_position: number;
}

interface FAQSectionProps {
  onCollapse?: () => void;
}

export function FAQSection({ onCollapse }: FAQSectionProps) {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();

    const channel = supabase
      .channel('faq_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'faq_items' }, () => {
        fetchItems();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('faq_items')
      .select('*')
      .eq('is_active', true)
      .order('order_position', { ascending: true });

    if (error) {
      console.error('Error fetching FAQ items:', error);
      return;
    }

    setItems(data || []);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="min-h-screen flex items-center py-10 sm:py-12 md:py-16 lg:py-24 bg-white/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 w-full">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-16">
          <div className="inline-block px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-[#617E1D]/10 rounded-full text-[#617E1D] text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-3 md:mb-4">
            Preguntas frecuentes
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-slate-800 mb-2 sm:mb-3 md:mb-4 font-display px-2">
            Resuelve tus <span className="font-semibold">dudas</span>
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white/60 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm border border-white/30 overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 flex items-center justify-between hover:bg-white/40 transition-colors"
              >
                <h4 className="font-semibold text-slate-800 text-xs sm:text-sm md:text-base text-left">
                  {item.question}
                </h4>
                {expandedId === item.id ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#617E1D] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#617E1D] flex-shrink-0" />
                )}
              </button>
              {expandedId === item.id && (
                <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-5">
                  <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {onCollapse && (
          <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
            <button
              onClick={onCollapse}
              className="flex items-center space-x-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-all duration-300 text-xs sm:text-sm md:text-base font-medium"
            >
              <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span>Volver a servicios</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
