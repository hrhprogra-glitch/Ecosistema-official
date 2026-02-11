// src/sections/Services.tsx
import { motion } from "framer-motion";
import { Logo } from "../components/Logo"; // Usamos tu logo como base

export const Services = () => {
  const servicios = [
    { title: "Desarrollo Web", desc: "Sistemas robustos y escalables." },
    { title: "Identidad Digital", desc: "Diseño que fluye con tu marca." },
    { title: "Consultoría", desc: "Optimización de tu ecosistema actual." }
  ];

  return (
    <section className="py-24 bg-eco-gray/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {servicios.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[2rem] shadow-eco border border-eco-primary/10"
            >
              <div className="mb-6 opacity-80">
                <Logo /> {/* Reutilizamos la gota blanca en círculo celeste */}
              </div>
              <h3 className="text-xl font-black mb-3 uppercase tracking-tight">{s.title}</h3>
              <p className="text-slate-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};