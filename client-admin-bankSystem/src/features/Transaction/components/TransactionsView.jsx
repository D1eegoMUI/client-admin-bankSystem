import React, { useState } from 'react';

export const TransactionsView = () => {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* Header con estadísticas rápidas */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-emerald-900 tracking-tight italic underline decoration-emerald-400 underline-offset-8">
                        Movimientos
                    </h1>
                    <p className="text-emerald-600 mt-3 font-medium">Consulta el historial de tus operaciones financieras</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white px-4 py-2 rounded-2xl border border-emerald-100 shadow-sm flex flex-col items-end">
                        <span className="text-[10px] font-black text-gray-400 uppercase">Total Ingresos (Mes)</span>
                        <span className="text-lg font-black text-emerald-600">Q12,400.00</span>
                    </div>
                </div>
            </div>

            {/* BARRA DE HERRAMIENTAS */}
            <div className="flex flex-wrap gap-4 mb-6">
                <select className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold text-emerald-900 outline-none focus:border-emerald-500">
                    <option>Todas las Divisas</option>
                    <option>GTQ</option>
                    <option>USD</option>
                </select>
                <select className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold text-emerald-900 outline-none focus:border-emerald-500">
                    <option>Todos los Tipos</option>
                    <option>DEPOSIT</option>
                    <option>TRANSFER</option>
                    <option>LOAN_PAYMENT</option>
                </select>
            </div>

            {/* TABLA DE RESULTADOS */}
            <TransactionTable transactions={[
                {
                    _id: "tx_001",
                    type: "TRANSFER",
                    amount: 500,
                    currency: "USD",
                    amountInGTQ: 3900,
                    status: "COMPLETED",
                    description: "Pago de honorarios",
                    createdAt: new Date()
                },
                {
                    _id: "tx_002",
                    type: "DEPOSIT",
                    amount: 1500,
                    currency: "GTQ",
                    amountInGTQ: 1500,
                    status: "COMPLETED",
                    description: "Depósito en ventanilla",
                    createdAt: new Date()
                }
            ]} />
        </div>
    );
};