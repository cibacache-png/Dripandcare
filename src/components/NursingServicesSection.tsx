import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronDown } from 'lucide-react';

interface NursingService {
  id: string;
  title: string;
  description: string;
  price: number;
  price_unit: string;
  color: string;
  order_index: number;
}

interface NursingServicesSectionProps {
  onCollapse: () => void;
}

export function NursingServicesSection({ onCollapse }: NursingServicesSectionProps) {
  const [services, setServices] = useState<NursingService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('nursing_services')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error loading nursing services:', error);
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center py-10 sm:py-12 md:py-16 lg:py-24 bg-white/30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 w-full">
          <div className="text-center py-8 sm:py-10 md:py-12">
            <p className="text-sm sm:text-base text-slate-600">Cargando servicios...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center py-10 sm:py-12 md:py-16 lg:py-24 bg-white/30 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 w-full">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-16">
          <div className="inline-block px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-[#617E1D]/10 rounded-full text-[#617E1D] text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-3 md:mb-4">
            Servicios de Enfermería
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-slate-800 mb-2 sm:mb-3 md:mb-4 font-display px-2">
            Atención <span className="font-semibold">profesional</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-2">
            Servicios de enfermería especializados en la comodidad de tu hogar
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {services.map((service) => (
            <div key={service.id} className="relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl bg-white p-4 sm:p-5 md:p-6 lg:p-8 shadow-lg sm:shadow-xl border border-slate-200">
              <div
                className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full blur-3xl opacity-10"
                style={{ background: `linear-gradient(to bottom right, ${service.color}, transparent)` }}
              ></div>
              <div className="relative">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-slate-800 mb-2 sm:mb-3">{service.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="sm:ml-6 text-left sm:text-right">
                    <div
                      className="text-xl sm:text-2xl md:text-3xl font-bold"
                      style={{ color: service.color }}
                    >
                      {formatPrice(service.price)}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500">{service.price_unit}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onCollapse}
            className="inline-flex items-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base bg-gradient-to-r from-[#617E1D] to-[#282C38] text-white rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 rotate-180" />
            Ocultar contenido
          </button>
        </div>
      </div>
    </section>
  );
}
