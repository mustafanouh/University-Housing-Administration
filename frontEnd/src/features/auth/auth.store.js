import { create } from "zustand";
import Cookies from "js-cookie";

export const useAuthStore = create((set) => ({
    user: null,
    token: Cookies.get("token") || null,

    setAuth: ({ user, token }) => {
        Cookies.set("token", token);
        set({ user, token });
    },

    logout: () => {
        Cookies.remove("token");
        set({ user: null, token: null });
    },
}));
