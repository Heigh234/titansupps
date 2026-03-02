'use client';

/**
 * useFavoritesStore — Sistema de favoritos con persistencia en localStorage
 * ─────────────────────────────────────────────────────────────────────────
 * Almacena los productos favoritos del usuario con todos los datos necesarios
 * para renderizarlos en el dashboard sin necesidad de re-fetch.
 *
 * EN PRODUCCIÓN: Sincronizar con endpoint de usuario autenticado.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface FavoriteProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
}

interface FavoritesState {
  items: FavoriteProduct[];
  toggleFavorite: (product: FavoriteProduct) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleFavorite: (product: FavoriteProduct) => {
        const exists = get().items.some((item) => item.id === product.id);
        if (exists) {
          set({ items: get().items.filter((item) => item.id !== product.id) });
        } else {
          set({ items: [...get().items, product] });
        }
      },

      removeFavorite: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      isFavorite: (id: string) => {
        return get().items.some((item) => item.id === id);
      },
    }),
    {
      name: 'titan-favorites', // Clave en localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
