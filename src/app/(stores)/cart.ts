import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { IMeal } from '@/_libs/types';

type CartItem = { item: IMeal; quantity: number; };

interface CartState {
  items: CartItem[];

  selectedCategoryId: string | number | null;

  // queries
  getQuantity: (id: IMeal['id']) => number;
  totalItems: () => number;
  totalPrice: () => number;

  // commands
  addToCart: (item: IMeal, quantity?: number) => void;
  updateQuantity: (id: IMeal['id'], quantity: number) => void;
  remove: (id: IMeal['id']) => void;
  clear: () => void;

  // filter meals by category

  setCategory: (categoryId: string | number | null) => void;
  clearCategory: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      selectedCategoryId: null,

      getQuantity: (id) => get().items.find(ci => ci.item.id === id)?.quantity ?? 0,
      totalItems: () => get().items.reduce((sum, ci) => sum + ci.quantity, 0),
      totalPrice: () => get().items.reduce((sum, ci) => sum + ci.quantity * (ci.item.price ?? 0), 0),

      addToCart: (item, qty = 1) => {
        const quantity = Math.max(1, qty);
        const { items } = get();
        const idx = items.findIndex(ci => ci.item.id === item.id);
        if (idx === -1) {
          set({ items: [...items, { item, quantity }] });
        } else {
          const next = [...items];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
          set({ items: next });
        }
      },

      updateQuantity: (id, quantity) => {
        const clamped = Math.max(0, quantity);
        const { items } = get();
        const idx = items.findIndex(ci => ci.item.id === id);
        if (idx === -1 && clamped > 0) {
          // no item → nothing to update
          return;
        }
        if (idx !== -1 && clamped === 0) {
          const next = [...items];
          next.splice(idx, 1);
          set({ items: next });
          return;
        }
        if (idx !== -1) {
          const next = [...items];
          next[idx] = { ...next[idx], quantity: clamped };
          set({ items: next });
        }
      },

      remove: (id) => {
        set({ items: get().items.filter(ci => ci.item.id !== id) });
      },

      clear: () => set({ items: [] }),

      setCategory(categoryId) {
        set({ selectedCategoryId: categoryId });
      },

      clearCategory() {
        set({ selectedCategoryId: null });
      }

    }),
    {
      name: 'cart', // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);