import { axiosAdmin } from "./api";

// ================= USERS =================
export const getUsers = async (params) => 
    await axiosAdmin.get("/users", { params });

export const getUserById = async (id) => 
    await axiosAdmin.get(`/users/${id}`);

export const createUser = async (data) => 
    await axiosAdmin.post("/users", data);

export const updateUser = async (id, data) => 
    await axiosAdmin.put(`/users/${id}`, data);

export const changeUserStatus = async (id) => 
    await axiosAdmin.put(`/users/${id}/status`);