import React from 'react';

export const TransactionTable = ({ transactions }) => {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-emerald-50/50 border-b border-emerald-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-black text-emerald-900 uppercase">Fecha</th>
                            <th className="px-6 py-4 text-xs font-black text-emerald-900 uppercase">Tipo / Concepto</th>
                            <th className="px-6 py-4 text-xs font-black text-emerald-900 uppercase">Estado</th>
                            <th className="px-6 py-4 text-xs font-black text-emerald-900 uppercase text-right">Monto</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {transactions.map((tx) => (
                            <tr key={tx._id} className="hover:bg-emerald-50/30 transition-colors cursor-pointer">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(tx.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-[10px] text-gray-400">
                                        {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                                            tx.type === 'DEPOSIT' ? 'bg-emerald-100' : 'bg-gray-100'
                                        }`}>
                                            {tx.type === 'DEPOSIT' ? '💰' : '💸'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-emerald-950">{tx.type.replace('_', ' ')}</p>
                                            <p className="text-xs text-gray-500 truncate max-w-[200px]">{tx.description || 'Sin descripción'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-black border ${
                                        tx.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                        tx.status === 'FAILED' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                    }`}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <p className={`text-sm font-black ${
                                        tx.type === 'DEPOSIT' ? 'text-emerald-600' : 'text-gray-900'
                                    }`}>
                                        {tx.type === 'DEPOSIT' ? '+' : '-'} {tx.currency} {tx.amount.toLocaleString()}
                                    </p>
                                    <p className="text-[10px] text-gray-400 italic">Q{tx.amountInGTQ.toLocaleString()}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};