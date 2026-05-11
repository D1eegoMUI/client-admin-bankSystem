import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLoanStore, useAccountStore, useUserStore } from '../../User/Store/adminStore';
import { SearchableSelect } from '../../../shared/components/ui/SearchableSelect';
import { showSuccess, showError } from "../../../shared/utils/toast.js";


export const LoanModal = ({ onClose }) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: { interestRate: 12, termMonths: 12 }
    });

    const borrowerValue = watch('borrower', '');
    const accountValue = watch('account', '');
    const amount = watch('amount');
    const termMonths = watch('termMonths');
    const interestRate = watch('interestRate');

    const { createLoan, loading } = useLoanStore();
    const { accounts, getAccounts } = useAccountStore();
    const { users, getUsers } = useUserStore();

    useEffect(() => {
        getAccounts();
        getUsers({});
    }, []);

    // Limpiar cuenta al cambiar usuario
    useEffect(() => {
        setValue('account', '');
    }, [borrowerValue]);

    const filteredAccounts = accounts.filter(a => {
        const accountUserId = a.user?._id || a.user?.uid || a.user;
        return accountUserId === borrowerValue;
    });

    const monthlyRate = (Number(interestRate) / 100) / 12;
    const estimatedQuota = amount && termMonths && monthlyRate > 0
        ? Number(amount) * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -Number(termMonths))))
        : 0;

    const onSubmit = async (data) => {
        try {
            await createLoan({
                borrower: data.borrower,
                account: data.account,
                amount: Number(data.amount),
                termMonths: Number(data.termMonths),
                interestRate: Number(data.interestRate),
            });
            showSuccess("Préstamo creado con éxito");
            onClose();
        } catch (e) {
            showError("Error al crear préstamo");
            console.error("Error al crear préstamo:", e);
        }
    };

    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-emerald-100">

                <div className="p-6 text-white" style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}>
                    <h2 className="text-2xl font-bold">Nuevo Préstamo</h2>
                    <p className="text-emerald-100 text-sm">Otorgamiento directo en sucursal</p>
                </div>

                <div className="p-8 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-xs font-black text-gray-400 uppercase mb-1">Cliente (Prestatario)</label>
                            <SearchableSelect
                                options={users.map(u => ({
                                    value: u.uid,
                                    label: `${u.UserName} ${u.UserSurname}`
                                }))}
                                value={borrowerValue}
                                onChange={val => setValue('borrower', val)}
                                placeholder="Buscar cliente..."
                            />
                            {errors.borrower && <span className="text-red-500 text-[10px] mt-1">Campo requerido</span>}
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-xs font-black text-gray-400 uppercase mb-1">Cuenta para acreditar fondos</label>
                            <SearchableSelect
                                options={filteredAccounts.map(a => ({
                                    value: a._id,
                                    label: `${a.accountNumber} — Q${a.balance?.toLocaleString()}`
                                }))}
                                value={accountValue}
                                onChange={val => setValue('account', val)}
                                placeholder={
                                    !borrowerValue
                                        ? "Primero selecciona un cliente"
                                        : filteredAccounts.length === 0
                                            ? "Sin cuentas disponibles"
                                            : "Buscar número de cuenta..."
                                }
                            />
                            {!borrowerValue && <p className="text-[10px] text-amber-500 mt-1">Selecciona un cliente para ver sus cuentas disponibles</p>}
                            {errors.account && <span className="text-red-500 text-[10px] mt-1">Campo requerido</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-black text-gray-400 uppercase mb-1">Monto (GTQ)</label>
                            <input type="number" min="100" step="0.01" {...register('amount', { required: true, min: 100 })} className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none font-bold text-lg" placeholder="0.00" />
                            {errors.amount && <span className="text-red-500 text-[10px] mt-1">Mínimo Q100</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-black text-gray-400 uppercase mb-1">Plazo (Meses)</label>
                            <select {...register('termMonths', { required: true })} className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none font-bold">
                                {[6, 12, 24, 36, 48, 60].map(m => (
                                    <option key={m} value={m}>{m} meses</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-black text-gray-400 uppercase mb-1">Tasa de Interés (% anual)</label>
                            <input type="number" step="0.1" min="0" {...register('interestRate', { required: true })} className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none font-bold" />
                        </div>

                        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex flex-col justify-center">
                            <p className="text-[10px] uppercase font-black text-emerald-600 mb-1">Cuota Mensual Est.</p>
                            <p className="text-2xl font-black text-emerald-900">
                                Q{estimatedQuota > 0 ? estimatedQuota.toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '--.--'}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button type="button" onClick={onClose} className="px-6 py-2 text-emerald-700 font-semibold hover:bg-emerald-50 rounded-xl">Cancelar</button>
                        <button type="submit" disabled={loading} className="px-10 py-3 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all disabled:opacity-50">
                            {loading ? 'Procesando...' : 'Confirmar Préstamo'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};