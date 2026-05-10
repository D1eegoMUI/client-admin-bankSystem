import * as api from '../../../shared/Api/admin.js';
import React, { useState } from 'react';
import { User, AlertTriangle, ChevronDown, ChevronUp, CreditCard, X, CheckCircle2 } from 'lucide-react';
import { useLoanStore, useAccountStore } from '../../User/Store/adminStore';

export const LoanCard = ({ loan, isAdmin }) => {
    const paidAmount = loan.amount - loan.remainingBalance;
    const progress = (paidAmount / loan.amount) * 100;

    const [showPayModal, setShowPayModal] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [payResult, setPayResult] = useState(null);

    const { payLoanInstallment, loading } = useLoanStore();
    const [loanDetails, setLoanDetails] = useState([]);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const { accounts, getAccounts } = useAccountStore();

    const statusColors = {
        ACTIVE: "bg-emerald-100 text-emerald-700 border-emerald-200",
        PAID: "bg-blue-100 text-blue-700 border-blue-200",
        DEFAULTED: "bg-red-100 text-red-700 border-red-200 animate-pulse"
    };

    const handleToggleDetails = async () => {
        if (!showDetails && loanDetails.length === 0) {
            setLoadingDetails(true);
            try {
                const res = await api.getLoanDetails(loan._id);
                setLoanDetails(res.data.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoadingDetails(false);
            }
        }
        setShowDetails(prev => !prev);
    };

    const handleOpenPayModal = () => {
        getAccounts();
        setPayResult(null);
        setSelectedAccount('');
        setShowPayModal(true);
    };

    const handlePay = async () => {
        if (!selectedAccount) return;
        try {
            const res = await payLoanInstallment(loan._id, selectedAccount);
            setPayResult({ success: true, message: res.message });
            // Refrescar cuotas si están abiertas
            if (showDetails) fetchLoanDetails(loan._id);
        } catch (e) {
            setPayResult({ success: false, message: e.response?.data?.message || 'Error al procesar el pago' });
        }
    };

    return (
        <>
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:border-emerald-200 transition-all group relative overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                            <User size={24} />
                        </div>
                        <div>
                            <h3 className="text-emerald-950 font-black text-lg leading-tight">
                                {loan.borrower?.UserName} {loan.borrower?.UserSurname}
                            </h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                {loan.borrower?.UserEmail}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className={`text-[9px] font-black px-3 py-1 rounded-full border ${statusColors[loan.status]}`}>
                            {loan.status}
                        </span>
                        <p className="text-[10px] font-mono text-gray-400">ID: {loan._id}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Progreso */}
                    <div>
                        <div className="flex justify-between text-[11px] mb-2">
                            <span className="font-bold text-gray-400 uppercase tracking-tighter">Recuperación de Capital</span>
                            <span className="font-black text-emerald-600">{progress.toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-1000 ${loan.status === 'DEFAULTED' ? 'bg-red-500' : 'bg-emerald-500'}`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Montos */}
                    <div className="grid grid-cols-2 gap-6 bg-gray-50 p-5 rounded-3xl border border-gray-100">
                        <div>
                            <p className="text-[9px] uppercase text-gray-400 font-black mb-1 tracking-widest">Crédito Otorgado</p>
                            <p className="text-xl font-black text-emerald-900">Q{loan.amount.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] uppercase text-gray-400 font-black mb-1 tracking-widest">Saldo por Cobrar</p>
                            <p className={`text-xl font-black ${loan.status === 'DEFAULTED' ? 'text-red-600' : 'text-emerald-600'}`}>
                                Q{loan.remainingBalance.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-4 text-[10px] font-bold text-gray-400 italic">
                            <span>{loan.termMonths} Meses</span>
                            <span>•</span>
                            <span>Tasa: {loan.interestRate}%</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleToggleDetails}
                                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-1"
                            >
                                {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                Cuotas
                            </button>
                            {loan.status === 'ACTIVE' && (
                                <button
                                    onClick={handleOpenPayModal}
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-emerald-100 flex items-center gap-2 hover:bg-emerald-700 transition-all"
                                >
                                    <CreditCard size={12} /> Pagar Cuota
                                </button>
                            )}
                            {loan.status === 'DEFAULTED' && (
                                <button className="px-4 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-red-100 flex items-center gap-2">
                                    <AlertTriangle size={12} /> Contactar
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Tabla de cuotas */}
                    {showDetails && (
                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-[10px] font-black uppercase text-gray-400 mb-3 tracking-widest">Tabla de Amortización</p>
                            <div className="overflow-x-auto rounded-2xl border border-gray-100">
                                <table className="w-full text-[11px]">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-black text-gray-400 uppercase">#</th>
                                            <th className="px-4 py-3 text-right font-black text-gray-400 uppercase">Cuota</th>
                                            <th className="px-4 py-3 text-right font-black text-gray-400 uppercase">Capital</th>
                                            <th className="px-4 py-3 text-right font-black text-gray-400 uppercase">Interés</th>
                                            <th className="px-4 py-3 text-center font-black text-gray-400 uppercase">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {loanDetails.map(d => (
                                            <tr key={d._id} className={d.status === 'PAID' ? 'bg-emerald-50/40' : ''}>
                                                <td className="px-4 py-3 font-bold text-gray-500">{d.installmentNumber}</td>
                                                <td className="px-4 py-3 text-right font-black text-gray-800">Q{d.amount.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-right text-gray-500">Q{d.principal.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-right text-gray-500">Q{d.interest.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`px-2 py-1 rounded-full text-[9px] font-black border ${
                                                        d.status === 'PAID'
                                                            ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                                            : d.status === 'OVERDUE'
                                                            ? 'bg-red-100 text-red-700 border-red-200'
                                                            : 'bg-amber-100 text-amber-700 border-amber-200'
                                                    }`}>
                                                        {d.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de pago */}
            {showPayModal && (
                <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-emerald-100">
                        <div className="p-6 text-white flex justify-between items-center" style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}>
                            <div>
                                <h2 className="text-xl font-bold">Pagar Cuota</h2>
                                <p className="text-emerald-100 text-xs">
                                    {loan.borrower?.UserName} {loan.borrower?.UserSurname}
                                </p>
                            </div>
                            <button onClick={() => setShowPayModal(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Info del préstamo */}
                            <div className="bg-emerald-50 rounded-2xl p-4 grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-[9px] font-black uppercase text-emerald-600 mb-1">Saldo Restante</p>
                                    <p className="text-lg font-black text-emerald-900">Q{loan.remainingBalance.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase text-emerald-600 mb-1">Plazo</p>
                                    <p className="text-lg font-black text-emerald-900">{loan.termMonths} meses</p>
                                </div>
                            </div>

                            {/* Selección de cuenta */}
                            <div className="flex flex-col">
                                <label className="text-xs font-black text-gray-400 uppercase mb-2">Cuenta a debitar</label>
                                <select
                                    value={selectedAccount}
                                    onChange={e => setSelectedAccount(e.target.value)}
                                    className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none font-bold"
                                >
                                    <option value="">Seleccionar cuenta...</option>
                                    {accounts.map(a => (
                                        <option key={a._id} value={a._id}>
                                            {a.accountNumber} — Q{a.balance?.toLocaleString()}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Resultado */}
                            {payResult && (
                                <div className={`flex items-center gap-3 p-3 rounded-2xl text-sm font-bold ${
                                    payResult.success
                                        ? 'bg-emerald-50 text-emerald-700'
                                        : 'bg-red-50 text-red-600'
                                }`}>
                                    {payResult.success
                                        ? <CheckCircle2 size={16} />
                                        : <AlertTriangle size={16} />}
                                    {payResult.message}
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-2 border-t">
                                <button
                                    onClick={() => setShowPayModal(false)}
                                    className="px-6 py-2 text-emerald-700 font-semibold hover:bg-emerald-50 rounded-xl"
                                >
                                    Cerrar
                                </button>
                                <button
                                    onClick={handlePay}
                                    disabled={loading || !selectedAccount || payResult?.success}
                                    className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Procesando...' : 'Confirmar Pago'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};