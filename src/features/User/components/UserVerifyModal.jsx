import React from 'react';
import { useUserStore } from '../Store/adminStore.js';
import { showSuccess, showError } from '../../../shared/utils/toast.js';

export const UserVerifyModal = ({ user, onClose }) => {
    const { verifyUser, loading } = useUserStore();

    if (!user) return null;

    const handleVerify = async () => {
        try {
            await verifyUser(user.uid);
            showSuccess('Usuario verificado exitosamente');
            onClose();
        } catch (error) {
            showError(error.response?.data?.message || 'Error al verificar');
        }
    };

    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-amber-100 overflow-hidden">
                
                {/* Header */}
                <div className="p-6 text-white flex justify-between items-center"
                    style={{ background: "linear-gradient(90deg, #78350f 0%, #d97706 100%)" }}>
                    <div>
                        <h2 className="text-xl font-bold">Verificar Usuario</h2>
                        <p className="text-amber-100 text-xs">Esta acción no se puede deshacer</p>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white text-2xl">×</button>
                </div>

                <div className="p-8">
                    {/* Info del usuario */}
                    <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-900 text-white flex items-center justify-center text-xl font-black">
                            {user.UserName[0]}{user.UserSurname[0]}
                        </div>
                        <div>
                            <p className="font-bold text-emerald-950">{user.UserName} {user.UserSurname}</p>
                            <p className="text-xs text-gray-400">{user.UserEmail}</p>
                            <p className="text-xs font-mono text-gray-500">DPI: {user.UserDPI}</p>
                        </div>
                    </div>

                    {/* Campos a revisar */}
                    <div className="space-y-2 mb-6">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Datos a confirmar</p>
                        {[
                            { label: 'Dirección', val: user.UserAddress },
                            { label: 'Teléfono', val: user.UserPhone },
                            { label: 'Trabajo', val: user.UserJob },
                            { label: 'Ingresos', val: `Q ${user.UserIncome?.toLocaleString()}` },
                        ].map(({ label, val }) => (
                            <div key={label} className="flex justify-between text-sm py-1.5 border-b border-gray-50">
                                <span className="text-gray-400 font-medium">{label}</span>
                                <span className="text-emerald-900 font-semibold">{val}</span>
                            </div>
                        ))}
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 text-gray-400 font-bold rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleVerify}
                            disabled={loading}
                            className="flex-1 py-3 bg-amber-500 text-white font-black rounded-2xl shadow-lg shadow-amber-100 hover:bg-amber-600 transition-all disabled:opacity-60"
                        >
                            {loading ? 'Verificando...' : '✓ Confirmar Verificación'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};