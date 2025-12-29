import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, RefreshCw } from 'lucide-react';

interface PageText {
  id: string;
  section_key: string;
  text_key: string;
  text_value: string;
  text_type: string;
  order_index: number;
}

interface GroupedTexts {
  [sectionKey: string]: PageText[];
}

const sectionLabels: { [key: string]: string } = {
  hero: 'Sección Principal (Hero)',
  quien_soy: 'Quién Soy',
  servicios: 'Nuestros Servicios',
  beneficios_iv: 'Beneficios de Terapia IV',
  terapias: 'Terapias Personalizadas',
  nutrientes: 'Nutrientes',
  faq: 'Preguntas Frecuentes',
  testimonios: 'Testimonios',
  como_funciona: 'Cómo Funciona',
  contacto: 'Contacto',
  enfermeria_servicios: 'Servicios de Enfermería',
};

const textTypeLabels: { [key: string]: string } = {
  title: 'Título',
  subtitle: 'Subtítulo',
  badge: 'Etiqueta',
  body: 'Texto',
  button: 'Botón',
};

export function PageTextsEditor() {
  const [texts, setTexts] = useState<PageText[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editedTexts, setEditedTexts] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    loadTexts();
  }, []);

  async function loadTexts() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('page_texts')
        .select('*')
        .order('section_key', { ascending: true })
        .order('order_index', { ascending: true });

      if (error) throw error;
      setTexts(data || []);
    } catch (error) {
      console.error('Error loading page texts:', error);
    } finally {
      setLoading(false);
    }
  }

  const groupedTexts: GroupedTexts = texts.reduce((acc, text) => {
    if (!acc[text.section_key]) {
      acc[text.section_key] = [];
    }
    acc[text.section_key].push(text);
    return acc;
  }, {} as GroupedTexts);

  const handleTextChange = (textId: string, value: string) => {
    setEditedTexts({ ...editedTexts, [textId]: value });
  };

  const handleSave = async (textId: string) => {
    if (!editedTexts[textId]) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('page_texts')
        .update({ text_value: editedTexts[textId], updated_at: new Date().toISOString() })
        .eq('id', textId);

      if (error) throw error;

      setTexts(texts.map(t => t.id === textId ? { ...t, text_value: editedTexts[textId] } : t));
      const newEdited = { ...editedTexts };
      delete newEdited[textId];
      setEditedTexts(newEdited);
    } catch (error) {
      console.error('Error saving text:', error);
      alert('Error al guardar el texto');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAll = async () => {
    if (Object.keys(editedTexts).length === 0) return;

    setSaving(true);
    try {
      const updates = Object.entries(editedTexts).map(([textId, value]) =>
        supabase
          .from('page_texts')
          .update({ text_value: value, updated_at: new Date().toISOString() })
          .eq('id', textId)
      );

      const results = await Promise.all(updates);
      const hasErrors = results.some(r => r.error);

      if (hasErrors) {
        throw new Error('Some updates failed');
      }

      await loadTexts();
      setEditedTexts({});
      alert('Todos los cambios guardados correctamente');
    } catch (error) {
      console.error('Error saving texts:', error);
      alert('Error al guardar algunos textos');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  const hasChanges = Object.keys(editedTexts).length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Textos de la Página</h2>
          <p className="text-sm text-slate-600 mt-1">
            Edita los títulos, subtítulos y textos que aparecen en la página principal
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadTexts}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            Recargar
          </button>
          {hasChanges && (
            <button
              onClick={handleSaveAll}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Guardando...' : `Guardar Todo (${Object.keys(editedTexts).length})`}
            </button>
          )}
        </div>
      </div>

      {Object.entries(groupedTexts).map(([sectionKey, sectionTexts]) => (
        <div key={sectionKey} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800">
              {sectionLabels[sectionKey] || sectionKey}
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {sectionTexts.map((text) => {
              const currentValue = editedTexts[text.id] ?? text.text_value;
              const hasChanged = editedTexts[text.id] !== undefined;

              return (
                <div key={text.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">
                      {textTypeLabels[text.text_type] || text.text_type}
                      <span className="ml-2 text-xs text-slate-500">({text.text_key})</span>
                    </label>
                    {hasChanged && (
                      <button
                        onClick={() => handleSave(text.id)}
                        disabled={saving}
                        className="text-sm px-3 py-1 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors disabled:opacity-50"
                      >
                        Guardar
                      </button>
                    )}
                  </div>
                  {text.text_type === 'body' && currentValue.length > 100 ? (
                    <textarea
                      value={currentValue}
                      onChange={(e) => handleTextChange(text.id, e.target.value)}
                      rows={3}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all ${
                        hasChanged ? 'border-rose-300 bg-rose-50' : 'border-slate-300'
                      }`}
                    />
                  ) : (
                    <input
                      type="text"
                      value={currentValue}
                      onChange={(e) => handleTextChange(text.id, e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all ${
                        hasChanged ? 'border-rose-300 bg-rose-50' : 'border-slate-300'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
