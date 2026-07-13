import { motion } from 'framer-motion';

const categories = [
  {
    title: "Control y Automatización",
    desc: "Programadores y Electroválvulas Hunter",
    image: "/galeria/cat-control.jpg",
    link: "#control"
  },
  {
    title: "Conducción de Agua",
    desc: "Tuberías PE y Mangueras Técnicas",
    image: "/galeria/cat-tuberias.jpg",
    link: "#conduccion"
  },
  {
    title: "Emisores de Riego",
    desc: "Aspersión y Goteo de Precisión",
    image: "/galeria/cat-emisores.jpg",
    link: "#emisores"
  },
  {
    title: "Conexiones y Fitting",
    desc: "Accesorios de Compresión SAB",
    image: "/galeria/cat-conexiones.jpg",
    link: "#conexiones"
  }
];

export const Categories = () => {
  return (
    <section className="py-2 bg-white">
      <div className="flex flex-col md:flex-row w-full h-[60vh] gap-1 px-1">
        {categories.map((cat, index) => (
          <motion.a
            key={index}
            href={cat.link}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="relative flex-1 group overflow-hidden bg-eco-deep flex items-center justify-center text-center"
          >
            <img 
              src={cat.image} 
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700 ease-in-out"
            />
            
            <div className="relative z-10 p-6">
              <h3 className="text-2xl lg:text-3xl font-display font-black text-white uppercase tracking-tighter mb-2 italic leading-none">
                {cat.title}
              </h3>
              <p className="text-eco-logo font-interface font-bold text-[9px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Ver Equipos —
              </p>
            </div>

            <div className="absolute bottom-0 left-0 w-0 h-1 bg-eco-logo group-hover:w-full transition-all duration-500" />
          </motion.a>
        ))}
      </div>
    </section>
  );
};  