import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Droplet, ChevronDown } from 'lucide-react';

interface Nutrient {
  id: string;
  name: string;
  active_ingredient: string;
  description: string;
  registry_number: string;
  order_index: number;
}

export function NutrientsSection() {
  const [nutrients, setNutrients] = useState<Nutrient[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchNutrients();
  }, []);

  async function fetchNutrients() {
    try {
      const { data, error } = await supabase
        .from('nutrients')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setNutrients(data || []);
    } catch (error) {
      console.error('Error al cargar nutrientes:', error);
    } finally {
      setLoading(false);
    }
  }

  function toggleExpanded(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  if (loading) {
    return (
      <section className="bg-white flex items-center justify-center" style={{ minHeight: 'calc(100vh - 60px)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AA225D]"></div>
      </section>
    );
  }

  if (nutrients.length === 0) {
    return null;
  }

  return (
    <section id="nutrientes" className="bg-white flex items-center" style={{ minHeight: 'calc(100vh - 60px)', paddingTop: '3rem', paddingBottom: '3rem' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-[#AA225D]/10 rounded-full text-[#AA225D] text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Nutrición celular
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-800 font-display mb-3 sm:mb-4 px-2">
            Conoce los <span className="font-semibold">nutrientes</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Vitaminas, aminoácidos y oligoelementos que potencian tu bienestar
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-2 sm:space-y-3">
          {nutrients.map((nutrient) => {
            const isExpanded = expandedIds.has(nutrient.id);
            return (
              <div
                key={nutrient.id}
                className="bg-white rounded-lg sm:rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:border-[#AA225D]/30 hover:shadow-md"
              >
                <button
                  onClick={() => toggleExpanded(nutrient.id)}
                  className="w-full flex items-center justify-between p-3 sm:p-4 md:p-5 text-left hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#AA225D]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Droplet className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#AA225D]" />
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800">
                      {nutrient.name}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5 space-y-2 sm:space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="pl-10 sm:pl-12 md:pl-14">
                      <p className="text-xs sm:text-sm font-medium text-[#AA225D] mb-2 sm:mb-3">
                        {nutrient.active_ingredient}
                      </p>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-2 sm:mb-3 text-justify">
                        {nutrient.description}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        {nutrient.registry_number}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
