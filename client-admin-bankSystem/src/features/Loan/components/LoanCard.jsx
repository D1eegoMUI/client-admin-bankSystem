import React from 'react';
import { User, MoreVertical, AlertTriangle } from 'lucide-react';

export const LoanCard = ({ loan, isAdmin }) => {
    const paidAmount = loan.amount - loan.remainingBalance;
    const progress = (paidAmount / loan.amount) * 100;

    const statusColors = {
        ACTIVE: "bg-emerald-100 text-emerald-700 border-emerald-200",
        PAID: "bg-blue-100 text-blue-700 border-blue-200",
        DEFAULTED: "bg-red-100 text-red-700 border-red-200 animate-pulse"
    };

    return (
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:border-emerald-200 transition-all group relative overflow-hidden">
            {/* Badge de Estado */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                        <User size={24} />
                    </div>
                    <div>
                        <h3 className="text-emerald-950 font-black text-lg leading-tight">{loan.user.name}</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{loan.user.dpi}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full border ${statusColors[loan.status]}`}>
                        {loan.status}
                    </span>
                    <p className="text-[10px] font-mono text-gray-400">ID: {loan._id}</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Visualización de Progreso */}
                <div>
                    <div className="flex justify-between text-[11px] mb-2">
                        <span className="font-bold text-gray-400 uppercase tracking-tighter">Recuperación de Capital</span>
                        <span className="font-black text-emerald-600">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-1000 ${loan.status === 'DEFAULTED' ? 'bg-red-500' : 'bg-emerald-500'}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Detalles Financieros */}
                <div className="grid grid-cols-2 gap-6 bg-gray-50 p-5 rounded-3xl border border-gray-100">
                    <div>
                        <p className="text-[9px] uppercase text-gray-400 font-black mb-1 tracking-widest">Crédito Otorgado</p>
                        <p className="text-xl font-black text-emerald-900">Q{loan.amount.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] uppercase text-gray-400 font-black mb-1 tracking-widest">Saldo por Cobrar</p>
                        <p className={`text-xl font-black ${loan.status === 'DEFAULTED' ? 'text-red-600' : 'text-emerald-600'}`}>
                            Q{loan.remainingBalance.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Acciones de Admin */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-4 text-[10px] font-bold text-gray-400 italic">
                        <span>{loan.termMonths} Meses</span>
                        <span>•</span>
                        <span>Tasa: {loan.interestRate}%</span>
                    </div>
                    
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase text-gray-600 hover:bg-gray-50 transition-all">
                            Ver Historial
                        </button>
                        {loan.status === 'DEFAULTED' && (
                            <button className="px-4 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-red-100 flex items-center gap-2">
                                <AlertTriangle size={12} /> Contactar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};