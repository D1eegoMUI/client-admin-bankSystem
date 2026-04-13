// src/views/AccountsView.jsx
export const AccountsView = () => {
    const accounts = [
        { id: 1, name: "Cuenta de Ahorros", number: "**** 4590", balance: "Q 12,450.00" },
        { id: 2, name: "Cuenta Corriente", number: "**** 1288", balance: "Q 3,120.50" }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <header>
                <h2 className="text-2xl font-bold text-emerald-900">Mis Cuentas</h2>
                <p className="text-gray-500 text-sm">Gestiona tus fondos y estados de cuenta.</p>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
                {accounts.map(acc => (
                    <div key={acc.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-xs font-bold text-emerald-600 uppercase">{acc.name}</p>
                        <p className="text-gray-400 text-xs mb-4">{acc.number}</p>
                        <p className="text-2xl font-bold text-gray-900">{acc.balance}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};