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
            set({ error: error.response?.data?.message || "Error al cambiar estado", loading: false });
            throw error;
        }
    },

    verifyUser: async (id) => {
        try {
            set({ loading: true, error: null });
            const res = await api.verifyUser(id);
            set({
                users: get().users.map(u => u.uid === id ? { ...u, isVerified: true } : u),
                loading: false
            });
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error al verificar usuario', loading: false });
            throw error;
        }
    },

    changeUserRole: async (id, role) => {
        set({ loading: true });
        try {
            await api.put(`/users/${id}/role`, { UserRol: role });
            set(state => ({
                users: state.users.map(u => u._id === id ? { ...u, UserRol: role } : u),
                loading: false
            }));
        } catch (error) {
            set({ loading: false });
            throw error;
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
                accounts: get().accounts.map(a => a._id === id ? res.data.account : a), loading: false
            });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al cambiar estado de cuenta", loading: false });
            throw error;
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

export const useAccountRequestStore = create((set, get) => ({
    requests: [],
    loading: false,
    processing: false,

    fetchAccountRequests: async (params) => {
        set({ loading: true });
        try {
            const res = await api.getAccountRequests(params);
            set({ requests: res.data.data || [] });
        } finally {
            set({ loading: false });
        }
    },

    approveAccountRequest: async (id) => {
        set({ processing: true });
        try {
            await api.approveAccountRequest(id);
            set({
                requests: get().requests.map((r) =>
                    r._id === id ? { ...r, requestStatus: 'APPROVED' } : r
                ),
            });
        } finally {
            set({ processing: false });
        }
    },

    rejectAccountRequest: async (id, rejectionReason) => {
        set({ processing: true });
        try {
            await api.rejectAccountRequest(id, { reason: rejectionReason });
            set({
                requests: get().requests.map((r) =>
                    r._id === id ? { ...r, requestStatus: 'REJECTED', rejectionReason } : r
                ),
            });
        } finally {
            set({ processing: false });
        }
    },
}));

// ================= LOAN STORE =================
export const useLoanStore = create((set, get) => ({
    loans: [],
    userLoans: [],
    selectedLoan: null,
    selectedLoanDetails: [],   // ← tabla de amortización
    loading: false,
    error: null,

    fetchAllLoans: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getAllLoans();
            set({ loans: res.data.loans, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al cargar préstamos", loading: false });
        }
    },

    fetchMyLoans: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getMyLoans();
            set({ userLoans: res.data.loans, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al cargar tus préstamos", loading: false });
        }
    },

    fetchLoanById: async (id) => {
        try {
            set({ loading: true, error: null, selectedLoan: null });
            const res = await api.getLoanById(id);
            set({ selectedLoan: res.data.loan, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener préstamo", loading: false });
        }
    },

    // ← NUEVO: crear préstamo directo desde sucursal
    createLoan: async (data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.createLoan(data);
            set({ loans: [res.data.loan, ...get().loans], loading: false });
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al crear préstamo", loading: false });
            throw error;
        }
    },

    // ← NUEVO: ver tabla de amortización de un préstamo
    fetchLoanDetails: async (loanId) => {
        try {
            set({ loading: true, error: null, selectedLoanDetails: [] });
            const res = await api.getLoanDetails(loanId);
            set({ selectedLoanDetails: res.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al cargar cuotas", loading: false });
        }
    },
    payLoanInstallment: async (loanId, accountId) => {
        try {
            set({ loading: true, error: null });
            const res = await api.payLoanInstallment({ loanId, accountId });
            set({
                loans: get().loans.map(l =>
                    l._id === loanId
                        ? {
                            ...l,
                            remainingBalance: res.data.saldoRestantePrestamo,
                            status: res.data.loanStatus
                        }
                        : l
                ),
                loading: false
            });
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al pagar cuota", loading: false });
            throw error;
        }
    },
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
export const useCardStore = create((set, get) => ({
    cards: [],
    creditCards: [],
    loading: false,
    error: null,

    getCreditCards: async (params) => {
        try {
            set({ loading: true });
            const res = await api.getCreditCards({ limit: 100, ...params });
            const tagged = res.data.data.map(c => ({ ...c, entityType: 'CREDIT' }));
            set({ creditCards: tagged, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
        }
    },

    getDebitCards: async (params) => {
        try {
            set({ loading: true });
            const res = await api.getCards({ limit: 100, ...params });
            const tagged = res.data.data.map(c => ({ ...c, entityType: 'DEBIT' }));
            set({ cards: tagged, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
        }
    },

    getBothCards: async (params) => {
        try {
            set({ loading: true });
            const [creditRes, debitRes] = await Promise.allSettled([
                api.getCreditCards({ limit: 100, ...params }),
                api.getCards({ limit: 100, ...params }),
            ]);
            const creditCards = creditRes.status === 'fulfilled'
                ? creditRes.value.data.data.map(c => ({ ...c, entityType: 'CREDIT' }))
                : [];
            const debitCards = debitRes.status === 'fulfilled'
                ? debitRes.value.data.data.map(c => ({ ...c, entityType: 'DEBIT' }))
                : [];
            set({ creditCards, cards: debitCards, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
        }
    },

    saveCreditCard: async (data) => {
        try {
            set({ loading: true });
            const res = await api.createCreditCard(data);
            const newCard = { ...res.data.data, entityType: 'CREDIT' };
            set({ creditCards: [newCard, ...get().creditCards], loading: false });
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
            throw error;
        }
    },

    saveDebitCard: async (data) => {
        try {
            set({ loading: true });
            const res = await api.createCard(data);
            const newCard = { ...res.data.data, entityType: 'DEBIT' };
            set({ cards: [newCard, ...get().cards], loading: false });
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
            throw error;
        }
    },

    deleteCard: async (id, type) => {
        try {
            set({ loading: true });
            if (type === 'CREDIT') {
                await api.deleteCreditCard(id);
                set({ creditCards: get().creditCards.filter(c => c._id !== id), loading: false });
            } else {
                await api.deleteCard(id);
                set({ cards: get().cards.filter(c => c._id !== id), loading: false });
            }
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
            throw error;
        }
    },
}));

// ================= PURCHASE STORE =================
export const usePurchaseStore = create((set, get) => ({
    purchases: [],
    loading: false,

    // cardId    = account._id (débito) o creditCard._id (crédito)
    // debitCardId = card._id físico (solo para filtrar débito por tarjeta)
    getPurchases: async (cardId = null, debitCardId = null) => {
        set({ loading: true });
        try {
            const params = {};
            if (cardId) params.cardId = cardId;
            if (debitCardId) params.debitCardId = debitCardId;
            const res = await api.getPurchases(params);
            set({ purchases: res.data.data, loading: false });
        } catch (e) {
            set({ loading: false });
            throw e;
        }
    },

    createPurchase: async (data) => {
        set({ loading: true });
        try {
            const res = await api.createPurchase(data);
            set({ purchases: [res.data.data, ...get().purchases], loading: false });
            return res.data;
        } catch (e) {
            set({ loading: false });
            throw e;
        }
    },
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

// ================= EXTRA FINANCING STORE =================
export const useExtraFinancingStore = create((set, get) => ({
    financings: [],
    details: [],
    loading: false,
    error: null,

    getFinancings: async () => {
        try {
            set({ loading: true });
            const res = await api.getExtraFinancings();
            set({ financings: res.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
        }
    },

    getFinancingsByCard: async (creditCardId) => {
        try {
            set({ loading: true });
            const res = await api.getExtraFinancingsByCard(creditCardId);
            set({ financings: res.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
        }
    },

    createFinancing: async (data) => {
        try {
            set({ loading: true });
            const res = await api.createExtraFinancing(data);
            set({ financings: [res.data.data, ...get().financings], loading: false });
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
            throw error;
        }
    },

    getDetails: async (financingId) => {
        try {
            set({ loading: true });
            const res = await api.getExtraFinancingDetails(financingId);
            set({ details: res.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
        }
    },

    payInstallment: async (data) => {
        try {
            set({ loading: true });
            const res = await api.payExtraFinancingInstallment(data);
            set({ loading: false });
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message, loading: false });
            throw error;
        }
    }
}));
// ================= TRANSACTION STORE =================
export const useTransactionStore = create((set, get) => ({
    transactions: [],
    pagination: { total: 0, page: 1, totalPages: 1 },
    loading: false,
    error: null,

    fetchAllTransactions: async (params) => {
        try {
            set({ loading: true, error: null });
            const res = await api.getAllTransactions(params);
            set({ transactions: res.data.data, pagination: res.data.pagination, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error al cargar transacciones', loading: false });
        }
    },

    createTransaction: async (data) => {      // ← nueva
        try {
            set({ loading: true, error: null });
            const res = await api.createTransaction(data);
            set(state => ({
                transactions: [res.data.data?.transaccion, ...state.transactions].filter(Boolean),
                loading: false
            }));
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error al crear transacción', loading: false });
            throw error;
        }
    },

    revertDeposit: async (id) => {
        try {
            set({ loading: true, error: null });
            const res = await api.revertDeposit(id);
            set(state => ({
                transactions: state.transactions.map(tx =>
                    tx._id === id ? { ...tx, status: 'REVERTED' } : tx
                ),
                loading: false
            }));
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error al revertir', loading: false });
            throw error;
        }
    }
}));
// ================= CARD REQUESTS STORE =================
export const useCardRequestStore = create((set, get) => ({
    requests: [],
    loading: false,
    processing: false,

    fetchCardRequests: async (params) => {
        set({ loading: true });
        try {
            const res = await api.getCardRequests(params);
            set({ requests: res.data.data || [] });
        } finally {
            set({ loading: false });
        }
    },

    approveCardRequest: async (id) => {
        set({ processing: true });
        try {
            await api.approveCardRequest(id);
            set({
                requests: get().requests.map((r) =>
                    r._id === id ? { ...r, status: 'APPROVED' } : r
                ),
            });
        } finally {
            set({ processing: false });
        }
    },

    rejectCardRequest: async (id, rejectionReason) => {
        set({ processing: true });
        try {
            await api.rejectCardRequest(id, { rejectionReason });
            set({
                requests: get().requests.map((r) =>
                    r._id === id ? { ...r, status: 'REJECTED', rejectionReason } : r
                ),
            });
        } finally {
            set({ processing: false });
        }
    },
}));

// ================= CARD STATUS REQUESTS STORE =================
export const useCardStatusRequestStore = create((set, get) => ({
    requests: [],
    loading: false,
    processing: false,

    fetchCardStatusRequests: async (params) => {
        set({ loading: true });
        try {
            const res = await api.getCardStatusRequests(params);
            set({ requests: res.data.data || [] });
        } finally {
            set({ loading: false });
        }
    },

    approveCardStatusRequest: async (id) => {
        set({ processing: true });
        try {
            await api.approveCardStatusRequest(id);
            set({
                requests: get().requests.map((r) =>
                    r._id === id ? { ...r, status: 'APPROVED' } : r
                ),
            });
        } finally {
            set({ processing: false });
        }
    },

    rejectCardStatusRequest: async (id, rejectionReason) => {
        set({ processing: true });
        try {
            await api.rejectCardStatusRequest(id, { rejectionReason });
            set({
                requests: get().requests.map((r) =>
                    r._id === id ? { ...r, status: 'REJECTED', rejectionReason } : r
                ),
            });
        } finally {
            set({ processing: false });
        }
    },
}));
// ================= CREDIT CARD REQUESTS STORE =================
export const useCreditCardRequestStore = create((set, get) => ({
    requests: [],
    loading: false,
    processing: false,

    fetchCreditCardRequests: async (params) => {
        set({ loading: true });
        try {
            const res = await api.getCreditCardRequests(params);
            set({ requests: res.data.data || [] });
        } finally {
            set({ loading: false });
        }
    },

    approveCreditCardRequest: async (id, approvedCreditLimit) => {
        set({ processing: true });
        try {
            await api.approveCreditCardRequest(id, approvedCreditLimit != null ? { approvedCreditLimit } : {});
            set({
                requests: get().requests.map((r) =>
                    r._id === id ? { ...r, status: 'APPROVED' } : r
                ),
            });
        } finally {
            set({ processing: false });
        }
    },

    rejectCreditCardRequest: async (id, rejectionReason) => {
        set({ processing: true });
        try {
            await api.rejectCreditCardRequest(id, { rejectionReason });
            set({
                requests: get().requests.map((r) =>
                    r._id === id ? { ...r, status: 'REJECTED', rejectionReason } : r
                ),
            });
        } finally {
            set({ processing: false });
        }
    },
}));
// ================= EXTRA FINANCING REQUESTS STORE =================
export const useExtraFinancingRequestStore = create((set, get) => ({
    requests: [],
    loading: false,
    processing: false,

    fetchExtraFinancingRequests: async (params) => {
        set({ loading: true });
        try {
            const res = await api.getExtraFinancingRequests(params);
            set({ requests: res.data.data || [] });
        } finally {
            set({ loading: false });
        }
    },

    approveRequest: async (id) => {
        set({ processing: true });
        try {
            await api.approveExtraFinancingRequest(id);
            set({
                requests: get().requests.map((r) =>
                    r._id === id ? { ...r, status: 'APPROVED' } : r
                ),
            });
        } finally {
            set({ processing: false });
        }
    },

    rejectRequest: async (id, rejectionReason) => {
        set({ processing: true });
        try {
            await api.rejectExtraFinancingRequest(id, { rejectionReason });
            set({
                requests: get().requests.map((r) =>
                    r._id === id ? { ...r, status: 'REJECTED', rejectionReason } : r
                ),
            });
        } finally {
            set({ processing: false });
        }
    },
}));