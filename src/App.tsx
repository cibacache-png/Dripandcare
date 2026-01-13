import { Heart, Droplet, Shield, Sparkles, Phone, Instagram, Facebook, MapPin, ChevronDown, Lock, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { TestimonialsSection } from './components/TestimonialsSection';
import { IVTherapyBenefitsSection } from './components/IVTherapyBenefitsSection';
import { TherapiesSection } from './components/TherapiesSection';
import { NutrientsSection } from './components/NutrientsSection';
import { FAQSection } from './components/FAQSection';
import { NursingServicesSection } from './components/NursingServicesSection';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { usePageTexts } from './hooks/usePageTexts';

function App() {
  const navigate = useNavigate();
  const { getText } = usePageTexts();
  const [currentImage, setCurrentImage] = useState(0);
  const [showSueroterapiaSections, setShowSueroterapiaSections] = useState(false);
  const [showEnfermeriaSections, setShowEnfermeriaSections] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const images = [
    'https://cmkkzaeuzndrceftqsnn.supabase.co/storage/v1/object/public/Dripandcare/DSC_0539.JPG',
    'https://cmkkzaeuzndrceftqsnn.supabase.co/storage/v1/object/public/Dripandcare/DSC_0547.JPG',
    'https://cmkkzaeuzndrceftqsnn.supabase.co/storage/v1/object/public/Dripandcare/DSC_0559.JPG'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Scrollable Content */}
      <div className="min-h-screen">
        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/56998763598?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20tus%20sesiones%20de%20bienestar.%20%C2%BFMe%20podr%C3%ADas%20orientar%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] text-white p-4 sm:p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300"
        >
          <svg className="w-7 h-7 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>

        {/* Navigation */}
        <nav className="sticky top-0 w-full bg-[#304206]/80 backdrop-blur-md z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-white/60 blur-xl rounded-full"></div>
                <img
                  src="https://cmkkzaeuzndrceftqsnn.supabase.co/storage/v1/object/public/Dripandcare/LOGO%20DRIP&CARE-14.png"
                  alt="Drip&Care Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain relative z-10"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl md:text-2xl font-light text-white font-display leading-tight">
                  Drip<span className="font-semibold">&Care</span>
                </span>
                <span className="text-[10px] sm:text-xs font-light text-white/80 font-display">
                  by Daniela Rufs
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6 text-sm">
              <button onClick={() => scrollToSection('servicios')} className="text-white/90 hover:text-white transition-all font-medium">Servicios</button>
              <button onClick={() => scrollToSection('contacto')} className="text-white/90 hover:text-white transition-all font-medium">Contacto</button>
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center space-x-1 text-white/60 hover:text-white/90 transition-all"
                title="Panel de administración"
              >
                <Lock className="w-3 h-3" />
                <span>Admin</span>
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden bg-[#304206]/95 backdrop-blur-md border-t border-white/10">
              <div className="px-4 py-4 space-y-3">
                <button
                  onClick={() => scrollToSection('servicios')}
                  className="block w-full text-left text-white/90 hover:text-white transition-all font-medium py-2"
                >
                  Servicios
                </button>
                <button
                  onClick={() => scrollToSection('contacto')}
                  className="block w-full text-left text-white/90 hover:text-white transition-all font-medium py-2"
                >
                  Contacto
                </button>
                <button
                  onClick={() => {
                    navigate('/admin');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-white/60 hover:text-white/90 transition-all py-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Admin</span>
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section
          id="inicio"
          className="relative flex items-center justify-center"
          style={{
            minHeight: 'calc(100vh - 60px)',
            backgroundImage: 'url(https://cmkkzaeuzndrceftqsnn.supabase.co/storage/v1/object/public/Dripandcare/IMG_4237.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 md:px-8 text-left py-16 sm:py-16 md:py-20 w-full">
            <div className="space-y-5 sm:space-y-5 md:space-y-6 max-w-2xl">
              <p className="text-base sm:text-base md:text-lg text-white/90 leading-relaxed">
                {getText('hero', 'welcome_text', 'Bienvenidas/os a')}
              </p>
              <div className="inline-block bg-white/40 backdrop-blur-md border border-white/60 rounded-xl sm:rounded-2xl px-6 sm:px-6 md:px-8 lg:px-12 py-5 sm:py-5 md:py-6 lg:py-8 shadow-lg">
                <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white font-display" style={{ lineHeight: '1.4' }}>
                  {getText('hero', 'title', 'DRIP & CARE').split('&').map((part, idx) =>
                    idx === 0 ? part + ' & ' : <span key={idx} className="font-semibold bg-gradient-to-r from-[#E91E8C] via-[#FF6B4A] to-[#FFB627] bg-clip-text text-transparent">{part}</span>
                  )}
                </h1>
              </div>
              <p className="text-base sm:text-base md:text-lg text-white/90 leading-relaxed">
                {getText('hero', 'subtitle', 'by Daniela Rufs')}<br />
                {getText('hero', 'tagline', 'Recupera y regenera tu salud con sueroterapia')}
              </p>
              <div className="flex justify-start pt-3 sm:pt-3 md:pt-4">
                <a
                  href="https://wa.me/56998763598?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20tus%20sesiones%20de%20bienestar.%20%C2%BFMe%20podr%C3%ADas%20orientar%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-6 md:px-8 py-3 sm:py-3 text-base sm:text-base bg-[#AA225D] text-white rounded-full font-medium hover:bg-[#8B1A4A] transition-all duration-300 text-center shadow-lg"
                >
                  {getText('hero', 'cta_button', 'Agenda tu evaluación gratuita')}
                </a>
              </div>
            </div>
          </div>
          <button
            onClick={() => scrollToSection('quien-soy')}
            className="absolute bottom-6 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10"
          >
            <ChevronDown className="w-6 h-6 sm:w-6 sm:h-6 text-white" />
          </button>
        </section>

        {/* Quién Soy */}
        <section id="quien-soy" className="flex items-center bg-[#394023]" style={{ minHeight: 'calc(100vh - 60px)', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 w-full">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            <div className="relative group">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                {images.map((img, index) => (
                  <img
                    key={img}
                    src={img}
                    alt={`Profesional de enfermería ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentImage ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#394023]" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#394023]" />
                </button>
                <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                        index === currentImage ? 'bg-white w-5 sm:w-6 md:w-8' : 'bg-white/50'
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full text-white text-xs sm:text-sm font-medium">
                {getText('quien_soy', 'badge', 'Enfermera especializada')}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white font-display">
                {getText('quien_soy', 'title', 'Quien soy').split(' ').map((word, idx) =>
                  idx === getText('quien_soy', 'title', 'Quien soy').split(' ').length - 1 ?
                    <span key={idx} className="font-semibold"> {word}</span> : word + ' '
                )}
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed text-justify">
                  Soy Daniela, enfermera certificada en sueroterapia y curaciones avanzadas, con 6 años de experiencia clínica.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed text-justify">
                  Me formé como enfermera en la <strong>Universidad Mayor, en Santiago</strong>, y cuento con experiencia clínica en <strong>distintos niveles de atención</strong>, tanto en <strong>atención primaria (CESFAM)</strong> como en <strong>atención terciaria (Hospital)</strong>. He trabajado con <strong>pacientes hospitalizados de riesgo vital</strong>, así como con <strong>personas sanas</strong> orientadas a la prevención y al fortalecimiento de su salud.
                </p>

                {showFullBio && (
                  <>
                    <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed text-justify">
                      Mi trayectoria profesional ha sido diversa y profundamente humana, incluyendo experiencia en <strong>piso quirúrgico, centros médicos privados, laboratorios, curaciones avanzadas, docencia clínica formando a futuros enfermeros y áreas de medicina preventiva</strong>, etapas que fortalecieron mi criterio clínico, mi capacidad de decisión y una <strong>mirada integral del cuidado</strong>.
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed text-justify">
                      <strong>Hoy lidero Drip & Care</strong>, un proyecto creado desde la enfermería, donde la técnica, la seguridad y la evidencia científica se unen a una atención cercana y personalizada. No creo en protocolos genéricos: creo <strong>en evaluar, escuchar y tratar a cada persona como única</strong>.
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed text-justify">
                      Soy <strong>madre, amante de la naturaleza y del movimiento</strong>. Creo profundamente que la salud no solo se trata, <strong>se acompaña</strong>. Y eso es lo que hago en cada atención.
                    </p>
                  </>
                )}

                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="text-white hover:text-white/80 font-medium text-sm sm:text-base md:text-lg transition-colors duration-200 flex items-center gap-1"
                >
                  {showFullBio ? 'Leer menos...' : 'Leer más...'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Nuestros Servicios */}
        <section id="servicios" className="bg-[#F8EEEE] flex items-center" style={{ minHeight: 'calc(100vh - 60px)', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-200 rounded-full text-slate-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              {getText('servicios', 'badge', 'Nuestros Servicios')}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-800 font-display mb-3 sm:mb-4">
              <span dangerouslySetInnerHTML={{ __html: getText('servicios', 'title', '¿Qué necesitas <span class="font-semibold">hoy</span>?') }} />
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
              {getText('servicios', 'subtitle', 'Elige el servicio que mejor se adapte a tus necesidades')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            <button
              onClick={() => {
                setShowSueroterapiaSections(true);
                setTimeout(() => scrollToSection('beneficios-iv'), 300);
              }}
              className="group rounded-xl sm:rounded-2xl bg-[#AA225D] p-6 sm:p-8 md:p-10 text-left shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 md:mb-5">
                <Droplet className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2 sm:mb-3 md:mb-4">{getText('servicios', 'sueroterapia_title', 'Sueroterapia')}</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 md:mb-5">
                {getText('servicios', 'sueroterapia_description', 'Tratamientos personalizados para energía, hidratación, belleza y bienestar integral.')}
              </p>
              <div className="flex items-center text-white font-medium text-sm sm:text-base">
                <span className="mr-2">{getText('servicios', 'sueroterapia_cta', 'Ver tratamientos')}</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>

            <button
              onClick={() => setShowEnfermeriaSections(!showEnfermeriaSections)}
              className="group rounded-xl sm:rounded-2xl bg-[#617E1D] p-6 sm:p-8 md:p-10 text-left shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 md:mb-5">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2 sm:mb-3 md:mb-4">{getText('servicios', 'enfermeria_title', 'Enfermería móvil')}</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 md:mb-5">
                {getText('servicios', 'enfermeria_description', 'Atención profesional de enfermería en tu hogar: curaciones, controles y cuidados especializados.')}
              </p>
              <div className="flex items-center text-white font-medium text-sm sm:text-base">
                <span className="mr-2">{getText('servicios', 'enfermeria_cta', 'Ver servicios')}</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>
      </section>

        {/* Servicios */}
        {showSueroterapiaSections && (
          <>
            <IVTherapyBenefitsSection />

            <TherapiesSection />

            <NutrientsSection />

            <FAQSection onCollapse={() => setShowSueroterapiaSections(false)} />
          </>
        )}

        {/* Enfermería Móvil Services */}
        {showEnfermeriaSections && (
          <NursingServicesSection onCollapse={() => setShowEnfermeriaSections(false)} />
        )}

        {/* Testimonios */}
        <TestimonialsSection />

        {/* Cómo Funciona */}
        <section className="min-h-screen flex items-center py-12 sm:py-12 md:py-16 lg:py-24 bg-[#CD6C1F]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 w-full">
            <div className="text-center mb-8 sm:mb-8 md:mb-10 lg:mb-16">
              <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full text-white text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                {getText('como_funciona', 'badge', 'Proceso simple')}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-3 sm:mb-4 font-display px-2">
                <span dangerouslySetInnerHTML={{ __html: getText('como_funciona', 'title', '¿Cómo <span class="font-semibold">funciona</span>?') }} />
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto px-4">
                {getText('como_funciona', 'subtitle', 'Un proceso profesional y cercano, diseñado para tu bienestar')}
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                <img
                  src="https://cmkkzaeuzndrceftqsnn.supabase.co/storage/v1/object/public/Dripandcare/COMO%20FUNCIONA-01.jpg"
                  alt="Cómo funciona el proceso de atención"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="flex items-center bg-[#617E1D]" style={{ minHeight: 'calc(100vh - 60px)', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 w-full">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full text-white text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              {getText('contacto', 'badge', 'Estamos aquí para ti')}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-3 sm:mb-4 font-display">
              <span dangerouslySetInnerHTML={{ __html: getText('contacto', 'title', 'Agenda tu <span class="font-semibold">sesión</span>') }} />
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/90 px-4">
              {getText('contacto', 'subtitle', 'Contáctanos y comienza tu camino hacia el bienestar integral')}
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <svg width="0" height="0">
              <defs>
                <clipPath id="tombstone-shape" clipPathUnits="objectBoundingBox">
                  <path d="M 0,0.15 Q 0,0 0.5,0 Q 1,0 1,0.15 L 1,1 L 0,1 Z" />
                </clipPath>
              </defs>
            </svg>
            <div className="relative">
              <div className="bg-white/95 shadow-lg p-5 sm:p-6 md:p-8 pt-12 sm:pt-14 md:pt-16" style={{ clipPath: 'url(#tombstone-shape)' }}>
                <div className="absolute top-4 sm:top-5 md:top-6 left-1/2 transform -translate-x-1/2">
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#617E1D] fill-[#617E1D]" />
                </div>
                <div className="text-center space-y-3 sm:space-y-4 mb-5 sm:mb-6 md:mb-8 mt-5 sm:mt-6 md:mt-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-800 font-display uppercase tracking-wide px-2">
                    {getText('contacto', 'card_title', 'Bienestar a un mensaje de distancia')}
                  </h3>
                </div>
                <div className="space-y-2 sm:space-y-2.5 md:space-y-3 text-slate-600 mb-5 sm:mb-6 md:mb-8">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#617E1D] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed">Atención personalizada y profesional</p>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#617E1D] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed">Servicio a domicilio en Osorno</p>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#617E1D] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed">Productos de la más alta calidad</p>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#617E1D] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed">Protocolos seguros y certificados</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/56998763598?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20tus%20sesiones%20de%20bienestar.%20%C2%BFMe%20podr%C3%ADas%20orientar%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-[#617E1D] text-white rounded-full font-medium hover:bg-[#4A6217] transition-all duration-300 text-center"
                >
                  {getText('contacto', 'cta_button', 'Agenda tu evaluación gratuita')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Footer */}
        <footer className="bg-[#304206] text-white py-10 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-8 md:gap-10 lg:gap-12">
            <div>
              <div className="mb-4">
                <img
                  src="https://cmkkzaeuzndrceftqsnn.supabase.co/storage/v1/object/public/Dripandcare/LOGO%20DRIP&CARE-12.png"
                  alt="Drip&Care Logo"
                  className="h-28 sm:h-28 md:h-32 w-auto object-contain"
                />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 sm:mb-4 text-base sm:text-base text-white">Enlaces</h4>
              <div className="space-y-2 sm:space-y-2 text-white/80 text-sm sm:text-base">
                <button onClick={() => scrollToSection('servicios')} className="block hover:text-[#AA225D] transition-colors">Servicios</button>
                <button onClick={() => scrollToSection('quien-soy')} className="block hover:text-[#AA225D] transition-colors">Quién Soy</button>
                <button onClick={() => scrollToSection('testimonios')} className="block hover:text-[#AA225D] transition-colors">Testimonios</button>
                <a href="https://especialistaenheridas.cl" target="_blank" rel="noopener noreferrer" className="block hover:text-[#AA225D] transition-colors">
                  especialistaenheridas.cl
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 sm:mb-4 text-base sm:text-base text-white">Contacto</h4>
              <div className="space-y-2.5 sm:space-y-3">
                <a href="https://instagram.com/enfermeria.movil" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-white/80 hover:text-[#AA225D] transition-colors text-sm sm:text-base">
                  <Instagram className="w-5 h-5 sm:w-5 sm:h-5" />
                  <span>Instagram</span>
                </a>
                <a href="https://www.facebook.com/enfermeria.movil.5" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-white/80 hover:text-[#AA225D] transition-colors text-sm sm:text-base">
                  <Facebook className="w-5 h-5 sm:w-5 sm:h-5" />
                  <span>Facebook</span>
                </a>
                <a href="https://www.google.com/maps/search/?api=1&query=Enfermer%C3%ADa+M%C3%B3vil+Osorno" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-white/80 hover:text-[#AA225D] transition-colors text-sm sm:text-base">
                  <MapPin className="w-5 h-5 sm:w-5 sm:h-5" />
                  <span>Google business</span>
                </a>
                <a href="https://wa.me/56998763598?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20tus%20sesiones%20de%20bienestar.%20%C2%BFMe%20podr%C3%ADas%20orientar%3F" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-white/80 hover:text-[#AA225D] transition-colors text-sm sm:text-base">
                  <Phone className="w-5 h-5 sm:w-5 sm:h-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 sm:mt-10 md:mt-12 pt-7 sm:pt-7 md:pt-8 border-t border-white/20 text-center text-white/60 text-xs sm:text-sm">
            <p>© 2025 Drip&Care. Todos los derechos reservados.</p>
          </div>
        </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
