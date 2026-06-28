import { useState } from 'react';
import { Check, X, User, CreditCard } from 'lucide-react';
import { BaseButton } from '../../../shared/components/ui/BaseButton.jsx';
import { RejectReasonModal } from '../../Card/components/RejectReasonModal.jsx';

export const ExtraFinancingRequestItem = ({ req, onApprove, onReject, processing }) => {
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isPending = req.status === 'PENDING';

    const statusStyles = {
        PENDING:   'text-amber-700 bg-amber-50 border-amber-200',
        APPROVED:  'text-emerald-700 bg-emerald-50 border-emerald-200',
        REJECTED:  'text-red-700 bg-red-50 border-red-200',
        CANCELLED: 'text-gray-500 bg-gray-50 border-gray-200',
    };

    const statusLabels = {
        PENDING:   'Pendiente',
        APPROVED:  'Aprobada',
        REJECTED:  'Rechazada',
        CANCELLED: 'Cancelada',
    };

    const handleApprove = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            await onApprove(req._id);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmReject = async (reason) => {
        await onReject(req._id, reason);
        setShowRejectModal(false);
    };

    const isBlocked = processing || isSubmitting;

    return (
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:border-emerald-200 transition-all flex flex-col gap-5">

            {/* Header: usuario + badge de estado */}
            <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                    <div className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                        <User size={22} />
                    </div>
                    <div>
                        <p className="font-black text-gray-800 leading-tight">
                            {req.user?.UserName} {req.user?.UserSurname}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {req.user?.UserEmail}
                        </p>
                    </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest border px-3 py-1 rounded-full ${statusStyles[req.status]}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {statusLabels[req.status]}
                </span>
            </div>

            {/* Tarjeta asociada */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3">
                <CreditCard size={16} className="text-slate-400 flex-shrink-0" />
                <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Tarjeta de crédito</p>
                    <p className="text-sm font-black text-slate-800">
                        **** {req.creditCard?.cardNumber?.slice(-4) || '----'}
                        <span className="ml-2 text-[10px] font-bold text-slate-400 normal-case">
                            {req.creditCard?.type}
                        </span>
                    </p>
                </div>
            </div>

            {/* Datos del financiamiento solicitado */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-4 rounded-2xl col-span-2">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Concepto</p>
                    <p className="text-sm font-semibold text-gray-800">{req.description}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Monto solicitado</p>
                    <p className="text-lg font-black text-emerald-700">
                        Q {req.totalAmount?.toLocaleString('es-GT')}
                    </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Plazo</p>
                    <p className="text-lg font-black text-slate-800">{req.installments} meses</p>
                </div>
            </div>

            {/* Cuota mensual estimada (solo informativo) */}
            {req.totalAmount && req.installments && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                        <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-0.5">
                            Cuota mensual estimada
                        </p>
                        <p className="text-sm font-black text-emerald-800">
                            Q {((req.totalAmount / req.installments) * 1.015).toFixed(2)}
                            <span className="text-[10px] font-bold text-emerald-400 ml-1">(con 1.5% interés)</span>
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-0.5">Estado tarjeta</p>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            req.creditCard?.status === 'ACTIVE'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-red-100 text-red-600'
                        }`}>
                            {req.creditCard?.status || '—'}
                        </span>
                    </div>
                </div>
            )}

            {/* Si fue aprobado: referencia al financiamiento creado */}
            {req.status === 'APPROVED' && req.extraFinancing && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                    <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">
                        Financiamiento creado
                    </p>
                    <p className="text-sm font-mono text-emerald-700 truncate">{req.extraFinancing}</p>
                </div>
            )}

            {/* Si fue rechazado: motivo */}
            {req.status === 'REJECTED' && req.rejectionReason && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                    <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-1">Motivo de rechazo</p>
                    <p className="text-sm font-semibold text-red-700">{req.rejectionReason}</p>
                </div>
            )}

            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                {new Date(req.createdAt).toLocaleDateString('es-GT', {
                    day: '2-digit', month: 'short', year: 'numeric'
                })}
            </p>

            {/* Acciones solo si está pendiente */}
            {isPending && (
                <div className="grid grid-cols-2 gap-2 mt-auto">
                    <BaseButton
                        variant="primary"
                        size="sm"
                        fullWidth
                        disabled={isBlocked}
                        loading={isSubmitting}
                        loadingText="Aprobando..."
                        onClick={handleApprove}
                        icon={<Check size={14} />}
                        className="text-[10px] uppercase tracking-widest font-black"
                    >
                        Aprobar
                    </BaseButton>
                    <BaseButton
                        variant="danger"
                        size="sm"
                        fullWidth
                        disabled={isBlocked}
                        onClick={() => setShowRejectModal(true)}
                        icon={<X size={14} />}
                        className="text-[10px] uppercase tracking-widest font-black"
                    >
                        Rechazar
                    </BaseButton>
                </div>
            )}

            <RejectReasonModal
                isOpen={showRejectModal}
                onClose={() => setShowRejectModal(false)}
                onConfirm={handleConfirmReject}
                processing={processing}
                title="Rechazar solicitud de extra-financiamiento"
                subtitle={`${req.user?.UserName ?? ''} ${req.user?.UserSurname ?? ''}`.trim()}
            />
        </div>
    );
};