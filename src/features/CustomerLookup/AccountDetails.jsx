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
                <div className="space-y-3">
                    {safeLoans.length > 0 ? safeLoans.map((loan) => (
                        <div key={loan._id} className="p-4 bg-emerald-50 rounded-2xl flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="font-black text-emerald-900 text-sm">
                                    Q {(Number(loan.amount) || 0).toLocaleString()}
                                </span>
                                <span className="text-[10px] font-black px-2 py-1 rounded-full bg-blue-100 text-blue-700 uppercase">
                                    {loan.status}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Saldo: <span className="text-red-600 font-bold">Q {(Number(loan.remainingBalance) || 0).toLocaleString()}</span></span>
                                <span>{loan.interestRate}% · {loan.termMonths} meses</span>
                            </div>
                        </div>
                    )) : (
                        <p className="text-gray-400 text-center py-6">No tiene préstamos registrados</p>
                    )}
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
                    <div className="space-y-3">
                        {safeTransactions.map((tx) => (
                            <div key={tx._id} className="p-4 bg-gray-50 rounded-2xl flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-full ${typeBadge(tx.type)}`}>
                                        {tx.type}
                                    </span>
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-full ${statusBadge(tx.status)}`}>
                                        {tx.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-black text-sm text-gray-800">
                                        Q {(Number(tx.amountInGTQ) || 0).toLocaleString()}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString('es-GT') : '—'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>Origen: {tx.originAccount?.accountNumber || '—'}</span>
                                    <span>Destino: {tx.destinationAccount?.accountNumber || '—'}</span>
                                </div>
                            </div>
                        ))}
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
                    <div className="space-y-3">
                        {safePurchases.map((p) => (
                            <div key={p._id} className="p-4 bg-purple-50 rounded-2xl flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-sm text-gray-800">
                                        {p.merchant || p.description || '—'}
                                    </span>
                                    {p.status && (
                                        <span className={`text-[10px] font-black px-2 py-1 rounded-full ${statusBadge(p.status)}`}>
                                            {p.status}
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-black text-purple-700 text-sm">
                                        Q {(Number(p.amount) || 0).toLocaleString()}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {p.createdAt ? new Date(p.createdAt).toLocaleDateString('es-GT') : '—'}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-400">
                                    Tarjeta: •••• {String(p.cardId || '').slice(-4)}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-center py-6">No tiene compras registradas</p>
                )}
            </section>

        </main>
    );
};