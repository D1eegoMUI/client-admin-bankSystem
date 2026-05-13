import React from 'react';
import { Landmark, TrendingDown, CreditCard, ArrowLeftRight, ShoppingBag } from 'lucide-react';

export const AccountDetail = ({
    accounts = [],
    loans = [],
    cards = [],
    transactions = [],
    purchases = [],
}) => {

    const bgColors = {
        emerald: "bg-emerald-50 text-emerald-600",
        red: "bg-red-50 text-red-600",
        blue: "bg-blue-50 text-blue-600"
    };

    const SummaryCard = ({ icon, title, value, color }) => (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4 shadow-sm">
            <div className={`p-4 rounded-2xl ${bgColors[color]}`}>{icon}</div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">{title}</p>
                <p className="text-xl font-black">{value}</p>
            </div>
        </div>
    );

    const safeAccounts = Array.isArray(accounts) ? accounts : [];
    const safeLoans = Array.isArray(loans) ? loans : [];
    const safeCards = Array.isArray(cards) ? cards : [];
    const safeTransactions = Array.isArray(transactions) ? transactions : [];
    const safePurchases = Array.isArray(purchases) ? purchases : [];

    const totalBalance = safeAccounts.reduce((sum, acc) => sum + (Number(acc?.balance) || 0), 0);
    const totalDebt = safeLoans.reduce((sum, loan) => sum + (Number(loan?.remainingBalance) || 0), 0);

    // Badge de tipo de transacción
    const typeBadge = (type) => {
        const map = {
            DEPOSIT: 'bg-emerald-100 text-emerald-700',
            WITHDRAWAL: 'bg-red-100 text-red-700',
            TRANSFER: 'bg-blue-100 text-blue-700',
            SERVICE_PAYMENT: 'bg-yellow-100 text-yellow-700',
            LOAN_PAYMENT: 'bg-purple-100 text-purple-700',
        };
        return map[type] || 'bg-gray-100 text-gray-600';
    };

    const statusBadge = (status) => {
        const map = {
            COMPLETED: 'bg-emerald-100 text-emerald-700',
            FAILED: 'bg-red-100 text-red-700',
            REVERTED: 'bg-yellow-100 text-yellow-700',
        };
        return map[status] || 'bg-gray-100 text-gray-600';
    };

    return (
        <main className="space-y-8">

            {/* RESUMEN */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SummaryCard
                    icon={<Landmark size={24} />}
                    title="Saldo Total en Cuentas"
                    value={safeAccounts.length > 0 ? `Q ${totalBalance.toLocaleString()}` : "Sin cuentas"}
                    color="emerald"
                />
                <SummaryCard
                    icon={<TrendingDown size={24} />}
                    title="Deuda Total"
                    value={safeLoans.length > 0 ? `Q ${totalDebt.toLocaleString()}` : "Sin préstamos"}
                    color="red"
                />
                <SummaryCard
                    icon={<CreditCard size={24} />}
                    title="Tarjetas Activas"
                    value={safeCards.length}
                    color="blue"
                />
            </div>

            {/* CUENTAS */}
            <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-emerald-100">
                <h3 className="text-xl font-black text-emerald-900 mb-6">Cuentas Bancarias</h3>
                {safeAccounts.length > 0 ? (
                    <div className="space-y-4">
                        {safeAccounts.map((acc) => (
                            <div key={acc._id} className="flex justify-between p-4 bg-emerald-50 rounded-2xl">
                                <div>
                                    <p className="font-bold text-emerald-900">{acc.accountNumber}</p>
                                    <p className="text-xs text-gray-500">{acc.accountType} · {acc.bank}</p>
                                </div>
                                <p className="font-black text-emerald-600">
                                    Q {(Number(acc.balance) || 0).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-center py-6">No tiene cuentas registradas</p>
                )}
            </section>

            {/* PRÉSTAMOS */}
            <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-emerald-100">
                <h3 className="text-xl font-black text-emerald-900 mb-6">Estado de Préstamos</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs font-black text-gray-400 uppercase border-b">
                                <th className="pb-4">Monto</th>
                                <th className="pb-4">Saldo</th>
                                <th className="pb-4">Tasa</th>
                                <th className="pb-4">Plazo</th>
                                <th className="pb-4">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {safeLoans.length > 0 ? (
                                safeLoans.map((loan) => (
                                    <tr key={loan._id} className="border-b">
                                        <td className="py-4">Q {(Number(loan.amount) || 0).toLocaleString()}</td>
                                        <td className="py-4 text-red-600">Q {(Number(loan.remainingBalance) || 0).toLocaleString()}</td>
                                        <td className="py-4">{loan.interestRate}%</td>
                                        <td className="py-4">{loan.termMonths} Meses</td>
                                        <td className="py-4 text-blue-600">{loan.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-400">
                                        No tiene préstamos registrados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ── NUEVO: TRANSACCIONES ── */}
            <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-emerald-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                        <ArrowLeftRight size={20} />
                    </div>
                    <h3 className="text-xl font-black text-emerald-900">
                        Historial de Transacciones
                    </h3>
                    <span className="ml-auto text-xs font-black text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                        {safeTransactions.length} registros
                    </span>
                </div>

                {safeTransactions.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black text-gray-400 uppercase border-b">
                                    <th className="pb-3">Tipo</th>
                                    <th className="pb-3">Monto</th>
                                    <th className="pb-3">Origen</th>
                                    <th className="pb-3">Destino</th>
                                    <th className="pb-3">Estado</th>
                                    <th className="pb-3">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {safeTransactions.map((tx) => (
                                    <tr key={tx._id} className="border-b hover:bg-gray-50 transition-colors">
                                        <td className="py-3">
                                            <span className={`text-[10px] font-black px-2 py-1 rounded-full ${typeBadge(tx.type)}`}>
                                                {tx.type}
                                            </span>
                                        </td>
                                        <td className="py-3 font-black text-sm">
                                            Q {(Number(tx.amountInGTQ) || 0).toLocaleString()}
                                        </td>
                                        <td className="py-3 text-xs text-gray-500">
                                            {tx.originAccount?.accountNumber || '—'}
                                        </td>
                                        <td className="py-3 text-xs text-gray-500">
                                            {tx.destinationAccount?.accountNumber || '—'}
                                        </td>
                                        <td className="py-3">
                                            <span className={`text-[10px] font-black px-2 py-1 rounded-full ${statusBadge(tx.status)}`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-xs text-gray-400">
                                            {tx.createdAt
                                                ? new Date(tx.createdAt).toLocaleDateString('es-GT')
                                                : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400 text-center py-6">No tiene transacciones registradas</p>
                )}
            </section>

            {/* ── NUEVO: COMPRAS CON TARJETA ── */}
            <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-emerald-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
                        <ShoppingBag size={20} />
                    </div>
                    <h3 className="text-xl font-black text-emerald-900">
                        Compras con Tarjeta
                    </h3>
                    <span className="ml-auto text-xs font-black text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                        {safePurchases.length} registros
                    </span>
                </div>

                {safePurchases.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black text-gray-400 uppercase border-b">
                                    <th className="pb-3">Comercio</th>
                                    <th className="pb-3">Monto</th>
                                    <th className="pb-3">Tarjeta</th>
                                    <th className="pb-3">Estado</th>
                                    <th className="pb-3">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {safePurchases.map((p) => (
                                    <tr key={p._id} className="border-b hover:bg-gray-50 transition-colors">
                                        <td className="py-3 font-bold text-sm text-gray-800">
                                            {p.merchant || p.description || '—'}
                                        </td>
                                        <td className="py-3 font-black text-sm text-purple-700">
                                            Q {(Number(p.amount) || 0).toLocaleString()}
                                        </td>
                                        <td className="py-3 text-xs text-gray-500">
                                            •••• {String(p.cardId || '').slice(-4)}
                                        </td>
                                        <td className="py-3">
                                            <span className={`text-[10px] font-black px-2 py-1 rounded-full ${statusBadge(p.status)}`}>
                                                {p.status || '—'}
                                            </span>
                                        </td>
                                        <td className="py-3 text-xs text-gray-400">
                                            {p.createdAt
                                                ? new Date(p.createdAt).toLocaleDateString('es-GT')
                                                : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400 text-center py-6">No tiene compras registradas</p>
                )}
            </section>

        </main>
    );
};