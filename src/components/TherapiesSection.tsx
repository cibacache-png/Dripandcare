import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronDown, ChevronUp, Sparkles, RefreshCw, Zap, Dumbbell, Shield, Sun, X, Leaf } from 'lucide-react';

interface Therapy {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  color_theme: string;
  icon: string;
  order_position: number;
  subtitle?: string;
  components?: string[];
  physiological_effects?: { title: string; description: string }[];
  important_considerations?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'sparkles-leaf': Sparkles,
  'refresh': RefreshCw,
  'zap': Zap,
  'sparkles': Sparkles,
  'dumbbell': Dumbbell,
  'shield': Shield,
  'sun': Sun,
  'x-shield': X,
};

const colorThemes: Record<string, { from: string; to: string; bg: string; bullet: string }> = {
  amber: {
    from: 'from-[#CDBC1F]',
    to: 'to-[#617E1D]',
    bg: 'from-[#CDBC1F]/10 to-[#CDBC1F]/20',
    bullet: 'bg-[#CDBC1F]',
  },
  green: {
    from: 'from-[#617E1D]',
    to: 'to-[#282C38]',
    bg: 'from-[#617E1D]/10 to-[#617E1D]/20',
    bullet: 'bg-[#617E1D]',
  },
  rose: {
    from: 'from-[#AA225D]',
    to: 'to-[#282C38]',
    bg: 'from-[#AA225D]/10 to-[#AA225D]/20',
    bullet: 'bg-[#AA225D]',
  },
  slate: {
    from: 'from-[#282C38]',
    to: 'to-[#617E1D]',
    bg: 'from-[#282C38]/10 to-[#282C38]/20',
    bullet: 'bg-[#282C38]',
  },
};

export function TherapiesSection() {
  const [therapies, setTherapies] = useState<Therapy[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchTherapies();

    const channel = supabase
      .channel('therapies_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'therapies' }, () => {
        fetchTherapies();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTherapies = async () => {
    const { data, error } = await supabase
      .from('therapies')
      .select('*')
      .eq('is_active', true)
      .order('order_position', { ascending: true });

    if (error) {
      console.error('Error fetching therapies:', error);
      return;
    }

    setTherapies(data || []);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="terapias" className="min-h-screen flex items-center py-10 sm:py-12 md:py-16 lg:py-24 bg-white/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 w-full">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-16">
          <div className="inline-block px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-[#AA225D]/10 rounded-full text-[#AA225D] text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-3 md:mb-4">
            Nuestros tratamientos
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-slate-800 mb-2 sm:mb-3 md:mb-4 font-display px-2">
            Terapias <span className="font-semibold">personalizadas</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-2">
            Cada suero está formulado con nutrientes específicos para tus objetivos de salud y bienestar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {therapies.map((therapy) => {
            const Icon = iconMap[therapy.icon] || Sparkles;
            const theme = colorThemes[therapy.color_theme] || colorThemes.rose;
            const isExpanded = expandedId === therapy.id;

            return (
              <div
                key={therapy.id}
                className={`group bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl hover:shadow-2xl transition-all duration-300 border border-white/30 overflow-hidden`}
              >
                <button
                  onClick={() => toggleExpand(therapy.id)}
                  className="w-full p-4 sm:p-5 md:p-6 lg:p-8 flex items-start justify-between hover:bg-white/40 transition-colors text-left"
                >
                  <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br ${theme.from} ${theme.to} rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-800 font-display flex-1">{therapy.title}</h3>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#AA225D] flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#AA225D] flex-shrink-0 mt-1" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-4 sm:px-5 md:px-6 lg:px-8 pb-4 sm:pb-5 md:pb-6 lg:pb-8 space-y-4 sm:space-y-5 md:space-y-6">
                    {therapy.subtitle && (
                      <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                        {therapy.subtitle}
                      </p>
                    )}

                    {therapy.components && therapy.components.length > 0 && (
                      <div>
                        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 mb-2 sm:mb-3">Componentes</h4>
                        <ul className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs md:text-sm text-slate-600">
                          {therapy.components.map((component, index) => (
                            <li key={index} className="flex items-start space-x-1.5 sm:space-x-2">
                              <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 ${theme.bullet} rounded-full mt-1.5 flex-shrink-0`}></div>
                              <span className="leading-relaxed">{component}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {therapy.physiological_effects && therapy.physiological_effects.length > 0 && (
                      <div>
                        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 mb-2 sm:mb-3">Efectos fisiológicos principales</h4>
                        <div className="space-y-2 sm:space-y-3">
                          {therapy.physiological_effects.map((effect, index) => (
                            <div key={index}>
                              <h5 className="text-xs sm:text-sm md:text-base font-medium text-slate-700 mb-1 flex items-start space-x-1.5 sm:space-x-2">
                                <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 ${theme.bullet} rounded-full mt-1.5 flex-shrink-0`}></div>
                                <span>{effect.title}</span>
                              </h5>
                              <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 leading-relaxed ml-3 sm:ml-3.5">
                                {effect.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {therapy.important_considerations && (
                      <div className="pt-2 sm:pt-3 border-t border-slate-200">
                        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 mb-2 sm:mb-3">Consideraciones importantes</h4>
                        <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 leading-relaxed">
                          {therapy.important_considerations}
                        </p>
                      </div>
                    )}

                    {therapy.benefits && therapy.benefits.length > 0 && (
                      <div className="pt-2 sm:pt-3 border-t border-slate-200">
                        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 mb-2 sm:mb-3">Beneficios</h4>
                        <ul className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs md:text-sm text-slate-600">
                          {therapy.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start space-x-1.5 sm:space-x-2">
                              <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 ${theme.bullet} rounded-full mt-1.5 flex-shrink-0`}></div>
                              <span className="leading-relaxed">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
