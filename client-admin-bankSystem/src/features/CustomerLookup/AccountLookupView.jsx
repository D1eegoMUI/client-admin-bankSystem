import React, { useState } from 'react';
import { Search, User, CreditCard, Landmark, Briefcase, Phone, MapPin, BadgeDollarSign, TrendingDown, TrendingUp, RefreshCw, FileText, CircleDollarSign } from 'lucide-react';
import { CardItem } from '../Card/components/CardItem';

const TransactionIcon = ({ type }) => {
    switch (type) {
        case 'DEPOSIT': return <TrendingUp size={18} />;
        case 'WITHDRAWAL': return <TrendingDown size={18} />;
        case 'TRANSFER': return <RefreshCw size={18} />;
        case 'CARD_PAYMENT': return <CreditCard size={18} />;
        case 'LOAN_PAYMENT': return <FileText size={18} />;
        default: return <CircleDollarSign size={18} />;
    }
};

export const AccountLookupView = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [result, setResult] = useState(null);

    // Movimos el MOCK de transacciones aquí para que sea fácil de acceder
    const TRANSACTIONS_MOCK = [
        { type: 'DEPOSIT', amount: 5000, currency: 'GTQ', description: 'Depósito en Ventanilla', status: 'COMPLETED', createdAt: '2024-04-28T10:00:00Z' },
        { type: 'TRANSFER', amount: 1200, currency: 'GTQ', description: 'Transferencia a Terceros', status: 'COMPLETED', createdAt: '2024-04-27T15:30:00Z' },
        { type: 'CARD_PAYMENT', amount: 450.25, currency: 'GTQ', description: 'Pago Supermercado', status: 'COMPLETED', createdAt: '2024-04-26T18:45:00Z' },
        { type: 'LOAN_PAYMENT', amount: 2500, currency: 'GTQ', description: 'Pago Cuota Préstamo', status: 'COMPLETED', createdAt: '2024-04-25T09:15:00Z' }
    ];

    const mockData = {
        user: {
            UserName: "Gerardo",
            UserSurname: "David",
            UserDPI: "1234567890101",
            UserEmail: "gerardo.david@kinal.edu.gt",
            UserAddress: "Calle 15, Zona 10, Ciudad de Guatemala",
            UserPhone: "5544-3322",
            UserJob: "Senior Software Developer",
            UserIncome: 18500.00,
            UserStatus: "ACTIVE",
            UserRol: "USER"
        },
        accounts: [
            { accountNumber: "4455-6677-88", accountType: "MONETARIA", currency: "GTQ", balance: 25000.50, bank: "Banco Kinal" }
        ],
        cards: [
            { cardNumber: "4556123488990011", holderName: "GERARDO DAVID", expirationDate: "12/28", brand: "VISA", type: "CREDIT", isApproved: true },
            { cardNumber: "5566123488990022", holderName: "GERARDO DAVID", expirationDate: "06/30", brand: "MASTERCARD", type: "DEBIT", isApproved: true }
        ],
        loans: [
            { amount: 50000, remainingBalance: 32500, interestRate: 12, termMonths: 24, status: "ACTIVE", startDate: "2024-01-15" }
        ],
        // Agregamos las transacciones al objeto de resultado
        transactions: TRANSACTIONS_MOCK
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery === mockData.user.UserDPI) {
            setResult(mockData);
        } else {
            setResult("NOT_FOUND");
        }
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Cabecera y Buscador */}
            <header className="bg-white p-8 rounded-[2rem] shadow-sm border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-black text-emerald-950">Consulta Integral</h1>
                    <p className="text-emerald-600 font-medium">Localiza clientes por DPI o número de cuenta</p>
                </div>
                <form onSubmit={handleSearch} className="flex w-full md:w-auto bg-gray-100 p-2 rounded-2xl border-2 border-transparent focus-within:border-emerald-500 transition-all">
                    <input
                        type="text"
                        placeholder="Buscar DPI (1234567890101)..."
                        className="bg-transparent px-4 py-2 outline-none w-full md:w-80 font-bold"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition-all shadow-md">
                        <Search size={20} />
                    </button>
                </form>
            </header>

            {result && result !== "NOT_FOUND" && (
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    {/* ... Panel Izquierdo (Mismo código que tienes) ... */}
                    <aside className="xl:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-emerald-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[4rem] -mr-6 -mt-6 z-0" />
                            <div className="relative z-10 text-center">
                                <div className="w-24 h-24 bg-emerald-100 rounded-3xl mx-auto flex items-center justify-center text-emerald-600 mb-4 shadow-inner">
                                    <User size={48} strokeWidth={1.5} />
                                </div>
                                <h2 className="text-xl font-black text-emerald-900">{result.user.UserName} {result.user.UserSurname}</h2>
                                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
                                    {result.user.UserStatus}
                                </span>
                            </div>
                            <div className="mt-8 space-y-4">
                                <InfoRow icon={<Briefcase size={16} />} label="Ocupación" value={result.user.UserJob} />
                                <InfoRow icon={<Phone size={16} />} label="Contacto" value={result.user.UserPhone} />
                                <InfoRow icon={<MapPin size={16} />} label="Dirección" value={result.user.UserAddress} />
                                <div className="pt-4 border-t border-gray-50">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Ingresos Mensuales</p>
                                    <p className="text-xl font-black text-emerald-600">Q {result.user.UserIncome.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* PANEL DERECHO */}
                    <main className="xl:col-span-3 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <SummaryCard icon={<Landmark size={24} />} title="Saldo en Cuenta" value={`Q ${result.accounts[0].balance}`} color="emerald" />
                            <SummaryCard icon={<TrendingDown size={24} />} title="Deuda en Préstamos" value={`Q ${result.loans[0].remainingBalance}`} color="red" />
                            <SummaryCard icon={<CreditCard size={24} />} title="Tarjetas Activas" value={result.cards.length} color="blue" />
                        </div>

                        {/* Tarjetas */}
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <h3 className="text-xl font-black text-emerald-900">Tarjetas Vinculadas</h3>
                                <div className="h-px flex-1 bg-gray-100"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {result.cards.map(card => (
                                    <CardItem key={card.cardNumber} card={card} />
                                ))}
                            </div>
                        </section>

                        {/* Tabla de Préstamos */}
                        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-emerald-100">
                            <h3 className="text-xl font-black text-emerald-900 mb-6">Estado de Préstamos</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                            <th className="pb-4">Monto Original</th>
                                            <th className="pb-4">Saldo Pendiente</th>
                                            <th className="pb-4">Tasa</th>
                                            <th className="pb-4">Plazo</th>
                                            <th className="pb-4">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm font-bold">
                                        {result.loans.map((loan, idx) => (
                                            <tr key={idx} className="border-b border-gray-50 last:border-0">
                                                <td className="py-4">Q {loan.amount.toLocaleString()}</td>
                                                <td className="py-4 text-red-600">Q {loan.remainingBalance.toLocaleString()}</td>
                                                <td className="py-4">{loan.interestRate}%</td>
                                                <td className="py-4">{loan.termMonths} Meses</td>
                                                <td className="py-4 text-blue-600">{loan.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Historial de Actividad CORREGIDO */}
                        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-emerald-100">
                            <h3 className="text-xl font-black text-emerald-900 mb-6">Historial de Actividad</h3>
                            <div className="space-y-4">
                                {/* Usamos result.transactions que definimos en el mockData */}
                                {result.transactions.map((tx, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl ${tx.type === 'DEPOSIT' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                                <TransactionIcon type={tx.type} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-emerald-950">{tx.description}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase">{tx.type}</p>
                                            </div>
                                        </div>
                                        <div className="text-right font-black text-emerald-950">
                                            Q {tx.amount.toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>
                </div>
            )}
        </div>
    );
};

// Componentes internos auxiliares
const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="text-emerald-500 mt-1">{icon}</div>
        <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">{label}</p>
            <p className="text-xs font-bold text-emerald-900">{value}</p>
        </div>
    </div>
);

const SummaryCard = ({ icon, title, value, color }) => {
    const bgColors = { emerald: "bg-emerald-50 text-emerald-600", red: "bg-red-50 text-red-600", blue: "bg-blue-50 text-blue-600" };
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4 shadow-sm">
            <div className={`p-4 rounded-2xl ${bgColors[color]}`}>{icon}</div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">{title}</p>
                <p className="text-xl font-black">{value}</p>
            </div>
        </div>
    );
};