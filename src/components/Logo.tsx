// src/components/Logo.tsx
export const Logo = () => (
  <svg 
    viewBox="0 0 100 100" 
    className="w-10 h-10 drop-shadow-sm" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Círculo con el celeste suave que definimos */}
    <circle cx="50" cy="50" r="50" fill="#00B4D8" />
    
    {/* Gota de agua blanca */}
    <path 
      d="M50 20C50 20 30 45 30 60C30 71.0457 38.9543 80 50 80C61.0457 80 70 71.0457 70 60C70 45 50 20 50 20Z" 
      fill="white" 
    />
  </svg>
);