import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePurchaseStore } from "../../User/Store/adminStore";
import { useCardStore, useAccountStore } from "../../User/Store/adminStore";

export const PurchaseModal = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset, watch } = useForm({ defaultValues: { type: 'CREDIT' } });
    const { createPurchase, loading } = usePurchaseStore();
    const { cards, getCreditCards } = useCardStore();
    const { accounts, getAccounts } = useAccountStore();

    const type = watch("type");

    useEffect(() => {
        if (isOpen) {
            getCreditCards();
            getAccounts();
            reset({ type: 'CREDIT' });
        }
    }, [isOpen]);

    const onSubmit = async (data) => {
        try {
            await createPurchase({
                description: data.description,
                amount: Number(data.amount),
                type: data.type,
                cardId: data.cardId,
                merchant: data.merchant || 'Comercio Local'
            });
            onClose();
        } catch (e) {
            console.error("Error al registrar compra:", e);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                <div className="p-6 bg-violet-700 text-white">
                    <h2 className="text-xl font-black uppercase italic">Nueva <span className="text-violet-200">Compra</span></h2>
                </div>
                <div className="p-8 space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">Tipo de Tarjeta</label>
                        <select {...register("type", { required: true })} className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold">
                            <option value="CREDIT">Crédito</option>
                            <option value="DEBIT">Débito</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">
                            {type === 'CREDIT' ? 'Tarjeta de Crédito' : 'Cuenta de Débito'}
                        </label>
                        <select {...register("cardId", { required: true })} className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold">
                            <option value="">-- Seleccionar --</option>
                            {type === 'CREDIT'
                                ? cards.filter(c => c.entityType === 'CREDIT').map(c => (
                                    <option key={c._id} value={c._id}>
                                        **** {c.cardNumber?.slice(-4)} — {c.type}
                                    </option>
                                ))
                                : accounts.map(a => (
                                    <option key={a._id} value={a._id}>
                                        {a.accountNumber} — Q{a.balance}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">Descripción</label>
                        <input {...register("description", { required: true })} type="text" placeholder="Ej: Supermercado La Torre" className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold" />
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">Comercio (opcional)</label>
                        <input {...register("merchant")} type="text" placeholder="Comercio Local" className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold" />
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">Monto (GTQ)</label>
                        <input {...register("amount", { required: true, min: 0.01 })} type="number" step="0.01" className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold" />
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 font-bold text-gray-400 uppercase text-[10px]">Cancelar</button>
                        <button type="submit" disabled={loading} className="flex-1 bg-violet-700 text-white py-3 rounded-xl font-black uppercase text-[10px] disabled:opacity-50">
                            {loading ? 'Procesando...' : 'Registrar Compra'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};