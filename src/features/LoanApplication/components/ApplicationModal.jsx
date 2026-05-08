import React from 'react';

export const ApplicationModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-emerald-100">
                
                {/* HEADER */}
                <div className="p-6 text-white" style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}>
                    <h2 className="text-2xl font-bold italic">Kinal <span className="font-light">Credit Application</span></h2>
                    <p className="text-emerald-100 text-xs">Inicia tu proceso de financiamiento hoy mismo</p>
                </div>

                <div className="p-8 space-y-5">
                    <div className="grid grid-cols-1 gap-5">
                        
                        {/* Ingresos Mensuales - Campo Crítico */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Tus Ingresos Mensuales (GTQ)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">Q</span>
                                <input type="number" className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none bg-emerald-50/30 transition-all font-bold" placeholder="0.00" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold text-emerald-900 mb-1">Monto Solicitado</label>
                                <input type="number" className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Min. 100" />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold text-emerald-900 mb-1">Plazo (Meses)</label>
                                <input type="number" className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Ej: 12" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Cuenta para el desembolso</label>
                            <select className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none">
                                <option>Selecciona tu cuenta principal...</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t">
                        <button onClick={onClose} className="px-6 py-2 text-gray-400 font-semibold hover:text-emerald-700 transition-colors">Cancelar</button>
                        <button className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-100 hover:scale-[1.02] transition-all">
                            Enviar Solicitud
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};