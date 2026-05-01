import React from 'react';
import { User, ArrowRight } from 'lucide-react';

export const TransactionTable = ({ transactions }) => {
    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-emerald-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-emerald-50/50 border-b border-emerald-100">
                        <tr>
                            <th className="px-6 py-5 text-[10px] font-black text-emerald-900 uppercase tracking-widest">ID / Fecha</th>
                            <th className="px-6 py-5 text-[10px] font-black text-emerald-900 uppercase tracking-widest">Participantes (Origen → Destino)</th>
                            <th className="px-6 py-5 text-[10px] font-black text-emerald-900 uppercase tracking-widest">Tipo</th>
                            <th className="px-6 py-5 text-[10px] font-black text-emerald-900 uppercase tracking-widest">Estado</th>
                            <th className="px-6 py-5 text-[10px] font-black text-emerald-900 uppercase tracking-widest text-right">Monto</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {transactions.map((tx) => (
                            <tr key={tx._id} className="hover:bg-emerald-50/20 transition-colors cursor-pointer group">
                                <td className="px-6 py-4">
                                    <p className="text-xs font-black text-emerald-600 group-hover:underline">{tx._id}</p>
                                    <p className="text-[10px] text-gray-400 font-medium">
                                        {new Date(tx.createdAt).toLocaleDateString()} - {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-900">{tx.sender.name}</span>
                                            <span className="text-[9px] text-gray-400">{tx.sender.dpi}</span>
                                        </div>
                                        <ArrowRight size={14} className="text-emerald-400" />
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-900">{tx.receiver.name}</span>
                                            <span className="text-[9px] text-gray-400">{tx.receiver.dpi}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[9px] font-black tracking-tighter">
                                        {tx.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${
                                            tx.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-red-500'
                                        }`} />
                                        <span className="text-[10px] font-bold text-gray-600">{tx.status}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <p className="text-sm font-black text-emerald-950">
                                        {tx.currency} {tx.amount.toLocaleString()}
                                    </p>
                                    <p className="text-[10px] text-emerald-500/70 font-mono">≈ Q{tx.amountInGTQ.toLocaleString()}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};