import React, { useState } from 'react';
import { LoanCard } from './LoanCard.jsx';
import { Search, Wallet, AlertCircle, CheckCircle2 } from 'lucide-react';

export const LoansView = () => {
    // Simulamos una lista de préstamos de distintos usuarios
    const [loans, setLoans] = useState([
        {
            _id: "L-101",
            user: { name: "Roberto Gómez", dpi: "2991 44552 0101" },
            amount: 50000,
            remainingBalance: 32500,
            interestRate: 12,
            termMonths: 24,
            startDate: "2023-10-15",
            status: 'ACTIVE'
        },
        {
            _id: "L-102",
            user: { name: "Ana Martínez", dpi: "1822 99887 0101" },
            amount: 15000,
            remainingBalance: 15000,
            interestRate: 15,
            termMonths: 12,
            startDate: "2024-01-20",
            status: 'DEFAULTED'
        }
    ]);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Dashboard de Cartera */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-emerald-900 rounded-[2rem] p-6 text-white shadow-xl shadow-emerald-900/20 col-span-1 md:col-span-2">
                    <div className="flex items-center gap-3 opacity-70 mb-2">
                        <Wallet size={20} />
                        <span className="text-sm font-bold uppercase tracking-wider">Cartera Total Activa</span>
                    </div>
                    <h2 className="text-4xl font-black">Q2,450,000.00</h2>
                    <p className="text-emerald-400 text-xs mt-2 font-medium">↑ 12% respecto al mes anterior</p>
                </div>
                
                <div className="bg-white rounded-[2rem] p-6 border border-red-100 shadow-sm flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-red-500 mb-1">
                        <AlertCircle size={18} />
                        <span className="text-[10px] font-black uppercase">En Mora (Defaulted)</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">Q85,400.00</h2>
                </div>

                <div className="bg-white rounded-[2rem] p-6 border border-emerald-100 shadow-sm flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-emerald-500 mb-1">
                        <CheckCircle2 size={18} />
                        <span className="text-[10px] font-black uppercase">Intereses Generados</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">Q12,250.00</h2>
                </div>
            </div>

            {/* Barra de Búsqueda de Clientes */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-3xl border border-gray-100">
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Buscar préstamo por cliente, DPI o ID..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-emerald-500/20 font-medium"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <select className="px-6 py-3 rounded-2xl bg-gray-50 border-none font-bold text-sm text-emerald-900 outline-none cursor-pointer">
                        <option>Todos los Estados</option>
                        <option>Activos</option>
                        <option>En Mora</option>
                        <option>Pagados</option>
                    </select>
                </div>
            </div>

            {/* Grid de Préstamos Gestionables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {loans.map(loan => (
                    <LoanCard key={loan._id} loan={loan} isAdmin={true} />
                ))}
            </div>
        </div>
    );
};