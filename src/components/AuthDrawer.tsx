import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail, LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export const AuthDrawer = () => {
  const { isAuthOpen, setIsAuthOpen, login, user, logout } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsAuthOpen(false);
    setIsRegistering(false);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isRegistering) {
        // --- REGISTRO MANUAL (PARA VER LA CONTRASEÑA) ---
        const { error } = await supabase
          .from('perfiles')
          .insert([
            { 
              email: email, 
              // Guardamos la contraseña directamente en una columna de texto
              // Asegúrate de tener la columna 'password_visible' en tu tabla
              password_visible: password, 
              rol: 'usuario' 
            }
          ]);

        if (error) throw error;
        alert("Usuario registrado. Ahora puedes ver su clave en la tabla perfiles.");
        setIsRegistering(false);
      } else {
        // --- LOGIN MANUAL (COMPARACIÓN DIRECTA) ---
        const { data, error } = await supabase
          .from('perfiles')
          .select('*')
          .eq('email', email)
          .eq('password_visible', password) // Compara el texto tal cual
          .maybeSingle();

        if (error) throw error;
        
        if (!data) {
          throw new Error("Correo o contraseña incorrectos");
        }

        // Enviamos el email y el rol al contexto global de tu App
        login(data.email, data.rol); 
        handleClose();
      }
    } catch (error: any) {
      alert(error.message || "Ocurrió un error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  const getInitial = () => {
    if (user?.fullName) return user.fullName[0].toUpperCase();
    if (user?.email) return user.email[0].toUpperCase();
    return "U";
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-eco-deep/40 backdrop-blur-sm"
          />

          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-8 flex flex-col"
          >
            <button onClick={handleClose} className="self-end p-2 hover:bg-slate-100 rounded-full transition-colors group">
              <X size={24} className="text-slate-400 group-hover:text-eco-deep" />
            </button>

            <div className="mt-12 text-center">
              <h2 className="text-4xl font-display font-black text-eco-deep uppercase italic leading-none">
                {user ? "Mi Cuenta" : (isRegistering ? "Registro" : "Iniciar Sesión")}
              </h2>
              <div className="h-1 w-12 bg-eco-logo mx-auto mt-4 rounded-full" />
            </div>

            {!user ? (
              <>
                <form className="space-y-6 mt-16" onSubmit={handleSubmit}>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-eco-logo transition-colors" size={20} />
                    <input 
                      type="email" required placeholder="CORREO ELECTRÓNICO" 
                      className="w-full bg-slate-50 border-b-2 border-slate-200 py-5 pl-12 pr-4 text-xs font-bold outline-none focus:border-eco-logo transition-all"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-eco-logo transition-colors" size={20} />
                    <input 
                      type="password" required placeholder="CONTRASEÑA" 
                      className="w-full bg-slate-50 border-b-2 border-slate-200 py-5 pl-12 pr-4 text-xs font-bold outline-none focus:border-eco-logo transition-all"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button 
                    disabled={isLoading}
                    className="w-full bg-eco-deep text-white font-display font-black uppercase tracking-[0.2em] py-6 rounded-sm hover:bg-eco-logo transition-all shadow-xl mt-8 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isRegistering ? "Registrarme" : "Ingresar")}
                  </button>
                </form>

                <button 
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="mt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-eco-logo transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  {isRegistering ? "¿Ya tienes cuenta? Inicia Sesión" : "¿No tienes cuenta? Regístrate aquí"}
                </button>
              </>
            ) : (
              <div className="mt-20 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6 border-2 border-eco-logo shadow-inner">
                  <span className="text-4xl font-display font-black text-eco-deep">
                    {getInitial()}
                  </span>
                </div>
                <h3 className="text-xl font-display font-black text-eco-deep uppercase italic">
                  {user.fullName || "Usuario Ecosistema"}
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 mb-12">
                  {user.email}
                </p>
                
                <button 
                  onClick={() => { logout(); handleClose(); }} 
                  className="group flex items-center gap-3 text-red-500 font-display font-black uppercase tracking-widest text-[10px] hover:bg-red-50 px-10 py-4 rounded-sm transition-all border border-transparent hover:border-red-100"
                >
                  <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                  Cerrar Sesión
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};