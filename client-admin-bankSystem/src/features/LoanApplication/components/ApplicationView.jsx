import React, { useState } from 'react';
import { ApplicationStatusCard } from './ApplicationStatusCard.jsx';
import { Search, Inbox, CheckCircle, AlertCircle } from 'lucide-react';

export const LoanApplicationsView = () => {
    // Filtro para el admin
    const [filter, setFilter] = useState('ALL');

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Header de Gestión de Cartera */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-950 rounded-[2.5rem] p-8 text-white col-span-2 shadow-2xl shadow-emerald-900/30">
                    <h1 className="text-4xl font-black italic tracking-tighter">Panel de <span className="text-emerald-400">Resolución</span></h1>
                    <p className="text-emerald-200/60 mt-2 font-medium">Analiza ingresos y aprueba solicitudes de crédito en espera.</p>
                </div>
                
                <div className="bg-white rounded-[2.5rem] p-8 border border-emerald-100 flex flex-col justify-center items-center text-center">
                    <p className="text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em] mb-1">Por Revisar</p>
                    <h2 className="text-5xl font-black text-emerald-950">12</h2>
                </div>
            </div>

            {/* Barra de Herramientas Admin */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Buscar por DPI o ID de solicitud..."
                        className="w-full pl-14 pr-6 py-4 bg-white border-2 border-emerald-50 rounded-2xl outline-none focus:border-emerald-500 transition-all font-medium"
                    />
                </div>
                <div className="flex bg-white p-1.5 rounded-2xl border border-emerald-50 shadow-sm">
                    {['ALL', 'PENDING', 'UNDER_REVIEW'].map(f => (
                        <button 
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                                filter === f ? 'bg-emerald-600 text-white shadow-lg' : 'text-emerald-900 hover:bg-emerald-50'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid de Solicitudes para Gestión */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ejemplo de Solicitud Pendiente */}
                <ApplicationStatusCard isAdmin={true} app={{
                    _id: "65a12345678",
                    applicant: { name: "Fernando Sandoval", dpi: "3001 44552 0101" },
                    amount: 25000,
                    termMonths: 36,
                    monthlyIncome: 9500, // Campo crucial para el admin
                    status: 'PENDING',
                    createdAt: new Date(),
                    reviewDate: null
                }} />

                <ApplicationStatusCard isAdmin={true} app={{
                    _id: "65b98765432",
                    applicant: { name: "Marta Quiñonez", dpi: "1922 88771 0101" },
                    amount: 8000,
                    termMonths: 12,
                    monthlyIncome: 3500,
                    status: 'UNDER_REVIEW',
                    createdAt: new Date(),
                    reviewDate: null
                }} />
            </div>
        </div>
    );
};