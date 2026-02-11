import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, ShoppingBag, X, Tag, CheckCircle2 } from "lucide-react";

const slides = [
  {
    image: "/galeria/imagen1.jpg", 
    tag: "Ingeniería de Alto Rendimiento",
    title: "MAXIMIZA TU",
    subtitle: "RENDIMIENTO HÍDRICO",
    desc: "Sistemas de aspersión inteligentes diseñados para reducir costos operativos y optimizar cada gota.",
    align: "items-start text-left"
  },
  {
    image: "/galeria/imagen2.jpg",
    tag: "Tecnología y Sostenibilidad",
    title: "INNOVACIÓN EN",
    subtitle: "RIEGO DE PRECISIÓN",
    desc: "Automatización avanzada que garantiza una cobertura uniforme y un ahorro real en tu inversión.",
    align: "items-end text-right"
  },
  {
    image: "/galeria/imagen3.jpg",
    tag: "Soluciones Corporativas",
    title: "INFRAESTRUCTURA",
    subtitle: "DE GRADO INDUSTRIAL",
    desc: "Equipamiento certificado para proyectos agrícolas y residenciales que exigen excelencia técnica.",
    align: "items-start text-left"
  }
];

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  // Simulación de productos destacados de tu catálogo
  const destacados = [
    { name: "Controlador Hunter Eco Logic", price: "S/ 380", tag: "Oferta" },
    { name: "Electroválvula 1\" PGV-101", price: "S/ 125", tag: "Stock" }
  ];

  return (
    <section id="inicio" className="relative h-screen w-full flex items-center overflow-hidden bg-black">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} 
          className="absolute inset-0 w-full h-full flex items-center"
        >
          <motion.img
            src={slides[index].image}
            alt={`Slide ${index + 1}`}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}   
            transition={{ duration: 3.5, ease: [0.1, 0, 0, 1] }} 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transformOrigin: "center center" }}
          />

          {/* Overlay oscuro para legibilidad */}
          <div className="absolute inset-0 z-10 bg-black/50 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 w-full relative z-20 flex flex-col justify-center h-full">
            <motion.div
              key={`text-${index}`}
              initial={{ opacity: 0, x: slides[index].align.includes('start') ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex flex-col ${slides[index].align} w-full`}
            >
              <span className="inline-block py-1 px-3 bg-[#00B4D8] text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 border-l-2 border-white">
                {slides[index].tag}
              </span>
              
              <h1 className="text-5xl lg:text-7xl font-display font-black text-white leading-[0.9] italic mb-6">
                {slides[index].title} <br />
                <span className="text-[#00B4D8]">{slides[index].subtitle}</span>
              </h1>
              
              <p className="text-gray-100 bg-black/40 backdrop-blur-md p-4 rounded-sm font-interface max-w-md text-sm lg:text-base leading-relaxed mb-10 border-l-2 border-[#00B4D8] pl-4">
                {slides[index].desc}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowOffers(true)}
                  className="group flex items-center gap-2 px-8 py-4 bg-[#00B4D8] text-white font-display font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#216581] transition-all shadow-xl rounded-full"
                >
                  <Tag size={16} />
                  Ver Ofertas Hoy
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* VENTANA DE OFERTAS (MODAL INTERNO) */}
      <AnimatePresence>
        {showOffers && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-6">
            {/* Fondo desenfocado al abrir ofertas */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOffers(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setShowOffers(false)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
              >
                <X size={20} className="text-slate-800" />
              </button>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#00B4D8] p-2 rounded-lg">
                    <ShoppingBag className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl font-display font-black text-[#216581] italic uppercase">
                    Destacados <span className="text-[#00B4D8]">Ecosistemas</span>
                  </h2>
                </div>

                <div className="space-y-4">
                  {destacados.map((prod, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <span className="text-[10px] font-black text-[#00B4D8] uppercase tracking-tighter flex items-center gap-1">
                          <CheckCircle2 size={10} /> {prod.tag}
                        </span>
                        <h3 className="font-bold text-slate-800 text-sm">{prod.name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-[#216581] italic">{prod.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a 
                  href="#tienda"
                  onClick={() => setShowOffers(false)}
                  className="mt-8 w-full flex justify-center items-center py-4 bg-[#216581] text-white font-display font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#00B4D8] transition-all"
                >
                  Ir al catálogo completo
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Indicadores de Slide */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 transition-all duration-1000 rounded-full ${i === index ? 'w-10 bg-[#00B4D8]' : 'w-3 bg-white/40'}`} 
          />
        ))}
      </div>
    </section>
  );
};