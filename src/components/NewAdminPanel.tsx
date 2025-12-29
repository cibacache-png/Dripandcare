import { useState } from 'react';
import { useSimpleAuth } from './SimpleAuthContext';
import { LogOut, Heart, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TherapiesEditor } from './admin/TherapiesEditor';
import { NutrientsEditor } from './admin/NutrientsEditor';
import { FAQEditor } from './admin/FAQEditor';
import { NursingServicesEditor } from './admin/NursingServicesEditor';
import { PageTextsEditor } from './admin/PageTextsEditor';
import { AdminPanel as TestimonialsEditor } from './AdminPanel';

type Tab = 'page_texts' | 'therapies' | 'nutrients' | 'faq' | 'testimonials' | 'nursing';

export function NewAdminPanel() {
  const { signOut } = useSimpleAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('page_texts');

  const tabs = [
    { id: 'page_texts' as Tab, label: 'Textos de Página' },
    { id: 'therapies' as Tab, label: 'Terapias' },
    { id: 'nutrients' as Tab, label: 'Nutrientes' },
    { id: 'faq' as Tab, label: 'FAQ' },
    { id: 'nursing' as Tab, label: 'Servicios Enfermería' },
    { id: 'testimonials' as Tab, label: 'Testimonios' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-[#AA225D] fill-[#AA225D]/20" />
              <div>
                <h1 className="text-2xl font-light text-slate-800">
                  Drip<span className="font-semibold">&Care</span>
                </h1>
                <p className="text-sm text-slate-500">Panel de Administración</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-slate-600">
                Administrador
              </p>
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-full font-medium hover:border-[#AA225D] hover:text-[#AA225D] transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                <span>Volver al sitio</span>
              </button>
              <button
                onClick={async () => {
                  await signOut();
                  navigate('/');
                }}
                className="flex items-center space-x-2 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-full font-medium hover:border-rose-400 hover:text-rose-400 transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span>Salir</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-rose-500 text-rose-600'
                      : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="py-6">
          {activeTab === 'page_texts' && <PageTextsEditor />}
          {activeTab === 'therapies' && <TherapiesEditor />}
          {activeTab === 'nutrients' && <NutrientsEditor />}
          {activeTab === 'faq' && <FAQEditor />}
          {activeTab === 'nursing' && <NursingServicesEditor />}
          {activeTab === 'testimonials' && (
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">Testimonios de Pacientes</h2>
              <TestimonialsEditor />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
