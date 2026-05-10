import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAccountStore, useCreditCardPaymentStore } from "../../User/Store/adminStore";
import { SearchableSelect } from '../../../shared/components/ui/SearchableSelect';

export const PayCardModal = ({ isOpen, onClose, card }) => {
    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
    const accountValue = watch('accountId', '');
    const { accounts, getAccounts } = useAccountStore();
    const { payCard, loading } = useCreditCardPaymentStore();

    useEffect(() => {
        if (isOpen) {
            getAccounts();
            reset();
        }
    }, [isOpen, getAccounts, reset]);

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
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-[100] px-3 animate-fadeIn">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-emerald-100 animate-slideDown"
            >
                {/* Header Institucional */}
                <div
                    className="p-7 text-white"
                    style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}
                >
                    <h2 className="text-2xl font-bold tracking-tight">Pago de Tarjeta</h2>
                    <p className="text-emerald-100 text-xs opacity-90 uppercase font-black tracking-widest mt-1">
                        **** **** **** {card.cardNumber?.slice(-4)}
                    </p>
                </div>

                <div className="p-8 space-y-6">
                    {/* Resumen de Estados (Visualizador rápido) */}
                    <div className="grid grid-cols-2 gap-4 bg-emerald-50/50 border border-emerald-100 rounded-[1.5rem] p-5">
                        <div className="border-r border-emerald-100">
                            <p className="text-[10px] font-black text-emerald-800/50 uppercase tracking-widest mb-1">Deuda Total</p>
                            <p className="text-lg font-black text-red-600 italic">Q {card.totalDebt?.toLocaleString()}</p>
                        </div>
                        <div className="pl-4 text-right">
                            <p className="text-[10px] font-black text-emerald-800/50 uppercase tracking-widest mb-1">Cupo Disp.</p>
                            <p className="text-lg font-black text-emerald-700 italic">Q {card.availableCredit?.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* Selector de Cuenta de Origen */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">Cuenta de Origen</label>
                            <SearchableSelect
                                options={accounts.map(a => ({
                                    value: a._id,
                                    label: `${a.accountNumber} — Q${a.balance?.toLocaleString()}`
                                }))}
                                value={accountValue}
                                onChange={val => setValue('accountId', val)}
                                placeholder="Buscar número de cuenta..."
                            />
                            {errors.accountId && <span className="text-red-500 text-[10px] font-bold mt-1 ml-1">Seleccione una cuenta con fondos</span>}
                        </div>

                        {/* Input de Monto */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">Monto a Abonar (GTQ)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-emerald-600">Q</span>
                                <input
                                    {...register("amount", {
                                        required: true,
                                        min: 1,
                                        max: card.totalDebt
                                    })}
                                    type="number"
                                    step="0.01"
                                    placeholder={`Máx. Q ${card.totalDebt?.toLocaleString()}`}
                                    className={`w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 outline-none font-black text-gray-700 transition-all ${errors.amount ? "border-red-200 bg-red-50" : "border-gray-100 focus:border-emerald-500 bg-gray-50/50"
                                        }`}
                                />
                            </div>
                            {errors.amount && <span className="text-red-500 text-[10px] font-bold mt-1 ml-1">Ingrese un monto válido (Máx. Q{card.totalDebt})</span>}
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex justify-end items-center gap-4 pt-6 border-t border-gray-50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 text-emerald-700 font-bold uppercase text-[10px] tracking-widest hover:bg-emerald-50 rounded-xl transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-10 py-3.5 bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 uppercase text-[10px] tracking-widest"
                        >
                            {loading ? 'Procesando...' : 'Confirmar Pago'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};