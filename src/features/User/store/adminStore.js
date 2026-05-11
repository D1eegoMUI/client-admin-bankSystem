import { create } from "zustand";
import * as api from "../../../shared/api/admin";

// ================= USERS STORE =================
export const useUserStore = create((set, get) => ({
    users: [],
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
    },
    loading: false,
    error: null,

    getUsers: async (params) => {
        try {
            set({ loading: true, error: null });
            const res = await api.getUsers(params);

            set({
                users: res.data.data,
                pagination: res.data.pagination,
                loading: false
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener usuarios",
                loading: false
            });
        }
    },

    createUser: async (data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.createUser(data);

            // Agregamos el nuevo usuario al inicio de la lista
            set({
                users: [res.data.data, ...get().users],
                loading: false
            });
            return res.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al crear usuario",
                loading: false
            });
            throw error;
        }
    },

    updateUser: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.updateUser(id, data);

            // Actualizamos el usuario en el estado local buscando por 'uid' (como lo definiste en tu toJSON)
            set({
                users: get().users.map(u => u.uid === id ? res.data.userUpdated : u),
                loading: false
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al actualizar usuario",
                loading: false
            });
            throw error;
        }
    },

    toggleUserStatus: async (id) => {
        try {
            set({ loading: true, error: null });
            const res = await api.changeUserStatus(id);

            // Actualizamos el usuario en la lista con su nuevo status
            set({
                users: get().users.map(u => u.uid === id ? res.data.data : u),
                loading: false
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al cambiar estado",
                loading: false
            });
        }
    },
}));