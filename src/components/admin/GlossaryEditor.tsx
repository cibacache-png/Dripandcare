import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Save, X, ChevronUp, ChevronDown } from 'lucide-react';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  order_position: number;
  is_active: boolean;
}

export function GlossaryEditor() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ term: '', definition: '' });

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('*')
      .order('order_position', { ascending: true });

    if (error) {
      console.error('Error fetching glossary terms:', error);
      return;
    }

    setTerms(data || []);
  };

  const handleAdd = async () => {
    if (!formData.term.trim() || !formData.definition.trim()) return;

    const maxOrder = Math.max(...terms.map(t => t.order_position), 0);

    const { error } = await supabase
      .from('glossary_terms')
      .insert({
        term: formData.term,
        definition: formData.definition,
        order_position: maxOrder + 1,
        is_active: true
      });

    if (error) {
      console.error('Error adding term:', error);
      return;
    }

    setFormData({ term: '', definition: '' });
    setIsAdding(false);
    fetchTerms();
  };

  const handleUpdate = async (id: string) => {
    if (!formData.term.trim() || !formData.definition.trim()) return;

    const { error } = await supabase
      .from('glossary_terms')
      .update({
        term: formData.term,
        definition: formData.definition
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating term:', error);
      return;
    }

    setEditingId(null);
    setFormData({ term: '', definition: '' });
    fetchTerms();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este término?')) return;

    const { error } = await supabase
      .from('glossary_terms')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting term:', error);
      return;
    }

    fetchTerms();
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('glossary_terms')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) {
      console.error('Error toggling term status:', error);
      return;
    }

    fetchTerms();
  };

  const moveItem = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = terms.findIndex(t => t.id === id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === terms.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newTerms = [...terms];
    [newTerms[currentIndex], newTerms[newIndex]] = [newTerms[newIndex], newTerms[currentIndex]];

    const updates = newTerms.map((term, index) => ({
      id: term.id,
      order_position: index + 1
    }));

    for (const update of updates) {
      await supabase
        .from('glossary_terms')
        .update({ order_position: update.order_position })
        .eq('id', update.id);
    }

    fetchTerms();
  };

  const startEdit = (term: GlossaryTerm) => {
    setEditingId(term.id);
    setFormData({ term: term.term, definition: term.definition });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ term: '', definition: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-800">Glosario de Términos</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#617E1D] text-white rounded-lg hover:bg-[#4F6517] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Agregar Término</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-[#617E1D]">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Nuevo Término</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Término</label>
              <input
                type="text"
                value={formData.term}
                onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#617E1D] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Definición</label>
              <textarea
                value={formData.definition}
                onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#617E1D] focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleAdd}
                className="flex items-center space-x-2 px-4 py-2 bg-[#617E1D] text-white rounded-lg hover:bg-[#4F6517] transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Guardar</span>
              </button>
              <button
                onClick={cancelEdit}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancelar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {terms.map((term) => (
          <div
            key={term.id}
            className={`bg-white rounded-lg shadow-md p-6 ${!term.is_active ? 'opacity-50' : ''}`}
          >
            {editingId === term.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Término</label>
                  <input
                    type="text"
                    value={formData.term}
                    onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#617E1D] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Definición</label>
                  <textarea
                    value={formData.definition}
                    onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#617E1D] focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleUpdate(term.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#617E1D] text-white rounded-lg hover:bg-[#4F6517] transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar</span>
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancelar</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-800 text-lg">{term.term}</h4>
                  <p className="text-slate-600 mt-2">{term.definition}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => moveItem(term.id, 'up')}
                      disabled={terms[0].id === term.id}
                      className="p-2 text-slate-600 hover:text-[#617E1D] disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Mover arriba"
                    >
                      <ChevronUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => moveItem(term.id, 'down')}
                      disabled={terms[terms.length - 1].id === term.id}
                      className="p-2 text-slate-600 hover:text-[#617E1D] disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Mover abajo"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleToggleActive(term.id, term.is_active)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        term.is_active
                          ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          : 'bg-[#617E1D] text-white hover:bg-[#4F6517]'
                      }`}
                    >
                      {term.is_active ? 'Ocultar' : 'Mostrar'}
                    </button>
                    <button
                      onClick={() => startEdit(term)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => handleDelete(term.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
