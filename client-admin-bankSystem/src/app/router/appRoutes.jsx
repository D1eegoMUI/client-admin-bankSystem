import { Route, Routes, Navigate } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { DashboardPage } from "../layouts/DashboardPage.jsx";

// Vistas de Administración que creamos
import { AccountsView } from "../../features/Account/components/AccountsView.jsx";
import { CardsView } from "../../features/Card/components/CardsView.jsx";
import { LoansView } from "../../features/Loan/components/LoansView.jsx";
import { LoanApplicationsView } from "../../features/LoanApplication/components/ApplicationView.jsx";
import { ProductsView } from "../../features/Product/components/ProductsView.jsx";
import { TransactionsView } from "../../features/Transaction/components/TransactionsView.jsx";
import { UsersView } from "../../features/User/components/UserView.jsx";
import { ExchangeView } from "../../features/exchange/components/ExchangeView.jsx";
export const AppRoutes = () => {
    return (
        <Routes>
            {/* RUTA PÚBLICA */}
            <Route path="/" element={<AuthPage />} />

            {/* RUTAS DEL DASHBOARD (ANIDADAS) */}
            <Route path="/dashboard" element={<DashboardPage />}>
                {/* Estas sub-rutas se renderizarán en el <Outlet /> de DashboardPage */}
                <Route path="account" element={<AccountsView />} />
                <Route path="card" element={<CardsView />} />
                <Route path="loan" element={<LoansView />} />
                <Route path="loan-application" element={<LoanApplicationsView />} />
                <Route path="product" element={<ProductsView />} />
                <Route path="transaction" element={<TransactionsView />} />
                <Route path="user" element={<UsersView />} />
                <Route path="exchange" element={<ExchangeView />} />
                
                {/* Redirección por defecto si entran solo a /dashboard */}
                <Route index element={<Navigate to="account" />} />
            </Route>

            {/* Ruta para manejar errores 404 (Opcional) */}
            <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
    );
}