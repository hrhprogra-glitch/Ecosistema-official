import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, ChevronDown, ImageOff, Plus } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

// --- TU CATÁLOGO EXACTO ---
// Pega aquí tu lista completa de los 80 productos que ya tienes configurada
const productList = [

  { id: 1, name: "TEE DENTADA DE 16 X 16 X 16 MM PE - NEGRO", category: "Conexiones y Acoples", price: 1.50, image: "../../Productos/Tee-Dentado-1.jpg" },

  { id: 2, name: "TEE DENTADA DE 20 X 20  X 20 MM PE - NEGRO", category: "Conexiones y Acoples", price: 2.00, image: "../../Productos/Tee-Dentado-1.jpg" },

  { id: 3, name: "TEE DENTADA DE 25 X 25  X 25 MM PE - NEGRO", category: "Conexiones y Acoples", price: 2.50, image: "../../Productos/Tee-Dentado-1.jpg" },

  { id: 4, name: "TEE DENTADA DE 32 X 32 X 32 MM PE - NEGRO", category: "Conexiones y Acoples", price: 3.50, image: "../../Productos/Tee-Dentado-1.jpg" },

  { id: 5, name: "CODO DENTADO DE 16 X 16 MM PE - NEGRO", category: "Conexiones y Acoples", price: 1.20, image: "../../Productos/Codo-Dentado-2.jpg" },

  { id: 6, name: "CODO DENTADO DE 20 X 20 MM PE - NEGRO", category: "Conexiones y Acoples", price: 1.80, image: "../../Productos/Codo-Dentado-2.jpg" },

  { id: 7, name: "CODO DENTADO DE 25 X 25 MM PE - NEGRO", category: "Conexiones y Acoples", price: 2.20, image: "../../Productos/Codo-Dentado-2.jpg" },

  { id: 8, name: "CODO DENTADO DE 32 X 32 MM PE - NEGRO", category: "Conexiones y Acoples", price: 3.00, image: "../../Productos/Codo-Dentado-2.jpg" },

  { id: 9, name: "UNION DENTADA DE 16 X 16 MM - PE - VERDE", category: "Conexiones y Acoples", price: 1.00, image: "../../Productos/Union-Dentado-3.jpg" },

  { id: 10, name: "UNION DENTADA DE 20 X 20 MM - PE - NEGRO", category: "Conexiones y Acoples", price: 1.50, image: "../../Productos/Union-Dentado-3.jpg" },

  { id: 11, name: "UNION DENTADA DE 25 X 25 MM - PE - NEGRO", category: "Conexiones y Acoples", price: 2.00, image: "../../Productos/Union-Dentado-3.jpg" },

  { id: 12, name: "UNION DENTADA DE 32 X 32 MM - PE - NEGRO", category: "Conexiones y Acoples", price: 2.80, image: "../../Productos/Union-Dentado-3.jpg" },

  { id: 13, name: "FINAL LINEA TIPO \"8\",16 MM,AZUD", category: "Otros Accesorios", price: 0.80, image: "../../Productos/Concector-Final-4.jpg" },

  { id: 14, name: "FINAL LINEA TIPO \"8\",20 MM,AZUD", category: "Otros Accesorios", price: 1.00, image: "../../Productos/Concector-Final-4.jpg" },

  { id: 15, name: "CODO COMPRESIÓN 32 MM X 1\" R/M AZUL PN 16 SAB", category: "Conexiones y Acoples", price: 12.00, image: "../../Productos/Codo-Compresión-Macho-5.jpg" },

  { id: 17, name: "CODO COMPRESIÓN 32 MM X 1\" R/H AZUL PN 16 SAB", category: "Conexiones y Acoples", price: 12.50, image: "../../Productos/Codo-Compresión-Hembra-6.jpg" },

  { id: 18, name: "CODO COMPRESIÓN 32 MM X 3/4\" R/H AZUL PN 16 SAB", category: "Conexiones y Acoples", price: 11.50, image: "../../Productos/Codo-Compresión-Hembra-6.jpg" },

  { id: 19, name: "CODO COMPRESIÓN 32 X 32 MM  MG/MG AZUL PN 16 - SAB", category: "Conexiones y Acoples", price: 15.00, image: "../../Productos/Codo-Compresión-32x32-7.jpg" },

  { id: 20, name: "CODO COMPRESIÓN 25 X 25 MM  MG/MG AZUL PN 16 - SAB", category: "Conexiones y Acoples", price: 10.00, image: "../../Productos/Codo-Compresión-32x32-7.jpg" },

  { id: 21, name: "CONECTOR INICIAL + EMPAQUE DE 16 X 16 MM ABRISA", category: "Otros Accesorios", price: 1.50, image: "../../Productos/conector-inicial-16mm-8.jpg" },

  { id: 22, name: "CONECTOR INICIAL + EMPAQUE DE 16 X 20  MM ABRISA", category: "Otros Accesorios", price: 1.80, image: "../../Productos/conector-inicial-16mm-8.jpg" },

  { id: 23, name: "ENLACE DE COMPRESIÓN 32 MM X 1\" R/H AZUL PN 16 SAB", category: "Otros Accesorios", price: 8.50, image: "../../Productos/Enlace-Rosca-Hembra-9.jpg" },

  { id: 24, name: "ENLACE DE COMPRESIÓN 32 MM X 3/4\" R/H AZUL PN 16 SAB", category: "Otros Accesorios", price: 8.00, image: "../../Productos/Enlace-Rosca-Hembra-9.jpg" },

  { id: 25, name: "ENLACE DE COMPRESIÓN 32 MM X 1\" R/M AZUL PN 16 SAB", category: "Otros Accesorios", price: 8.50, image: "../../Productos/Enlace-Rosca-Macho-10.jpg" },

  { id: 26, name: "ENLACE DE COMPRESIÓN 32 MM X 3/4\" R/M AZUL PN 16 SAB", category: "Otros Accesorios", price: 8.00, image: "../../Productos/Enlace-Rosca-Macho-10.jpg" },

  { id: 27, name: "ENLACE RECTO COMPRESIÓN 32 X 32 MM AZUL SAB", category: "Otros Accesorios", price: 10.00, image: "../../Productos/Enlace-Recto-Compresión-11.jpg" },

  { id: 28, name: "ENLACE RECTO COMPRESIÓN 25 X 25 MM AZUL SAB", category: "Otros Accesorios", price: 9.00, image: "../../Productos/Enlace-Recto-Compresión-11.jpg" },

  { id: 29, name: "ESTACA MICROASPERSOR MONDRAGON", category: "Emisores de Riego", price: 2.50, image: "../../Productos/Estaca-Microaspersor-15.jpg" },

  { id: 30, name: "FILTRO DE MALLA DE 3/4\" EN \"Y\" ERHAS", category: "Accesorios y Protección", price: 45.00, image: "../../Productos/Filtro-Malla-12.jpg" },

  { id: 31, name: "FILTRO DE MALLA DE 1\" EN \"Y\" ERHAS", category: "Accesorios y Protección", price: 55.00, image: "../../Productos/Filtro-Malla-12.jpg" },

  { id: 32, name: "FILTRO DE MALLA DE 1 1/2\" EN \"Y\" ERHAS", category: "Accesorios y Protección", price: 85.00, image: "../../Productos/Filtro-Malla-12.jpg" },

  { id: 33, name: "FILTRO DE MALLA DE 2\" EN \"Y\" ERHAS", category: "Accesorios y Protección", price: 120.00, image: "../../Productos/Filtro-Malla-12.jpg" },

  { id: 34, name: "FILTRO DE MALLA DE 3\" EN \"Y\" ERHAS", category: "Accesorios y Protección", price: 250.00, image: "../../Productos/Filtro-Malla-12.jpg" },

  { id: 35, name: "GOTERO INSERCIÓN AUTOCOMPENSADO 2.2 L/H MOD. SUPERTIF RIVULIS", category: "Emisores de Riego", price: 0.80, image: "../../Productos/Gotero-Inserción-Autocompensado-13.jpg" },

  { id: 36, name: "GOTERO INSERCIÓN AUTOCOMPENSADO 4.0 L/H MOD. SUPERTIF RIVULIS", category: "Emisores de Riego", price: 0.80, image: "../../Productos/Goteros-Inserción-Autocompesado-14.jpg" },

  { id: 37, name: "MANGUERA CON GOTERO C 25 MIL A 20 CM 2.0 L/H 400 M SENKRON", category: "Mangueras y Tuberías", price: 450.00, image: "../../Productos/Manguera-Con-Gotero-16.jpg" },

  { id: 38, name: "MANGUERA CON GOTERO C 25 MIL A 30 CM 2.0 L/H 400 M SENKRON", category: "Mangueras y Tuberías", price: 420.00, image: "../../Productos/Manguera-Con-Gotero-16.jpg" },

  { id: 39, name: "MANGUERA CON GOTERO C 25 MIL A 40 CM 2.0 L/H 400 M SENKRON", category: "Mangueras y Tuberías", price: 400.00, image: "../../Productos/Manguera-Con-Gotero-16.jpg" },

  { id: 40, name: "MANGUERA CON GOTERO C 25 MIL A 50 CM 2.0 L/H 400 M SENKRON", category: "Mangueras y Tuberías", price: 380.00, image: "../../Productos/Manguera-Con-Gotero-16.jpg" },

  { id: 41, name: "MANGUERA DE 16 MM C-2.5 CIEGA X 400 MTS SENKRON", category: "Mangueras y Tuberías", price: 280.00, image: "../../Productos/Maguera-de-16mm-17.jpg" },

  { id: 42, name: "MANGUERA DE 20 MM C-2.5 CIEGA X 400 MTS SENKRON", category: "Mangueras y Tuberías", price: 320.00, image: "../../Productos/Maguera-de-16mm-17.jpg" },

  { id: 43, name: "MANGUERA DE 25 MM C-2.5 CIEGA X 400 MTS SENKRON", category: "Mangueras y Tuberías", price: 450.00, image: "../../Productos/Maguera-de-16mm-17.jpg" },

  { id: 44, name: "MANGUERA DE 32 MM C-2.5 CIEGA X 400 MTS SENKRON", category: "Mangueras y Tuberías", price: 580.00, image: "../../Productos/Maguera-de-16mm-17.jpg" },

  { id: 45, name: "MANGUERA DE 16 MM C-4 PE ORBES DRIP", category: "Mangueras y Tuberías", price: 1.20, image: "../../Productos/Maguera-de-16mm-17.jpg" },

  { id: 46, name: "MANGUERA DE 20 MM C-4 PE ORBES DRIP", category: "Mangueras y Tuberías", price: 1.50, image: "../../Productos/Maguera-de-16mm-17.jpg" },

  { id: 47, name: "MANGUERA DE 25 MM C-4 PE ORBES DRIP", category: "Mangueras y Tuberías", price: 2.50, image: "../../Productos/Maguera-de-16mm-17.jpg" },

  { id: 48, name: "MANGUERA DE 32 MM C-4 PE ORBES DRIP", category: "Mangueras y Tuberías", price: 3.80, image: "../../Productos/Maguera-de-16mm-17.jpg" },

  { id: 49, name: "CONECTOR EN LÍNEA DE 1/2\" X 16 MM", category: "Otros Accesorios", price: 1.50, image: "../../Productos/Conector-En-Linea-18.jpg" },

  { id: 50, name: "CONECTOR EN LÍNEA DE 1/2\" X 20 MM", category: "Otros Accesorios", price: 1.80, image: "../../Productos/Conector-En-Linea-18.jpg" },

  { id: 51, name: "CONECTOR EN LÍNEA DE 3/4\" X 16 MM", category: "Otros Accesorios", price: 2.00, image: "../../Productos/Conector-En-Linea-18.jpg" },

  { id: 52, name: "CONECTOR EN LÍNEA DE 3/4\" X 20 MM", category: "Otros Accesorios", price: 2.20, image: "../../Productos/Conector-En-Linea-18.jpg" },

  { id: 53, name: "CONECTOR EN LÍNEA DE 1\" X 20 MM", category: "Otros Accesorios", price: 2.50, image: "../../Productos/Conector-En-Linea-18.jpg" },

  { id: 54, name: "CONECTOR EN LÍNEA DE 1\" X 25 MM", category: "Otros Accesorios", price: 3.00, image: "../../Productos/Conector-En-Linea-18.jpg" },

  { id: 55, name: "CONECTOR EN LÍNEA DE 1\" X 32 MM", category: "Otros Accesorios", price: 3.50, image: "../../Productos/Conector-En-Linea-18.jpg" },

  { id: 56, name: "TAPÓN FINAL DE COMPRESIÓN DE 32 MM AZUL SAB", category: "Otros Accesorios", price: 5.00, image: "../../Productos/Tapon-Final-De-Compresión-19.jpg" },

  { id: 57, name: "MICROTUBO PVC DE 4 MM 1.4 KG SAB C-DRIP", category: "Mangueras y Tuberías", price: 0.50, image: "../../Productos/Microtubo-PVC-20.jpg" },

  { id: 58, name: "MICROJET SPRAY 57 - 128 L/H 1.5 M 180° ROJO/NEGRO", category: "Otros Accesorios", price: 1.20, image: "../../Productos/Microjet-Spray-180°-21.jpg" },

  { id: 59, name: "MICROJET SPRAY 57 - 128 L/H 1.5 M 360° ROJO/NEGRO", category: "Otros Accesorios", price: 1.20, image: "../../Productos/Microjet-Spray-360°-22.jpg" },

  { id: 60, name: "TEE DE COMPRESIÓN 32 MM MG/MG/MG AZUL PN 16 SAB", category: "Conexiones y Acoples", price: 18.00, image: "../../Productos/Tee-De-Compresión-23.jpg" },

  { id: 61, name: "TEE DE COMPRESIÓN 32 MM X 1\" X 32 MM R/H AZUL PN 16 SAB", category: "Conexiones y Acoples", price: 16.00, image: "../../Productos/Tee-De-Compresión-23.jpg" },

  { id: 62, name: "TEE DE COMPRESIÓN 32 MM X 3/4\" X 32 MM R/H AZUL PN 16 SAB", category: "Conexiones y Acoples", price: 15.00, image: "../../Productos/Tee-De-Compresión-23.jpg" },

  { id: 63, name: "MANGUERA DE (1\") 32 MM C-4 PE ORBES DRIP", category: "Mangueras y Tuberías", price: 3.80, image: "../../Productos/Maguera-de-1-24.jpg" },

  { id: 64, name: "MANGUERA DE (1 1/4\") 40  MM C-4 PE ORBES DRIP", category: "Mangueras y Tuberías", price: 5.50, image: "../../Productos/Maguera-de-1-24.jpg" },

  { id: 65, name: "MANGUERA DE (1 1/2\")  50 MM C-4 PE ORBES DRIP", category: "Mangueras y Tuberías", price: 8.00, image: "../../Productos/Maguera-de-1-24.jpg" },

  { id: 66, name: "MANGUERA DE (2\")  63 MM C-4 PE ORBES DRIP", category: "Mangueras y Tuberías", price: 12.00, image: "../../Productos/Maguera-de-1-24.jpg" },

  { id: 67, name: "ELECTROVÁLVULA DE 1\" PGV-101 - HUNTER", category: "Válvulas", price: 125.00, image: "../../Productos/Electrovalvula-25.jpg" },

  { id: 68, name: "ELECTROVÁLVULA DE 1 1/2\" PGV-151 - HUNTER", category: "Válvulas", price: 280.00, image: "../../Productos/Electrovalvula-25.jpg" },

  { id: 69, name: "ELECTROVÁLVULA DE 2\" PGV-201 - HUNTER", category: "Válvulas", price: 450.00, image: "../../Productos/Electrovalvula-25.jpg" },

  { id: 70, name: "CONTROLADOR DE RIEGO DE 4 - 6 - 8 ESTACIONES ECO LOGIC HUNTER", category: "Control y Automatización", price: 380.00, image: "../../Productos/Controlador-De-Riego-4-6-27.jpg" },

  { id: 71, name: "CONTROLADOR DE RIEGO DE 4 - 6 - 8 ESTACIONES X-CORE HUNTER", category: "Control y Automatización", price: 550.00, image: "../../Productos/Controlador-De-Riego-6-8-26.jpg" },

  { id: 72, name: "CONTROLADOR ANALÓGICO PARA CAÑO BO92A - DIG (A PILAS)", category: "Control y Automatización", price: 180.00, image: "../../Productos/Controlador-Analógico-Para-Caño-Dig-A-Pilas-28.jpg" },

  { id: 73, name: "CONTROLADOR SOLAR PARA CAÑO EVO100 - DIG", category: "Control y Automatización", price: 250.00, image: "../../Productos/Controlador-Solar-Para-Caño-Dig-29.jpg" },

  { id: 74, name: "VÁLVULA DE AIRE 1/2\" - 3/4\"", category: "Válvulas", price: 45.00, image: "../../Productos/Valvula-De-Aire-30.jpg" },

  { id: 75, name: "VÁLVULA DE AIRE DE DOBLE EFECTO DE 1\" - 1 1/2\"", category: "Válvulas", price: 85.00, image: "../../Productos/Valvula-De-Aire-Doble-Efecto-31.jpg" },

  { id: 76, name: "CAJA DE PROTECCIÓN CIRCULAR DE 6\" - RAIN BIRD", category: "Accesorios y Protección", price: 25.00, image: "../../Productos/Caja-De-Protección-Circular-Rain-Bird-32.jpg" },

  { id: 77, name: "CAJA PORTAVÁLVULA RECTANGULAR DE 42 CM X 32 CM X 20 LAGO ABRISA", category: "Válvulas", price: 65.00, image: "../../Productos/Caja-Portavalvula-Rectangular-33.jpg" },

  { id: 78, name: "ASPERSOR 427B 1/2\" C/ROMPECHORRO SECTORIAL PLÁSTICO NAAN DAN", category: "Emisores de Riego", price: 15.00, image: "../../Productos/Aspersor-427-34.jpg" },

  { id: 79, name: "ASPERSOR DE IMPACTO DE 3/4\" C/ROMPECHORRO SECTORIAL NAAN DAN", category: "Emisores de Riego", price: 45.00, image: "../../Productos/Aspersor-De-Impacto-35.jpg" },

  { id: 80, name: "ASPERSOR DE IMPACTO DE 1\" C/ROMPECHORRO SECTORIAL", category: "Emisores de Riego", price: 85.00, image: "../../Productos/Apersor-De-Impacto-1-36.jpg" }

];

const CATEGORY_GROUPS = {
  "Conducción": ["Conexiones y Acoples", "Mangueras y Tuberías"],
  "Control": ["Válvulas", "Control y Automatización"],
  "Riego": ["Emisores de Riego"],
  "Soporte": ["Accesorios y Protección", "Otros Accesorios"]
};

const ITEMS_PER_PAGE = 20;

export const Products = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    setVisibleItems(ITEMS_PER_PAGE);
  }, [activeCategory, searchQuery]);

  const filteredProducts = useMemo(() => {
    return productList.filter(p => {
      const matchesCategory = activeCategory === "Todos" || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const displayedProducts = filteredProducts.slice(0, visibleItems);

  return (
    <section className="bg-slate-50 min-h-screen font-interface selection:bg-eco-logo/20 pb-20">
      
      {/* ESPACIO PARA EL NAVBAR (Se queda arriba) */}
      <div className="pt-[90px] w-full bg-slate-50"></div>

      {/* --- BARRA DE FILTROS ENCAJADA PERFECTAMENTE --- 
          - top-[65px] es la medida exacta del nuevo Navbar.
          - bg-white/95 backdrop-blur-xl hace que se fusione con el menú de arriba.
          - shadow-sm unifica la sombra con el menú.
      */}
      <div className="sticky top-[65px] z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm mb-10 transition-all">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-3">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Filtros estilo Píldoras (Pills) */}
            <nav className="flex items-center gap-2 lg:gap-3 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
              <button 
                onClick={() => { setActiveCategory("Todos"); setOpenGroup(null); }}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${
                  activeCategory === "Todos" 
                    ? "bg-eco-deep text-white shadow-md shadow-eco-deep/20" 
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-eco-deep"
                }`}
              >
                Todos
              </button>

              {Object.entries(CATEGORY_GROUPS).map(([groupName, subCats]) => (
                <div key={groupName} className="relative">
                  <button 
                    onClick={() => setOpenGroup(openGroup === groupName ? null : groupName)}
                    className={`flex items-center gap-2 px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${
                      openGroup === groupName 
                        ? "bg-eco-logo text-white shadow-md shadow-eco-logo/20" 
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-eco-deep"
                    }`}
                  >
                    {groupName}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${openGroup === groupName ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {openGroup === groupName && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-3 w-64 bg-white shadow-2xl border border-slate-100 rounded-2xl p-2 z-50 overflow-hidden"
                      >
                        {subCats.map(sub => (
                          <button
                            key={sub}
                            onClick={() => { setActiveCategory(sub); setOpenGroup(null); }}
                            className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                              activeCategory === sub 
                                ? "bg-eco-logo/10 text-eco-logo" 
                                : "hover:bg-slate-50 text-slate-600"
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Buscador integrado */}
            <div className="relative w-full lg:w-[400px]">
              <div className="relative flex items-center bg-slate-100/80 rounded-full border border-transparent focus-within:border-eco-logo focus-within:bg-white focus-within:shadow-md transition-all">
                <Search className="absolute left-4 text-slate-400" size={16} />
                <input 
                  type="text"
                  value={searchQuery}
                  placeholder="Buscar por nombre o medida..."
                  className="w-full bg-transparent border-none py-3.5 pl-12 pr-4 text-[11px] font-bold text-slate-700 uppercase tracking-widest focus:outline-none placeholder:text-slate-400"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENEDOR DE PRODUCTOS */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        
        {/* Malla de Productos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group flex flex-col h-full bg-white rounded-3xl p-3 border border-slate-100 hover:shadow-2xl hover:border-eco-logo/30 transition-all duration-300"
              >
                <div className="relative aspect-[4/5] bg-[#F8FAFC] rounded-2xl overflow-hidden mb-4 transition-all duration-500">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain p-6 mix-blend-multiply opacity-90 group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      (e.target as HTMLImageElement).nextElementSibling?.classList.add('flex');
                    }}
                  />
                  
                  {/* Fallback de imagen */}
                  <div className="absolute inset-0 hidden flex-col items-center justify-center bg-slate-50 text-slate-300">
                    <ImageOff size={30} />
                    <span className="text-[8px] font-bold uppercase mt-2">Sin Imagen</span>
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                    <button className="p-3.5 bg-eco-deep text-white rounded-full shadow-xl hover:bg-eco-logo transition-all transform hover:scale-110">
                      <ShoppingCart size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                <div className="text-center px-2 pb-2 mt-auto">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">{product.category}</p>
                  <h3 className="text-[11px] font-display font-black text-slate-800 uppercase tracking-tight mb-3 leading-relaxed line-clamp-2" title={product.name}>
                    {product.name}
                  </h3>
                  <div className="text-eco-logo text-lg font-display font-black">
                    {product.price > 0 ? `S/ ${product.price.toFixed(2)}` : "Consultar"}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* BOTÓN VER MÁS */}
        {visibleItems < filteredProducts.length && (
          <div className="col-span-full flex justify-center mt-16 mb-8">
            <button
              onClick={() => setVisibleItems((prev) => prev + ITEMS_PER_PAGE)}
              className="group flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-100 text-eco-deep font-display font-black text-xs uppercase tracking-widest hover:border-eco-logo hover:bg-eco-logo hover:text-white transition-all rounded-full shadow-sm hover:shadow-xl"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              Cargar Más Productos
            </button>
          </div>
        )}
        
        {/* Mensaje al final */}
        {visibleItems >= filteredProducts.length && filteredProducts.length > ITEMS_PER_PAGE && (
          <div className="col-span-full flex justify-center mt-16 mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Has visto todo el catálogo ({filteredProducts.length})
            </p>
          </div>
        )}

      </div>
    </section>
  );
};