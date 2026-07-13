import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, MessageSquare } from "lucide-react";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-eco-deep text-white border-t-4 border-eco-logo pt-16 pb-8 font-interface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Columna 1: Branding y Redes Sociales */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="text-2xl font-display font-black tracking-tighter uppercase italic">
                Ecosistema
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Soluciones integrales en sistemas de riego y equipamiento hídrico profesional. Calidad técnica garantizada.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-eco-logo hover:text-eco-deep transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-eco-logo hover:text-eco-deep transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-eco-logo hover:text-eco-deep transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos y Servicio */}
          <div>
            <h4 className="font-display font-black uppercase mb-6 text-eco-logo tracking-widest text-sm">
              Servicio al Cliente
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/tienda" className="hover:text-white transition-colors">Catálogo de Productos</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition-colors">Solicitar Cotización</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition-colors">Términos de Servicio</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          {/* Columna 3: Información de Contacto Directo */}
          <div>
            <h4 className="font-display font-black uppercase mb-6 text-eco-logo tracking-widest text-sm">
              Contacto Directo
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-eco-logo shrink-0" />
                <span className="font-bold text-white">+51 999 999 999</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare size={18} className="text-eco-logo shrink-0" />
                <a href="https://wa.me/51999999999" className="hover:text-white">WhatsApp Directo</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-eco-logo shrink-0" />
                <a href="mailto:ventas@ecosistema.com" className="hover:text-white">ventas@ecosistema.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-eco-logo shrink-0" />
                <span>Lima, Perú</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra Inferior: Derechos Reservados */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            © {currentYear} ECOSISTEMA ONLINE STORE — TODOS LOS DERECHOS RESERVADOS
          </p>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Infraestructura Hídrica de Alto Rendimiento
          </div>
        </div>
      </div>
    </footer>
  );
};