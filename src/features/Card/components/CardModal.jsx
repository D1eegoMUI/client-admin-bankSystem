import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSaveCard } from "../hooks/useSaveCard";
import { useAccountStore } from "../../User/Store/adminStore";
import { SearchableSelect } from "../../../shared/components/ui/SearchableSelect";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const CardModal = ({ isOpen, onClose, cardData = null }) => {
    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
    const accountValue = watch('account', '');
    const { saveCardData, loading } = useSaveCard();
    const { accounts, getAccounts } = useAccountStore();

    useEffect(() => {
        if (isOpen) {
            getAccounts();
            if (cardData) {
                reset({
                    account: cardData.account?._id || cardData.account,
                    holderName: cardData.holderName,
                    brand: cardData.brand || 'VISA'
                });
            } else {
                reset({ brand: 'VISA', holderName: '' });
            }
        }
    }, [isOpen, getAccounts, cardData, reset]);

    const onSubmit = async (data) => {
        try {
            const accountFound = accounts.find(a => a._id === data.account);
            const finalUserId = accountFound?.user?._id || accountFound?.user;

            await saveCardData({ ...data, user: finalUserId });
            onClose();
            showSuccess("Tarjeta de débito emitida con éxito");
        } catch (error) {
            console.error("Error al emitir tarjeta de débito:", error);
            showError("Error al emitir tarjeta de débito");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-[100] px-3 animate-fadeIn">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-emerald-100 animate-slideDown"
            >
                {/* Header con el gradiente institucional de Kinal Bank */}
                <div
                    className="p-7 text-white"
                    style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}
                >
                    <h2 className="text-2xl font-bold tracking-tight">Emisión de Débito</h2>
                    <p className="text-emerald-100 text-xs opacity-90 uppercase font-black tracking-widest mt-1">
                        Vinculación de cuenta monetaria
                    </p>
                </div>

                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 gap-5">

                        {/* Selector de Cuenta */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">Cuenta Vinculada</label>
                            <SearchableSelect
                                options={accounts.map(a => ({
                                    value: a._id,
                                    label: `${a.accountNumber} — ${a.user?.UserName ?? ''} ${a.user?.UserSurname ?? ''}`.trim()
                                }))}
                                value={accountValue}
                                onChange={val => {
                                    setValue('account', val);
                                    const found = accounts.find(a => a._id === val);
                                    if (found?.user) {
                                        setValue('holderName', `${found.user.UserName} ${found.user.UserSurname}`.toUpperCase());
                                    }
                                }} placeholder="Buscar número de cuenta..."
                            />
                            {errors.account && <span className="text-red-500 text-[10px] font-bold mt-1 ml-1">Debe seleccionar una cuenta activa</span>}
                        </div>

                        {/* Nombre en el Plástico */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">Nombre en el Plástico</label>
                            <input
                                {...register("holderName", { required: true })}
                                type="text"
                                placeholder="NOMBRE TAL CUAL APARECERÁ"
                                className={`px-4 py-3.5 rounded-2xl border-2 outline-none font-black uppercase transition-all ${errors.holderName ? "border-red-200 bg-red-50" : "border-gray-100 focus:border-emerald-500 bg-gray-50/50"
                                    }`}
                            />
                            {errors.holderName && <span className="text-red-500 text-[10px] font-bold mt-1 ml-1">El nombre del titular es requerido</span>}
                        </div>

                        {/* Red de Pago */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">Franquicia / Red</label>
                            <select
                                {...register("brand")}
                                className="px-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 outline-none font-bold bg-gray-50/50"
                            >
                                <option value="VISA">VISA</option>
                                <option value="MASTERCARD">MASTERCARD</option>
                            </select>
                        </div>
                    </div>

                    {/* Footer de Acciones */}
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
                            {loading ? 'Procesando...' : 'Generar Tarjeta'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};