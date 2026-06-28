import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePurchaseStore, useCardStore } from "../../User/Store/adminStore";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const PurchaseModal = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset, watch } = useForm({ defaultValues: { type: 'CREDIT' } });
    const { createPurchase, loading } = usePurchaseStore();
    const { creditCards, cards: debitCards, getCreditCards, getDebitCards } = useCardStore();

    const type = watch("type");

    // Cargar solo el tipo necesario cuando cambia la selección
    useEffect(() => {
        if (!isOpen) return;
        if (type === 'CREDIT') getCreditCards();
        else getDebitCards();
    }, [isOpen, type]);

    useEffect(() => {
        if (isOpen) reset({ type: 'CREDIT' });
    }, [isOpen]);

    const onSubmit = async (data) => {
        try {
            let cardId    = data.cardId;
            let debitCard = undefined;

            if (data.type === 'DEBIT') {
                const parsed = JSON.parse(data.cardId);
                cardId    = parsed.accountId;
                debitCard = parsed.cardId;
            }

            await createPurchase({
                description: data.description,
                amount: Number(data.amount),
                type: data.type,
                cardId,
                ...(debitCard ? { debitCard } : {}),
                merchant: data.merchant || 'Comercio Local',
            });
            showSuccess("Compra registrada con éxito");
            onClose();
        } catch (e) {
            showError(e?.response?.data?.message || "Error al registrar compra");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                <div className="p-6 bg-violet-700 text-white">
                    <h2 className="text-xl font-black uppercase italic">
                        Nueva <span className="text-violet-200">Compra</span>
                    </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-4">
                    {/* Tipo */}
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Tipo de Tarjeta
                        </label>
                        <select
                            {...register("type", { required: true })}
                            className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold mt-1"
                        >
                            <option value="CREDIT">Crédito</option>
                            <option value="DEBIT">Débito</option>
                        </select>
                    </div>

                    {/* Selector dinámico según tipo */}
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            {type === 'CREDIT' ? 'Tarjeta de Crédito' : 'Tarjeta de Débito'}
                        </label>

                        {type === 'CREDIT' ? (
                            <select
                                {...register("cardId", { required: true })}
                                className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold mt-1"
                            >
                                <option value="">-- Seleccionar tarjeta --</option>
                                {creditCards.map(c => (
                                    <option key={c._id} value={c._id}>
                                        **** {c.cardNumber?.slice(-4)} — {c.type}
                                        {c.user ? ` · ${c.user.UserName ?? ''} ${c.user.UserSurname ?? ''}`.trimEnd() : ''}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <select
                                {...register("cardId", { required: true })}
                                className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold mt-1"
                            >
                                <option value="">-- Seleccionar tarjeta --</option>
                                {debitCards.map(c => (
                                    <option
                                        key={c._id}
                                        value={JSON.stringify({
                                            accountId: c.account?._id ?? c.account,
                                            cardId: c._id,
                                        })}
                                    >
                                        **** {c.cardNumber?.slice(-4)} — {c.brand ?? 'DÉBITO'}
                                        {c.account?.accountNumber ? ` · ${c.account.accountNumber}` : ''}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Descripción
                        </label>
                        <input
                            {...register("description", { required: true })}
                            type="text"
                            placeholder="Ej: Supermercado La Torre"
                            className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold mt-1"
                        />
                    </div>

                    {/* Comercio */}
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Comercio (opcional)
                        </label>
                        <input
                            {...register("merchant")}
                            type="text"
                            placeholder="Comercio Local"
                            className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold mt-1"
                        />
                    </div>

                    {/* Monto */}
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Monto (GTQ)
                        </label>
                        <input
                            {...register("amount", { required: true, min: 0.01 })}
                            type="number"
                            step="0.01"
                            className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold mt-1"
                        />
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 font-bold text-gray-400 uppercase text-[10px] py-3"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-violet-700 text-white py-3 rounded-xl font-black uppercase text-[10px] disabled:opacity-50"
                        >
                            {loading ? 'Procesando...' : 'Registrar Compra'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};