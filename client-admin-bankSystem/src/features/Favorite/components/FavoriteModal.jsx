import React from 'react';

export const FavoriteModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-emerald-100">
                
                {/* HEADER */}
                <div className="p-5 text-white" style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}>
                    <h2 className="text-xl font-bold">Añadir Favorito</h2>
                    <p className="text-emerald-100 text-xs opacity-80">Guarda una cuenta para transferencias rápidas</p>
                </div>

                <div className="p-6 space-y-4">
                    {/* Alias */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-emerald-900 mb-1">Alias / Nombre del contacto</label>
                        <input 
                            type="text" 
                            className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none transition-all" 
                            placeholder="Ej: Pago de Alquiler / Mamá"
                            maxLength={50}
                        />
                    </div>

                    {/* Cuenta Destino */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-emerald-900 mb-1">Número de Cuenta Destino</label>
                        <input 
                            type="text" 
                            className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none transition-all" 
                            placeholder="Ingrese el número de cuenta"
                        />
                        <p className="text-[10px] text-gray-400 mt-1 italic">* Verificaremos que la cuenta exista en Kinal Bank</p>
                    </div>

                    {/* BOTONES */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={onClose} className="px-4 py-2 text-emerald-700 font-semibold hover:bg-emerald-50 rounded-lg">
                            Cancelar
                        </button>
                        <button className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-md hover:bg-emerald-700 transition-all">
                            Guardar Favorito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};