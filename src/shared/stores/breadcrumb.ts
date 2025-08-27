"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

type BreadcrumbStoreValue = {
  items: BreadcrumbItem[];
  maxDisplayItems: number;
  setItems: (items: BreadcrumbItem[]) => void;
  addItem: (item: BreadcrumbItem) => void;
  clearItems: () => void;
  setMaxDisplayItems: (max: number) => void;
};

const useBreadcrumbStore = create<BreadcrumbStoreValue>()(
  devtools(
    (set) => ({
      items: [],
      maxDisplayItems: 3, // Default responsive display count
      setItems: (items) => set({ items }),
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      clearItems: () => set({ items: [] }),
      setMaxDisplayItems: (max) => set({ maxDisplayItems: max }),
    }),
    {
      name: "breadcrumb-store",
    }
  )
);

export default useBreadcrumbStore;
