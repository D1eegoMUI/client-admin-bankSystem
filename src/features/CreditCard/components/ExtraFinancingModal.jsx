import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useExtraFinancingStore } from "../../User/Store/adminStore";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const ExtraFinancingModal = ({ isOpen, onClose, card }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: { installments: 12, interestRate: 1.5 }
    });
    const { createFinancing, loading } = useExtraFinancingStore();

    useEffect(() => {
        if (isOpen) reset({ installments: 12, interestRate: 1.5 });
    }, [isOpen, reset]);

    const onSubmit = async (data) => {
        try {
            await createFinancing({
                creditCard: card._id,
                description: data.description,
                totalAmount: Number(data.totalAmount),
                installments: Number(data.installments),
                interestRate: Number(data.interestRate)
            });
            showSuccess("Financiamiento creado con éxito");
            onClose();
        } catch (e) {
            console.error("Error al crear financiamiento:", e);
            showError("Error al crear financiamiento");
        }
    };

    if (!isOpen || !card) return null;

    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-[110] px-3 animate-fadeIn">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-emerald-100 animate-slideDown"
            >
                {/* Header Institucional Kinal Bank */}
                <div
                    className="p-7 text-white"
                    style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}
                >
                    <h2 className="text-2xl font-bold tracking-tight">Nuevo Financiamiento</h2>
                    <p className="text-emerald-100 text-xs opacity-90 uppercase font-black tracking-widest mt-1">
                        Tarjeta: **** {card.cardNumber?.slice(-4)}
                    </p>
                </div>

                <div className="p-8 space-y-5">
                    {/* Campo: Descripción */}
                    <div className="flex flex-col">
                        <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">Concepto / Descripción</label>
                        <input
                            {...register("description", { required: true })}
                            type="text"
                            placeholder="Ej. Compra de mobiliario"
                            className={`px-4 py-3.5 rounded-2xl border-2 outline-none font-bold transition-all ${errors.description ? "border-red-200 bg-red-50" : "border-gray-100 focus:border-emerald-500 bg-gray-50/50 text-emerald-900"
                                }`}
                        />
                    </div>

                    {/* Campo: Monto */}
                    <div className="flex flex-col">
                        <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">Monto a Financiar (GTQ)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-emerald-600">Q</span>
                            <input
                                {...register("totalAmount", { required: true, min: 1 })}
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 bg-gray-50/50 outline-none font-black text-emerald-900"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Campo: Plazo */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">Plazo</label>
                            <select
                                {...register("installments", { required: true })}
                                className="px-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 bg-gray-50/50 outline-none font-bold text-emerald-900 cursor-pointer"
                            >
                                <option value={12}>12 meses</option>
                                <option value={24}>24 meses</option>
                                <option value={36}>36 meses</option>
                                <option value={48}>48 meses</option>
                            </select>
                        </div>

                        {/* Campo: Tasa */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">Interés (%)</label>
                            <div className="relative">
                                <input
                                    {...register("interestRate", { required: true, min: 0 })}
                                    type="number"
                                    step="0.1"
                                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 bg-gray-50/50 outline-none font-black text-emerald-900"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-emerald-600">%</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer de Acciones */}
                    <div className="flex justify-end items-center gap-4 pt-6 border-t border-gray-50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 text-emerald-700 font-bold uppercase text-[10px] tracking-widest hover:bg-emerald-50 rounded-xl transition-colors"
                        >
                            Cerrar  
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-10 py-3.5 bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 uppercase text-[10px] tracking-widest"
                        >
                            {loading ? 'Procesando...' : 'Crear Plan'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};