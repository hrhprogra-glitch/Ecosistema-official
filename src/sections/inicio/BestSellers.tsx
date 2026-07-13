import { motion } from "framer-motion";
import { ShoppingCart, Clock, Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";

// Configuración de productos con las rutas corregidas para la carpeta public
const products = [
  { 
    id: 1, 
    name: "Controlador Hunter Eco Logic 4 Estaciones", 
    price: 380.00, 
    // Ruta corregida: En Vite, '/' apunta directamente a la carpeta public
    img: "/Productos/Controlador-De-Riego-4-6-27.jpg", 
    category: "Control",
    promoTitle: "50+",
    promoDesc: "Conseguiremos un paquete más de accesorios con tu compra técnica."
  },
  { 
    id: 2, 
    name: "Válvula PGV-101", 
    price: 125.00, 
    img: "/Productos/Valvula-De-Aire-30.jpg", 
    category: "Válvulas" 
  },
  { 
    id: 3, 
    name: "Aspersor Bronce", 
    price: 85.00, 
    img: "/Productos/Aspersor-De-Impacto-35.jpg", 
    category: "Riego" 
  },
  { 
    id: 4, 
    name: "Sensor Lluvia", 
    price: 190.00, 
    img: "/Productos/Caja-De-Protección-Circular-Rain-Bird-32.jpg", 
    category: "Sensores" 
  },
  { 
    id: 5, 
    name: "Microaspersor", 
    price: 45.00, 
    img: "/Productos/Estaca-Microaspersor-15.jpg", 
    category: "Goteo" 
  },
];

export const BestSellers = () => {
  const { addToCart } = useCart();

  return (
    <section className="py-24 bg-eco-deep relative overflow-hidden font-interface">
      {/* Luces decorativas de fondo para dar profundidad al azul noche */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-eco-logo rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-eco-ocean rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LADO IZQUIERDO: PRODUCTO GIGANTE QUE FLOTA SOBRE EL FONDO */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative z-20"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-eco-logo/20 backdrop-blur-md text-eco-logo px-4 py-1.5 rounded-full border border-eco-logo/30 flex items-center gap-2">
                  <Clock size={14} className="animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Tiempo Límite</span>
                </div>
              </div>

              {/* Título gigante decorativo de fondo */}
              <h2 className="text-8xl md:text-[10rem] font-display font-black text-white/5 leading-none absolute -top-10 -left-10 select-none">
                {products[0].promoTitle}
              </h2>

              <div className="relative">
                <h3 className="text-6xl md:text-8xl font-display font-black text-white leading-[0.8] mb-6 uppercase italic">
                  {products[0].promoTitle} <br />
                  <span className="text-eco-logo">Hunter</span>
                </h3>
                <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed mb-12">
                  {products[0].promoDesc}
                </p>

                <div className="flex items-end gap-8 mb-12">
                  <div>
                    <span className="block text-[10px] font-black text-eco-logo uppercase tracking-widest mb-2">Inversión Profesional</span>
                    <span className="text-5xl font-display font-black text-white">S/ {products[0].price.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(products[0], 1)}
                    className="bg-eco-logo text-eco-deep p-6 rounded-full hover:scale-110 transition-transform shadow-[0_0_30px_rgba(64,207,255,0.3)]"
                  >
                    <ShoppingCart size={24} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Imagen PNG Flotante principal */}
            <motion.img 
              src={products[0].img}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-auto object-contain mix-blend-lighten pointer-events-none z-10 opacity-40 lg:opacity-100 lg:relative lg:translate-x-0 lg:translate-y-0 lg:left-0 lg:w-full"
              alt={products[0].name}
            />
          </div>

          {/* LADO DERECHO: 4 IMÁGENES PNG SIN CUADROS */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-16">
            {products.slice(1, 5).map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                {/* Imagen con sombra sutil para el efecto de flota */}
                <div className="relative h-64 mb-6 flex items-center justify-center">
                  <motion.img 
                    src={item.img} 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-full h-full object-contain mix-blend-lighten drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    alt={item.name}
                  />
                  <div className="absolute top-0 right-0">
                    <div className="bg-white/5 backdrop-blur-md text-white/50 px-2 py-1 rounded-md text-[7px] font-black uppercase tracking-widest border border-white/10 group-hover:text-eco-logo group-hover:border-eco-logo/50 transition-colors">
                      Limitado
                    </div>
                  </div>
                </div>

                {/* Información integrada al fondo oscuro */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-display font-black text-white">S/ {item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(item, 1)}
                      className="text-eco-logo hover:text-white transition-colors p-2"
                    >
                      <Plus size={20} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};