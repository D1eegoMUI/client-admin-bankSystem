import { useEffect, useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { useTransactionStore } from '../../User/Store/adminStore';
import { TransactionTable } from './TransactionTable';
import { TransactionModal } from './TransactionModal';

const TYPE_OPTIONS = ['TODOS', 'DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'SERVICE_PAYMENT', 'LOAN_PAYMENT'];
const STATUS_OPTIONS = ['TODOS', 'COMPLETED', 'FAILED', 'REVERTED'];

export const TransactionsView = () => {
    const { transactions, pagination, fetchAllTransactions, revertDeposit, loading } = useTransactionStore();
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('TODOS');
    const [filterStatus, setFilterStatus] = useState('TODOS');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchAllTransactions();
    }, []);

    const filtered = useMemo(() => {
        const s = search.toLowerCase();
        return transactions.filter(tx => {
            const matchSearch =
                tx._id.toLowerCase().includes(s) ||
                (tx.originAccount?.accountNumber || '').includes(s) ||
                (tx.destinationAccount?.accountNumber || '').includes(s) ||
                (tx.description || '').toLowerCase().includes(s);
            const matchType = filterType === 'TODOS' || tx.type === filterType;
            const matchStatus = filterStatus === 'TODOS' || tx.status === filterStatus;
            return matchSearch && matchType && matchStatus;
        });
    }, [transactions, search, filterType, filterStatus]);

    const totalVolume = useMemo(() =>
        filtered.reduce((acc, tx) => acc + (tx.amountInGTQ || 0), 0), [filtered]
    );

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">

            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black text-emerald-950 tracking-tighter italic">
                        Monitor Global <span className="text-emerald-500">Transaccional</span>
                    </h1>
                    <p className="text-emerald-600 font-medium mt-1">Supervisión de toda la red bancaria</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-sm min-w-[200px]">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Volumen filtrado</p>
                        <p className="text-2xl font-black text-emerald-700">
                            Q {totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-[10px] text-gray-400">
                            {filtered.length} de {transactions.length} transacciones
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-emerald-200 transition-all"
                    >
                        <Plus size={16} /> Nueva Transacción
                    </button>
                </div>
            </div>

            {/* Barra de filtros */}
            <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-emerald-50 flex flex-wrap gap-3 items-center">
                <div className="flex-1 min-w-full md:min-w-[260px] relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="ID, No. cuenta, descripción..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 border-transparent focus:border-emerald-400 rounded-xl outline-none text-sm transition-all"
                    />
                </div>

                {/* Filtro por tipo */}
                <div className="flex flex-wrap gap-1.5">
                    {TYPE_OPTIONS.map(opt => (
                        <button
                            key={opt}
                            onClick={() => setFilterType(opt)}
                            className={`px-3 py-2 rounded-xl text-[10px] font-black border transition-all ${filterType === opt
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-emerald-300'
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                {/* Filtro por estado */}
                <div className="flex gap-1.5">
                    {STATUS_OPTIONS.map(opt => (
                        <button
                            key={opt}
                            onClick={() => setFilterStatus(opt)}
                            className={`px-3 py-2 rounded-xl text-[10px] font-black border transition-all ${filterStatus === opt
                                    ? opt === 'COMPLETED' ? 'bg-emerald-500 text-white border-emerald-500'
                                        : opt === 'FAILED' ? 'bg-red-400 text-white border-red-400'
                                            : opt === 'REVERTED' ? 'bg-yellow-400 text-white border-yellow-400'
                                                : 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-emerald-300'
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tabla */}
            {loading ? (
                <div className="text-center py-20 text-emerald-700 font-bold">Cargando transacciones...</div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20 text-gray-400 font-medium">
                    No hay transacciones con los filtros aplicados.
                </div>
            ) : (
                <TransactionTable
                    transactions={filtered}
                    onRevert={revertDeposit}
                />
            )}

            {/* Modal */}
            {showModal && (
                <TransactionModal
                    onClose={() => {
                        setShowModal(false);
                        fetchAllTransactions();
                    }}
                />
            )}
        </div>
    );
};