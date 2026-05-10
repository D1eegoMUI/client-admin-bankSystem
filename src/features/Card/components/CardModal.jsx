import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSaveCard } from "../hooks/useSaveCard";
import { useAccountStore } from "../../User/Store/adminStore";

export const CardModal = ({ isOpen, onClose, cardData = null }) => {
    const { register, handleSubmit, reset } = useForm();
    const { saveCardData } = useSaveCard();
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
                reset({ brand: 'VISA' });
            }
        }
    }, [isOpen, getAccounts, cardData, reset]);

    const onSubmit = async (data) => {
        try {
            const accountFound = accounts.find(a => a._id === data.account);
            const finalUserId = accountFound?.user?._id || accountFound?.user;

            await saveCardData({ ...data, user: finalUserId });
            onClose();
        } catch (error) {
            console.error("Error al emitir tarjeta de débito:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-emerald-950/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="p-6 bg-emerald-700 text-white">
                    <h2 className="text-xl font-black uppercase italic">Emitir <span className="text-emerald-200">Tarjeta Débito</span></h2>
                </div>
                <div className="p-8 space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">Cuenta Vinculada</label>
                        <select {...register("account", { required: true })} className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 font-bold">
                            <option value="">Seleccione cuenta...</option>
                            {accounts?.map(acc => (
                                <option key={acc._id} value={acc._id}>{acc.accountNumber} - {acc.user?.UserName}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">Nombre en el Plástico</label>
                        <input {...register("holderName", { required: true })} type="text" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 font-bold uppercase" />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-3 text-gray-400 font-black uppercase text-[10px]">Cancelar</button>
                        <button type="submit" className="flex-[2] bg-emerald-600 text-white py-3 rounded-xl font-black uppercase text-[10px]">Generar Débito</button>
                    </div>
                </div>
            </form>
        </div>
    );
};