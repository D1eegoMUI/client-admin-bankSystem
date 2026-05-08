import React, { useState } from 'react';
import { UserCard } from './UserCard.jsx';
import { UserModal } from './UserModal.jsx';

export const UsersView = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-emerald-900">Directorio de Clientes</h1>
                        <p className="text-emerald-600 font-medium">Gestiona los accesos, roles y verificaciones de Kinal Bank</p>
                    </div>
                    <button 
                        onClick={() => setShowModal(true)}
                        className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all"
                    >
                        + Registrar Nuevo
                    </button>
                </div>

                {/* Resumen Estadístico */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Usuarios', val: '1,240', color: 'emerald' },
                        { label: 'Activos', val: '1,190', color: 'blue' },
                        { label: 'Por Verificar', val: '12', color: 'amber' },
                        { label: 'Inactivos', val: '38', color: 'red' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                            <p className="text-[10px] font-black text-gray-400 uppercase">{stat.label}</p>
                            <p className={`text-xl font-black text-${stat.color}-600`}>{stat.val}</p>
                        </div>
                    ))}
                </div>

                {/* Buscador y Grid */}
                <div className="mb-6">
                    <input type="text" placeholder="Buscar por nombre, DPI o correo..." className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 focus:border-emerald-500 focus:bg-white bg-gray-50/50 outline-none transition-all shadow-inner" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Mapeo de usuarios */}
                    <UserCard user={{
                        UserName: "Rodrigo",
                        UserSurname: "Pérez",
                        UserEmail: "rperez@kinal.edu.gt",
                        UserDPI: "3005 12345 0101",
                        UserRol: "ADMIN",
                        UserStatus: "ACTIVE",
                        isVerified: true
                    }} />
                </div>
            </div>

            {showModal && <UserModal onClose={() => setShowModal(false)} />}
        </div>
    );
};