import create from "zustand"
import { persist } from "zustand/middleware"

export const useTokenStore = create(persist(
  (set, get) => ({
    tokens: "",
    addToken: (token: string) => set({ tokens: token }),
  }),
  {
    name: "token-storage", // unique name
    getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
  }
))
