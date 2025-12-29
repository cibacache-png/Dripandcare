import { useState, useEffect } from 'react';
import { supabase, type Testimonial } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { Plus, Edit2, Trash2, Save, X, LogOut, Eye, EyeOff } from 'lucide-react';

export function AdminPanel() {
  const { user, signOut } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    color_theme: 'rose',
    is_active: true,
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading testimonials:', error);
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    const { error } = await supabase
      .from('testimonials')
      .insert([formData]);

    if (error) {
      console.error('Error creating testimonial:', error);
      alert('Error al crear testimonio');
    } else {
      setIsCreating(false);
      resetForm();
      loadTestimonials();
    }
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ ...formData, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating testimonial:', error);
      alert('Error al actualizar testimonio');
    } else {
      setEditingId(null);
      resetForm();
      loadTestimonials();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este testimonio?')) return;

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting testimonial:', error);
      alert('Error al eliminar testimonio');
    } else {
      loadTestimonials();
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) {
      console.error('Error toggling active status:', error);
      alert('Error al cambiar estado');
    } else {
      loadTestimonials();
    }
  };

  const startEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      rating: testimonial.rating,
      color_theme: testimonial.color_theme,
      is_active: testimonial.is_active,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      content: '',
      rating: 5,
      color_theme: 'rose',
      is_active: true,
    });
  };

  const colorThemes = [
    { value: 'rose', label: 'Rosa', class: 'from-rose-50 to-white' },
    { value: 'blue', label: 'Azul', class: 'from-blue-50 to-white' },
    { value: 'amber', label: 'Ámbar', class: 'from-amber-50 to-white' },
    { value: 'emerald', label: 'Esmeralda', class: 'from-emerald-50 to-white' },
    { value: 'violet', label: 'Violeta', class: 'from-violet-50 to-white' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-light text-slate-800">
              Panel de <span className="font-semibold">Administración</span>
            </h1>
            <p className="text-slate-600 mt-2">Gestiona los testimonios de Drip&Care</p>
            {user && (
              <p className="text-sm text-slate-500 mt-1">Conectado como: {user.email}</p>
            )}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Nuevo Testimonio</span>
            </button>
            <button
              onClick={signOut}
              className="flex items-center space-x-2 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-full font-medium hover:border-rose-400 hover:text-rose-400 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Salir</span>
            </button>
          </div>
        </div>

        {isCreating && (
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Crear Nuevo Testimonio</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="María José R."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Rol/Descripción
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="Profesional, 34 años"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Testimonio
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="El testimonio completo..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Calificación
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>
                      {num} estrellas
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Color del tema
                </label>
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
              <div className="md:col-span-2">
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
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={cancelEdit}
                className="flex items-center space-x-2 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-full font-medium hover:border-slate-300 transition-all"
              >
                <X className="w-5 h-5" />
                <span>Cancelar</span>
              </button>
              <button
                onClick={handleCreate}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Save className="w-5 h-5" />
                <span>Guardar</span>
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Cargando testimonios...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-3xl p-8 shadow-lg">
                {editingId === testimonial.id ? (
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-6">Editando Testimonio</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Nombre
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Rol/Descripción
                        </label>
                        <input
                          type="text"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Testimonio
                        </label>
                        <textarea
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Calificación
                        </label>
                        <select
                          value={formData.rating}
                          onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                        >
                          {[5, 4, 3, 2, 1].map((num) => (
                            <option key={num} value={num}>
                              {num} estrellas
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Color del tema
                        </label>
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
                      <div className="md:col-span-2">
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
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        onClick={cancelEdit}
                        className="flex items-center space-x-2 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-full font-medium hover:border-slate-300 transition-all"
                      >
                        <X className="w-5 h-5" />
                        <span>Cancelar</span>
                      </button>
                      <button
                        onClick={() => handleUpdate(testimonial.id)}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
                      >
                        <Save className="w-5 h-5" />
                        <span>Guardar</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-slate-800">{testimonial.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            testimonial.is_active
                              ? 'bg-green-100 text-green-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {testimonial.is_active ? 'Visible' : 'Oculto'}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${
                            testimonial.color_theme === 'rose' ? 'from-rose-100 to-rose-200 text-rose-700' :
                            testimonial.color_theme === 'blue' ? 'from-blue-100 to-blue-200 text-blue-700' :
                            testimonial.color_theme === 'amber' ? 'from-amber-100 to-amber-200 text-amber-700' :
                            testimonial.color_theme === 'emerald' ? 'from-emerald-100 to-emerald-200 text-emerald-700' :
                            'from-violet-100 to-violet-200 text-violet-700'
                          }`}>
                            {colorThemes.find(t => t.value === testimonial.color_theme)?.label}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{testimonial.role}</p>
                        <p className="text-slate-700 italic mb-3">"{testimonial.content}"</p>
                        <div className="flex items-center space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-amber-400">★</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleToggleActive(testimonial.id, testimonial.is_active)}
                          className="p-2 border-2 border-slate-200 text-slate-600 rounded-xl hover:border-blue-400 hover:text-blue-400 transition-all"
                          title={testimonial.is_active ? 'Ocultar' : 'Mostrar'}
                        >
                          {testimonial.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={() => startEdit(testimonial)}
                          className="p-2 border-2 border-slate-200 text-slate-600 rounded-xl hover:border-rose-400 hover:text-rose-400 transition-all"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          className="p-2 border-2 border-slate-200 text-slate-600 rounded-xl hover:border-red-400 hover:text-red-400 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && testimonials.length === 0 && !isCreating && (
          <div className="text-center py-12 bg-white rounded-3xl">
            <p className="text-slate-600 mb-4">No hay testimonios todavía</p>
            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Crear Primer Testimonio</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
