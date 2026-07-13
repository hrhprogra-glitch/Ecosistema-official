// src/App.tsx
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 

import { Navbar } from "./components/Navbar"; 
import { Hero } from "./sections/inicio/Hero";
import { Tienda } from "./sections/tienda/Tienda"; 
import { ProductDetail } from "./sections/tienda/ProductDetail"; 
// 1. AÑADIMOS LA IMPORTACIÓN DEL INVENTARIO AQUÍ:
import { AdminInventory } from "./sections/admin/AdminInventory"; 

import { Loader } from "./components/Loader";
import { Footer } from "./components/Footer";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; 
import { CartSidebar } from "./components/CartSidebar";
import { AuthDrawer } from "./components/AuthDrawer"; 

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router> 
          <AnimatePresence mode="wait">
            {loading && <Loader key="loader" />}
          </AnimatePresence>

          {!loading && (
            <div className="relative min-h-screen bg-white flex flex-col">
              <Navbar /> 
              <AuthDrawer /> 
              <CartSidebar />
              
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<main><Hero /></main>} />
                  <Route path="/tienda" element={<Tienda />} />
                  <Route path="/producto/:id" element={<ProductDetail />} />
                  
                  {/* 2. AÑADIMOS LA RUTA DEL INVENTARIO AQUÍ: */}
                  <Route path="/admin" element={<AdminInventory />} />
                  
                </Routes>
              </div>
              
              <Footer />
            </div>
          )}
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;