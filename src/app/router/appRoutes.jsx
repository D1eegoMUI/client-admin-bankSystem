import { Route, Routes, Navigate } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { DashboardPage } from "../layouts/DashboardPage.jsx";
import { ProtectedRoute } from "../../shared/utils/ProtectedRoute.jsx";

// Vistas de Administración
import { AccountsView } from "../../features/Account/components/AccountsView.jsx";
import { CardsView } from "../../features/Card/components/CardsView.jsx";
import { LoansView } from "../../features/Loan/components/LoansView.jsx";
import { LoanApplicationsView } from "../../features/LoanApplication/components/ApplicationView.jsx";
import { ProductsView } from "../../features/Product/components/ProductsView.jsx";
import { TransactionsView } from "../../features/Transaction/components/TransactionsView.jsx";
import { UsersView } from "../../features/User/components/UserView.jsx";
import { ExchangeAdminView } from "../../features/exchange/components/ExchangeView.jsx";
import { AccountLookupView } from "../../features/CustomerLookup/AccountLookupView.jsx";
import { CreditCardView } from "../../features/CreditCard/components/CreditCardView.jsx";
import { PurchaseView } from "../../features/Purchase/components/PurchaseView.jsx";
import { CardRequestsView } from "../../features/Card/components/CardRequestsView.jsx"
import { AccountRequestsView } from "../../features/Account/components/AccountRequestsView.jsx";

export const AppRoutes = () => {
    return (
        <Routes>
            {/* RUTA PÚBLICA */}
            <Route path="/" element={<AuthPage />} />

            {/* RUTAS DEL DASHBOARD PROTEGIDAS */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            >
                {/* Estas sub-rutas heredan la protección del padre */}
                <Route path="account" element={<AccountsView />} />
                <Route path="card" element={<CardsView />} />
                <Route path="credit-card" element={<CreditCardView />} />
                <Route path="approve-card" element={<CardRequestsView />} />
                <Route path="approve-account" element={<AccountRequestsView />} /> 
                <Route path="loan" element={<LoansView />} />
                <Route path="loan-application" element={<LoanApplicationsView />} />
                <Route path="product" element={<ProductsView />} />
                <Route path="transaction" element={<TransactionsView />} />
                <Route path="user" element={<UsersView />} />
                <Route path="exchange" element={<ExchangeAdminView />} />
                <Route path="buscador" element={<AccountLookupView />} />
                <Route path="purchase" element={<PurchaseView />} />



                <Route index element={<Navigate to="account" />} />
            </Route>

            {/* Manejo de errores 404 */}
            <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
    );
}