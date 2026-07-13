import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, Search, Plus, 
  LayoutGrid, Droplet, Settings2, CloudRain, Shield, ChevronDown, SlidersHorizontal
} from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// IMPORTACIONES DE CONTEXTO Y SUPABASE
import { useCart } from "../../context/CartContext";
import { supabase } from "../../lib/supabase";

const CATEGORY_GROUPS = [
  { name: "Conducción", icon: Droplet, sub: ["Conexiones y Acoples", "Mangueras y Tuberías"] },
  { name: "Control", icon: Settings2, sub: ["Válvulas", "Control y Automatización"] },
  { name: "Riego", icon: CloudRain, sub: ["Emisores de Riego"] },
  { name: "Soporte", icon: Shield, sub: ["Accesorios y Protección", "Otros Accesorios"] }
];

const ITEMS_PER_PAGE = 20;

const sortOptions = [
  { value: "destacados", label: "Destacados" },
  { value: "precio-asc", label: "Menor Precio" },
  { value: "precio-desc", label: "Mayor Precio" },
  { value: "nombre-asc", label: "Nombre A - Z" }
];

const GridIcon = ({ cols, active }: { cols: number, active: boolean }) => (
  <div className="flex gap-[3px] items-center justify-center">
    {Array.from({ length: cols }).map((_, i) => (
      <div key={i} className={`w-1.5 h-3.5 rounded-[2px] transition-colors ${active ? 'bg-eco-logo' : 'bg-slate-400'}`} />
    ))}
  </div>
);

const genericUsageImage = "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=800&auto=format&fit=crop";

export const Tienda = () => {
  const navigate = useNavigate(); 
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSort, setOpenSort] = useState(false);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [sortBy, setSortBy] = useState("destacados");
  const [gridCols, setGridCols] = useState(4);

  const menuRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // CARGAR PRODUCTOS DESDE SUPABASE
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('productos')
        .select('*');
      
      if (error) {
        console.error("Error cargando productos:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpenDropdown(null);
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) setOpenSort(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lógica de filtrado aplicada a los productos de la base de datos REAL
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products].filter(p => {
      let matchesCategory = false;
      const prodCat = p.categoria || "Otros"; // Usamos 'categoria' del SQL

      if (activeCategory === "Todos") {
        matchesCategory = true;
      } else if (prodCat === activeCategory) {
        matchesCategory = true;
      } else {
        const group = CATEGORY_GROUPS.find(g => g.name === activeCategory);
        if (group && group.sub.includes(prodCat)) matchesCategory = true;
      }
      
      const matchesSearch = (p.nombre || "").toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "precio-asc") result.sort((a, b) => a.precio - b.precio);
    else if (sortBy === "precio-desc") result.sort((a, b) => b.precio - a.precio);
    else if (sortBy === "nombre-asc") result.sort((a, b) => (a.nombre || "").localeCompare(b.nombre || ""));

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  const displayedProducts = filteredAndSortedProducts.slice(0, visibleItems);

  const getGridClass = () => {
    if (gridCols === 2) return "grid-cols-1 sm:grid-cols-2 gap-8";
    if (gridCols === 3) return "grid-cols-2 lg:grid-cols-3 gap-6";
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6";
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-logo"></div>
    </div>
  );

  return (
    <section className="bg-slate-50 min-h-screen font-interface pb-20">
      <div className="pt-[90px] w-full bg-slate-50"></div>

      {/* FILTROS Y BÚSQUEDA */}
      <div className="sticky top-[65px] z-40 bg-slate-50/95 backdrop-blur-xl mb-8 pt-4 pb-4 border-b border-slate-200/50">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 flex flex-col gap-4">
          
          <nav ref={menuRef} className="flex flex-wrap items-center gap-3 w-full pb-2">
            <button 
              onClick={() => { setActiveCategory("Todos"); setOpenDropdown(null); }}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-sm transition-all duration-300 ${
                activeCategory === "Todos" 
                  ? "bg-eco-deep text-white shadow-sm shadow-eco-deep/20" 
                  : "bg-white text-slate-500 hover:bg-slate-100 hover:text-eco-deep border border-slate-200"
              }`}
            >
              <LayoutGrid size={14} className={activeCategory === "Todos" ? "text-eco-logo" : "text-slate-400"} />
              Todos
            </button>

            {CATEGORY_GROUPS.map((group) => {
              const Icon = group.icon;
              const active = activeCategory === group.name || group.sub.includes(activeCategory);
              const isOpen = openDropdown === group.name;

              return (
                <div key={group.name} className="relative flex-shrink-0">
                  <button 
                    onClick={() => setOpenDropdown(isOpen ? null : group.name)}
                    className={`flex items-center gap-2 px-5 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-sm transition-all duration-300 ${
                      active || isOpen
                        ? "bg-eco-logo text-white shadow-sm shadow-eco-logo/20" 
                        : "bg-white text-slate-500 hover:bg-slate-100 hover:text-eco-deep border border-slate-200"
                    }`}
                  >
                    <Icon size={14} className={active || isOpen ? "text-white" : "text-slate-400"} />
                    {group.name}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-sm p-2 shadow-xl z-50 origin-top-left"
                      >
                        <button
                          onClick={() => { setActiveCategory(group.name); setOpenDropdown(null); }}
                          className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest rounded-sm transition-all mb-1 ${
                            activeCategory === group.name ? "bg-eco-deep text-white" : "bg-slate-50 text-eco-deep hover:bg-slate-100"
                          }`}
                        >
                          Ver todo en {group.name}
                        </button>
                        <div className="w-full h-[1px] bg-slate-100 my-1"></div>
                        {group.sub.map(sub => (
                          <button
                            key={sub}
                            onClick={() => { setActiveCategory(sub); setOpenDropdown(null); }}
                            className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest rounded-sm transition-all ${
                              activeCategory === sub ? "bg-eco-logo/10 text-eco-logo" : "hover:bg-slate-50 text-slate-500 hover:text-eco-deep"
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
            <div className="flex w-full xl:w-auto gap-3">
              <div className="relative flex-1 xl:w-[350px]">
                <div className="relative flex items-center bg-white rounded-sm border border-slate-200 focus-within:border-eco-logo focus-within:shadow-sm transition-all">
                  <Search className="absolute left-4 text-slate-400" size={16} />
                  <input 
                    type="text"
                    value={searchQuery}
                    placeholder="BUSCAR ACCESORIO..."
                    className="w-full bg-transparent border-none py-3 pl-12 pr-4 text-[10px] font-bold text-slate-700 uppercase tracking-widest focus:outline-none placeholder:text-slate-400"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center w-full xl:w-auto gap-4 justify-between xl:justify-end">
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setOpenSort(!openSort)}
                  className="flex items-center justify-between min-w-[160px] gap-2 bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-sm px-4 py-3 hover:border-eco-logo hover:text-eco-logo transition-all shadow-sm"
                >
                  {sortOptions.find(o => o.value === sortBy)?.label}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${openSort ? "rotate-180" : "text-slate-400"}`} />
                </button>
                <AnimatePresence>
                  {openSort && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-sm p-2 shadow-xl z-50 origin-top-right"
                    >
                      {sortOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => { setSortBy(option.value); setOpenSort(false); }}
                          className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest rounded-sm transition-all mb-1 ${
                            sortBy === option.value ? "bg-eco-logo/10 text-eco-logo" : "hover:bg-slate-50 text-slate-500 hover:text-eco-deep"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden sm:flex items-center gap-1 bg-white p-1 rounded-sm border border-slate-200 shadow-sm">
                {[2, 3, 4].map(cols => (
                  <button 
                    key={cols}
                    onClick={() => setGridCols(cols)} 
                    className={`p-2 rounded-sm transition-colors ${gridCols === cols ? 'bg-eco-logo/10' : 'hover:bg-slate-100'}`}
                  >
                    <GridIcon cols={cols} active={gridCols === cols} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRILLA DE PRODUCTOS */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className={`grid ${getGridClass()} transition-all duration-500`}>
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => navigate(`/producto/${product.id}`)}
                className="group flex flex-col h-full bg-white rounded-sm p-4 border border-slate-200 hover:border-eco-logo/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[4/5] bg-[#F8FAFC] rounded-sm overflow-hidden mb-4 border border-slate-100">
                  <img 
                    src={genericUsageImage} 
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out z-0"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-eco-deep/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                  <img 
                    src={product.imagen_url || 'https://via.placeholder.com/300?text=Sin+Imagen'} 
                    className="absolute inset-0 w-full h-full object-contain p-6 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-500 z-10 bg-[#F8FAFC]"
                    alt={product.nombre}
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 z-30">
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        addToCart({
                          id: product.id,
                          name: product.nombre,
                          price: product.precio,
                          image: product.imagen_url
                        }, 1); 
                      }}
                      className="p-3 bg-eco-deep text-white rounded-sm shadow-md hover:bg-eco-logo transition-all transform hover:scale-105"
                    >
                      <ShoppingCart size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                <div className="text-center px-2 pb-2 mt-auto">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                    {product.categoria || "Accesorio"}
                  </p>
                  <h3 className={`${gridCols === 2 ? 'text-sm' : 'text-[11px]'} font-display font-black text-slate-800 uppercase tracking-tight mb-3 leading-relaxed line-clamp-2`}>
                    {product.nombre}
                  </h3>
                  <div className={`${gridCols === 2 ? 'text-xl' : 'text-lg'} text-eco-logo font-display font-black`}>
                    {product.precio > 0 ? `S/ ${parseFloat(product.precio).toFixed(2)}` : "Consultar"}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibleItems < filteredAndSortedProducts.length && (
          <div className="col-span-full flex justify-center mt-16 mb-8">
            <button
              onClick={() => setVisibleItems((prev) => prev + ITEMS_PER_PAGE)}
              className="group flex items-center gap-2 px-8 py-4 bg-white border border-slate-300 text-eco-deep font-display font-black text-xs uppercase tracking-widest hover:border-eco-logo hover:bg-eco-logo hover:text-white transition-all rounded-sm shadow-sm"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              Cargar Más Productos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};