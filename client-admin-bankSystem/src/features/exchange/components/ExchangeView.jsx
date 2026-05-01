import React, { useState } from 'react';
import { Save, RefreshCw, Plus, Trash2, Power } from 'lucide-react';

export const ExchangeAdminView = () => {
    // 1. Datos iniciales (Simulando lo que vendría de tu DB)
    const [rates, setRates] = useState([
        { id: 1, code: "USD", name: "Dólar Estadounidense", rateVsGtq: 7.80, active: true },
        { id: 2, code: "EUR", name: "Euro", rateVsGtq: 8.45, active: true },
        { id: 3, code: "MXN", name: "Peso Mexicano", rateVsGtq: 0.46, active: true },
        { id: 4, code: "GTQ", name: "Quetzal (Base)", rateVsGtq: 1, active: true },
    ]);

    const [isSaving, setIsSaving] = useState(false);

    // Manejador para cambiar el valor numérico
    const handleRateChange = (id, newValue) => {
        setRates(rates.map(r => r.id === id ? { ...r, rateVsGtq: parseFloat(newValue) || 0 } : r));
    };

    // Manejador para activar/desactivar moneda
    const toggleStatus = (id) => {
        setRates(rates.map(r => r.id === id ? { ...r, active: !r.active } : r));
    };

    const handleSaveAll = () => {
        setIsSaving(true);
        // Simulamos petición al backend
        setTimeout(() => {
            setIsSaving(false);
            alert("¡Tasas de cambio actualizadas en todo el sistema!");
        }, 1000);
    };

    return (
        <div className="space-y-6">
            {/* Header de Admin */}
            <header className="bg-white p-8 rounded-[2rem] shadow-sm border border-emerald-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-emerald-950 italic uppercase tracking-tighter">Gestión de Divisas</h1>
                    <p className="text-emerald-600 font-medium">Control maestro de tipos de cambio (Base: Quetzal)</p>
                </div>
                <div className="flex gap-3">
                    <button className="p-4 bg-white border border-gray-200 text-gray-600 rounded-2xl hover:bg-gray-50 transition-all">
                        <RefreshCw size={20} />
                    </button>
                    <button 
                        onClick={handleSaveAll}
                        disabled={isSaving}
                        className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center gap-2"
                    >
                        {isSaving ? "Guardando..." : <><Save size={20} /> Guardar Cambios</>}
                    </button>
                </div>
            </header>

            {/* Tabla de Gestión */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-emerald-50 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-emerald-50/50">
                            <th className="p-6 text-[10px] font-black text-emerald-800 uppercase tracking-widest">Estado</th>
                            <th className="p-6 text-[10px] font-black text-emerald-800 uppercase tracking-widest">Divisa</th>
                            <th className="p-6 text-[10px] font-black text-emerald-800 uppercase tracking-widest">Valor vs Q1.00</th>
                            <th className="p-6 text-[10px] font-black text-emerald-800 uppercase tracking-widest">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {rates.map((rate) => (
                            <tr key={rate.id} className={`transition-colors ${!rate.active ? 'bg-gray-50/50' : 'hover:bg-emerald-50/20'}`}>
                                <td className="p-6">
                                    <button 
                                        onClick={() => toggleStatus(rate.id)}
                                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                                            rate.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-500'
                                        }`}
                                    >
                                        <Power size={12} />
                                        {rate.active ? 'Activo' : 'Inactivo'}
                                    </button>
                                </td>
                                <td className="p-6">
                                    <div className="flex flex-col">
                                        <span className="font-black text-emerald-950">{rate.code}</span>
                                        <span className="text-xs text-gray-400">{rate.name}</span>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="relative max-w-[150px]">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Q</span>
                                        <input 
                                            type="number"
                                            value={rate.rateVsGtq}
                                            disabled={rate.code === 'GTQ'}
                                            onChange={(e) => handleRateChange(rate.id, e.target.value)}
                                            className={`w-full pl-8 pr-4 py-2 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all font-mono font-bold text-emerald-900 ${rate.code === 'GTQ' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        />
                                    </div>
                                </td>
                                <td className="p-6">
                                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Banner Informativo */}
            <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-center gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                    <Plus size={24} />
                </div>
                <div>
                    <p className="text-sm font-bold text-amber-900">Modo Administrador</p>
                    <p className="text-xs text-amber-700">Los cambios realizados aquí afectarán los cálculos de todos los clientes de Kinal Bank inmediatamente.</p>
                </div>
            </div>
        </div>
    );
};