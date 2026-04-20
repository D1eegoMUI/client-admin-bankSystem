import React from 'react';

export const ProductModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-emerald-100">
                
                {/* HEADER */}
                <div className="p-6 text-white" style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}>
                    <h2 className="text-2xl font-bold">Gestión de Catálogo</h2>
                    <p className="text-emerald-100 text-xs">Agrega nuevos productos o servicios al sistema</p>
                </div>

                <div className="p-8 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* Nombre del Producto */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Nombre del Item</label>
                            <input type="text" className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none transition-all" placeholder="Ej: Seguro de Vida Premium" />
                        </div>

                        {/* Tipo (Enum) */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Categoría</label>
                            <select className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none">
                                <option value="PRODUCTO">📦 PRODUCTO</option>
                                <option value="SERVICIO">🛠️ SERVICIO</option>
                            </select>
                        </div>

                        {/* Precio */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Precio (GTQ)</label>
                            <input type="number" className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none font-mono" placeholder="0.00" />
                        </div>

                        {/* Stock (Condicional según lógica) */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Existencias (Stock)</label>
                            <input type="number" className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Cantidad disponible (0 si es servicio)" />
                        </div>

                        {/* Descripción */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Descripción Detallada</label>
                            <textarea rows="3" className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none resize-none" placeholder="Describe los beneficios o características..."></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t">
                        <button onClick={onClose} className="px-6 py-2 text-gray-400 font-semibold hover:text-emerald-700">Cancelar</button>
                        <button className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
                            Guardar Item
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};