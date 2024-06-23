import create from "zustand"
import { persist } from "zustand/middleware"

interface TokenRing {
    value : string
    remember : ()=> void
}

export const useTokenRing = create(
    persist<TokenRing>(
        (set, get) => ({
            value : "",
            remember : (token: string)=> {
                set(()=>({ value: token }))
            }
        }),
        {
            name: "token-ring", // unique name
            getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
        }
))
