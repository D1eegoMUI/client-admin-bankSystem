import React from 'react';

export const UserModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-emerald-100">
                
                {/* HEADER */}
                <div className="p-6 text-white flex justify-between items-center" style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}>
                    <div>
                        <h2 className="text-2xl font-bold">Gestión de Usuario</h2>
                        <p className="text-emerald-100 text-xs">Asegúrate de verificar el DPI antes de guardar</p>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white text-2xl">×</button>
                </div>

                <div className="p-8 space-y-6 overflow-y-auto">
                    {/* SECCIÓN 1: Identidad */}
                    <div>
                        <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4 border-b border-emerald-50 pb-1">Información de Identidad</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Nombres" />
                            <input type="text" className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Apellidos" />
                            <input type="text" className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="DPI (CUI)" />
                            <input type="email" className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Correo Electrónico" />
                        </div>
                    </div>

                    {/* SECCIÓN 2: Laboral y Ubicación */}
                    <div>
                        <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4 border-b border-emerald-50 pb-1">Perfil Socioeconómico</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none md:col-span-2" placeholder="Dirección de Residencia" />
                            <input type="text" className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Celular / Teléfono" />
                            <input type="text" className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Ocupación / Trabajo" />
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">Q</span>
                                <input type="number" className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Ingresos Mensuales" />
                            </div>
                            <select className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none">
                                <option value="USER">Rol: Cliente (USER)</option>
                                <option value="ADMIN">Rol: Administrador (ADMIN)</option>
                            </select>
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={onClose} className="px-6 py-2 text-gray-400 font-bold">Cancelar</button>
                        <button className="px-10 py-3 bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
                            Registrar Usuario
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};