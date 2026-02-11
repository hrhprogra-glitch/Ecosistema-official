import { motion } from "framer-motion";
import { Play, Star, ArrowRight, CheckCircle2, TrendingUp, Clock } from "lucide-react";

// --- DATOS DE EJEMPLO (Puedes conectarlos con tu Excel luego) ---
const bestSellers = [
  { id: 1, name: "Controlador Hunter Eco Logic 4 Estaciones", price: "S/ 380.00", img: "/productos/controlador.jpg" },
  { id: 2, name: "Válvula Solenoide 1\" PGV-101", price: "S/ 125.00", img: "/productos/valvula.jpg" },
  { id: 3, name: "Aspersor de Impacto 3/4\" Bronce", price: "S/ 85.00", img: "/productos/aspersor.jpg" },
  { id: 4, name: "Manguera Ciega 16mm x 400m", price: "S/ 450.00", img: "/productos/manguera.jpg" },
];

const newArrivals = [
  { id: 5, name: "Sensor de Lluvia Inalámbrico", tag: "NUEVO", img: "/productos/sensor.jpg" },
  { id: 6, name: "Programador Node Bluetooth", tag: "HOT", img: "/productos/node.jpg" },
  { id: 7, name: "Microaspersor Giratorio 360", tag: "EXCLUSIVO", img: "/productos/micro.jpg" },
];

// --- 2. SECCIÓN MEJORES PRODUCTOS ---
export const BestSellers = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-[#00B4D8] font-black text-xs tracking-[0.3em] uppercase">Selección Premium</span>
        <h2 className="text-4xl md:text-5xl font-display font-black text-[#216581] italic uppercase mt-2">
          Los Más <span className="text-slate-800">Vendidos</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {bestSellers.map((item) => (
          <motion.div 
            key={item.id}
            whileHover={{ y: -10 }}
            className="group relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="aspect-square bg-white p-6 flex items-center justify-center relative">
              <div className="absolute top-3 right-3 bg-[#216581] text-white text-[10px] font-bold px-2 py-1 rounded">TOP</div>
              <img src={item.img} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-slate-800 leading-tight mb-2 h-10 overflow-hidden">{item.name}</h3>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-black text-[#00B4D8]">{item.price}</span>
                <button className="bg-[#216581] text-white p-2 rounded-full hover:bg-[#00B4D8] transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- 3. SECCIÓN VIDEOS TIPO TIKTOK ---
export const ProductReels = () => (
  <section className="py-20 bg-black text-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-black italic uppercase text-white">
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
            {/* Simulación de Video */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
            <img src={`/galeria/imagen${i}.jpg`} alt="Video Cover" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
            
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play fill="white" className="text-white ml-1" size={30} />
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 z-20">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00B4D8] mb-2">
                <TrendingUp size={14} /> Viral
              </div>
              <p className="font-bold text-lg leading-tight">Instalación de sistema por goteo en Ica</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- 4. SECCIÓN NUEVOS INGRESOS ---
export const NewArrivals = () => (
  <section className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-center text-4xl font-display font-black text-slate-900 uppercase italic mb-12">
        Lo Nuevo de <span className="text-[#00B4D8]">Lo Nuevo</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {newArrivals.map((item) => (
          <div key={item.id} className="flex items-center gap-6 bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-[#00B4D8]/50 transition-colors">
            <div className="w-24 h-24 bg-slate-50 rounded-lg flex-shrink-0 p-2">
                <img src={item.img} className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-600 text-[9px] font-black uppercase rounded mb-2">{item.tag}</span>
              <h3 className="font-bold text-slate-800">{item.name}</h3>
              <a href="#" className="text-xs font-bold text-[#00B4D8] mt-2 block hover:underline">Ver detalles</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- 5. SECCIÓN PATROCINIOS (HUNTER) ---
export const Sponsors = () => (
  <section className="py-16 bg-white border-y border-slate-100">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Partners Oficiales & Certificados</p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
        {/* LOGO HUNTER (Simulado con texto si no tienes SVG) */}
        <h3 className="text-4xl font-black text-[#216581] tracking-tighter">Hunter<span className="text-[#00B4D8]">®</span></h3>
        <h3 className="text-3xl font-black text-slate-800">RAIN<span className="font-light">BIRD</span></h3>
        <h3 className="text-3xl font-bold text-slate-700">NETAFIM</h3>
        <h3 className="text-3xl font-black italic text-slate-800">AZUD</h3>
      </div>
    </div>
  </section>
);

// --- 6. SECCIÓN MEJORES OFERTAS ---
export const SpecialOffers = () => (
  <section className="py-20 bg-[#216581] relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
    <div className="max-w-6xl mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-[#00B4D8] rounded-3xl p-10 md:p-16 shadow-2xl shadow-black/20 transform rotate-1 hover:rotate-0 transition-transform duration-500">
        <div className="text-white md:w-1/2">
          <div className="flex items-center gap-2 mb-4 bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold">
            <Clock size={14} /> Oferta por Tiempo Limitado
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic leading-[0.9] mb-6">
            Pack Riego <br /> <span className="text-[#216581]">Residencial</span>
          </h2>
          <p className="text-white/90 text-lg mb-8 font-medium">Llevate el controlador Eco Logic + 4 Válvulas con un 25% de descuento directo.</p>
          <button className="bg-white text-[#216581] px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#216581] hover:text-white transition-all shadow-lg">
            Reclamar Oferta Ahora
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
            {/* Espacio para imagen del pack */}
            <div className="w-64 h-64 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30">
                <span className="text-5xl font-black text-white italic">-25%</span>
            </div>
        </div>
      </div>
    </div>
  </section>
);

// --- 7. SECCIÓN CLIENTES (EMPRESAS) ---
export const Clients = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-2xl font-display font-black text-slate-800 uppercase italic mb-12">
        Empresas que confían en <span className="text-[#00B4D8]">Ecosistema</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
        {["AgroIndustrial Beta", "Constructora S&H", "Viveros del Sur", "Golf Club Lima"].map((client, i) => (
          <div key={i} className="h-24 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-4 hover:border-[#00B4D8] hover:scale-105 transition-all cursor-pointer">
             {/* Placeholder de Logos de Clientes */}
             <span className="font-bold text-slate-400 uppercase text-sm">{client}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);