import { useEffect, useState } from "react";
import { useExtraFinancingStore, useAccountStore } from "../../User/Store/adminStore";

export const ExtraFinancingDetailModal = ({ isOpen, onClose, financing }) => {
    const { details, getDetails, payInstallment, loading } = useExtraFinancingStore();
    const { accounts, getAccounts } = useAccountStore();
    const [selectedAccount, setSelectedAccount] = useState("");
    const [paying, setPaying] = useState(false);

    useEffect(() => {
        if (isOpen && financing) {
            getDetails(financing._id);
            getAccounts();
            setSelectedAccount("");
        }
    }, [isOpen, financing]);

    const handlePay = async () => {
        if (!selectedAccount) return;
        try {
            setPaying(true);
            await payInstallment({ extraFinancingId: financing._id, accountId: selectedAccount });
            await getDetails(financing._id);
        } catch (e) {
            console.error("Error al pagar cuota:", e);
        } finally {
            setPaying(false);
        }
    };

    if (!isOpen || !financing) return null;

    const pending = details.filter(d => d.status === 'PENDING');
    const paid = details.filter(d => d.status === 'PAID');
    const nextInstallment = pending[0];

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
                <div className="p-6 bg-blue-700 text-white flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-black uppercase italic">Cuotas</h2>
                        <p className="text-blue-200 text-[10px] mt-1">{financing.description}</p>
                    </div>
                    <button onClick={onClose} className="text-white text-2xl font-black">×</button>
                </div>

                {/* Resumen */}
                <div className="grid grid-cols-3 gap-3 p-5 bg-blue-50 border-b border-blue-100">
                    <div className="text-center">
                        <p className="text-[9px] font-black text-gray-400 uppercase">Total</p>
                        <p className="text-base font-black text-blue-700">Q {financing.totalAmount?.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[9px] font-black text-gray-400 uppercase">Saldo</p>
                        <p className="text-base font-black text-red-500">Q {financing.remainingBalance?.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[9px] font-black text-gray-400 uppercase">Cuota</p>
                        <p className="text-base font-black text-gray-700">Q {financing.monthlyPayment?.toFixed(2)}</p>
                    </div>
                </div>

                {/* Pagar próxima cuota */}
                {nextInstallment && (
                    <div className="p-5 border-b border-gray-100 bg-amber-50">
                        <p className="text-[10px] font-black text-gray-400 uppercase mb-3">
                            Próxima cuota — #{nextInstallment.installmentNumber} — Q {nextInstallment.amount?.toFixed(2)}
                        </p>
                        <div className="flex gap-3">
                            <select
                                value={selectedAccount}
                                onChange={e => setSelectedAccount(e.target.value)}
                                className="flex-1 p-3 rounded-xl border-2 border-gray-100 font-bold text-sm"
                            >
                                <option value="">-- Cuenta de origen --</option>
                                {accounts.map(a => (
                                    <option key={a._id} value={a._id}>
                                        {a.accountNumber} — Q {a.balance?.toLocaleString()}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handlePay}
                                disabled={!selectedAccount || paying || loading}
                                className="px-5 bg-blue-700 text-white rounded-xl font-black text-[10px] uppercase disabled:opacity-50"
                            >
                                {paying ? '...' : 'Pagar'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Lista de cuotas */}
                <div className="overflow-y-auto max-h-64">
                    {loading ? (
                        <p className="text-center p-6 text-gray-400">Cargando...</p>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left p-3 text-[10px] font-black text-gray-400 uppercase">#</th>
                                    <th className="text-left p-3 text-[10px] font-black text-gray-400 uppercase">Monto</th>
                                    <th className="text-left p-3 text-[10px] font-black text-gray-400 uppercase">Vence</th>
                                    <th className="text-left p-3 text-[10px] font-black text-gray-400 uppercase">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.map(d => (
                                    <tr key={d._id} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="p-3 font-black text-sm text-gray-600">{d.installmentNumber}</td>
                                        <td className="p-3 font-bold text-sm text-gray-800">Q {d.amount?.toFixed(2)}</td>
                                        <td className="p-3 text-sm text-gray-400">{new Date(d.expectedDate).toLocaleDateString('es-GT')}</td>
                                        <td className="p-3">
                                            <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase ${d.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {d.status === 'PAID' ? 'Pagada' : 'Pendiente'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="p-4 border-t border-gray-100 flex justify-between text-[10px] font-black text-gray-400 uppercase">
                    <span>{paid.length}/{details.length} cuotas pagadas</span>
                    <span className={financing.status === 'PAID' ? 'text-emerald-600' : 'text-amber-600'}>
                        {financing.status}
                    </span>
                </div>
            </div>
        </div>
    );
};