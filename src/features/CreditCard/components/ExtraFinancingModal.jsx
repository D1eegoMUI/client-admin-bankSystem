import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useExtraFinancingStore } from "../../User/Store/adminStore";

export const ExtraFinancingModal = ({ isOpen, onClose, card }) => {
    const { register, handleSubmit, reset } = useForm({ defaultValues: { installments: 12, interestRate: 1.5 } });
    const { createFinancing, loading } = useExtraFinancingStore();

    useEffect(() => {
        if (isOpen) reset({ installments: 12, interestRate: 1.5 });
    }, [isOpen]);

    const onSubmit = async (data) => {
        try {
            await createFinancing({
                creditCard: card._id,
                description: data.description,
                totalAmount: Number(data.totalAmount),
                installments: Number(data.installments),
                interestRate: Number(data.interestRate)
            });
            onClose();
        } catch (e) {
            console.error("Error al crear financiamiento:", e);
        }
    };

    if (!isOpen || !card) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                <div className="p-6 bg-blue-700 text-white">
                    <h2 className="text-xl font-black uppercase italic">Extra <span className="text-blue-200">Financiamiento</span></h2>
                    <p className="text-blue-300 text-[10px] mt-1">**** **** **** {card.cardNumber?.slice(-4)}</p>
                </div>
                <div className="p-8 space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">Descripción</label>
                        <input {...register("description", { required: true })} type="text" placeholder="Ej. Compra de electrodomésticos" className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">Monto Total (GTQ)</label>
                        <input {...register("totalAmount", { required: true, min: 1 })} type="number" step="0.01" className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">Plazo (cuotas)</label>
                        <select {...register("installments", { required: true })} className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold">
                            <option value={12}>12 meses</option>
                            <option value={24}>24 meses</option>
                            <option value={36}>36 meses</option>
                            <option value={48}>48 meses</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">Tasa de Interés (%)</label>
                        <input {...register("interestRate", { required: true, min: 0 })} type="number" step="0.1" className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold" />
                    </div>
                    <div className="flex gap-2 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 font-bold text-gray-400 uppercase text-[10px]">Cancelar</button>
                        <button type="submit" disabled={loading} className="flex-1 bg-blue-700 text-white py-3 rounded-xl font-black uppercase text-[10px] disabled:opacity-50">
                            {loading ? 'Procesando...' : 'Crear Financiamiento'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};