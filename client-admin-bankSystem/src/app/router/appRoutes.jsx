import { Route, Routes, Navigate } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { DashboardPage } from "../layouts/DashboardPage.jsx";
import { AccountsView } from "../../features/Account/components/AccountsView.jsx";

export const AppRoutes = () => {
    return (
        <Routes>
            {/* RUTA PÚBLICA */}
            <Route path="/" element={<AuthPage />} />

            {/* RUTAS DEL DASHBOARD (ANIDADAS) */}
            <Route path="/dashboard" element={<DashboardPage />}>
                {/* Al estar dentro de DashboardPage, estas rutas 
                   se renderizarán donde pusiste el <Outlet /> 
                */}
                <Route path="account" element={<AccountsView />} />
                <Route path="card" element={<h1 className="text-emerald-900 font-bold">Vista de Tarjetas</h1>} />
                <Route path="exchange" element={<h1>Vista de Cambio</h1>} />
                <Route path="favorite" element={<h1>Vista de Favoritos</h1>} />
                <Route path="loan" element={<h1>Vista de Préstamos</h1>} />
                <Route path="loan-application" element={<h1>Solicitud de Préstamo</h1>} />
                <Route path="product" element={<h1>Vista de Productos</h1>} />
                <Route path="transaction" element={<h1>Vista de Transacciones</h1>} />
                <Route path="user" element={<h1>Vista de Usuarios</h1>} />

                {/* Redirección por defecto si entran solo a /dashboard */}
                <Route index element={<Navigate to="account" />} />
            </Route>

            {/* Ruta para manejar errores 404 (Opcional) */}
            <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
    );
}