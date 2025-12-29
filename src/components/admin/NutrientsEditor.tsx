import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Nutrient {
  id: string;
  name: string;
  active_ingredient: string;
  description: string;
  registry_number: string;
  order_index: number;
}

interface NutrientForm {
  name: string;
  active_ingredient: string;
  description: string;
  registry_number: string;
  order_index: number;
}

const emptyForm: NutrientForm = {
  name: '',
  active_ingredient: '',
  description: '',
  registry_number: '',
  order_index: 0,
};

export function NutrientsEditor() {
  const [nutrients, setNutrients] = useState<Nutrient[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<NutrientForm>(emptyForm);

  useEffect(() => {
    fetchNutrients();
  }, []);

  async function fetchNutrients() {
    try {
      const { data, error } = await supabase
        .from('nutrients')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setNutrients(data || []);
    } catch (error) {
      console.error('Error al cargar nutrientes:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      if (editingId) {
        const { error } = await supabase
          .from('nutrients')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('nutrients')
          .insert([formData]);

        if (error) throw error;
      }

      await fetchNutrients();
      handleCancel();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar el nutriente');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Estás seguro de que quieres eliminar este nutriente?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('nutrients')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchNutrients();
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar el nutriente');
    }
  }

  function handleEdit(nutrient: Nutrient) {
    setEditingId(nutrient.id);
    setFormData({
      name: nutrient.name,
      active_ingredient: nutrient.active_ingredient,
      description: nutrient.description,
      registry_number: nutrient.registry_number,
      order_index: nutrient.order_index,
    });
    setIsAdding(false);
  }

  function handleAdd() {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ ...emptyForm, order_index: nutrients.length });
  }

  function handleCancel() {
    setEditingId(null);
    setIsAdding(false);
    setFormData(emptyForm);
  }

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-800">Nutrientes</h2>
        {!isAdding && !editingId && (
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 px-4 py-2 bg-[#AA225D] text-white rounded-lg hover:bg-[#8B1A4A] transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Agregar Nutriente</span>
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white p-6 rounded-lg border-2 border-[#AA225D] shadow-lg">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            {editingId ? 'Editar Nutriente' : 'Nuevo Nutriente'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nombre del Nutriente
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#AA225D] focus:border-transparent"
                placeholder="Ej: Vitamina C"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Principio Activo
              </label>
              <input
                type="text"
                value={formData.active_ingredient}
                onChange={(e) => setFormData({ ...formData, active_ingredient: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#AA225D] focus:border-transparent"
                placeholder="Ej: Ascorbato de sodio al 25%"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#AA225D] focus:border-transparent"
                placeholder="Descripción completa del nutriente..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Número de Registro ISP
              </label>
              <input
                type="text"
                value={formData.registry_number}
                onChange={(e) => setFormData({ ...formData, registry_number: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#AA225D] focus:border-transparent"
                placeholder="Ej: N°Registro ISP: 2858C-13/23"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Orden de visualización
              </label>
              <input
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#AA225D] focus:border-transparent"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-[#AA225D] text-white rounded-lg hover:bg-[#8B1A4A] transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Guardar</span>
              </button>
              <button
                onClick={handleCancel}
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
        {nutrients.map((nutrient) => (
          <div
            key={nutrient.id}
            className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {nutrient.name}
                </h3>
                <p className="text-sm font-medium text-[#AA225D] mb-2">
                  {nutrient.active_ingredient}
                </p>
                <p className="text-sm text-slate-600 mb-2 whitespace-pre-wrap">
                  {nutrient.description}
                </p>
                <p className="text-xs text-slate-500">
                  {nutrient.registry_number}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Orden: {nutrient.order_index}
                </p>
              </div>
              {!editingId && !isAdding && (
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(nutrient)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(nutrient.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {nutrients.length === 0 && !isAdding && (
        <div className="text-center py-12 text-slate-500">
          No hay nutrientes agregados. Haz clic en "Agregar Nutriente" para comenzar.
        </div>
      )}
    </div>
  );
}
