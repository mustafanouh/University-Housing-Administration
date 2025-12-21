import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";


export const useAuthStore = create(
  persist(
    (set) => ({

      user: null,

      token: Cookies.get("token") || null,

      setAuth: ({ user, token }) => {
        if (token) {
          Cookies.set("token", token, {
            expires: 7,          // صالح لمدة 7 أيام
            // secure: true,        // فقط عبر HTTPS
            sameSite: "strict",  // حماية من CSRF
          });
        }
        set({ user, token });
      },

      logout: () => {
        Cookies.remove("token");
        set({ user: null, token: null });
      },

    }),
    {
      name: "auth-user-storage", 
      partialize: (state) => ({ user: state.user }), 
    }
  )
);