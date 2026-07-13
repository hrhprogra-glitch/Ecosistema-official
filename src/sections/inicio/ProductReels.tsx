import { Play, TrendingUp, ArrowRight } from "lucide-react";

export const ProductReels = () => (
  <section className="py-20 bg-black text-white overflow-hidden font-interface">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase text-white">
            En <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-purple-500">Acción</span>
          </h2>
          <p className="text-gray-400 mt-2 max-w-md">Descubre cómo funcionan nuestros sistemas en campo real.</p>
        </div>
        <button className="flex items-center gap-2 text-[#00B4D8] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">
          Ver todo en TikTok <ArrowRight size={14} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden group cursor-pointer border border-gray-800 hover:border-[#00B4D8] transition-all">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play fill="white" className="text-white ml-1" size={30} />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 z-20">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00B4D8] mb-2">
                <TrendingUp size={14} /> Viral
              </div>
              <p className="font-bold text-lg leading-tight">Instalación de sistema por goteo profesional</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);