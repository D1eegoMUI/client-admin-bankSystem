import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as loginRequest } from "../../../shared/Api"
import toast from "react-hot-toast";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            loading: false,
            error: null,
            isLoadingAuth: true,
            isAuthenticated: false,

            checkAuth: () => {
                const token = get().token;
                const role = get().user?.role;
                const isAdmin = role === "ADMIN_ROLE"

                if (token && !isAdmin) {
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated: false,
                        isLoadingAuth: false,
                        error: "No tienes permiso para acceder como administrador"

                    })
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    expiresAt: null,
                    isAuthenticated: false,
                })
            },

            //------------------------------------------------------------------------------
            login: async ({ Email, Password }) => {
                const response = await loginRequest({ Email, Password });
                const responseData = response.data; // Este es el objeto que pegaste

                console.log("Estructura real:", responseData);

                const role = responseData.data?.role;

                if (role !== "ADMIN_ROLE") {
                    const message = "No tienes permisos de administrador";
                    set({ isAuthenticated: false, loading: false, error: message });
                    toast.error(message);
                    return { success: false, error: message };
                }

                set({
                    user: responseData.data,
                    token: responseData.token,
                    isAuthenticated: true,
                    loading: false,
                });

                return { success: true };
            },
            //---------------------------------------------------------------------------------------
        }),
        { name: "auth-store" }
    )
);