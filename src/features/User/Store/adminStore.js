import { create } from "zustand";
import * as api from "../../../shared/Api/admin";

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

// ================= ACCOUNTS =================
// ================= ACCOUNTS STORE =================
export const useAccountStore = create((set, get) => ({
    accounts: [],
    accountDetails: null,
    loading: false,
    error: null,

    getAccounts: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getAccounts();
            
            set({
                accounts: res.data.accounts, 
                loading: false
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener cuentas",
                loading: false
            });
        }
    },

    createAccount: async (data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.createAccount(data);
            set({
                accounts: [res.data.account, ...get().accounts], // Según tu controlador res.status(201).json({ account })
                loading: false
            });
            return res.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al crear cuenta",
                loading: false
            });
            throw error;
        }
    },

    toggleAccountStatus: async (id) => {
        try {
            set({ loading: true, error: null });
            const res = await api.changeAccountStatus(id);
            set({
                accounts: get().accounts.map(a => a._id === id ? res.data.data : a),
                loading: false
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al cambiar estado de cuenta",
                loading: false
            });
        }
    },

    getAccountDetails: async (id) => {
        try {
            set({ loading: true, error: null, accountDetails: null });
            const res = await api.getAccountDetails(id);
            set({
                accountDetails: res.data.data,
                loading: false
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener detalles",
                loading: false
            });
        }
    },

    getRanking: async (params) => {
        try {
            set({ loading: true, error: null });
            const res = await api.getAccountRanking(params);
            set({
                accounts: res.data.data,
                loading: false
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener ranking",
                loading: false
            });
        }
    }
}));

// ================= LOAN STORE =================
export const useLoanStore = create((set) => ({
    loans: [],          // Vista Admin
    userLoans: [],      // Vista Cliente
    selectedLoan: null, // Detalle
    loading: false,
    error: null,

    // Obtener todos los préstamos (Admin)
    fetchAllLoans: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getAllLoans();
            set({ 
                loans: res.data.loans, 
                loading: false 
            });
        } catch (error) {
            set({ 
                error: error.response?.data?.message || "Error al cargar préstamos", 
                loading: false 
            });
        }
    },

    // Obtener préstamos del usuario logueado (Cliente)
    fetchMyLoans: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getMyLoans();
            set({ 
                userLoans: res.data.loans, 
                loading: false 
            });
        } catch (error) {
            set({ 
                error: error.response?.data?.message || "Error al cargar tus préstamos", 
                loading: false 
            });
        }
    },

    // Ver detalle de un préstamo específico
    fetchLoanById: async (id) => {
        try {
            set({ loading: true, error: null, selectedLoan: null });
            const res = await api.getLoanById(id);
            set({ 
                selectedLoan: res.data.loan, 
                loading: false 
            });
        } catch (error) {
            set({ 
                error: error.response?.data?.message || "Error al obtener detalle del préstamo", 
                loading: false 
            });
        }
    }
}));

// ================= EXCHANGE STORE =================
export const useExchangeStore = create((set) => ({
    lastConversion: null, // Guardará { from, to, originalAmount, convertedAmount, rate }
    loading: false,
    error: null,

    convert: async (amount, from, to) => {
        try {
            set({ loading: true, error: null });
            const res = await api.convertCurrency({ amount, from, to });
            
            set({ 
                lastConversion: res.data.conversion, 
                loading: false 
            });
            
            return res.data.conversion;
        } catch (error) {
            set({ 
                error: error.response?.data?.message || "Error al realizar la conversión", 
                loading: false 
            });
            throw error;
        }
    },

    clearConversion: () => set({ lastConversion: null, error: null })
}));

// ================= LOAN APPLICATION STORE =================
export const useLoanAppStore = create((set, get) => ({
    applications: [],
    loading: false,
    error: null,

    // Listar todas (Admin)
    fetchApplications: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getLoanApplications();
            set({ applications: res.data.applications, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al cargar solicitudes", loading: false });
        }
    },

    // Crear (Cliente)
    saveApplication: async (data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.createLoanApplication(data);
            set({ applications: [res.data.application, ...get().applications], loading: false });
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al enviar solicitud", loading: false });
            throw error;
        }
    },

    // Acciones de Estado (Aprobar/Rechazar/Cancelar)
    processApplication: async (id, action) => {
        try {
            set({ loading: true, error: null });
            let res;
            
            if (action === 'APPROVE') res = await api.approveLoanApplication(id);
            if (action === 'REJECT') res = await api.rejectLoanApplication(id);
            if (action === 'CANCEL') res = await api.cancelLoanApplication(id);

            // Actualizamos la lista local con el nuevo status
            set({
                applications: get().applications.map(app => 
                    app._id === id ? { ...app, status: action === 'APPROVE' ? 'APPROVED' : action === 'REJECT' ? 'REJECTED' : 'CANCELLED' } : app
                ),
                loading: false
            });
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al procesar solicitud", loading: false });
            throw error;
        }
    }
}));

// ================= PRODUCT STORE =================
export const useProductStore = create((set, get) => ({
    products: [],
    pagination: {
        total: 0,
        page: 1,
        limit: 10
    },
    loading: false,
    error: null,

    getProducts: async (params) => {
        try {
            set({ loading: true, error: null });
            const res = await api.getProducts(params);
            set({
                products: res.data.data, // Según tu controlador res.status(200).json({ data: products })
                pagination: res.data.pagination,
                loading: false
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener el catálogo",
                loading: false
            });
        }
    },

    createProduct: async (data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.createProduct(data);
            set({
                products: [res.data.data, ...get().products],
                loading: false
            });
            return res.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al crear producto",
                loading: false
            });
            throw error;
        }
    },

    updateProduct: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.updateProduct(id, data);
            set({
                products: get().products.map(p => p._id === id ? res.data.data : p),
                loading: false
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al actualizar producto",
                loading: false
            });
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            set({ loading: true, error: null });
            const res = await api.deleteProduct(id);
            // Al ser un soft delete, actualizamos el objeto en la lista (isActive: false)
            set({
                products: get().products.map(p => p._id === id ? res.data.data : p),
                loading: false
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al eliminar producto",
                loading: false
            });
        }
    }
}));

// ================= CARD STORE =================
// adminStore.js
export const useCardStore = create((set, get) => ({
    cards: [], // Lista unificada para la tabla general
    loading: false,
    error: null,

    // --- ACCIONES PARA CRÉDITO ---
    getCreditCards: async (params) => {
        try {
            set({ loading: true });
            const res = await api.getCreditCards(params);
            // Marcamos como CREDIT para el Frontend
            const cardsWithTag = res.data.data.map(c => ({ ...c, entityType: 'CREDIT' }));
            set({ cards: cardsWithTag, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
        }
    },

    saveCreditCard: async (data) => {
        try {
            set({ loading: true });
            const res = await api.createCreditCard(data); // Endpoint /creditCards
            const newCard = { ...res.data.data, entityType: 'CREDIT' };
            set({ cards: [newCard, ...get().cards], loading: false });
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
            throw error;
        }
    },

    // --- ACCIONES PARA DÉBITO (CARD) ---
    getDebitCards: async (params) => {
        try {
            set({ loading: true });
            const res = await api.getCards(params);
            const cardsWithTag = res.data.data.map(c => ({ ...c, entityType: 'DEBIT' }));
            set({ cards: cardsWithTag, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
        }
    },

    saveDebitCard: async (data) => {
        try {
            set({ loading: true });
            const res = await api.createCard(data); // Endpoint /cards
            const newCard = { ...res.data.data, entityType: 'DEBIT' };
            set({ cards: [newCard, ...get().cards], loading: false });
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
            throw error;
        }
    },

    // --- ACCIONES COMPARTIDAS (Eliminar/Estado) ---
    deleteCard: async (id, type) => {
        try {
            set({ loading: true });
            type === 'CREDIT' ? await api.deleteCreditCard(id) : await api.deleteCard(id);
            set({ cards: get().cards.filter(c => (c._id || c.uid) !== id), loading: false });
        } catch (error) {
            set({ error: "Error al eliminar", loading: false });
        }
    }
}));

// ================= PURCHASE STORE =================
export const usePurchaseStore = create((set, get) => ({
    purchases: [],
    loading: false,
    error: null,

    getPurchases: async (cardId = null) => {
        try {
            set({ loading: true });
            const res = await api.getPurchases(cardId ? { cardId } : {});
            set({ purchases: res.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
        }
    },

    createPurchase: async (data) => {
        try {
            set({ loading: true });
            const res = await api.createPurchase(data);
            set({ purchases: [res.data.data, ...get().purchases], loading: false });
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
            throw error;
        }
    }
}));

// ================= CREDIT CARD PAYMENT STORE =================
export const useCreditCardPaymentStore = create((set, get) => ({
    payments: [],
    loading: false,
    error: null,

    getPayments: async (creditCardId = null) => {
        try {
            set({ loading: true });
            const res = await api.getCreditCardPayments(creditCardId ? { creditCardId } : {});
            set({ payments: res.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
        }
    },

    payCard: async (data) => {
        try {
            set({ loading: true });
            const res = await api.payCreditCard(data);
            set({ loading: false });
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
            throw error;
        }
    }
}));