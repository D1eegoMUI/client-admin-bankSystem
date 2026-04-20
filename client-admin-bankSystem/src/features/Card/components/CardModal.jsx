import React from 'react';

export const CardModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-emerald-100">
                
                {/* HEADER */}
                <div 
                    className="p-6 text-white"
                    style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}
                >
                    <h2 className="text-2xl font-bold tracking-tight">Emitir Nueva Tarjeta</h2>
                    <p className="text-emerald-100 text-sm opacity-90">Configura los parámetros del nuevo plástico</p>
                </div>

                <div className="p-6 space-y-5 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Titular */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Nombre del Titular (Como aparecerá en la tarjeta)</label>
                            <input type="text" className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none uppercase" placeholder="JUAN PEREZ" />
                        </div>

                        {/* Número y Marca */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Tipo de Red</label>
                            <select className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none">
                                <option value="VISA">VISA</option>
                                <option value="MASTERCARD">MASTERCARD</option>
                                <option value="AMEX">AMERICAN EXPRESS</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Tipo de Tarjeta</label>
                            <select className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none">
                                <option value="DEBIT">DÉBITO</option>
                                <option value="CREDIT">CRÉDITO</option>
                            </select>
                        </div>

                        {/* Fechas y CVV */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Expiración (MM/YY)</label>
                            <input type="text" className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none" placeholder="12/28" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">CVV</label>
                            <input type="password" maxLength="4" className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none" placeholder="***" />
                        </div>

                        {/* Límites (Solo si es crédito) */}
                        <div className="flex flex-col md:col-span-2 bg-emerald-50 p-4 rounded-xl">
                            <label className="text-sm font-bold text-emerald-700 mb-1">Límite de Crédito (GTQ)</label>
                            <input type="number" className="px-4 py-2 rounded-xl border-2 border-emerald-200 focus:border-emerald-500 outline-none" placeholder="0.00" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={onClose} className="px-6 py-2 text-emerald-700 font-semibold">Cancelar</button>
                        <button className="px-8 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition-all">
                            Generar Tarjeta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};