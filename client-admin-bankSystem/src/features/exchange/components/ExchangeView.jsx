import React, { useState } from 'react';
// Supongamos que tienes una función apiPost en tu services/api.js
// import { apiPost } from '../../services/api'; 

export const ExchangeView = () => {
    const [formData, setFormData] = useState({ amount: '', from: 'USD', to: 'GTQ' });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleConvert = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Aquí haces la petición a tu ruta de Node.js
            // const response = await apiPost('/exchange/convert', formData);
            // setResult(response.data.conversion);
            
            // Simulación para visualización:
            console.log("Enviando a controlador:", formData);
        } catch (error) {
            console.error("Error al convertir");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-emerald-900 italic">Cambio de Divisas</h1>
                <p className="text-emerald-600 font-medium">Cotizaciones en tiempo real del mercado internacional</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-emerald-100/50 border border-emerald-50">
                <form onSubmit={handleConvert} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        {/* Monto y Moneda Origen */}
                        <div className="md:col-span-1">
                            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Monto a cambiar</label>
                            <input 
                                type="number" 
                                value={formData.amount}
                                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                className="w-full mt-1 px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none transition-all font-bold text-lg"
                                placeholder="0.00"
                            />
                        </div>

                        <div className="md:col-span-1">
                            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">De (Origen)</label>
                            <select 
                                value={formData.from}
                                onChange={(e) => setFormData({...formData, from: e.target.value})}
                                className="w-full mt-1 px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none transition-all font-bold"
                            >
                                <option value="USD">USD - Dólar</option>
                                <option value="GTQ">GTQ - Quetzal</option>
                                <option value="EUR">EUR - Euro</option>
                            </select>
                        </div>

                        <div className="md:col-span-1">
                            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">A (Destino)</label>
                            <select 
                                value={formData.to}
                                onChange={(e) => setFormData({...formData, to: e.target.value})}
                                className="w-full mt-1 px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none transition-all font-bold"
                            >
                                <option value="GTQ">GTQ - Quetzal</option>
                                <option value="USD">USD - Dólar</option>
                                <option value="EUR">EUR - Euro</option>
                            </select>
                        </div>
                    </div>

                    <button 
                        disabled={loading}
                        className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all uppercase tracking-widest active:scale-[0.98]"
                    >
                        {loading ? 'Calculando...' : 'Convertir Ahora'}
                    </button>
                </form>

                {/* Área de Resultado */}
                {result && (
                    <div className="mt-10 p-6 bg-emerald-50 rounded-3xl border border-emerald-100 text-center animate-pulse">
                        <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-2">Resultado de la conversión</p>
                        <h2 className="text-4xl font-black text-emerald-900">
                            {result.to} {result.convertedAmount.toFixed(2)}
                        </h2>
                        <p className="text-xs text-emerald-400 mt-2 font-mono">Tipo de cambio: 1 {result.from} = {result.rate} {result.to}</p>
                    </div>
                )}
            </div>
        </div>
    );
};