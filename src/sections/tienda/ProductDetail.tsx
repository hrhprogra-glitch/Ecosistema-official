// src/sections/tienda/ProductDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  ArrowLeft, Minus, Plus, ShoppingCart, ShieldCheck, Truck, 
  ChevronDown, Star, ArrowRight, CheckCircle2, Award 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// IMPORTACIONES DE SUPABASE Y CONTEXTO
import { supabase } from "../../lib/supabase"; 
import { useCart } from "../../context/CartContext";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string>("descripcion");
  
  // ESTADOS DE DATOS
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProductData = async () => {
      setLoading(true);
      
      // 1. Traer el producto específico
      const { data: mainProduct, error } = await supabase
        .from('productos')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !mainProduct) {
        console.error("Producto no encontrado");
        setLoading(false);
        return;
      }

      setProduct(mainProduct);
      setSelectedImage(mainProduct.image);

      // 2. Traer productos relacionados (misma categoría)
      const { data: related } = await supabase
        .from('productos')
        .select('*')
        .eq('category', mainProduct.category)
        .neq('id', id) // Que no sea el mismo producto
        .limit(4);

      setRelatedProducts(related || []);
      setLoading(false);
    };

    fetchProductData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-logo"></div>
    </div>
  );

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-display font-black text-eco-deep uppercase italic">Producto no encontrado</h1>
        <button 
          onClick={() => navigate("/tienda")} 
          className="mt-4 text-eco-logo font-black uppercase tracking-widest hover:underline"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  // Simulamos galería con la imagen principal y la de uso (si existe)
  const gallery = [
    product.image,
    product.usage_image || product.image
  ];

  return (
    <div className="bg-white min-h-screen pt-[90px] font-interface selection:bg-eco-logo/20">
      
      {/* 1. SECCIÓN PRINCIPAL: GALERÍA Y DETALLES */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-eco-deep transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Volver
        </button>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* LADO IZQUIERDO: Galería Fija */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-[120px]">
              <div className="bg-[#F8FAFC] rounded-sm aspect-square flex items-center justify-center p-12 border border-slate-200 shadow-sm relative overflow-hidden mb-4">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#006485 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    src={selectedImage} 
                    className="w-full h-full object-contain mix-blend-multiply relative z-10"
                    alt={product.name}
                  />
                </AnimatePresence>
              </div>

              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {gallery.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-20 h-20 bg-[#F8FAFC] rounded-sm p-2 border-2 transition-all ${
                      selectedImage === img ? 'border-eco-logo shadow-md' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* LADO DERECHO: Información y Compra */}
          <div className="w-full lg:w-1/2 pb-10 lg:pb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-eco-logo bg-eco-logo/10 px-3 py-1 rounded-sm mb-4 inline-block">
                {product.category}
              </span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-eco-deep uppercase italic leading-[1.1] mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-[#F59E0B]">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <span className="text-xs font-bold text-slate-400">(24 Reseñas)</span>
              </div>
              
              <div className="flex items-end gap-3 mb-8">
                <span className="text-4xl md:text-5xl font-display font-black text-eco-logo">
                  S/ {parseFloat(product.price).toFixed(2)}
                </span>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1.5">Unidad</span>
              </div>

              {/* Beneficios */}
              <div className="flex gap-6 py-6 border-y border-slate-200 mb-8 bg-slate-50 px-4 rounded-sm">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase">
                  <ShieldCheck size={18} className="text-eco-logo" /> Garantía Oficial
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase">
                  <Truck size={18} className="text-eco-logo" /> Envío a Obra
                </div>
              </div>

              {/* CONTROLES DE COMPRA */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <div className="flex items-center justify-between bg-white border-2 border-slate-200 rounded-sm px-2 h-16 w-full sm:w-1/3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-slate-400 hover:text-eco-deep transition-colors"><Minus size={18} /></button>
                  <span className="font-display font-black text-xl text-eco-deep">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-slate-400 hover:text-eco-deep transition-colors"><Plus size={18} /></button>
                </div>

                <button 
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 bg-eco-deep text-white font-display font-black uppercase tracking-widest text-sm h-16 rounded-sm hover:bg-eco-logo transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={20} /> Agregar al Carrito
                </button>
              </div>

              {/* Acordeones */}
              <div className="border-t border-slate-200">
                <div className="border-b border-slate-200">
                  <button onClick={() => setOpenAccordion(openAccordion === "descripcion" ? "" : "descripcion")} className="w-full flex items-center justify-between py-6 text-left">
                    <span className="text-sm font-black uppercase tracking-widest text-eco-deep">Descripción Técnica</span>
                    <ChevronDown className={`text-slate-400 transition-transform ${openAccordion === "descripcion" ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openAccordion === "descripcion" && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="text-slate-500 pb-6 text-sm leading-relaxed font-medium">
                          Material de ingeniería diseñado para sistemas de riego profesional. Alta resistencia a la intemperie y sellado garantizado bajo presión nominal.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. SECCIÓN: POR QUÉ ECO (Banner Técnico) */}
      <div className="bg-eco-deep text-white py-20 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 text-center relative z-10">
          <Award size={48} className="text-eco-logo mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic mb-6">Calidad <span className="text-eco-logo">Certificada</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto mt-12">
            <div className="bg-white/5 p-6 rounded-sm border border-white/10 backdrop-blur-sm">
              <CheckCircle2 className="text-eco-logo mb-4" size={30} />
              <h4 className="font-display font-black uppercase mb-2">Resistencia UV</h4>
              <p className="text-[10px] text-slate-400 uppercase font-black">Larga vida útil bajo sol intenso.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-sm border border-white/10 backdrop-blur-sm">
              <CheckCircle2 className="text-eco-logo mb-4" size={30} />
              <h4 className="font-display font-black uppercase mb-2">Cero Fugas</h4>
              <p className="text-[10px] text-slate-400 uppercase font-black">Sellado hermético garantizado.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-sm border border-white/10 backdrop-blur-sm">
              <CheckCircle2 className="text-eco-logo mb-4" size={30} />
              <h4 className="font-display font-black uppercase mb-2">Instalación</h4>
              <p className="text-[10px] text-slate-400 uppercase font-black">Diseño intuitivo y rápido.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SECCIÓN: PRODUCTOS RELACIONADOS */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <h2 className="text-3xl font-display font-black text-eco-deep uppercase italic">Productos Similares</h2>
          <button onClick={() => navigate('/tienda')} className="flex items-center gap-2 text-eco-logo font-black text-xs uppercase tracking-widest hover:text-eco-deep transition-colors">
            Ver todo el catálogo <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relProduct) => (
            <motion.div 
              key={relProduct.id}
              whileHover={{ y: -10 }}
              onClick={() => navigate(`/producto/${relProduct.id}`)}
              className="group flex flex-col bg-white rounded-sm p-3 border border-slate-200 hover:border-eco-logo/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[4/5] bg-[#F8FAFC] rounded-sm overflow-hidden mb-4 border border-slate-100">
                <img 
                  src={relProduct.image} 
                  alt={relProduct.name}
                  className="w-full h-full object-contain p-6 mix-blend-multiply opacity-90 group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="text-center px-2 pb-2 mt-auto">
                <h3 className="text-[11px] font-display font-black text-slate-800 uppercase tracking-tight mb-2 line-clamp-2">
                  {relProduct.name}
                </h3>
                <div className="text-eco-logo text-lg font-display font-black">
                  S/ {parseFloat(relProduct.price).toFixed(2)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};