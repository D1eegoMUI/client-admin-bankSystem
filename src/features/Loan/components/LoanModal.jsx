import React from 'react';

export const LoanModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-emerald-100">
                
                {/* HEADER */}
                <div className="p-6 text-white" style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}>
                    <h2 className="text-2xl font-bold">Solicitud de Préstamo</h2>
                    <p className="text-emerald-100 text-sm">Financiamiento inmediato con la tasa más baja</p>
                </div>

                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Monto */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Monto del Préstamo (GTQ)</label>
                            <input type="number" min="100" className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none font-bold text-lg" placeholder="0.00" />
                        </div>

                        {/* Plazo */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Plazo (Meses)</label>
                            <select className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none">
                                <option value="12">12 meses (1 año)</option>
                                <option value="24">24 meses (2 años)</option>
                                <option value="36">36 meses (3 años)</option>
                                <option value="48">48 meses (4 años)</option>
                            </select>
                        </div>

                        {/* Cuenta de Desembolso */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Cuenta para acreditar fondos</label>
                            <select className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none">
                                <option>Seleccione una cuenta activa...</option>
                                {/* Mapeo de cuentas del usuario */}
                            </select>
                        </div>

                        {/* Información Informativa (Solo Lectura) */}
                        <div className="md:col-span-2 bg-emerald-50 p-4 rounded-2xl grid grid-cols-2 gap-4 border border-emerald-100">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-emerald-600">Tasa de Interés</p>
                                <p className="text-xl font-black text-emerald-900">12% Anual</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase font-bold text-emerald-600">Cuota Mensual Est.</p>
                                <p className="text-xl font-black text-emerald-900">GTQ --.--</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t">
                        <button onClick={onClose} className="px-6 py-2 text-emerald-700 font-semibold hover:bg-emerald-50 rounded-xl">Cancelar</button>
                        <button className="px-10 py-3 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">
                            Confirmar Crédito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};