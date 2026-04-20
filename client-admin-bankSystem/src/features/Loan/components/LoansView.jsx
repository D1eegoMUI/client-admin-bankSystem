import React, { useState } from 'react';

export const LoansView = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Resumen Superior */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-emerald-900 rounded-3xl p-6 text-white shadow-xl">
                    <p className="opacity-70 text-sm">Total Adeudado</p>
                    <h2 className="text-3xl font-black mt-1">Q45,000.00</h2>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm md:col-span-2 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-black text-emerald-900">Préstamos</h1>
                        <p className="text-emerald-600">Visualiza el estado de tus créditos activos</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-emerald-100"
                    >
                        Solicitar Nuevo
                    </button>
                </div>
            </div>

            {/* Listado de Préstamos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ejemplo */}
                <LoanCard loan={{
                    amount: 50000,
                    remainingBalance: 32500,
                    interestRate: 12,
                    termMonths: 24,
                    startDate: new Date(),
                    status: 'ACTIVE'
                }} />
            </div>

            {isModalOpen && <LoanModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};