'use client';

/**
 * useAuthStore — Sistema de autenticación frontend con persistencia en localStorage
 * ─────────────────────────────────────────────────────────────────────────────────
 * DECISIÓN DE ARQUITECTURA:
 * Como este es un proyecto de portfolio sin backend real, usamos Zustand con
 * persistencia en localStorage para simular un sistema de auth completo y funcional.
 * Esto permite que el nombre del usuario aparezca en el Dashboard, el navbar
 * reaccione al estado de sesión, y el logout funcione correctamente en toda la app.
 *
 * EN PRODUCCIÓN: Reemplazar con NextAuth.js o Supabase Auth.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user: AuthUser) => {
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'titan-auth', // Clave en localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
