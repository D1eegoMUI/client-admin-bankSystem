import React from 'react';
import { Check, X, User, AlertCircle } from 'lucide-react';
import { useLoanAppStore } from '../../User/Store/adminStore';
import { showSuccess, showError } from '../../../shared/utils/toast.js';

export const ApplicationStatusCard = ({ app, isAdmin }) => {
    const { processApplication, loading } = useLoanAppStore();

    const statusStyles = {
        PENDING:      "bg-amber-50 text-amber-600 border-amber-100",
        UNDER_REVIEW: "bg-blue-50 text-blue-600 border-blue-100",
        APPROVED:     "bg-emerald-50 text-emerald-600 border-emerald-100",
        REJECTED:     "bg-red-50 text-red-600 border-red-100",
        CANCELLED:    "bg-gray-50 text-gray-600 border-gray-100",
    };

    const estimatedQuota = (app.amount / app.termMonths) * 1.12;
    const isRisky = app.monthlyIncome ? (estimatedQuota > app.monthlyIncome * 0.3) : false;

    const applicantName = app.applicant
        ? `${app.applicant.UserName ?? ''} ${app.applicant.UserSurname ?? ''}`.trim()
        : `Solicitud #${app._id?.slice(-6)}`;

    const handleProcess = async (action) => {
        try {
            await processApplication(app._id, action);
            const messages = {
                APPROVE: 'Solicitud aprobada exitosamente',
                REJECT:  'Solicitud rechazada',
                CANCEL:  'Solicitud cancelada',
            };
            showSuccess(messages[action]);
        } catch (error) {
            showError(error.response?.data?.message || 'Error al procesar la solicitud');
        }
    };

    return (
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:border-emerald-200 transition-all flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                        <User size={24} />
                    </div>
                    <div>
                        <h3 className="text-emerald-950 font-black tracking-tight leading-tight">{applicantName}</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">
                            {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest ${statusStyles[app.status]}`}>
                    {app.status.replace('_', ' ')}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50/50 p-4 rounded-2xl">
                    <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Monto Solicitado</p>
                    <p className="text-xl font-black text-emerald-900">Q{app.amount?.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50/50 p-4 rounded-2xl">
                    <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Ingresos Declarados</p>
                    <p className="text-xl font-black text-emerald-700">Q{app.monthlyIncome?.toLocaleString() ?? 'N/A'}</p>
                </div>
            </div>

            {isAdmin && (app.status === 'PENDING' || app.status === 'UNDER_REVIEW') && (
                <div className="mt-auto space-y-3">
                    {isRisky && (
                        <div className="flex items-center gap-2 text-red-500 bg-red-50 p-2 rounded-xl">
                            <AlertCircle size={14} />
                            <span className="text-[10px] font-bold uppercase italic">Alerta: Riesgo de impago alto</span>
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            disabled={loading}
                            onClick={() => handleProcess('APPROVE')}
                            className="flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all disabled:opacity-50"
                        >
                            <Check size={16} /> Aprobar
                        </button>
                        <button
                            disabled={loading}
                            onClick={() => handleProcess('REJECT')}
                            className="flex items-center justify-center gap-2 py-3 bg-white border-2 border-red-100 text-red-600 rounded-xl font-black text-[10px] uppercase hover:bg-red-50 transition-all disabled:opacity-50"
                        >
                            <X size={16} /> Rechazar
                        </button>
                    </div>
                </div>
            )}

            {!isAdmin && app.status === 'PENDING' && (
                <button
                    onClick={() => handleProcess('CANCEL')}
                    className="w-full mt-auto py-3 text-[10px] font-black text-red-400 hover:bg-red-50 rounded-xl uppercase tracking-widest transition-colors"
                >
                    Cancelar Solicitud
                </button>
            )}
        </div>
    );
};