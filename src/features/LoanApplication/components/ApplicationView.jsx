import React, { useEffect, useState } from 'react';
import { ApplicationStatusCard } from './ApplicationStatusCard.jsx';
import { useLoanAppStore } from '../../User/Store/adminStore';
import { Search, Inbox, CheckCircle, AlertCircle } from 'lucide-react';

export const LoanApplicationsView = () => {
    const { applications, fetchApplications, loading } = useLoanAppStore();
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');

    useEffect(() => { fetchApplications(); }, []);

    const pending = applications.filter(a => a.status === 'PENDING' || a.status === 'UNDER_REVIEW').length;

    const filtered = applications.filter(app => {
        const matchesStatus = filter === 'ALL' || app.status === filter;
        const name = `${app.applicant?.UserName ?? ''} ${app.applicant?.UserSurname ?? ''}`.toLowerCase();
        const matchesSearch = name.includes(search.toLowerCase()) || app._id.includes(search);
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-950 rounded-[2.5rem] p-8 text-white col-span-2 shadow-2xl shadow-emerald-900/30">
                    <h1 className="text-4xl font-black italic tracking-tighter">
                        Panel de <span className="text-emerald-400">Resolución</span>
                    </h1>
                    <p className="text-emerald-200/60 mt-2 font-medium">
                        Analiza ingresos y aprueba solicitudes de crédito en espera.
                    </p>
                </div>
                <div className="bg-white rounded-[2.5rem] p-8 border border-emerald-100 flex flex-col justify-center items-center text-center">
                    <p className="text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em] mb-1">Por Revisar</p>
                    <h2 className="text-5xl font-black text-emerald-950">{pending}</h2>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar por nombre o ID..."
                        className="w-full pl-14 pr-6 py-4 bg-white border-2 border-emerald-50 rounded-2xl outline-none focus:border-emerald-500 transition-all font-medium"
                    />
                </div>
                <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl border border-emerald-50 shadow-sm">
                    {['ALL', 'PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all ${filter === f ? 'bg-emerald-600 text-white shadow-lg' : 'text-emerald-900 hover:bg-emerald-50'
                                }`}
                        >
                            {f.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <p className="text-center text-gray-400 font-bold py-12">Cargando solicitudes...</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filtered.map(app => (
                        <ApplicationStatusCard key={app._id} app={app} isAdmin={true} />
                    ))}
                    {filtered.length === 0 && (
                        <p className="col-span-2 text-center text-gray-400 font-bold py-12">
                            No se encontraron solicitudes.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};