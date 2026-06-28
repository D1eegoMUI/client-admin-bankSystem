import { useState } from 'react';
import { BaseModal } from '../../../shared/components/ui/BaseModal.jsx';
import { BaseButton } from '../../../shared/components/ui/BaseButton.jsx';

/**
 * RejectReasonModal — Modal compartido para capturar el motivo de rechazo
 * Se usa tanto para CardRequest como para CardStatusRequest.
 *
 * @param {boolean}  isOpen
 * @param {function} onClose
 * @param {function} onConfirm   - recibe el motivo (string) ya validado
 * @param {boolean}  processing  - estado de carga mientras se envía el rechazo
 * @param {string}   title
 * @param {string}   subtitle
 */
export const RejectReasonModal = ({
    isOpen,
    onClose,
    onConfirm,
    processing,
    title = 'Rechazar solicitud',
    subtitle,
}) => {
    const [reason, setReason] = useState('');

    const handleClose = () => {
        setReason('');
        onClose();
    };

    const handleConfirm = async () => {
        if (!reason.trim()) return;
        await onConfirm(reason.trim());
        setReason('');
    };

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={handleClose}
            title={title}
            subtitle={subtitle}
            maxWidth="max-w-md"
        >
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">
                        Motivo del rechazo
                    </label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Explícale al cliente por qué se rechaza su solicitud..."
                        rows={4}
                        maxLength={500}
                        autoFocus
                        className="w-full px-4 py-3 rounded-xl border-2 border-red-100 focus:border-red-400 outline-none text-sm font-medium resize-none"
                    />
                    <p className="text-[10px] text-gray-400 font-bold text-right mt-1">
                        {reason.length}/500
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <BaseButton
                        variant="secondary"
                        size="md"
                        fullWidth
                        disabled={processing}
                        onClick={handleClose}
                        className="text-[10px] uppercase tracking-widest font-black"
                    >
                        Cancelar
                    </BaseButton>
                    <BaseButton
                        variant="danger"
                        size="md"
                        fullWidth
                        disabled={processing || !reason.trim()}
                        loading={processing}
                        loadingText="Rechazando..."
                        onClick={handleConfirm}
                        className="text-[10px] uppercase tracking-widest font-black"
                    >
                        Confirmar rechazo
                    </BaseButton>
                </div>
            </div>
        </BaseModal>
    );
};