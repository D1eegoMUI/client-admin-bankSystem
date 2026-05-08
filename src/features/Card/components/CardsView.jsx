import React, { useState } from 'react';
import { CardItem } from './CardItem.jsx';
import { CardModal } from './CardModal.jsx';
import { LayoutGrid, List } from 'lucide-react'; 

export const CardsView = () => {
    const [showModal, setShowModal] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'

    const cardsData = [
        { id: 1, cardNumber: "1234567812345678", holderName: "Pedrito", expirationDate: "05/29", brand: "VISA", type: "CREDIT", isApproved: true },
        { id: 2, cardNumber: "9874563214567894", holderName: "Juanito", expirationDate: "07/28", brand: "MASTERCARD", type: "CREDIT", isApproved: false },
        { id: 3, cardNumber: "1234567891011147", holderName: "Leandro", expirationDate: "06/30", brand: "VISA", type: "DEBIT", isApproved: true }
    ];

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-emerald-900">Gestión de Tarjetas</h1>
                    <p className="text-emerald-600">Administra los plásticos emitidos en el sistema</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Switcher de Vistas */}
                    <div className="flex bg-emerald-100 p-1 rounded-xl">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-700' : 'text-emerald-500 hover:text-emerald-700'}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-emerald-700' : 'text-emerald-500 hover:text-emerald-700'}`}
                        >
                            <List size={20} />
                        </button>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-all"
                    >
                        + Solicitar Tarjeta
                    </button>
                </div>
            </div>

            {/* Renderizado Condicional de la Vista */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {cardsData.map(card => (
                        <CardItem key={card.id} card={card} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-emerald-50 text-emerald-900 font-bold text-sm uppercase">
                            <tr>
                                <th className="p-4 border-b border-emerald-100">Titular</th>
                                <th className="p-4 border-b border-emerald-100">Número</th>
                                <th className="p-4 border-b border-emerald-100">Marca/Tipo</th>
                                <th className="p-4 border-b border-emerald-100">Expiración</th>
                                <th className="p-4 border-b border-emerald-100">Estado</th>
                                <th className="p-4 border-b border-emerald-100 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {cardsData.map(card => (
                                <tr key={card.id} className="hover:bg-emerald-50/50 transition-colors">
                                    <td className="p-4 border-b border-emerald-50 font-medium">{card.holderName}</td>
                                    <td className="p-4 border-b border-emerald-50 font-mono text-xs">**** {card.cardNumber.slice(-4)}</td>
                                    <td className="p-4 border-b border-emerald-50">
                                        <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded-md mr-2">{card.brand}</span>
                                        <span className="text-xs">{card.type}</span>
                                    </td>
                                    <td className="p-4 border-b border-emerald-50">{card.expirationDate}</td>
                                    <td className="p-4 border-b border-emerald-50">
                                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${card.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {card.isApproved ? 'ACTIVA' : 'PENDIENTE'}
                                        </span>
                                    </td>
                                    <td className="p-4 border-b border-emerald-50 text-center">
                                        <button className="text-emerald-600 hover:underline text-sm font-bold">Detalles</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && <CardModal onClose={() => setShowModal(false)} />}
        </div>
    );
};