import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export const Loader = () => {
  const [progress, setProgress] = useState(0);

  // Simulación de carga de catálogo
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    >
      <div className="relative flex flex-col items-center">
        {/* Logo con efecto de respiración técnica */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            filter: ["drop-shadow(0 0 0px #00B4D800)", "drop-shadow(0 0 15px #00B4D844)", "drop-shadow(0 0 0px #00B4D800)"]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Logo />
        </motion.div>

        {/* Texto de la Marca */}
        <div className="mt-6 text-center">
          <h1 className="text-xl font-display font-black text-eco-deep tracking-tighter uppercase italic">
            Ecosistema
          </h1>
          <p className="text-[9px] font-interface font-bold text-eco-logo tracking-[0.4em] uppercase">
            Online Store
          </p>
        </div>

        {/* Barra de progreso y contador */}
        <div className="mt-12 w-48">
          <div className="flex justify-between mb-2">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
              Sincronizando Catálogo
            </span>
            <span className="text-[8px] font-black text-eco-logo">
              {progress}%
            </span>
          </div>
          
          <div className="h-[3px] w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-eco-logo"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Mensajes dinámicos de tienda virtual */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-16 text-[8px] font-medium text-slate-400 uppercase tracking-tight"
        >
          Asegurando conexión encriptada...
        </motion.p>
      </div>

      {/* Decoración de esquinas estilo interfaz técnica (Rainpro) */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t-2 border-l-2 border-slate-100" />
      <div className="absolute top-10 right-10 w-4 h-4 border-t-2 border-r-2 border-slate-100" />
      <div className="absolute bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-slate-100" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b-2 border-r-2 border-slate-100" />
    </motion.div>
  );
};