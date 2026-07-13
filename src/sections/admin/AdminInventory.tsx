// src/sections/admin/AdminInventory.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
// Agregamos ImageIcon para reemplazar las imágenes que falten
import { Plus, Edit2, Trash2, Search, Loader2, Image as ImageIcon } from 'lucide-react';
import { ProductModal } from '../../components/ProductModal';

export const AdminInventory = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setProductos(data || []);
    setLoading(false);
  };

  // --- FILTRO 100% BLINDADO CONTRA ERRORES ---
  const filteredProducts = productos.filter(p => {
    if (!p) return false;
    
    // Convertimos a string de forma segura, incluso si es null o undefined
    const nombreProducto = p.nombre ? String(p.nombre).toLowerCase() : "";
    const terminoBusqueda = searchTerm ? String(searchTerm).toLowerCase() : "";
    
    return nombreProducto.includes(terminoBusqueda);
  });

  return (
    <div className="p-8 bg-slate-50 min-h-screen pt-[120px] font-interface">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-black text-eco-deep uppercase italic">Inventario Maestro</h1>
            <p className="text-slate-500 font-bold text-[10px] tracking-[0.3em] uppercase">Control Total de Ecosistema</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-eco-logo text-white px-8 py-4 rounded-sm font-display font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-eco-deep transition-all shadow-xl"
          >
            <Plus size={18} /> Nuevo Producto
          </button>
        </div>

        {/* Buscador */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="BUSCAR EN TUS PRODUCTOS..." 
            className="w-full pl-12 pr-4 py-5 bg-white border-none shadow-sm rounded-sm text-xs font-bold outline-none focus:ring-2 focus:ring-eco-logo transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabla */}
        <div className="bg-white shadow-2xl rounded-sm overflow-hidden border border-slate-100">
          <table className="w-full text-left">
            <thead className="bg-eco-deep text-white text-[9px] uppercase tracking-[0.2em] font-black">
              <tr>
                <th className="px-6 py-5">Item</th>
                <th className="px-6 py-5">Precio</th>
                <th className="px-6 py-5">Stock</th>
                <th className="px-6 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      
                      {/* --- CORRECCIÓN DE IMAGEN (Eliminado via.placeholder) --- */}
                      {prod.imagen_url ? (
                        <img src={prod.imagen_url} className="w-10 h-10 object-contain bg-slate-50 p-1 rounded border border-slate-100" alt="prod" />
                      ) : (
                        <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded border border-slate-200">
                          <ImageIcon size={16} className="text-slate-400" />
                        </div>
                      )}

                      <span className="font-bold text-eco-deep text-xs uppercase">{prod.nombre || 'SIN NOMBRE'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-display font-black text-eco-logo">S/ {parseFloat(prod.precio || 0).toFixed(2)}</td>
                  <td className="px-6 py-5">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full ${prod.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {prod.stock || 0} UNID.
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-eco-logo"><Edit2 size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {loading && (
            <div className="p-20 text-center flex flex-col items-center gap-3">
              <Loader2 className="animate-spin text-eco-logo" size={32} />
              <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Sincronizando Base de Datos...</span>
            </div>
          )}
          
          {!loading && filteredProducts.length === 0 && (
            <div className="p-20 text-center text-slate-400 font-bold uppercase text-xs">
              No hay productos registrados
            </div>
          )}
        </div>
      </div>

      {/* Modal para agregar productos */}
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchProductos} 
      />
    </div>
  );
};