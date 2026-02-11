import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; 
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, ArrowRight } from "lucide-react";

import { Navbar } from "./components/Navbar"; 
import { Logo } from "./components/Logo";
import { Hero } from "./sections/Hero";
import { Tienda } from "./sections/Tienda"; 
import { ProductDetail } from "./sections/ProductDetail"; 
import { Loader } from "./components/Loader";

// NUEVOS IMPORTS DEL CARRITO
import { CartProvider } from "./context/CartContext";
import { CartSidebar } from "./components/CartSidebar";

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
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    // ENVOLVEMOS TODO EN EL CART PROVIDER
    <CartProvider>
      <Router> 
        <AnimatePresence mode="wait">
          {loading && <Loader key="loader" />}
        </AnimatePresence>

        {!loading && (
          <div className="relative min-h-screen bg-white flex flex-col">
            <Navbar /> 
            {/* AGREGAMOS EL COMPONENTE DEL PANEL LATERAL AQUI */}
            <CartSidebar />
            
            <div className="flex-1">
              <Routes>
                {/* ... TUS RUTAS EXISTENTES QUEDAN IGUAL ... */}
                <Route path="/" element={<main><Hero /><BestSellers /><ProductReels /><NewArrivals /><Sponsors /><SpecialOffers /><Clients /></main>} />
                <Route path="/tienda" element={<Tienda />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
              </Routes>
            </div>
            
            {/* ... TU FOOTER EXISTENTE QUEDA IGUAL ... */}
            <footer className="bg-eco-deep text-white border-t-4 border-eco-logo pt-20 pb-10">
              {/* ... contenido del footer ... */}
            </footer>
          </div>
        )}
      </Router>
    </CartProvider>
  );
}

export default App;