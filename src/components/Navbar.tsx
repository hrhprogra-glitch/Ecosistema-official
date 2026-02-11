import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; 
import { Logo } from "./Logo";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react"; 

// NUEVO: Importamos el contexto del carrito
import { useCart } from "../context/CartContext"; 

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // NUEVO: Llamamos a las variables y funciones del carrito
  const { cartCount, setIsCartOpen } = useCart();

  // Verificamos si estamos en la página de inicio o en otra.
  const isHomePage = location.pathname === "/";

  // Si no estamos en la página de inicio, forzamos el estilo "scrolled" (fondo blanco, letras oscuras)
  // para que siempre se lea sobre fondos claros.
  const shouldBeSolid = !isHomePage || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    
    // Solo necesitamos el evento de scroll si estamos en el Home
    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true); // Forzamos a true en otras páginas
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Tienda", path: "/tienda" },
    { name: "Servicios", path: "/servicios" },
    { name: "Contacto", path: "/contacto" }
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          shouldBeSolid 
            ? "bg-white/95 backdrop-blur-xl border-slate-200 shadow-sm py-3" 
            : "bg-transparent border-transparent shadow-none py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Branding */}
          <Link to="/" className="flex items-center gap-3 group relative z-10">
            <Logo />
            <div className="flex flex-col">
              <span className={`text-2xl font-display font-black tracking-tighter uppercase italic leading-none transition-colors duration-500 ${
                shouldBeSolid ? "text-eco-deep" : "text-white drop-shadow-lg"
              }`}>
                Ecosistema
              </span>
              <span className={`text-[10px] font-interface font-black tracking-widest uppercase transition-colors duration-500 ${
                shouldBeSolid ? "text-eco-ocean" : "text-eco-logo drop-shadow-md"
              }`}>
                Online Store
              </span>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <div className="hidden lg:flex items-center gap-10 text-[12px] font-display font-black uppercase tracking-tight">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.5 }}
                >
                  <Link
                    to={link.path}
                    className={`py-2 transition-colors duration-300 drop-shadow-md ${
                      shouldBeSolid 
                        ? (isActive ? "text-eco-logo" : "text-slate-500 hover:text-eco-deep") 
                        : (isActive ? "text-eco-logo" : "text-white/80 hover:text-white")
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            <div className={`hidden md:flex items-center gap-5 pr-4 border-r transition-colors duration-500 ${shouldBeSolid ? "border-slate-200" : "border-white/20"}`}>
              {[Search, User].map((Icon, idx) => (
                <motion.button 
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  className={`transition-colors duration-300 ${shouldBeSolid ? "text-slate-400 hover:text-eco-deep" : "text-white/90 hover:text-white"}`}
                >
                  <Icon size={20} strokeWidth={2.5} />
                </motion.button>
              ))}
            </div>

            {/* Carrito */}
            <motion.button 
              onClick={() => setIsCartOpen(true)} /* <-- NUEVO: Al hacer clic, abre el carrito */
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 bg-eco-deep text-white px-6 py-2.5 rounded-full font-display font-black text-[10px] uppercase tracking-widest hover:bg-eco-logo transition-all shadow-md"
            >
              <div className="relative">
                <ShoppingCart size={16} strokeWidth={2.5} />
                {/* <-- NUEVO: Contador dinámico del carrito --> */}
                <span className="absolute -top-2.5 -right-2.5 bg-eco-logo text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-eco-deep transition-colors group-hover:border-eco-logo">
                  {cartCount}
                </span>
              </div>
              <span className="hidden sm:block">Carrito</span>
            </motion.button>
            
            <button 
              onClick={() => setIsOpen(true)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${shouldBeSolid ? "text-eco-deep hover:bg-slate-50" : "text-white hover:bg-white/10"}`}
            >
              <Menu size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Menú Móvil Lateral */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-[70] shadow-2xl p-8 lg:hidden flex flex-col"
            >
              <button onClick={() => setIsOpen(false)} className="self-end p-2 text-slate-400 hover:text-eco-deep transition-colors">
                <X size={30} strokeWidth={2.5} />
              </button>
              <div className="mt-12 flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-3xl font-display font-black text-eco-deep uppercase italic hover:text-eco-logo transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};