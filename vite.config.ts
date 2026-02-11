import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite' // 1. Importamos el plugin de Tailwind 4

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), // 2. Agregamos el motor de Tailwind 4
    react()
  ],
})