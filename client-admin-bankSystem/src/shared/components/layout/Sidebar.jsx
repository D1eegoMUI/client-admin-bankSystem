const Sidebar = () => {
    // Actualizamos los ítems para que coincidan con un sistema bancario
    const items = [
        { label: "Cuenta", icon: "👤" },
        { label: "Tarjeta", icon: "💳" },
        { label: "Cambio", icon: "💱" },
        { label: "Favorito", icon: "⭐" },
        { label: "Préstamo", icon: "💰" },
        { label: "Solicitud de Préstamo", icon: "📝" },
        { label: "Product", icon: "📦" },
        { label: "Transaction", icon: "💸" },
        { label: "Usuario", icon: "👥" },
    ];

    return (
        <aside className="w-64 bg-white min-h-[calc(100vh-4rem)] p-4 border-r border-gray-100 shadow-sm">
            <div className="mb-4 px-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Menú Principal
                </p>
            </div>

            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={item.label}>
                        <div className={`
                            group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer
                            ${index === 0
                                ? "bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100" // Estilo para ítem activo
                                : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"     // Estilo hover
                            }
                        `}>
                            <span className="text-lg group-hover:scale-110 transition-transform">
                                {item.icon}
                            </span>
                            <span className="text-sm">
                                {item.label}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Sección de soporte o pie del sidebar */}
            <div className="mt-10 px-4 py-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs font-semibold text-emerald-900">Soporte Kinal</p>
                <p className="text-[10px] text-gray-500 mt-1">¿Necesitas ayuda con la plataforma?</p>
                <button className="mt-3 text-[10px] bg-white border border-gray-200 w-full py-1.5 rounded-lg font-bold text-emerald-700 hover:bg-emerald-700 hover:text-white transition-colors">
                    Contactar
                </button>
            </div>
        </aside>
    );
};

export { Sidebar };