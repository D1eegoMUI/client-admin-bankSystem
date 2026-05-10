import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCardStore, useUserStore } from "../../User/Store/adminStore";

export const CreditCardModal = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset } = useForm();
    const saveCredit = useCardStore(s => s.saveCreditCard);
    const { users, getUsers } = useUserStore();

useEffect(() => {
    if (isOpen) {
        getUsers();
        reset({ type: 'CLASSIC' }); 
    }
}, [isOpen, getUsers, reset]);

    const onSubmit = async (data) => {
        try {
            await saveCredit({
                user: data.user,
                type: data.type,
                creditLimit: Number(data.creditLimit)
            });
            reset();
            onClose();
        } catch (e) {
            console.error("Error al emitir crédito:", e);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                <div className="p-6 bg-slate-800 text-white">
                    <h2 className="text-xl font-black uppercase italic">Nueva <span className="text-amber-400">Línea de Crédito</span></h2>
                </div>
                <div className="p-8 space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">Seleccionar Cliente</label>
                        <select {...register("user", { required: true })} className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold">
                            <option value="">-- Cliente --</option>
                            {users.map(u => <option key={u.uid} value={u.uid}>{u.UserName} {u.UserSurname}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">Categoría</label>
                        <select {...register("type")} className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold">
                            <option value="CLASSIC">CLASSIC</option>
                            <option value="GOLD">GOLD</option>
                            <option value="PLATINUM">PLATINUM</option>
                            <option value="BLACK">BLACK</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase">Límite (GTQ)</label>
                        <input {...register("creditLimit", { required: true })} type="number" className="w-full p-3 rounded-xl border-2 border-gray-100 font-bold" />
                    </div>
                    <div className="flex gap-2 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 font-bold text-gray-400 uppercase text-[10px]">Cerrar</button>
                        <button type="submit" className="flex-1 bg-slate-800 text-white py-3 rounded-xl font-black uppercase text-[10px]">Emitir Crédito</button>
                    </div>
                </div>
            </form>
        </div>
    );
};