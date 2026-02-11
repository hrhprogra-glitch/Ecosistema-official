// src/components/CartSidebar.tsx
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export const CartSidebar = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Fondo oscuro desenfocado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-eco-deep/80 backdrop-blur-sm z-[100]"
          />

          {/* Panel Lateral */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-[110] shadow-2xl flex flex-col font-interface"
          >
            {/* Header del Carrito */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-display font-black text-eco-deep uppercase italic flex items-center gap-2">
                <ShoppingBag size={20} className="text-eco-logo" /> Mi Carrito
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-slate-400 hover:text-eco-deep transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <ShoppingBag size={60} className="mb-4 opacity-20" />
                  <p className="font-bold uppercase tracking-widest text-sm">Tu carrito está vacío</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 bg-slate-50 p-3 rounded-sm border border-slate-100">
                    {/* Imagen */}
                    <div className="w-20 h-20 bg-white rounded-sm border border-slate-100 p-2 flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    
                    {/* Detalles */}
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-[10px] font-black text-eco-deep uppercase leading-tight line-clamp-2 mb-1">{item.product.name}</h3>
                        <p className="text-eco-logo font-black text-sm">S/ {item.product.price.toFixed(2)}</p>
                      </div>
                      
                      {/* Controles de cantidad y eliminar */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-white border border-slate-200 rounded-sm">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 text-slate-400 hover:text-eco-deep"><Minus size={12} /></button>
                          <span className="px-3 text-xs font-black">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 text-slate-400 hover:text-eco-deep"><Plus size={12} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer del Carrito (Total y Pagar) */}
            {cartItems.length > 0 && (
              <div className="border-t border-slate-100 p-6 bg-slate-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Estimado</span>
                  <span className="text-2xl font-display font-black text-eco-deep">S/ {cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-eco-deep text-white font-display font-black uppercase tracking-widest text-sm py-4 rounded-sm hover:bg-eco-logo transition-all shadow-xl hover:shadow-eco-deep/30">
                  Solicitar Cotización
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};