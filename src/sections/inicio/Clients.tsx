export const Clients = () => (
  <section className="py-20 bg-white font-interface">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-2xl font-display font-black text-slate-800 uppercase mb-12">
        Empresas que confían en <span className="text-[#00B4D8]">Ecosistema</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
        {["AgroIndustrial Beta", "Constructora S&H", "Viveros del Sur", "Golf Club Lima"].map((client, i) => (
          <div key={i} className="h-24 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-4 hover:border-[#00B4D8] hover:scale-105 transition-all cursor-pointer">
             <span className="font-bold text-slate-400 uppercase text-sm">{client}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);