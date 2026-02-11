import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  ArrowLeft, Minus, Plus, ShoppingCart, ShieldCheck, Truck, 
  ChevronDown, Star, ArrowRight, CheckCircle2, Award 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Importamos la lista desde el archivo de Tienda
import { productList } from "./Tienda";
// Importamos el Contexto del Carrito
import { useCart } from "../context/CartContext";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string>("descripcion");
  
  // Instanciamos el carrito
  const { addToCart } = useCart();

  // Buscar el producto por ID
  const product = productList.find(p => p.id === Number(id));

  // Estado para la galería de imágenes
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    // Scroll arriba al cargar la página
    window.scrollTo(0, 0);
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-display font-black text-eco-deep">Producto no encontrado</h1>
        <button 
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/tienda");
          }} 
          className="mt-4 text-eco-logo hover:underline"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  // Simulamos una galería de 4 imágenes (puedes reemplazar esto con imágenes reales luego)
  const gallery = [
    product.image,
    product.image, // Aquí iría ángulo 2
    product.image, // Aquí iría ángulo 3
    product.image  // Aquí iría ángulo 4
  ];

  // Filtramos 4 productos relacionados de la misma categoría
  const relatedProducts = productList
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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
          
          {/* LADO IZQUIERDO: Galería Fija (Sticky) con Múltiples Imágenes */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-[120px]">
              
              {/* Imagen Principal */}
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
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-multiply relative z-10"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </AnimatePresence>
              </div>

              {/* Miniaturas (Thumbnails) */}
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {gallery.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-20 h-20 bg-[#F8FAFC] rounded-sm p-2 border-2 transition-all ${
                      selectedImage === img ? 'border-eco-logo shadow-md' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Ángulo ${i+1}`} className="w-full h-full object-contain mix-blend-multiply" />
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

              {/* Estrellas (Resumen) */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-[#F59E0B]">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <span className="text-xs font-bold text-slate-400 underline cursor-pointer hover:text-eco-deep">
                  (24 Reseñas)
                </span>
              </div>
              
              <div className="flex items-end gap-3 mb-8">
                <span className="text-4xl md:text-5xl font-display font-black text-eco-logo">
                  {product.price > 0 ? `S/ ${product.price.toFixed(2)}` : "Consultar"}
                </span>
                {product.price > 0 && <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1.5">Unidad</span>}
              </div>

              {/* Beneficios */}
              <div className="flex gap-6 py-6 border-y border-slate-200 mb-8 bg-slate-50 px-4 rounded-sm">
                <div className="flex items-center gap-2 text-xs font-black text-slate-600 uppercase">
                  <ShieldCheck size={18} className="text-eco-logo" /> Garantía Total
                </div>
                <div className="flex items-center gap-2 text-xs font-black text-slate-600 uppercase">
                  <Truck size={18} className="text-eco-logo" /> Envíos Nacionales
                </div>
              </div>

              {/* CONTROLES DE COMPRA (Solo Añadir al Carrito) */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <div className="flex items-center justify-between bg-white border-2 border-slate-200 rounded-sm px-2 h-16 w-full sm:w-1/3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-slate-400 hover:text-eco-deep transition-colors"><Minus size={18} /></button>
                  <span className="font-display font-black text-xl text-eco-deep">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-slate-400 hover:text-eco-deep transition-colors"><Plus size={18} /></button>
                </div>

                <button 
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 bg-eco-deep text-white font-display font-black uppercase tracking-widest text-sm h-16 rounded-sm hover:bg-eco-logo transition-all shadow-xl hover:shadow-eco-deep/30 flex items-center justify-center gap-3"
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
                          Componente de ingeniería fabricado bajo los más estrictos estándares de calidad. Diseñado específicamente para soportar altas presiones y ofrecer un sellado hermético en sistemas de conducción, control y automatización hídrica. Su formulación previene la degradación por rayos UV y químicos agrícolas.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="border-b border-slate-200">
                  <button onClick={() => setOpenAccordion(openAccordion === "especificaciones" ? "" : "especificaciones")} className="w-full flex items-center justify-between py-6 text-left">
                    <span className="text-sm font-black uppercase tracking-widest text-eco-deep">Especificaciones</span>
                    <ChevronDown className={`text-slate-400 transition-transform ${openAccordion === "especificaciones" ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openAccordion === "especificaciones" && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-6">
                        <ul className="space-y-3 text-sm text-slate-500">
                          <li className="flex justify-between border-b border-slate-50 pb-2"><strong>Categoría:</strong> <span>{product.category}</span></li>
                          <li className="flex justify-between border-b border-slate-50 pb-2"><strong>Grado:</strong> <span>Industrial / Agrícola</span></li>
                          <li className="flex justify-between border-b border-slate-50 pb-2"><strong>Certificación:</strong> <span>ISO Standard</span></li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. SECCIÓN: POR QUÉ SOMOS LOS MEJORES */}
      <div className="bg-eco-deep text-white py-20 mt-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 relative z-10 text-center">
          <Award size={48} className="text-eco-logo mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic mb-6">El Estándar de la <span className="text-eco-logo">Ingeniería</span></h2>
          <p className="max-w-2xl mx-auto text-slate-300 mb-12 text-sm leading-relaxed">
            No vendemos simples accesorios; proveemos infraestructura. Nuestros productos son sometidos a rigurosas pruebas de estrés para garantizar que tu proyecto hídrico nunca se detenga. Mayor durabilidad, menor mantenimiento.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
            <div className="bg-white/5 p-6 rounded-sm border border-white/10 backdrop-blur-sm">
              <CheckCircle2 className="text-eco-logo mb-4" size={30} />
              <h4 className="font-display font-black uppercase mb-2">Resistencia Extrema</h4>
              <p className="text-xs text-slate-400">Materiales vírgenes con protección UV y tolerancia a químicos agresivos.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-sm border border-white/10 backdrop-blur-sm">
              <CheckCircle2 className="text-eco-logo mb-4" size={30} />
              <h4 className="font-display font-black uppercase mb-2">Cero Fugas</h4>
              <p className="text-xs text-slate-400">Precisión micrométrica en roscas y uniones para un sellado hermético.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-sm border border-white/10 backdrop-blur-sm">
              <CheckCircle2 className="text-eco-logo mb-4" size={30} />
              <h4 className="font-display font-black uppercase mb-2">Fácil Instalación</h4>
              <p className="text-xs text-slate-400">Diseño ergonómico que reduce el tiempo de montaje en obra.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECCIÓN: RESEÑAS DE CLIENTES */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24 border-b border-slate-200">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-display font-black text-eco-deep uppercase italic">Opiniones Reales</h2>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex text-[#F59E0B]"><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /></div>
              <span className="font-bold text-slate-500">4.9 / 5.0 (24 valoraciones)</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Ing. Carlos Mendoza", company: "AgroSur S.A.C.", review: "Llevamos usando estas piezas más de un año en nuestros campos de arándanos. La resistencia a la presión es superior a otras marcas." },
            { name: "Martín R.", company: "Instalador Independiente", review: "Excelentes acabados, no presentan rebabas y el encaje es perfecto. Me ahorran mucho tiempo en las instalaciones residenciales." },
            { name: "Constructora Hídrica", company: "Proyecto Valle Verde", review: "Compramos por volumen para un proyecto grande y no tuvimos ni una sola pieza defectuosa. 100% recomendados." }
          ].map((r, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-sm border border-slate-200">
              <div className="flex text-[#F59E0B] mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
              </div>
              <p className="text-sm text-slate-600 font-medium italic mb-6">"{r.review}"</p>
              <h4 className="font-black text-eco-deep text-xs uppercase tracking-widest">{r.name}</h4>
              <span className="text-[10px] text-eco-logo font-bold uppercase">{r.company}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. SECCIÓN: PRODUCTOS RELACIONADOS */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <h2 className="text-3xl font-display font-black text-eco-deep uppercase italic">Productos Similares</h2>
          <button 
            onClick={() => {
              window.scrollTo(0, 0); // Obliga a subir la página antes de cambiar
              navigate('/tienda');
            }}
            className="flex items-center gap-2 text-eco-logo font-black text-xs uppercase tracking-widest hover:text-eco-deep transition-colors"
          >
            Ver todo el catálogo <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relProduct) => (
            <motion.div 
              key={relProduct.id}
              whileHover={{ y: -10 }}
              onClick={() => {
                window.scrollTo(0, 0); // Obliga a subir al ver un nuevo producto
                navigate(`/producto/${relProduct.id}`);
              }}
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
                <h3 className="text-[11px] font-display font-black text-slate-800 uppercase tracking-tight mb-2 line-clamp-2" title={relProduct.name}>
                  {relProduct.name}
                </h3>
                <div className="text-eco-logo text-lg font-display font-black">
                  {relProduct.price > 0 ? `S/ ${relProduct.price.toFixed(2)}` : "Consultar"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};