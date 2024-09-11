import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // Configuración de proxy para redirigir las solicitudes del frontend (5173) al backend (3001)
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',  // Tu backend está en el puerto 3001
        changeOrigin: true,  // Para evitar problemas de CORS
        rewrite: (path) => path.replace(/^\/api/, ''),  // Si no necesitas el prefijo '/api' en tu backend
      },
    },
  },

  // Definir variables globales
  define: {
    global: "window",  // Hace que 'global' apunte a 'window' en el navegador
  },
});
