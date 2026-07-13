// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

export type UserRole = 'admin' | 'usuario';

interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  
  // 1. SOLUCIÓN DEL ERROR: Inicialización protegida con try-catch
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem("eco_user");
      // Si savedUser es "admin01", el JSON.parse fallará y saltará al catch
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.warn("Se encontró un error en los datos guardados. Reseteando sesión...");
      // Aquí es donde solucionamos el problema automáticamente:
      localStorage.removeItem("eco_user"); 
      return null;
    }
  });
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const isAdmin = user?.role === 'admin';

  const login = (email: string, role: UserRole) => {
    const newUser: User = { 
      id: '1', 
      email, 
      role, 
      fullName: email.split('@')[0] 
    };
    setUser(newUser);
    // Guardamos correctamente el objeto como string
    localStorage.setItem("eco_user", JSON.stringify(newUser)); 
    setIsAuthOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eco_user"); 
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isAuthOpen, setIsAuthOpen, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};