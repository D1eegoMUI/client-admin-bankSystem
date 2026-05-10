import React, { useEffect, useState } from 'react';
import { LoanCard } from './LoanCard.jsx';
import { LoanModal } from './LoanModal.jsx';
import { useLoanStore } from '../../User/Store/adminStore';
import { Search, Wallet, AlertCircle, CheckCircle2, Plus } from 'lucide-react';

export const LoansView = () => {
    const { loans, fetchAllLoans, loading } = useLoanStore();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => { fetchAllLoans(); }, []);

    const filtered = loans.filter(loan => {
        const matchesStatus = statusFilter === 'ALL' || loan.status === statusFilter;
        const name = `${loan.borrower?.UserName ?? ''} ${loan.borrower?.UserSurname ?? ''}`.toLowerCase();
        const matchesSearch = name.includes(search.toLowerCase()) || loan._id.includes(search);
        return matchesStatus && matchesSearch;
    });

    const totalActive   = loans.filter(l => l.status === 'ACTIVE').reduce((s, l) => s + l.remainingBalance, 0);
    const totalDefaulted = loans.filter(l => l.status === 'DEFAULTED').reduce((s, l) => s + l.remainingBalance, 0);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            {showModal && <LoanModal onClose={() => setShowModal(false)} />}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-emerald-900 rounded-[2rem] p-6 text-white shadow-xl shadow-emerald-900/20 col-span-1 md:col-span-2">
                    <div className="flex items-center gap-3 opacity-70 mb-2">
                        <Wallet size={20} />
                        <span className="text-sm font-bold uppercase tracking-wider">Cartera Total Activa</span>
                    </div>
                    <h2 className="text-4xl font-black">Q{totalActive.toLocaleString('es-GT', { minimumFractionDigits: 2 })}</h2>
                </div>

                <div className="bg-white rounded-[2rem] p-6 border border-red-100 shadow-sm flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-red-500 mb-1">
                        <AlertCircle size={18} />
                        <span className="text-[10px] font-black uppercase">En Mora</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">Q{totalDefaulted.toLocaleString('es-GT', { minimumFractionDigits: 2 })}</h2>
                </div>

                <div className="bg-white rounded-[2rem] p-6 border border-emerald-100 shadow-sm flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-emerald-500 mb-1">
                        <CheckCircle2 size={18} />
                        <span className="text-[10px] font-black uppercase">Total Préstamos</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">{loans.length}</h2>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-3xl border border-gray-100">
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar por cliente o ID..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl outline-none font-medium"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="px-6 py-3 rounded-2xl bg-gray-50 font-bold text-sm text-emerald-900 outline-none"
                >
                    <option value="ALL">Todos los Estados</option>
                    <option value="ACTIVE">Activos</option>
                    <option value="DEFAULTED">En Mora</option>
                    <option value="PAID">Pagados</option>
                </select>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-black text-[11px] uppercase rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                >
                    <Plus size={16} /> Nuevo Préstamo
                </button>
            </div>

            {loading ? (
                <p className="text-center text-gray-400 font-bold py-12">Cargando préstamos...</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filtered.map(loan => <LoanCard key={loan._id} loan={loan} isAdmin />)}
                    {filtered.length === 0 && (
                        <p className="col-span-2 text-center text-gray-400 font-bold py-12">No se encontraron préstamos.</p>
                    )}
                </div>
            )}
        </div>
    );
};