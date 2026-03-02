'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Importamos el Toast y BackToTop que crearemos a continuación
import { ToastContainer } from '@/components/ui/Toast';
import BackToTop from '@/components/ui/BackToTop';

export default function Providers({ children }: { children: React.ReactNode }) {
  // Inicializamos el QueryClient una sola vez por sesión de usuario
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Los datos se consideran "frescos" por 1 minuto
            refetchOnWindowFocus: false, // No recargar si el usuario cambia de pestaña
            retry: 1, // Solo reintentar una vez si falla la red
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer />
      <BackToTop />
    </QueryClientProvider>
  );
}