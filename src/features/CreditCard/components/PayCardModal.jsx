import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAccountStore, useCreditCardPaymentStore } from "../../User/Store/adminStore";

export const PayCardModal = ({ isOpen, onClose, card }) => {
    const { register, handleSubmit, reset } = useForm();
    const { accounts, getAccounts } = useAccountStore();
    const { payCard, loading } = useCreditCardPaymentStore();

    useEffect(() => {
        if (isOpen) {
            getAccounts();
            reset();
        }
    }, [isOpen]);

    const onSubmit = async (data) => {
        try {
            await payCard({
                creditCardId: card._id,
                accountId: data.accountId,
                amount: Number(data.amount)
            });
            onClose();
        } catch (e) {
            console.error("Error al pagar tarjeta:", e);
        }
    };

    if (!isOpen || !card) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                <div className="p-6 bg-slate-800 text-white">
                    <h2 className="text-xl font-black uppercase italic">Pagar <span className="text-amber-400">Tarjeta</span></h2>
                    <p className="text-slate-400 text-[10px] mt-1">**** **** **** {card.cardNumber?.slice(-4)}</p>
                </div>
                <div className="p-8 space-y-4">

                    <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-2xl p-4">
                        <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase">Deuda Actual</p>
                            <p className="text-lg font-black text-red-500">Q {card.totalDebt?.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-gray-400 uppercase">Disponible</p>
                            <p className="text-lg font-black text-emerald-600">Q {card.availableCredit?.toLocaleString()}</p>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">Cuenta de Origen</label>
                        <select {...register("accountId", { required: true })} className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold">
                            <option value="">-- Seleccionar cuenta --</option>
                            {accounts.map(a => (
                                <option key={a._id} value={a._id}>
                                    {a.accountNumber} — Q {a.balance?.toLocaleString()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">Monto a Pagar (GTQ)</label>
                        <input
                            {...register("amount", { required: true, min: 1, max: card.totalDebt })}
                            type="number"
                            step="0.01"
                            placeholder={`Máx. Q ${card.totalDebt?.toLocaleString()}`}
                            className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold"
                        />
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 font-bold text-gray-400 uppercase text-[10px]">Cancelar</button>
                        <button type="submit" disabled={loading} className="flex-1 bg-slate-800 text-white py-3 rounded-xl font-black uppercase text-[10px] disabled:opacity-50">
                            {loading ? 'Procesando...' : 'Confirmar Pago'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};