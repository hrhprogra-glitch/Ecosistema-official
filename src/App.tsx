import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { Navbar } from "./components/Navbar"; 
import { Hero } from "./sections/Hero";
// import { Categories } from "./sections/Categories"; // Opcional: Descomentar si decides mantenerlo
import { Products } from "./sections/Products"; 
import { Loader } from "./components/Loader";

// IMPORTACIÓN DE LAS NUEVAS SECCIONES
import { 
  BestSellers, 
  ProductReels, 
  NewArrivals, 
  Sponsors, 
  SpecialOffers, 
  Clients 
} from "./sections/HomeSections";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sincronización de activos técnicos
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router> 
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen bg-white">
          {/* El Navbar fuera de Routes permite que useLocation funcione en todas las páginas */}
          <Navbar /> 
          
          <Routes>
            {/* RUTA DE INICIO - LANDING PAGE COMPLETA */}
            <Route path="/" element={
              <main>
                {/* 1. HERO CON MODAL DE OFERTAS */}
                <Hero />
                
                {/* 2. MEJORES PRODUCTOS (Grid con precios) */}
                <BestSellers />
                
                {/* 3. VIDEOS DEMOSTRATIVOS (Estilo TikTok) */}
                <ProductReels />
                
                {/* 4. NOVEDADES (Lo nuevo de lo nuevo) */}
                <NewArrivals />
                
                {/* 5. PATROCINIOS (Hunter, Rain Bird, etc.) */}
                <Sponsors />
                
                {/* 6. MEJORES OFERTAS (Banner de descuento) */}
                <SpecialOffers />
                
                {/* 7. CLIENTES (Logos de empresas) */}
                <Clients />
              </main>
            } />

            {/* RUTA DE PRODUCTOS (Catálogo completo) */}
            <Route path="/productos" element={<Products />} />
          </Routes>
          
          <footer className="py-12 border-t border-slate-100 bg-white text-center">
            <p className="text-[10px] font-display font-black text-slate-400 uppercase tracking-[0.3em]">
              © 2026 Ecosistema Online Store — Ingeniería Digital
            </p>
          </footer>
        </div>
      )}
    </Router>
  );
}

export default App;