import { Clock } from "lucide-react";

export const SpecialOffers = () => (
  <section className="py-20 bg-[#216581] relative overflow-hidden font-interface">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
    <div className="max-w-6xl mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-[#00B4D8] rounded-3xl p-10 md:p-16 shadow-2xl">
        <div className="text-white md:w-1/2">
          <div className="flex items-center gap-2 mb-4 bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold">
            <Clock size={14} /> Oferta por Tiempo Limitado
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase leading-[0.9] mb-6">
            Pack Riego <br /> <span className="text-[#216581]">Residencial</span>
          </h2>
          <p className="text-white/90 text-lg mb-8 font-medium">Llevate el controlador Eco Logic + 4 Válvulas con un 25% de descuento directo.</p>
          <button className="bg-white text-[#216581] px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#216581] hover:text-white transition-all shadow-lg">
            Reclamar Oferta Ahora
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
            <div className="w-64 h-64 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30">
                <span className="text-5xl font-black text-white">-25%</span>
            </div>
        </div>
      </div>
    </div>
  </section>
);