import React, { useState } from 'react';

export const FavoritesView = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="p-8 max-w-5xl mx-auto">
            {/* Cabecera con diseño Kinal Bank */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-emerald-900 tracking-tight">Mis Favoritos</h1>
                    <p className="text-emerald-600">Contactos frecuentes para transferencias</p>
                </div>
                
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full md:w-auto bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                >
                    <span>+</span> Nuevo Contacto
                </button>
            </div>

            {/* BARRA DE BÚSQUEDA */}
            <div className="mb-6 relative">
                <input 
                    type="text"
                    placeholder="Buscar por alias o número de cuenta..."
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 outline-none transition-all shadow-sm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
            </div>

            {/* LISTA DE FAVORITOS (GRID DE 2 COLUMNAS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mapeo de datos (Ejemplo) */}
                <FavoriteCard favorite={{ alias: "Mamá", accountNumber: "30495811" }} />
                <FavoriteCard favorite={{ alias: "Pago Local", accountNumber: "99283100" }} />
                <FavoriteCard favorite={{ alias: "Internet Casa", accountNumber: "11223344" }} />
            </div>

            {/* Estado vacío (Si no hay resultados) */}
            {/* <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
                <p className="text-gray-400">No se encontraron favoritos</p>
            </div> */}

            {isModalOpen && <FavoriteModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};