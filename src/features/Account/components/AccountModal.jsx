import React, { useEffect, useState } from 'react';
import { useAccountStore, useUserStore } from "../../User/Store/adminStore";
import { showSuccess, showError } from "../../../shared/utils/toast"; // Ajusta la ruta si es necesario
import { SearchableSelect } from "../../../shared/components/ui/SearchableSelect";

const localUsersFallback = [
    {
        _id: "local-user-1",
        UserName: "Local",
        UserSurname: "Cliente",
        UserEmail: "cliente@local.test",
    },
    {
        _id: "local-user-2",
        UserName: "Prueba",
        UserSurname: "Usuario",
        UserEmail: "prueba@local.test",
    },
];

export const AccountModal = ({ onClose }) => {
    const { createAccount } = useAccountStore();
    const { users, getUsers, loading: loadingUsers } = useUserStore();
    const [formData, setFormData] = useState({
        accountType: 'AHORRO',
        currency: 'GTQ',
        bank: 'Banco Kinal',
        balance: 0,
        user: '' // ID del usuario seleccionado
    });

    useEffect(() => {
        getUsers();
    }, []);

    const availableUsers = users.length > 0 ? users : localUsersFallback;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAccount(formData);
            showSuccess("Cuenta bancaria creada con éxito");
            onClose();
        } catch (err) {
            showError(err.response?.data?.message || "Error al crear la cuenta");
        }
    };

    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-emerald-100">
                <div className="p-6 text-white sticky top-0 z-10" style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}>
                    <h2 className="text-2xl font-bold tracking-tight">Nueva Cuenta Bancaria</h2>
                    <p className="text-emerald-100 text-sm opacity-90">Registra una cuenta para los servicios financieros de Kinal Bank</p>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Número de Cuenta</label>
                            <input
                                type="text"
                                disabled
                                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-100 text-gray-400 outline-none"
                                placeholder="Se generará automáticamente"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Tipo de Cuenta</label>
                            <select
                                value={formData.accountType}
                                onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all outline-none"
                            >
                                <option value="AHORRO">Ahorro</option>
                                <option value="MONETARIA">Monetaria</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Divisa</label>
                            <select
                                value={formData.currency}
                                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all outline-none"
                            >
                                <option value="GTQ">Quetzal (GTQ)</option>
                                <option value="USD">Dólar (USD)</option>
                                <option value="EUR">Euro (EUR)</option>
                                <option value="MXN">Peso (MXN)</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Saldo Inicial</label>
                            <input
                                type="number"
                                value={formData.balance}
                                onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })}
                                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all outline-none font-mono"
                                placeholder="0.00"
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Propietario</label>
                            {loadingUsers ? (
                                <div className="px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-400 text-sm">
                                    Cargando usuarios...
                                </div>
                            ) : (
                                <SearchableSelect
                                    options={users.map(u => ({
                                        value: u.uid || u._id || '',
                                        label: `${u.UserName} ${u.UserSurname} — ${u.UserEmail}`
                                    }))}
                                    value={formData.user}
                                    onChange={(val) => setFormData({ ...formData, user: val })}
                                    placeholder="Buscar usuario..."
                                />
                            )}
                            {availableUsers.length === 0 && !loadingUsers && (
                                <p className="mt-2 text-xs text-gray-500">No hay usuarios disponibles.</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl text-gray-500 font-semibold hover:bg-gray-100 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" className="px-8 py-2.5 rounded-xl bg-emerald-600 text-white font-bold shadow-lg hover:bg-emerald-700 transition-all">
                            Abrir Cuenta
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};