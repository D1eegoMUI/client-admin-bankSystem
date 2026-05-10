import { useEffect, useState } from 'react';
import { useAccountStore } from "../../User/Store/adminStore";// Ajusta la ruta si es necesario
import { AccountDetailModal } from './AccountDetailModal.jsx';

export const AccountList = ({ onAddClick }) => {
    const { accounts, getAccounts, toggleAccountStatus, deleteAccount, loading } = useAccountStore();
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        getAccounts();
    }, []);

    if (loading) return <div className="p-10 text-center font-bold text-emerald-900">Cargando cuentas...</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-emerald-900 tracking-tight">
                        Cuentas <span className="text-emerald-600 font-light">Bancarias</span>
                    </h1>
                    <p className="text-gray-500">Gestión de activos y productos financieros</p>
                </div>
                <button
                    onClick={onAddClick}
                    className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl text-white font-bold transition-all shadow-lg shadow-emerald-200 flex items-center gap-2"
                >
                    + Nueva Cuenta
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accounts.map((account) => (
                    <div key={account._id} className="bg-white rounded-2xl shadow-sm border border-emerald-50 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 overflow-hidden group">
                        <div className={`h-2 w-full transition-all group-hover:h-3 ${account.status ? 'bg-emerald-500' : 'bg-red-400'}`} />
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest">Número de Cuenta</h3>
                                    <p className="text-xl font-mono font-bold text-emerald-900">{account.accountNumber}</p>
                                </div>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-lg border border-emerald-100">
                                    {account.accountType}
                                </span>
                            </div>
                            <div className="mb-6">
                                <p className="text-gray-400 text-xs">Saldo Disponible</p>
                                <h2 className="text-3xl font-bold text-emerald-900">
                                    <span className="text-emerald-500 mr-1 text-xl">{account.currency}</span>
                                    {account.balance?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    👤 {account.user?.UserName || account.user || 'N/A'}
                                </span>
                                <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${account.status ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                                    ● {account.status ? 'Activa' : 'Inactiva'}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedAccount(account);
                                        setShowDetailModal(true);
                                    }}
                                    className="py-2.5 bg-gray-50 hover:bg-emerald-50 text-emerald-900 text-sm font-bold rounded-xl transition-colors border border-gray-100"
                                >
                                    Ver Detalle
                                </button>
                                <button
                                    type="button"
                                    onClick={() => deleteAccount(account._id)}
                                    className="py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold rounded-xl transition-colors border border-red-100"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {showDetailModal && selectedAccount && (
                <AccountDetailModal
                    account={selectedAccount}
                    onClose={() => setShowDetailModal(false)}
                />
            )}
        </div>
    );
};