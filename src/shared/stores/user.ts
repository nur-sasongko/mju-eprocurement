"use client";

import { User } from "@/features/users/types";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type UserStoreValue = {
  user: User | null;
  setUser: (user: User | null) => void;
  session: Session | null;
  setSession: (session: Session | null) => void;
};

const useUserStore = create<UserStoreValue>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    session: null,
    setSession: (session) => set({ session }),
  }))
);

export default useUserStore;
