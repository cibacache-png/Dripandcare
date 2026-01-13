export function IVTherapyBenefitsSection() {
  return (
    <section id="beneficios-iv" className="min-h-screen flex items-center py-10 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-br from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 w-full">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-16">
          <div className="inline-block px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-[#617E1D]/10 rounded-full text-[#617E1D] text-[10px] sm:text-xs md:text-sm font-medium mb-2 sm:mb-3 md:mb-4">
            Descubre los beneficios
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-white/30 overflow-hidden">
          <img
            src="https://cmkkzaeuzndrceftqsnn.supabase.co/storage/v1/object/public/Dripandcare/BENEFICIOS%20WEB-02.jpg"
            alt="Beneficios de la Sueroterapia"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
