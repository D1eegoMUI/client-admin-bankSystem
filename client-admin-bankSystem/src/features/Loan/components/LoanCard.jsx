export const LoanCard = ({ loan }) => {
    // Cálculo de porcentaje pagado
    const paidAmount = loan.amount - loan.remainingBalance;
    const progress = (paidAmount / loan.amount) * 100;

    const statusColors = {
        ACTIVE: "bg-emerald-100 text-emerald-700 border-emerald-200",
        PAID: "bg-blue-100 text-blue-700 border-blue-200",
        DEFAULTED: "bg-red-100 text-red-700 border-red-200"
    };

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${statusColors[loan.status]}`}>
                        {loan.status}
                    </span>
                    <h3 className="text-emerald-900 font-bold mt-2 italic">Crédito de Consumo</h3>
                </div>
                <p className="text-xs text-gray-400">Iniciado: {new Date(loan.startDate).toLocaleDateString()}</p>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progreso de pago</span>
                        <span className="font-bold text-emerald-600">{progress.toFixed(0)}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-emerald-500 transition-all duration-1000" 
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-2">
                    <div>
                        <p className="text-[10px] uppercase text-gray-400 font-bold">Monto Original</p>
                        <p className="text-lg font-bold text-emerald-900">Q{loan.amount.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase text-gray-400 font-bold">Saldo Pendiente</p>
                        <p className="text-lg font-bold text-emerald-600">Q{loan.remainingBalance.toLocaleString()}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-gray-500 bg-gray-50 p-2 rounded-lg">
                    <span>📅</span>
                    <span>Plazo: <strong>{loan.termMonths} meses</strong></span>
                    <span className="ml-auto">Tasa: <strong>{loan.interestRate}%</strong></span>
                </div>
            </div>
        </div>
    );
};