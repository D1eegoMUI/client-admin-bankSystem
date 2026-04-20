import { Route, Routes, Navigate } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { DashboardPage } from "../layouts/DashboardPage.jsx";

// Vistas de Administración que creamos
import { AccountsView } from "../../features/Account/components/AccountsView.jsx";
import { CardsView } from "../../features/Card/components/CardsView.jsx";
import { FavoritesView } from "../../features/Favorite/components/FavoritesView.jsx";
import { LoansView } from "../../features/Loan/components/LoansView.jsx";
import { LoanApplicationsView } from "../../features/LoanApplication/components/LoanApplicationsView.jsx";
import { ProductsView } from "../../features/Product/components/ProductsView.jsx";
import { TransactionsView } from "../../features/Transaction/components/TransactionsView.jsx";
import { UsersView } from "../../features/User/components/UsersView.jsx";
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
                <Route path="favorite" element={<FavoritesView />} />
                <Route path="loan" element={<LoansView />} />
                <Route path="loan-application" element={<LoanApplicationsView />} />
                <Route path="product" element={<ProductsView />} />
                <Route path="transaction" element={<TransactionsView />} />
                <Route path="user" element={<UsersView />} />

                {/* Placeholder para Exchange si aún no tienes el componente */}
                <Route path="exchange" element={<div className="p-8 text-emerald-900 font-bold text-2xl">Vista de Cambio de Divisas (Próximamente)</div>} />
                {/* Redirección por defecto si entran solo a /dashboard */}
                <Route index element={<Navigate to="account" />} />
            </Route>

            {/* Ruta para manejar errores 404 (Opcional) */}
            <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
    );
}