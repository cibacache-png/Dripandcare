import { useEffect, useState } from 'react';
import { supabase, type Testimonial } from '../lib/supabase';
import { Sparkles } from 'lucide-react';

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading testimonials:', error);
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  const getColorClasses = (theme: string) => {
    switch (theme) {
      case 'rose':
        return {
          bg: 'from-rose-50 to-white',
          star: 'text-rose-400 fill-rose-400'
        };
      case 'blue':
        return {
          bg: 'from-blue-50 to-white',
          star: 'text-blue-400 fill-blue-400'
        };
      case 'amber':
        return {
          bg: 'from-amber-50 to-white',
          star: 'text-amber-400 fill-amber-400'
        };
      case 'emerald':
        return {
          bg: 'from-emerald-50 to-white',
          star: 'text-emerald-400 fill-emerald-400'
        };
      case 'violet':
        return {
          bg: 'from-violet-50 to-white',
          star: 'text-violet-400 fill-violet-400'
        };
      default:
        return {
          bg: 'from-rose-50 to-white',
          star: 'text-rose-400 fill-rose-400'
        };
    }
  };

  if (loading) {
    return (
      <section id="testimonios" className="min-h-screen flex items-center py-10 sm:py-12 md:py-16 lg:py-24 bg-[#AA225D]">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 w-full">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <div className="inline-block px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white/20 rounded-full text-white text-[10px] sm:text-xs md:text-sm font-medium mb-3 sm:mb-4">
              Experiencias reales
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white font-display px-2">
              Lo que dicen <span className="font-semibold">nuestros pacientes</span>
            </h2>
          </div>
          <div className="text-center py-8 sm:py-10 md:py-12">
            <p className="text-sm sm:text-base text-white/80">Cargando testimonios...</p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonios" className="min-h-screen flex items-center py-10 sm:py-12 md:py-16 lg:py-24 bg-[#AA225D]">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 w-full">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-16">
          <div className="inline-block px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white/20 rounded-full text-white text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-3 md:mb-4">
            Experiencias reales
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white font-display px-2">
            Lo que dicen <span className="font-semibold">nuestros pacientes</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {testimonials.map((testimonial) => {
            const colors = getColorClasses(testimonial.color_theme);
            return (
              <div
                key={testimonial.id}
                className={`bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-lg border border-white/40`}
              >
                <div className="flex space-x-0.5 sm:space-x-1 mb-2 sm:mb-3 md:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Sparkles key={i} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${colors.star}`} />
                  ))}
                </div>
                <p className="text-xs sm:text-sm md:text-base text-slate-700 mb-3 sm:mb-4 md:mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-slate-800 text-xs sm:text-sm md:text-base">{testimonial.name}</p>
                  <p className="text-[10px] sm:text-xs md:text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
