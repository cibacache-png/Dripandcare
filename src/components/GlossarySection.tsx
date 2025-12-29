import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  order_position: number;
}

export function GlossarySection() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchTerms();

    const channel = supabase
      .channel('glossary_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'glossary_terms' }, () => {
        fetchTerms();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTerms = async () => {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('*')
      .eq('is_active', true)
      .order('order_position', { ascending: true });

    if (error) {
      console.error('Error fetching glossary terms:', error);
      return;
    }

    setTerms(data || []);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="min-h-screen flex items-center py-10 sm:py-12 md:py-16 lg:py-24 bg-white/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 w-full">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-16">
          <div className="inline-block px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-[#617E1D]/10 rounded-full text-[#617E1D] text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-3 md:mb-4">
           Conoce los nutrientes
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-slate-800 mb-2 sm:mb-3 md:mb-4 font-display px-2">
            QUÉ CONTIENEN  <span className="font-semibold">nuestros sueros</span>
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {terms.map((term) => (
            <div
              key={term.id}
              className="bg-white/60 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm border border-white/30 overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(term.id)}
                className="w-full px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 flex items-center justify-between hover:bg-white/40 transition-colors"
              >
                <h4 className="font-semibold text-slate-800 text-xs sm:text-sm md:text-base text-left">
                  {term.term}
                </h4>
                {expandedId === term.id ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#617E1D] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#617E1D] flex-shrink-0" />
                )}
              </button>
              {expandedId === term.id && (
                <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-5">
                  <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 leading-relaxed">
                    {term.definition}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
