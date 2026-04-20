import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { SupportModal } from "../../../features/Support/components/SupportModal.jsx";
import AccountIcon from "../../../assets/Icons/User.svg";
import CardIcon from "../../../assets/Icons/credit-card.svg";
import ExchangeIcon from "../../../assets/Icons/exchange.svg";
import FavoriteIcon from "../../../assets/Icons/star.svg";
import LoanIcon from "../../../assets/Icons/Loan.svg";
import AppLoanIcon from "../../../assets/Icons/LoanApp.svg"
import ProductIcon from "../../../assets/Icons/package.svg"
import TransactionIcon from "../../../assets/Icons/transaction.svg"
import UsersIcon from "../../../assets/Icons/users.svg"


const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // IMPORTANTE: Agregamos la propiedad 'path' a cada objeto
    const items = [
        { label: "Cuenta", icon: AccountIcon, path: "account" },
        { label: "Tarjeta", icon: CardIcon, path: "card" },
        { label: "Cambio", icon: ExchangeIcon, path: "exchange" },
        { label: "Favorito", icon: FavoriteIcon, path: "favorite" },
        { label: "Préstamo", icon: LoanIcon, path: "loan" },
        { label: "Solicitud de Préstamo", icon: AppLoanIcon, path: "loan-application" },
        { label: "Product", icon: ProductIcon, path: "product" },
        { label: "Transaction", icon: TransactionIcon, path: "transaction" },
        { label: "Usuario", icon: UsersIcon, path: "user" },
    ];

    return (
        <>
            <aside className="w-64 bg-white min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between border-r border-gray-100 shadow-sm">
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
                                    to={`/dashboard/${item.path}`} // Ahora item.path sí existe
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
                                            style={{ filter: 'grayscale(100%)' }} // Opcional: para que se vean sobrios
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

                <div className="mt-10 px-4 py-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs font-semibold text-emerald-900">Soporte Kinal</p>
                    <p className="text-[10px] text-gray-500 mt-1">¿Necesitas ayuda?</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-3 text-[10px] bg-white border border-gray-200 w-full py-2 rounded-lg font-bold text-emerald-700 hover:bg-emerald-700 hover:text-white transition-all active:scale-95"
                    >
                        Contactar
                    </button>
                </div>
            </aside>

            <SupportModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export { Sidebar };