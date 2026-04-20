export const ApplicationStatusCard = ({ app }) => {
    const statusStyles = {
        PENDING: "bg-amber-50 text-amber-600 border-amber-100 ring-amber-500",
        UNDER_REVIEW: "bg-blue-50 text-blue-600 border-blue-100 ring-blue-500",
        APPROVED: "bg-emerald-50 text-emerald-600 border-emerald-100 ring-emerald-500",
        REJECTED: "bg-red-50 text-red-600 border-red-100 ring-red-500",
        CANCELLED: "bg-gray-50 text-gray-600 border-gray-100 ring-gray-500"
    };

    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                    <span className={`w-fit px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider mb-2 ${statusStyles[app.status]}`}>
                        ● {app.status.replace('_', ' ')}
                    </span>
                    <h3 className="text-emerald-900 font-bold">Solicitud #{app._id?.slice(-6)}</h3>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-400">Enviada el</p>
                    <p className="text-xs font-bold text-gray-600">{new Date(app.createdAt).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4 mb-4">
                <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Monto</p>
                    <p className="text-lg font-black text-emerald-900">Q{app.amount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Plazo</p>
                    <p className="text-lg font-black text-emerald-900">{app.termMonths} Meses</p>
                </div>
            </div>

            {app.reviewDate && (
                <div className="flex items-center gap-2 pt-3 border-t border-dashed border-gray-200">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <p className="text-[10px] text-gray-500 font-medium">
                        Revisado por analista el {new Date(app.reviewDate).toLocaleDateString()}
                    </p>
                </div>
            )}
            
            {app.status === 'PENDING' && (
                <button className="w-full mt-4 py-2 text-xs font-bold text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                    Cancelar Solicitud
                </button>
            )}
        </div>
    );
};