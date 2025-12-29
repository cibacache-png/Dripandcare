import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Save, X, ChevronUp, ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order_position: number;
  is_active: boolean;
}

export function FAQEditor() {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('faq_items')
      .select('*')
      .order('order_position', { ascending: true });

    if (error) {
      console.error('Error fetching FAQ items:', error);
      return;
    }

    setItems(data || []);
  };

  const handleAdd = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) return;

    const maxOrder = Math.max(...items.map(i => i.order_position), 0);

    const { error } = await supabase
      .from('faq_items')
      .insert({
        question: formData.question,
        answer: formData.answer,
        order_position: maxOrder + 1,
        is_active: true
      });

    if (error) {
      console.error('Error adding FAQ item:', error);
      return;
    }

    setFormData({ question: '', answer: '' });
    setIsAdding(false);
    fetchItems();
  };

  const handleUpdate = async (id: string) => {
    if (!formData.question.trim() || !formData.answer.trim()) return;

    const { error } = await supabase
      .from('faq_items')
      .update({
        question: formData.question,
        answer: formData.answer
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating FAQ item:', error);
      return;
    }

    setEditingId(null);
    setFormData({ question: '', answer: '' });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta pregunta?')) return;

    const { error } = await supabase
      .from('faq_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting FAQ item:', error);
      return;
    }

    fetchItems();
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('faq_items')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) {
      console.error('Error toggling FAQ item status:', error);
      return;
    }

    fetchItems();
  };

  const moveItem = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = items.findIndex(i => i.id === id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === items.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newItems = [...items];
    [newItems[currentIndex], newItems[newIndex]] = [newItems[newIndex], newItems[currentIndex]];

    const updates = newItems.map((item, index) => ({
      id: item.id,
      order_position: index + 1
    }));

    for (const update of updates) {
      await supabase
        .from('faq_items')
        .update({ order_position: update.order_position })
        .eq('id', update.id);
    }

    fetchItems();
  };

  const startEdit = (item: FAQItem) => {
    setEditingId(item.id);
    setFormData({ question: item.question, answer: item.answer });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ question: '', answer: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-800">Preguntas Frecuentes</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#617E1D] text-white rounded-lg hover:bg-[#4F6517] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Agregar Pregunta</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-[#617E1D]">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Nueva Pregunta</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Pregunta</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#617E1D] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Respuesta</label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                rows={4}
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
        {items.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-lg shadow-md p-6 ${!item.is_active ? 'opacity-50' : ''}`}
          >
            {editingId === item.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Pregunta</label>
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#617E1D] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Respuesta</label>
                  <textarea
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#617E1D] focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleUpdate(item.id)}
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
                  <h4 className="font-semibold text-slate-800 text-lg">{item.question}</h4>
                  <p className="text-slate-600 mt-2">{item.answer}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => moveItem(item.id, 'up')}
                      disabled={items[0].id === item.id}
                      className="p-2 text-slate-600 hover:text-[#617E1D] disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Mover arriba"
                    >
                      <ChevronUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => moveItem(item.id, 'down')}
                      disabled={items[items.length - 1].id === item.id}
                      className="p-2 text-slate-600 hover:text-[#617E1D] disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Mover abajo"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleToggleActive(item.id, item.is_active)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        item.is_active
                          ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          : 'bg-[#617E1D] text-white hover:bg-[#4F6517]'
                      }`}
                    >
                      {item.is_active ? 'Ocultar' : 'Mostrar'}
                    </button>
                    <button
                      onClick={() => startEdit(item)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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
