import { useState, useEffect } from 'react';
import { supabase, type Therapy } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';

export function TherapiesEditor() {
  const [therapies, setTherapies] = useState<Therapy[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    benefits: [''],
    color_theme: 'rose',
    icon: 'sparkles',
    order_position: 0,
    is_active: true,
    subtitle: '',
    components: [''],
    physiological_effects: [{ title: '', description: '' }],
    important_considerations: '',
  });

  useEffect(() => {
    loadTherapies();
  }, []);

  const loadTherapies = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('therapies')
      .select('*')
      .order('order_position', { ascending: true });

    if (error) {
      console.error('Error loading therapies:', error);
    } else {
      setTherapies(data || []);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    const { error } = await supabase
      .from('therapies')
      .insert([formData]);

    if (error) {
      console.error('Error creating therapy:', error);
      alert('Error al crear terapia');
    } else {
      setIsCreating(false);
      resetForm();
      loadTherapies();
    }
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase
      .from('therapies')
      .update({ ...formData, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating therapy:', error);
      alert('Error al actualizar terapia');
    } else {
      setEditingId(null);
      resetForm();
      loadTherapies();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta terapia?')) return;

    const { error } = await supabase
      .from('therapies')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting therapy:', error);
      alert('Error al eliminar terapia');
    } else {
      loadTherapies();
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('therapies')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) {
      console.error('Error toggling active status:', error);
      alert('Error al cambiar estado');
    } else {
      loadTherapies();
    }
  };

  const startEdit = (therapy: Therapy) => {
    setEditingId(therapy.id);
    setFormData({
      title: therapy.title,
      description: therapy.description,
      benefits: therapy.benefits,
      color_theme: therapy.color_theme,
      icon: therapy.icon,
      order_position: therapy.order_position,
      is_active: therapy.is_active,
      subtitle: therapy.subtitle || '',
      components: therapy.components || [''],
      physiological_effects: therapy.physiological_effects || [{ title: '', description: '' }],
      important_considerations: therapy.important_considerations || '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      benefits: [''],
      color_theme: 'rose',
      icon: 'sparkles',
      order_position: 0,
      is_active: true,
      subtitle: '',
      components: [''],
      physiological_effects: [{ title: '', description: '' }],
      important_considerations: '',
    });
  };

  const addBenefit = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, ''] });
  };

  const removeBenefit = (index: number) => {
    const newBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData({ ...formData, benefits: newBenefits });
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const addComponent = () => {
    setFormData({ ...formData, components: [...formData.components, ''] });
  };

  const removeComponent = (index: number) => {
    const newComponents = formData.components.filter((_, i) => i !== index);
    setFormData({ ...formData, components: newComponents });
  };

  const updateComponent = (index: number, value: string) => {
    const newComponents = [...formData.components];
    newComponents[index] = value;
    setFormData({ ...formData, components: newComponents });
  };

  const addPhysiologicalEffect = () => {
    setFormData({
      ...formData,
      physiological_effects: [...formData.physiological_effects, { title: '', description: '' }]
    });
  };

  const removePhysiologicalEffect = (index: number) => {
    const newEffects = formData.physiological_effects.filter((_, i) => i !== index);
    setFormData({ ...formData, physiological_effects: newEffects });
  };

  const updatePhysiologicalEffect = (index: number, field: 'title' | 'description', value: string) => {
    const newEffects = [...formData.physiological_effects];
    newEffects[index][field] = value;
    setFormData({ ...formData, physiological_effects: newEffects });
  };

  const colorThemes = [
    { value: 'rose', label: 'Rosa' },
    { value: 'amber', label: 'Ámbar' },
    { value: 'green', label: 'Verde' },
    { value: 'slate', label: 'Gris' },
  ];

  const icons = [
    { value: 'sparkles', label: 'Estrella' },
    { value: 'droplet', label: 'Gota' },
    { value: 'shield', label: 'Escudo' },
    { value: 'heart', label: 'Corazón' },
  ];

  const renderForm = (onSave: () => void, onCancel: () => void) => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Título</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
            placeholder="Energizante"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Orden</label>
          <input
            type="number"
            value={formData.order_position}
            onChange={(e) => setFormData({ ...formData, order_position: parseInt(e.target.value) })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Subtítulo</label>
        <textarea
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          rows={2}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
          placeholder="Combate el cansancio y recupera tu vitalidad..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Descripción (legacy - ahora se usa subtítulo)</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={2}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
          placeholder="Descripción de la terapia..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Componentes</label>
        {formData.components.map((component, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={component}
              onChange={(e) => updateComponent(index, e.target.value)}
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="Complejo B, Vitamina C..."
            />
            <button
              type="button"
              onClick={() => removeComponent(index)}
              className="px-4 py-3 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addComponent}
          className="mt-2 px-4 py-2 border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          Agregar Componente
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Efectos Fisiológicos Principales</label>
        {formData.physiological_effects.map((effect, index) => (
          <div key={index} className="mb-4 p-4 border border-slate-200 rounded-xl">
            <input
              type="text"
              value={effect.title}
              onChange={(e) => updatePhysiologicalEffect(index, 'title', e.target.value)}
              className="w-full px-4 py-3 mb-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="Título del efecto (ej: Mejora concentración)"
            />
            <textarea
              value={effect.description}
              onChange={(e) => updatePhysiologicalEffect(index, 'description', e.target.value)}
              rows={2}
              className="w-full px-4 py-3 mb-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="Descripción del efecto..."
            />
            <button
              type="button"
              onClick={() => removePhysiologicalEffect(index)}
              className="px-4 py-2 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50"
            >
              <X className="w-4 h-4 inline mr-2" />
              Eliminar Efecto
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addPhysiologicalEffect}
          className="mt-2 px-4 py-2 border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          Agregar Efecto Fisiológico
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Consideraciones Importantes</label>
        <textarea
          value={formData.important_considerations}
          onChange={(e) => setFormData({ ...formData, important_considerations: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
          placeholder="Ideal para periodos de alta exigencia mental o física..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Beneficios (se muestran al final)</label>
        {formData.benefits.map((benefit, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={benefit}
              onChange={(e) => updateBenefit(index, e.target.value)}
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="Beneficio..."
            />
            <button
              type="button"
              onClick={() => removeBenefit(index)}
              className="px-4 py-3 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addBenefit}
          className="mt-2 px-4 py-2 border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          Agregar Beneficio
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Color del tema</label>
          <select
            value={formData.color_theme}
            onChange={(e) => setFormData({ ...formData, color_theme: e.target.value })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            {colorThemes.map((theme) => (
              <option key={theme.value} value={theme.value}>
                {theme.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Icono</label>
          <select
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            {icons.map((icon) => (
              <option key={icon.value} value={icon.value}>
                {icon.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            className="w-5 h-5 text-rose-500 border-slate-300 rounded focus:ring-rose-400"
          />
          <span className="text-sm font-medium text-slate-700">Visible en el sitio</span>
        </label>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="flex items-center space-x-2 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-full font-medium hover:border-slate-300 transition-all"
        >
          <X className="w-5 h-5" />
          <span>Cancelar</span>
        </button>
        <button
          onClick={onSave}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <Save className="w-5 h-5" />
          <span>Guardar</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-800">Terapias Personalizadas</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Terapia</span>
        </button>
      </div>

      {isCreating && (
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Crear Nueva Terapia</h3>
          {renderForm(handleCreate, cancelEdit)}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-600">Cargando terapias...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {therapies.map((therapy) => (
            <div key={therapy.id} className="bg-white rounded-3xl p-8 shadow-lg">
              {editingId === therapy.id ? (
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-6">Editando Terapia</h3>
                  {renderForm(() => handleUpdate(therapy.id), cancelEdit)}
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-slate-800">{therapy.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        therapy.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {therapy.is_active ? 'Visible' : 'Oculto'}
                      </span>
                    </div>
                    {therapy.subtitle && (
                      <p className="text-slate-700 font-medium mb-2">{therapy.subtitle}</p>
                    )}
                    {therapy.components && therapy.components.length > 0 && (
                      <div className="mb-2">
                        <p className="text-sm font-medium text-slate-700 mb-1">Componentes:</p>
                        <p className="text-sm text-slate-600">{therapy.components.join(', ')}</p>
                      </div>
                    )}
                    {therapy.physiological_effects && therapy.physiological_effects.length > 0 && (
                      <div className="mb-2">
                        <p className="text-sm font-medium text-slate-700 mb-1">Efectos fisiológicos: {therapy.physiological_effects.length}</p>
                      </div>
                    )}
                    {therapy.important_considerations && (
                      <div className="mb-2">
                        <p className="text-sm font-medium text-slate-700 mb-1">Consideraciones:</p>
                        <p className="text-sm text-slate-600 line-clamp-2">{therapy.important_considerations}</p>
                      </div>
                    )}
                    <p className="text-slate-600 mb-3 text-sm italic">{therapy.description}</p>
                    <ul className="space-y-1 text-sm text-slate-600">
                      {therapy.benefits.map((benefit, i) => (
                        <li key={i}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleToggleActive(therapy.id, therapy.is_active)}
                      className="p-2 border-2 border-slate-200 text-slate-600 rounded-xl hover:border-blue-400 hover:text-blue-400 transition-all"
                      title={therapy.is_active ? 'Ocultar' : 'Mostrar'}
                    >
                      {therapy.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => startEdit(therapy)}
                      className="p-2 border-2 border-slate-200 text-slate-600 rounded-xl hover:border-rose-400 hover:text-rose-400 transition-all"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(therapy.id)}
                      className="p-2 border-2 border-slate-200 text-slate-600 rounded-xl hover:border-red-400 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
