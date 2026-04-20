import React from 'react';

export const AccountModal = () => {
    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-emerald-100">
                
                {/* HEADER - KINAL STYLE */}
                <div 
                    className="p-6 text-white sticky top-0 z-10"
                    style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}
                >
                    <h2 className="text-2xl font-bold tracking-tight">Nueva Cuenta Bancaria</h2>
                    <p className="text-emerald-100 text-sm opacity-90">Registra una cuenta para los servicios financieros de Kinal Bank</p>
                </div>

                {/* FORM CONTENT */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* Número de Cuenta */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Número de Cuenta</label>
                            <input 
                                type="text"
                                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-gray-50/50"
                                placeholder="Ej: 40592310"
                            />
                        </div>

                        {/* Tipo de Cuenta */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Tipo de Cuenta</label>
                            <select className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all outline-none bg-white">
                                <option value="AHORRO">Ahorro</option>
                                <option value="MONETARIA">Monetaria</option>
                            </select>
                        </div>

                        {/* Divisa */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Divisa</label>
                            <select className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all outline-none bg-white">
                                <option value="GTQ">Quetzal (GTQ)</option>
                                <option value="USD">Dólar (USD)</option>
                                <option value="EUR">Euro (EUR)</option>
                                <option value="MXN">Peso (MXN)</option>
                            </select>
                        </div>

                        {/* Banco Relacionado */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Banco Destino</label>
                            <select className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all outline-none bg-white">
                                <option>Banco Kinal</option>
                                <option>Banco Industrial</option>
                                <option>Banrural</option>
                                <option>BAC</option>
                                <option>G&T Continental</option>
                            </select>
                        </div>

                        {/* Saldo Inicial */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Saldo Inicial</label>
                            <input 
                                type="number"
                                min="0"
                                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all outline-none bg-white font-mono"
                                placeholder="0.00"
                            />
                        </div>

                        {/* Dueño de la cuenta (User ID/Ref) */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Propietario (User ID)</label>
                            <input 
                                type="text"
                                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 transition-all outline-none bg-gray-50/50"
                                placeholder="ID del usuario asociado"
                            />
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 border-t border-gray-100">
                        <button className="px-6 py-2.5 rounded-xl text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors">
                            Cancelar
                        </button>
                        <button 
                            className="px-8 py-2.5 rounded-xl text-white font-bold shadow-lg shadow-emerald-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            style={{ background: "#059669" }}
                        >
                            Abrir Cuenta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};