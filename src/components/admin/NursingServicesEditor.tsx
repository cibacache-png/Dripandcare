import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface NursingService {
  id: string;
  title: string;
  description: string;
  price: number;
  price_unit: string;
  color: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export function NursingServicesEditor() {
  const [services, setServices] = useState<NursingService[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    price_unit: 'por sesión',
    color: '#617E1D',
    order_index: 0,
  });

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

  const handleCreate = async () => {
    const { error } = await supabase
      .from('nursing_services')
      .insert([formData]);

    if (error) {
      console.error('Error creating service:', error);
      alert('Error al crear servicio');
    } else {
      setIsCreating(false);
      resetForm();
      loadServices();
    }
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase
      .from('nursing_services')
      .update({ ...formData, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating service:', error);
      alert('Error al actualizar servicio');
    } else {
      setEditingId(null);
      resetForm();
      loadServices();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este servicio?')) return;

    const { error } = await supabase
      .from('nursing_services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting service:', error);
      alert('Error al eliminar servicio');
    } else {
      loadServices();
    }
  };

  const startEdit = (service: NursingService) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      price_unit: service.price_unit,
      color: service.color,
      order_index: service.order_index,
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
      price: 0,
      price_unit: 'por sesión',
      color: '#617E1D',
      order_index: 0,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  const renderForm = (onSave: () => void, onCancel: () => void) => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Título</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#617E1D]"
            placeholder="Curaciones avanzadas"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Orden</label>
          <input
            type="number"
            value={formData.order_index}
            onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#617E1D]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Descripción</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#617E1D]"
          placeholder="Descripción detallada del servicio..."
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Precio (CLP)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#617E1D]"
            placeholder="25000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Unidad de precio</label>
          <input
            type="text"
            value={formData.price_unit}
            onChange={(e) => setFormData({ ...formData, price_unit: e.target.value })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#617E1D]"
            placeholder="por sesión"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Color (hex)</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-16 h-12 border border-slate-200 rounded-xl cursor-pointer"
            />
            <input
              type="text"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#617E1D]"
              placeholder="#617E1D"
            />
          </div>
        </div>
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
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#617E1D] to-[#282C38] text-white rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
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
        <h2 className="text-2xl font-semibold text-slate-800">Servicios de Enfermería</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#617E1D] to-[#282C38] text-white rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Servicio</span>
        </button>
      </div>

      {isCreating && (
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Crear Nuevo Servicio</h3>
          {renderForm(handleCreate, cancelEdit)}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-600">Cargando servicios...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-3xl p-8 shadow-lg">
              {editingId === service.id ? (
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-6">Editando Servicio</h3>
                  {renderForm(() => handleUpdate(service.id), cancelEdit)}
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-slate-800">{service.title}</h3>
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: service.color }}
                        title={service.color}
                      ></div>
                    </div>
                    <p className="text-slate-600 mb-3">{service.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold" style={{ color: service.color }}>
                        {formatPrice(service.price)}
                      </span>
                      <span className="text-sm text-slate-500">{service.price_unit}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => startEdit(service)}
                      className="p-2 border-2 border-slate-200 text-slate-600 rounded-xl hover:border-[#617E1D] hover:text-[#617E1D] transition-all"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
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
