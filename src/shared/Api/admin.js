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

// ================= ACCOUNTS =================
export const getAccounts = async () => 
    await axiosAdmin.get("/accounts");

export const createAccount = async (data) => 
    await axiosAdmin.post("/accounts", data);

export const changeAccountStatus = async (id) => 
    await axiosAdmin.put(`/accounts/${id}/status`);

export const getAccountRanking = async (params) => 
    await axiosAdmin.get("/accounts/movements/ranking", { params });

export const getAccountDetails = async (id) => 
    await axiosAdmin.get(`/accounts/${id}/details`);

// ================= LOAN =================
export const getAllLoans = async () => 
    await axiosAdmin.get("/loans"); // Solo ADMIN

export const getMyLoans = async () => 
    await axiosAdmin.get("/loans/my-loans"); // Solo USER logueado

export const getLoanById = async (id) => 
    await axiosAdmin.get(`/loans/${id}`);

// ================= EXCHANGE =================
export const convertCurrency = async (data) => 
    await axiosAdmin.post("/exchange/convert", data);

// ================= LOANAPPLICATION =================
export const getLoanApplications = async () => 
    await axiosAdmin.get("/loanApplications");

export const createLoanApplication = async (data) => 
    await axiosAdmin.post("/loanApplications", data);

export const updateLoanApplication = async (id, data) => 
    await axiosAdmin.put(`/loanApplications/${id}`, data);

export const cancelLoanApplication = async (id) => 
    await axiosAdmin.put(`/loanApplications/${id}/cancel`);

export const approveLoanApplication = async (id) => 
    await axiosAdmin.put(`/loanApplications/${id}/approve`);

export const rejectLoanApplication = async (id) => 
    await axiosAdmin.put(`/loanApplications/${id}/reject`);

// ================= PRODUCT =================
export const getProducts = async (params) => 
    await axiosAdmin.get("/products", { params });

export const createProduct = async (data) => 
    await axiosAdmin.post("/products", data);

export const updateProduct = async (id, data) => 
    await axiosAdmin.put(`/products/${id}`, data);

export const deleteProduct = async (id) => 
    await axiosAdmin.delete(`/products/${id}`);

// ================= TRANSACTION =================
export const getTransactions = async (params) => 
    await axiosAdmin.get("/transactions", { params });

export const createTransaction = async (data) => 
    await axiosAdmin.post("/transactions", data);

export const getAccountHistory = async (id) => 
    await axiosAdmin.get(`/transactions/account/${id}/history`);

export const revertDeposit = async (id) => 
    await axiosAdmin.put(`/transactions/revert/${id}`);

// ================= CARD =================
export const getCards = async (params) => 
    await axiosAdmin.get("/cards", { params });

export const createCard = async (formData) => 
    await axiosAdmin.post("/cards", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

export const updateCard = async (id, formData) => 
    await axiosAdmin.put(`/cards/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

export const toggleCardStatus = async (id) => 
    await axiosAdmin.put(`/cards/${id}/status`);

export const approveCard = async (id) => 
    await axiosAdmin.put(`/cards/${id}/approve`)
