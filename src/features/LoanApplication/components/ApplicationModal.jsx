import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLoanAppStore, useAccountStore } from '../../User/Store/adminStore';
import { showSuccess, showError } from "../../../shared/utils/toast.js";


export const ApplicationModal = ({ onClose }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: { termMonths: 12, interestRate: 12 }
    });

    const { saveApplication, loading } = useLoanAppStore();
    const { accounts, getAccounts } = useAccountStore();

    useEffect(() => { getAccounts(); }, []);

    const amount = watch('amount');
    const termMonths = watch('termMonths');
    const interestRate = watch('interestRate');
    const monthlyIncome = watch('monthlyIncome');

    const monthlyRate = (Number(interestRate) / 100) / 12;
    const estimatedQuota = amount && termMonths && monthlyRate > 0
        ? Number(amount) * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -Number(termMonths))))
        : 0;

    const debtRatio = monthlyIncome && estimatedQuota
        ? (estimatedQuota / Number(monthlyIncome)) * 100
        : 0;

    const onSubmit = async (data) => {
        try {
            await saveApplication({
                account: data.account,
                amount: Number(data.amount),
                termMonths: Number(data.termMonths),
                interestRate: Number(data.interestRate),
                monthlyIncome: Number(data.monthlyIncome),
            });
            showSuccess("Solicitud de préstamo enviada con éxito");
            onClose();
        } catch (e) {
            showError("Error al enviar solicitud");
            console.error('Error al enviar solicitud:', e);
        }
    };

    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-emerald-100">

                <div className="p-6 text-white" style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}>
                    <h2 className="text-2xl font-bold italic">Kinal <span className="font-light">Credit Application</span></h2>
                    <p className="text-emerald-100 text-xs">Inicia tu proceso de financiamiento hoy mismo</p>
                </div>

                <div className="p-8 space-y-5">

                    {/* Cuenta para desembolso */}
                    <div className="flex flex-col">
                        <label className="text-xs font-black text-gray-400 uppercase mb-1">Cuenta para el desembolso</label>
                        <select
                            {...register('account', { required: true })}
                            className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none font-bold"
                        >
                            <option value="">Selecciona tu cuenta principal...</option>
                            {accounts.map(a => (
                                <option key={a._id} value={a._id}>
                                    {a.accountNumber} — Q{a.balance?.toLocaleString()}
                                </option>
                            ))}
                        </select>
                        {errors.account && <span className="text-red-500 text-[10px] mt-1">Selecciona una cuenta</span>}
                    </div>

                    {/* Ingresos mensuales */}
                    <div className="flex flex-col">
                        <label className="text-xs font-black text-gray-400 uppercase mb-1">Ingresos Mensuales (GTQ)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">Q</span>
                            <input
                                type="number"
                                min="1"
                                step="0.01"
                                {...register('monthlyIncome', { required: true, min: 1 })}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none bg-emerald-50/30 transition-all font-bold"
                                placeholder="0.00"
                            />
                        </div>
                        {errors.monthlyIncome && <span className="text-red-500 text-[10px] mt-1">Campo requerido</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Monto */}
                        <div className="flex flex-col">
                            <label className="text-xs font-black text-gray-400 uppercase mb-1">Monto Solicitado</label>
                            <input
                                type="number"
                                min="100"
                                step="0.01"
                                {...register('amount', { required: true, min: 100 })}
                                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none font-bold"
                                placeholder="Min. Q100"
                            />
                            {errors.amount && <span className="text-red-500 text-[10px] mt-1">Mínimo Q100</span>}
                        </div>

                        {/* Plazo */}
                        <div className="flex flex-col">
                            <label className="text-xs font-black text-gray-400 uppercase mb-1">Plazo (Meses)</label>
                            <select
                                {...register('termMonths', { required: true })}
                                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none font-bold"
                            >
                                {[6, 12, 24, 36, 48, 60].map(m => (
                                    <option key={m} value={m}>{m} meses</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Tasa de interés */}
                    <div className="flex flex-col">
                        <label className="text-xs font-black text-gray-400 uppercase mb-1">Tasa de Interés (% anual)</label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            {...register('interestRate', { required: true })}
                            className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none font-bold"
                        />
                    </div>

                    {/* Estimación */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                            <p className="text-[10px] uppercase font-black text-emerald-600 mb-1">Cuota Mensual Est.</p>
                            <p className="text-2xl font-black text-emerald-900">
                                Q{estimatedQuota > 0 ? estimatedQuota.toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '--.--'}
                            </p>
                        </div>
                        <div className={`p-4 rounded-2xl border ${debtRatio > 30 ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                            <p className="text-[10px] uppercase font-black text-gray-500 mb-1">Relación Deuda/Ingreso</p>
                            <p className={`text-2xl font-black ${debtRatio > 30 ? 'text-red-600' : 'text-gray-800'}`}>
                                {debtRatio > 0 ? `${debtRatio.toFixed(1)}%` : '--.--'}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button type="button" onClick={onClose} className="px-6 py-2 text-gray-400 font-semibold hover:text-emerald-700 transition-colors">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-100 hover:scale-[1.02] transition-all disabled:opacity-50"
                        >
                            {loading ? 'Enviando...' : 'Enviar Solicitud'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};