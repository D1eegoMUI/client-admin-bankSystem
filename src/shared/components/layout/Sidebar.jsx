import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { SupportModal } from "../../../features/Support/components/SupportModal.jsx";
import AccountIcon from "../../../assets/Icons/user.svg";
import CardIcon from "../../../assets/Icons/credit-card.svg";
import ExchangeIcon from "../../../assets/Icons/exchange.svg";
import FavoriteIcon from "../../../assets/Icons/star.svg";
import LoanIcon from "../../../assets/Icons/Loan.svg";
import AppLoanIcon from "../../../assets/Icons/LoanApp.svg";
import ProductIcon from "../../../assets/Icons/package.svg";
import TransactionIcon from "../../../assets/Icons/transaction.svg";
import UsersIcon from "../../../assets/Icons/user.svg";
import SearchIcon from "../../../assets/Icons/map-pin.svg";


const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate(); // Inicializamos el hook

    const handleLogout = () => {
        navigate("/"); // Redirige a la raíz
    };

    const items = [
        { label: "Buscador", icon: SearchIcon, path: "buscador" },
        { label: "Cuenta", icon: AccountIcon, path: "account" },
        { label: "Tarjeta", icon: CardIcon, path: "card" },
        { label: "Cambio", icon: ExchangeIcon, path: "exchange" },
        { label: "Préstamo", icon: LoanIcon, path: "loan" },
        { label: "Solicitud de Préstamo", icon: AppLoanIcon, path: "loan-application" },
        { label: "Product", icon: ProductIcon, path: "product" },
        { label: "Transaction", icon: TransactionIcon, path: "transaction" },
        { label: "Usuario", icon: UsersIcon, path: "user" },
    ];

    return (
        <>
            <aside className="w-64 bg-white sticky top-16 self-start h-[calc(100vh-4rem)] p-4 flex flex-col justify-between border-r border-gray-100 shadow-sm overflow-y-auto">
                <div>
                    <div className="mb-4 px-4">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Menú Principal
                        </p>
                    </div>

                    <ul className="space-y-2">
                        {items.map((item) => (
                            <li key={item.label}>
                                <NavLink
                                    to={`/dashboard/${item.path}`}
                                    className={({ isActive }) => `
                                        group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                                        ${isActive
                                            ? "bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100"
                                            : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}
                                    `}
                                >
                                    <span className="group-hover:scale-110 transition-transform flex items-center">
                                        <img
                                            src={item.icon}
                                            alt={item.label}
                                            className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100"
                                            style={{ filter: 'grayscale(100%)' }}
                                        />
                                    </span>
                                    <span className="text-sm">
                                        {item.label}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* SECCIÓN INFERIOR: Soporte + Logout */}
                <div className="space-y-3">
                    {/* Caja de Soporte */}
                    <div className="px-4 py-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-xs font-semibold text-emerald-900">Soporte Kinal</p>
                        <p className="text-[10px] text-gray-500 mt-1">¿Necesitas ayuda?</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-3 text-[10px] bg-white border border-gray-200 w-full py-2 rounded-lg font-bold text-emerald-700 hover:bg-emerald-700 hover:text-white transition-all active:scale-95"
                        >
                            Contactar
                        </button>
                    </div>

                    {/* BOTÓN DE CERRAR SESIÓN */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold text-sm transition-all group"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            <SupportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export { Sidebar };