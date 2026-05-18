import React, { useState, useEffect } from 'react';
import { UserCard } from './UserCard.jsx';
import { UserModal } from './UserModal.jsx';
import { useUserStore } from '../Store/adminStore.js';
import { Spinner } from '../../auth/components/Spinner.jsx';
import { UserVerifyModal } from './UserVerifyModal.jsx';
import { showSuccess, showError } from '../../../shared/utils/toast.js';
import { Search } from 'lucide-react';

export const UsersView = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [userToVerify, setUserToVerify] = useState(null);

    // Extraemos todo directamente del store de Zustand
    const { users, loading, getUsers, toggleUserStatus } = useUserStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    // Lógica de apertura de Modal
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleAddUser = () => {
        setSelectedUser(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setShowModal(false);
        getUsers();
    };

    const handleToggleStatus = async (uid, currentStatus) => {
        try {
            await toggleUserStatus(uid);
            showSuccess(currentStatus === 'ACTIVE' ? 'Usuario desactivado' : 'Usuario activado');
        } catch (error) {
            showError(error.response?.data?.message || 'Error al cambiar estado');
        }
    };

    // Filtrado en tiempo real
    const filteredUsers = users.filter(user =>
        user.UserName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.UserSurname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.UserDPI?.includes(searchTerm) ||
        user.UserEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Cálculos para el Resumen Estadístico
    const stats = [
        { label: 'Total Usuarios', val: users.length, color: 'emerald' },
        { label: 'Activos', val: users.filter(u => u.UserStatus === 'ACTIVE').length, color: 'blue' },
        { label: 'Por Verificar', val: users.filter(u => !u.isVerified).length, color: 'amber' },
        { label: 'Inactivos', val: users.filter(u => u.UserStatus === 'INACTIVE').length, color: 'red' },
    ];

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-emerald-900">Directorio de Clientes</h1>
                        <p className="text-emerald-600 font-medium">Gestiona los accesos, roles y verificaciones de Kinal Bank</p>
                    </div>
                    <button
                        onClick={handleAddUser}
                        className="w-full md:w-auto bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all"
                    >
                        + Registrar Nuevo
                    </button>
                </div>

                {/* Resumen Estadístico Dinámico */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                            <p className="text-[10px] font-black text-gray-400 uppercase">{stat.label}</p>
                            <p className={`text-xl font-black text-${stat.color}-600`}>{stat.val}</p>
                        </div>
                    ))}
                </div>

                {/* Buscador */}
                <div className="mb-6 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por nombre, DPI o correo..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-transparent focus:border-emerald-400 rounded-xl outline-none text-sm transition-all"
                    />
                </div>

                {/* Grid de Usuarios con Loading State */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Spinner />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <UserCard
                                    key={user.uid}
                                    user={user}
                                    onEdit={handleEditUser}
                                    onToggleStatus={() => handleToggleStatus(user.uid, user.UserStatus)}
                                    onVerify={() => setUserToVerify(user)}   // ← nuevo
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-400 font-medium">
                                No se encontraron usuarios que coincidan con la búsqueda.
                            </div>
                        )}
                    </div>
                )}
            </div>

            <UserModal
                isOpen={showModal}
                onClose={handleCloseModal}
                user={selectedUser}
            />
            <UserVerifyModal user={userToVerify} onClose={() => setUserToVerify(null)} />
        </div>
    );
};