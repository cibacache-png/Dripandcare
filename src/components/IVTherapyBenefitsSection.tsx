import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const benefits = [
  {
    title: 'Alta absorción de nutrientes',
    description: 'Al administrarse por vía endovenosa, se evita el metabolismo de primer paso hepático, logrando concentraciones plasmáticas superiores a las obtenidas por vía oral (estudios en vitamina C IV, magnesio IV y complejos B lo demuestran en PubMed).',
  },
  {
    title: 'Sin excipientes ni conservantes',
    description: 'Al no usar cápsulas ni comprimidos, se evita la exposición a aglutinantes, colorantes o conservantes que pueden generar intolerancias gastrointestinales.',
  },
  {
    title: '100% de biodisponibilidad',
    description: 'Los nutrientes entran directamente al torrente sanguíneo, alcanzando el sitio de acción con máxima disponibilidad, lo que permite efectos más predecibles y medibles.',
  },
  {
    title: 'Sin tomas diarias',
    description: 'El protocolo IV mantiene niveles plasmáticos estables por más tiempo, eliminando la necesidad de recordatorios diarios o múltiples dosis.',
  },
  {
    title: 'Acción rápida y prolongada',
    description: 'Los niveles terapéuticos se alcanzan en minutos, y muchos nutrientes mantienen su efecto horas o días según su cinética.',
  },
  {
    title: 'Optimización celular y reducción de inflamación',
    description: 'Los micronutrientes como vitamina C IV, magnesio, glutatión y complejo B modulan el estrés oxidativo, mejoran la función mitocondrial y apoyan la reparación celular, lo que se traduce en mejor energía, menor fatiga y recuperación más eficiente.',
  },
];

export function IVTherapyBenefitsSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="beneficios-iv" className="min-h-screen flex items-center py-10 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-br from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 w-full">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-16">
          <div className="inline-block px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-[#617E1D]/10 rounded-full text-[#617E1D] text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-3 md:mb-4">
            Por qué elegir terapia IV
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-slate-800 mb-2 sm:mb-3 md:mb-4 font-display px-2">
            BENEFICIOS DE LA <span className="font-semibold">TERAPIA INTRAVENOSA</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto px-2">
            Nutrición de nivel superior con resultados científicamente respaldados
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-white/30 overflow-hidden">
          <div className="p-4 sm:p-5 md:p-6 lg:p-8">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-800 mb-2 sm:mb-3">
                  {benefits[0].title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                  {benefits[0].description}
                </p>
              </div>

              {isExpanded && (
                <div className="space-y-4 sm:space-y-5 md:space-y-6 pt-3 sm:pt-4 md:pt-6 border-t border-slate-200">
                  {benefits.slice(1).map((benefit, index) => (
                    <div key={index}>
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-800 mb-2 sm:mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-6 sm:mt-8 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#617E1D] to-[#CDBC1F] text-white rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>{isExpanded ? 'Ver menos' : 'Leer más'}</span>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
