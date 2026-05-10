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

export const createLoan = async (data) =>
    await axiosAdmin.post("/loans", data);

export const getLoanDetails = async (loanId) =>
    await axiosAdmin.get(`/loanDetails/${loanId}`);

export const payLoanInstallment = async (data) =>
    await axiosAdmin.post("/loanDetails/pay", data);

// ================= EXCHANGE =================
// Si no tienes una ruta /exchange registrada en app.js, esta podría dar 404
export const convertCurrency = async (data) => 
    await axiosAdmin.post("/exchange/convert", data);

// ================= LOANAPPLICATION =================
// Ajustado a plural como en tu backend: app.use(`${BASE_URL}/loanApplications`, ...)
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

// ================= CARDS (DÉBITO - Entidad: Card) =================
export const getCards = async (params) => 
    await axiosAdmin.get("/cards", { params });

export const getCardById = async (id) => 
    await axiosAdmin.get(`/cards/${id}`);

export const createCard = async (data) => 
    await axiosAdmin.post("/cards", data);

export const updateCard = async (id, data) => 
    await axiosAdmin.put(`/cards/${id}`, data);

export const toggleCardStatus = async (id) => 
    await axiosAdmin.put(`/cards/${id}/status`);

export const deleteCard = async (id) => 
    await axiosAdmin.delete(`/cards/${id}`);

// ================= CREDIT CARDS (CRÉDITO - Entidad: CreditCard) =================
export const getCreditCards = async (params) => 
    await axiosAdmin.get("/creditCards", { params });

export const getCreditCardById = async (id) => 
    await axiosAdmin.get(`/creditCards/${id}`);

export const createCreditCard = async (data) => 
    await axiosAdmin.post("/creditCards", data);

export const updateCreditCard = async (id, data) => 
    await axiosAdmin.put(`/creditCards/${id}`, data);

export const toggleCreditCardStatus = async (id) => 
    await axiosAdmin.put(`/creditCards/${id}/status`);

export const approveCreditCard = async (id) => 
    await axiosAdmin.put(`/creditCards/${id}/approve`);

export const deleteCreditCard = async (id) => 
    await axiosAdmin.delete(`/creditCards/${id}`);

// ================= PURCHASES =================
export const getPurchases = async (params) =>
    await axiosAdmin.get("/purchases", { params });

export const createPurchase = async (data) =>
    await axiosAdmin.post("/purchases", data);

// ================= CREDIT CARD PAYMENTS =================
export const getCreditCardPayments = async (params) =>
    await axiosAdmin.get("/creditCardPayments", { params });

export const payCreditCard = async (data) =>
    await axiosAdmin.post("/creditCardPayments", data);
// ================= EXTRA FINANCING =================
export const getExtraFinancings = async () =>
    await axiosAdmin.get("/extraFinancings");

export const getExtraFinancingsByCard = async (creditCardId) =>
    await axiosAdmin.get(`/extraFinancings/card/${creditCardId}`);

export const createExtraFinancing = async (data) =>
    await axiosAdmin.post("/extraFinancings", data);

export const getExtraFinancingDetails = async (financingId) =>
    await axiosAdmin.get(`/extraFinancingDetails/${financingId}`);

export const payExtraFinancingInstallment = async (data) =>
    await axiosAdmin.post("/extraFinancingPayments/pay", data);
