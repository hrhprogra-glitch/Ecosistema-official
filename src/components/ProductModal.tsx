import { useState } from 'react';
import { supabase } from '../lib/supabase';
// Agregamos 'Upload' para el ícono de subir
import { X, Save, Image as ImageIcon, Loader2, Upload } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export const ProductModal = ({ isOpen, onClose, onRefresh }: ProductModalProps) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // Estado para saber si está subiendo
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: 'Riego',
    imagen_url: '',
    stock: 0,
    descripcion: ''
  });

  if (!isOpen) return null;

  // --- FUNCIÓN INTELIGENTE DE SUBIDA ---
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true); // Activamos el spinner de "Subiendo..."

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Debes seleccionar una imagen.');
      }

      const file = event.target.files[0];
      
      // 1. VALIDACIÓN DE PESO (Máximo 2MB para cuidar tu plan gratis)
      if (file.size > 2 * 1024 * 1024) {
         throw new Error('La imagen es muy pesada. Intenta que pese menos de 2MB.');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`; // Nombre único
      const filePath = `${fileName}`;

      // 2. SUBIR A SUPABASE
      const { error: uploadError } = await supabase.storage
        .from('imagenes-productos') // Nombre exacto del bucket que creaste
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. OBTENER EL LINK PÚBLICO
      const { data } = supabase.storage
        .from('imagenes-productos')
        .getPublicUrl(filePath);

      // 4. GUARDAR EL LINK EN EL FORMULARIO
      setFormData({ ...formData, imagen_url: data.publicUrl });
      
    } catch (error: any) {
      alert("Error al subir imagen: " + error.message);
    } finally {
      setUploading(false); // Apagamos el spinner
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('productos')
        .insert([
          { 
            nombre: formData.nombre,
            precio: parseFloat(formData.precio),
            categoria: formData.categoria,
            imagen_url: formData.imagen_url, // Aquí va el link que generamos arriba
            stock: formData.stock,
            descripcion: formData.descripcion
          }
        ]);

      if (error) throw error;
      
      alert("¡Producto guardado exitosamente!");
      onRefresh();
      onClose();
      // Limpiamos el formulario
      setFormData({
        nombre: '', precio: '', categoria: 'Riego', 
        imagen_url: '', stock: 0, descripcion: ''
      });

    } catch (error: any) {
      alert("Error al guardar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-eco-deep/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden font-interface">
        
        {/* Cabecera */}
        <div className="bg-eco-deep p-6 flex justify-between items-center">
          <h2 className="text-white font-display font-black uppercase italic tracking-widest text-lg">
            Nuevo Producto
          </h2>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-4">
            
            {/* Nombre */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                Nombre del Producto
              </label>
              <input 
                required 
                type="text" 
                placeholder="EJ. ASPERSOR DE IMPACTO"
                className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 px-4 outline-none focus:border-eco-logo font-bold text-sm transition-all"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              />
            </div>
            
            {/* Precio y Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                  Precio (S/)
                </label>
                <input 
                  required 
                  type="number" 
                  step="0.01"
                  placeholder="0.00"
                  className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 px-4 outline-none focus:border-eco-logo font-bold text-sm"
                  value={formData.precio}
                  onChange={(e) => setFormData({...formData, precio: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                  Stock Inicial
                </label>
                <input 
                  required 
                  type="number"
                  placeholder="0"
                  className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 px-4 outline-none focus:border-eco-logo font-bold text-sm"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            {/* --- SECCIÓN DE FOTO (NUEVA) --- */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                Foto del Producto
              </label>
              
              <div className="flex items-start gap-4">
                {/* Botón de Subida */}
                <label className={`cursor-pointer transition-all px-4 py-3 rounded-sm flex items-center gap-2 text-xs font-bold uppercase tracking-wide border ${uploading ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'}`}>
                  {uploading ? <Loader2 className="animate-spin" size={16}/> : <Upload size={16} />}
                  {uploading ? "Subiendo..." : "Subir Imagen"}
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>

                {/* Vista Previa */}
                <div className="flex-1">
                   {formData.imagen_url ? (
                     <div className="flex items-center gap-3">
                        <div className="h-12 w-12 border border-slate-200 p-1 bg-white rounded-sm">
                           <img src={formData.imagen_url} className="w-full h-full object-contain" alt="Vista previa" />
                        </div>
                        <span className="text-[10px] text-green-600 font-bold uppercase flex items-center gap-1">
                           <ImageIcon size={12}/> Listo
                        </span>
                     </div>
                   ) : (
                     <p className="text-[9px] text-slate-400 italic mt-2">
                       Sube una imagen (JPG/PNG) de máx 2MB.
                     </p>
                   )}
                </div>
              </div>
            </div>

            {/* Categoría */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                Categoría
              </label>
              <select 
                className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 px-4 outline-none focus:border-eco-logo font-bold text-xs uppercase"
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
              >
                <option value="Riego">Riego</option>
                <option value="Tubería">Tubería</option>
                <option value="Válvulas">Válvulas</option>
                <option value="Hidroponía">Hidroponía</option>
                <option value="Conexiones y Acoples">Conexiones y Acoples</option>
                <option value="Control y Automatización">Control y Automatización</option>
              </select>
            </div>
          </div>

          <button 
            disabled={loading || uploading} 
            className="w-full bg-eco-logo text-white font-display font-black uppercase py-4 mt-4 hover:bg-eco-deep transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {loading ? "Guardando..." : "Registrar Producto"}
          </button>
        </form>
      </div>
    </div>
  );
};