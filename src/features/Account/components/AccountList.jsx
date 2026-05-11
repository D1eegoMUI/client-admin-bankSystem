import { useEffect, useState, useMemo } from 'react';
import { useAccountStore } from "../../User/Store/adminStore";
import { AccountDetailModal } from './AccountDetailModal.jsx';

export const AccountList = ({ onAddClick }) => {
    const { accounts, getAccounts, toggleAccountStatus, loading } = useAccountStore();
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('TODAS');   // TODAS | AHORRO | MONETARIA
    const [filterStatus, setFilterStatus] = useState('TODAS'); // TODAS | ACTIVA | INACTIVA

    useEffect(() => {
        getAccounts();
    }, []);

    const filteredAccounts = useMemo(() => {
        return accounts.filter((account) => {
            const searchLower = search.toLowerCase();
            const matchesSearch =
                account.accountNumber.includes(search) ||
                (account.user?.UserName || '').toLowerCase().includes(searchLower) ||
                (account.currency || '').toLowerCase().includes(searchLower);

            const matchesType =
                filterType === 'TODAS' || account.accountType === filterType;

            const matchesStatus =
                filterStatus === 'TODAS' ||
                (filterStatus === 'ACTIVA' && account.status) ||
                (filterStatus === 'INACTIVA' && !account.status);

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [accounts, search, filterType, filterStatus]);

    if (loading) return <div className="p-10 text-center font-bold text-emerald-900">Cargando cuentas...</div>;

    const filterTypeOptions = ['TODAS', 'AHORRO', 'MONETARIA'];
    const filterStatusOptions = ['TODAS', 'ACTIVA', 'INACTIVA'];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6">
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

            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-3 mb-8">
                {/* Barra de búsqueda */}
                <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar por número, usuario o moneda..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    />
                </div>

                {/* Filtro por tipo */}
                <div className="flex gap-2">
                    {filterTypeOptions.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => setFilterType(opt)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                                filterType === opt
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                {/* Filtro por estado */}
                <div className="flex gap-2">
                    {filterStatusOptions.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => setFilterStatus(opt)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                                filterStatus === opt
                                    ? opt === 'ACTIVA'
                                        ? 'bg-emerald-500 text-white border-emerald-500'
                                        : opt === 'INACTIVA'
                                            ? 'bg-red-400 text-white border-red-400'
                                            : 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contador de resultados */}
            <p className="text-xs text-gray-400 mb-4">
                Mostrando {filteredAccounts.length} de {accounts.length} cuentas
            </p>

            {/* Grid de cuentas */}
            {filteredAccounts.length === 0 ? (
                <div className="text-center py-20 text-gray-400 font-medium">
                    No se encontraron cuentas con los filtros aplicados.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAccounts.map((account) => (
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
                                        onClick={() => toggleAccountStatus(account._id)}
                                        className="py-2.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 text-sm font-bold rounded-xl transition-colors border border-yellow-100"
                                    >
                                        {account.status ? 'Desactivar' : 'Activar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showDetailModal && selectedAccount && (
                <AccountDetailModal
                    account={selectedAccount}
                    onClose={() => setShowDetailModal(false)}
                />
            )}
        </div>
    );
};