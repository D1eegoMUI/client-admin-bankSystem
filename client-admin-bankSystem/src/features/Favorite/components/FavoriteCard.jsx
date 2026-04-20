export const FavoriteCard = ({ favorite }) => {
    // Generar un color de fondo basado en el alias para el avatar
    const initial = favorite.alias?.charAt(0).toUpperCase() || '?';

    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-4">
                {/* Avatar Circular */}
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-lg border-2 border-emerald-50 shadow-inner">
                    {initial}
                </div>

                <div>
                    <h3 className="font-bold text-emerald-900 group-hover:text-emerald-600 transition-colors">
                        {favorite.alias}
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">
                        Cuenta: {favorite.accountNumber || '****-****'}
                    </p>
                </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="flex gap-2">
                <button className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-600 transition-colors" title="Transferir ahora">
                    💸
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors" title="Eliminar">
                    🗑️
                </button>
            </div>
        </div>
    );
};