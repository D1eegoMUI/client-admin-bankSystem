import React, { useState } from 'react';
import { TransactionTable } from './TransactionTable';
import { Search, Filter, Download, Users } from 'lucide-react';

export const TransactionsView = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Header de Supervisión */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-emerald-950 tracking-tighter italic">
                        Monitor Global <span className="text-emerald-500">Transaccional</span>
                    </h1>
                    <p className="text-emerald-600 font-medium mt-1">Supervisión en tiempo real de toda la red bancaria</p>
                </div>

                <div className="flex gap-4 w-full lg:w-auto">
                    <div className="flex-1 bg-white p-4 rounded-3xl border border-emerald-100 shadow-sm">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Volumen Total (24h)</p>
                        <p className="text-2xl font-black text-emerald-700">Q 145,280.00</p>
                    </div>
                    <button className="bg-emerald-600 text-white p-4 rounded-3xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">
                        <Download size={24} />
                    </button>
                </div>
            </div>

            {/* BARRA DE HERRAMIENTAS DE ADMIN */}
            <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-emerald-50 flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-[300px] relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Buscar por DPI, No. Cuenta o ID de Transacción..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none transition-all text-sm"
                    />
                </div>
                
                <div className="flex gap-2">
                    <select className="px-4 py-3 rounded-2xl bg-gray-50 border-2 border-transparent text-sm font-bold text-emerald-900 outline-none focus:border-emerald-500">
                        <option>Estado: Todos</option>
                        <option>COMPLETED</option>
                        <option>PENDING</option>
                        <option>FAILED</option>
                    </select>
                    <button className="flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-2xl font-bold text-sm hover:bg-emerald-100 transition-all">
                        <Filter size={16} /> Filtros Avanzados
                    </button>
                </div>
            </div>

            {/* TABLA DE RESULTADOS */}
            <TransactionTable transactions={[
                {
                    _id: "TX-98234",
                    sender: { name: "Carlos Ruiz", dpi: "3001 22344 0101" },
                    receiver: { name: "Maria Lopez", dpi: "1922 44556 0101" },
                    type: "TRANSFER",
                    amount: 500,
                    currency: "USD",
                    amountInGTQ: 3900,
                    status: "COMPLETED",
                    description: "Pago de servicios profesionales",
                    createdAt: new Date()
                },
                {
                    _id: "TX-98235",
                    sender: { name: "Ventanilla Central", dpi: "SISTEMA" },
                    receiver: { name: "Juan Perez", dpi: "2233 11223 0101" },
                    type: "DEPOSIT",
                    amount: 1500,
                    currency: "GTQ",
                    amountInGTQ: 1500,
                    status: "COMPLETED",
                    description: "Abono a cuenta corriente",
                    createdAt: new Date()
                }
            ]} />
        </div>
    );
};