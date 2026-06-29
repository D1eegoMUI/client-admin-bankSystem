import { useState } from 'react';
import { Check, X, User } from 'lucide-react';
import { BaseButton } from '../../../shared/components/ui/BaseButton.jsx';
import { RejectReasonModal } from '../../Card/components/RejectReasonModal.jsx';

export const AccountRequestItem = ({ req, onApprove, onReject, processing }) => {
    const [showRejectModal, setShowRejectModal] = useState(false);

    const isPending = req.requestStatus === 'PENDING';

    const statusStyles = {
        PENDING:  'text-amber-700 bg-amber-50 border-amber-200',
        APPROVED: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        REJECTED: 'text-red-700 bg-red-50 border-red-200',
    };

    const statusLabels = {
        PENDING:  'Pendiente',
        APPROVED: 'Aprobada',
        REJECTED: 'Rechazada',
    };

    const handleConfirmReject = async (reason) => {
        await onReject(req._id, reason);
        setShowRejectModal(false);
    };

    return (
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:border-emerald-200 transition-all flex flex-col gap-5">

            {/* Header */}
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
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest border px-3 py-1 rounded-full ${statusStyles[req.requestStatus]}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {statusLabels[req.requestStatus]}
                </span>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-4 rounded-2xl">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Tipo de cuenta</p>
                    <p className="text-sm font-black text-gray-800">{req.accountType}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Moneda</p>
                    <p className="text-sm font-black text-gray-800">{req.currency}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl col-span-2">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Banco</p>
                    <p className="text-sm font-black text-gray-800">{req.bank || 'Banco Kinal'}</p>
                </div>
            </div>

            {req.requestStatus === 'REJECTED' && req.rejectionReason && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                    <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-1">Motivo de rechazo</p>
                    <p className="text-sm font-semibold text-red-700">{req.rejectionReason}</p>
                </div>
            )}

            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                {new Date(req.createdAt).toLocaleDateString('es-GT', { day: '2-digit', month: 'short', year: 'numeric' })}
            </p>

            {isPending && (
                <div className="grid grid-cols-2 gap-2 mt-auto">
                    <BaseButton
                        variant="primary"
                        size="sm"
                        fullWidth
                        disabled={processing}
                        loading={processing}
                        loadingText="Aprobando..."
                        onClick={() => onApprove(req._id)}
                        icon={<Check size={14} />}
                        className="text-[10px] uppercase tracking-widest font-black"
                    >
                        Aprobar
                    </BaseButton>
                    <BaseButton
                        variant="danger"
                        size="sm"
                        fullWidth
                        disabled={processing}
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
                title="Rechazar solicitud de cuenta"
                subtitle={`${req.user?.UserName ?? ''} ${req.user?.UserSurname ?? ''}`.trim()}
            />
        </div>
    );
};