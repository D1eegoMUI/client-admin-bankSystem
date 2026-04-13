import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { SupportModal } from "../../../features/Support/components/SupportModal.jsx";

const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // IMPORTANTE: Agregamos la propiedad 'path' a cada objeto
    const items = [
        { label: "Cuenta", icon: "👤", path: "account" },
        { label: "Tarjeta", icon: "💳", path: "card" },
        { label: "Cambio", icon: "💱", path: "exchange" },
        { label: "Favorito", icon: "⭐", path: "favorite" },
        { label: "Préstamo", icon: "💰", path: "loan" },
        { label: "Solicitud de Préstamo", icon: "📝", path: "loan-application" },
        { label: "Product", icon: "📦", path: "product" },
        { label: "Transaction", icon: "💸", path: "transaction" },
        { label: "Usuario", icon: "👥", path: "user" },
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
                                    <span className="text-lg group-hover:scale-110 transition-transform">
                                        {item.icon}
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