import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCardStore, useUserStore } from "../../User/Store/adminStore";
import { SearchableSelect } from '../../../shared/components/ui/SearchableSelect';
import { showSuccess, showError } from "../../../shared/utils/toast.js";


export const CreditCardModal = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
    const userValue = watch('user', '');
    const { saveCreditCard, loading } = useCardStore();
    const { users, getUsers } = useUserStore();

    useEffect(() => {
        if (isOpen) {
            getUsers({});
            reset({ type: 'CLASSIC', creditLimit: 5000 });
        }
    }, [isOpen, getUsers, reset]);

    const onSubmit = async (data) => {
        try {
            await saveCreditCard({
                user: data.user,
                type: data.type,
                creditLimit: Number(data.creditLimit)
            });
            showSuccess("Tarjeta de crédito emitida con éxito");
            reset();
            onClose();
        } catch (e) {
            showError("Error al emitir tarjeta de crédito");
            console.error("Error al emitir crédito:", e);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3 animate-fadeIn">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden border border-emerald-100"
            >
                {/* Header con el gradiente de Kinal Bank */}
                <div
                    className="p-7 text-white"
                    style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}
                >
                    <h2 className="text-2xl font-bold tracking-tight">Emisión de Crédito</h2>
                    <p className="text-emerald-100 text-xs opacity-90 uppercase font-black tracking-widest mt-1">
                        Kinal Bank Business
                    </p>
                </div>

                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 gap-5">

                        {/* Selector de Cliente */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Cliente (Titular)</label>
                            <SearchableSelect
                                options={users.map(u => ({
                                    value: u.uid,
                                    label: `${u.UserName} ${u.UserSurname}`
                                }))}
                                value={userValue}
                                onChange={val => setValue('user', val)}
                                placeholder="Buscar cliente..."
                            />
                            {errors.user && <span className="text-red-500 text-[10px] font-bold mt-1 ml-1">Debe asignar un titular</span>}
                        </div>

                        {/* Fila: Categoría y Límite */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Categoría</label>
                                <select
                                    {...register('type', { required: true })}
                                    className="px-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 outline-none font-bold bg-gray-50/50"
                                >
                                    <option value="CLASSIC">CLASSIC</option>
                                    <option value="GOLD">GOLD</option>
                                    <option value="PLATINUM">PLATINUM</option>
                                    <option value="BLACK">BLACK</option>
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1">Límite (GTQ)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-emerald-600">Q</span>
                                    <input
                                        type="number"
                                        {...register('creditLimit', { required: true, min: 1000 })}
                                        className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 outline-none font-black text-gray-700 bg-gray-50/50"
                                        placeholder="0.00"
                                    />
                                </div>
                                {errors.creditLimit && <span className="text-red-500 text-[10px] font-bold mt-1 ml-1">Mínimo Q1,000.00</span>}
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
                            {loading ? 'Emitiendo...' : 'Autorizar Tarjeta'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};