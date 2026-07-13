const newArrivals = [
  { id: 5, name: "Sensor de Lluvia Inalámbrico", tag: "NUEVO", img: "/productos/sensor.jpg" },
  { id: 6, name: "Programador Node Bluetooth", tag: "HOT", img: "/productos/node.jpg" },
  { id: 7, name: "Microaspersor Giratorio 360", tag: "EXCLUSIVO", img: "/productos/micro.jpg" },
];

export const NewArrivals = () => (
  <section className="py-20 bg-slate-50 font-interface">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-center text-4xl font-display font-black text-slate-900 uppercase mb-12">
        Lo Nuevo de <span className="text-[#00B4D8]">Lo Nuevo</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {newArrivals.map((item) => (
          <div key={item.id} className="flex items-center gap-6 bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-[#00B4D8]/50 transition-colors">
            <div className="w-24 h-24 bg-slate-50 rounded-lg flex-shrink-0 p-2">
                <img src={item.img} className="w-full h-full object-contain mix-blend-multiply" alt={item.name} />
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