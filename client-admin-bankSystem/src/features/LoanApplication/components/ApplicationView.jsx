import React, { useState } from 'react';
import { ApplicationStatusCard } from './ApplicationStatusCard.jsx';
import { ApplicationModal } from './ApplicationModal.jsx';

export const LoanApplicationsView = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                {/* Cabecera con Estilo Bancario */}
                <div className="bg-emerald-900 rounded-3xl p-8 mb-10 text-white flex flex-col md:flex-row justify-between items-center shadow-xl shadow-emerald-900/20">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-4xl font-black tracking-tight">Estatus de Créditos</h1>
                        <p className="text-emerald-200 font-light mt-2">Gestiona y consulta tus solicitudes de financiamiento</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black px-8 py-4 rounded-2xl transition-all shadow-lg active:scale-95"
                    >
                        Nueva Solicitud
                    </button>
                </div>

                {/* Filtros de Estado */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {['Todas', 'PENDING', 'APPROVED', 'REJECTED'].map(filter => (
                        <button key={filter} className="px-5 py-2 rounded-xl bg-white border border-gray-100 text-sm font-bold text-emerald-900 hover:border-emerald-500 transition-all whitespace-nowrap shadow-sm">
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Grid de Solicitudes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Ejemplo de Datos */}
                    <ApplicationStatusCard app={{
                        _id: "65a12345678",
                        amount: 15000,
                        termMonths: 24,
                        status: 'UNDER_REVIEW',
                        createdAt: new Date(),
                        reviewDate: null
                    }} />
                    
                    <ApplicationStatusCard app={{
                        _id: "65b98765432",
                        amount: 5000,
                        termMonths: 12,
                        status: 'APPROVED',
                        createdAt: new Date(),
                        reviewDate: new Date()
                    }} />
                </div>
            </div>

            {isModalOpen && <ApplicationModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};