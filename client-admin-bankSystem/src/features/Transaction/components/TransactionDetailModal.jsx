export const TransactionDetailModal = ({ tx, onClose }) => {
    return (
        <div className="fixed inset-0 bg-emerald-950/60 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-t-[2.5rem] rounded-b-xl shadow-2xl w-full max-w-sm overflow-hidden border border-emerald-100">
                
                {/* Visual del "Recibo" */}
                <div className="bg-emerald-600 p-8 text-center text-white relative">
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span className="text-emerald-600 font-bold">✓</span>
                    </div>
                    <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-1">Transferencia Exitosa</p>
                    <h2 className="text-3xl font-black">{tx.currency} {tx.amount.toLocaleString()}</h2>
                </div>

                <div className="p-8 pt-10 space-y-4">
                    <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                        <span className="text-xs text-gray-400 font-bold uppercase">Referencia</span>
                        <span className="text-xs font-mono font-bold text-emerald-900">{tx._id.toUpperCase()}</span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-bold uppercase">Cuenta Origen</span>
                            <span className="text-sm font-bold text-gray-700">****{tx.originAccount?.slice(-4) || 'N/A'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-bold uppercase">Descripción</span>
                            <span className="text-sm font-medium text-gray-700">{tx.description}</span>
                        </div>
                    </div>

                    {/* Línea de corte estética */}
                    <div className="py-4 flex items-center gap-2">
                        <div className="h-px flex-1 bg-gray-100"></div>
                        <span className="text-[10px] text-gray-300 font-bold italic font-serif">Kinal Bank</span>
                        <div className="h-px flex-1 bg-gray-100"></div>
                    </div>

                    <button 
                        onClick={onClose}
                        className="w-full py-3 bg-emerald-50 text-emerald-700 font-black rounded-xl hover:bg-emerald-100 transition-colors"
                    >
                        Cerrar Comprobante
                    </button>
                </div>
            </div>
        </div>
    );
};