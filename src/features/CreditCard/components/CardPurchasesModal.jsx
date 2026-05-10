import { useEffect } from "react";
import { usePurchaseStore } from "../../User/Store/adminStore";

export const CardPurchasesModal = ({ isOpen, onClose, card }) => {
    const { purchases, getPurchases, loading } = usePurchaseStore();

    useEffect(() => {
        if (isOpen && card) getPurchases(card._id);
    }, [isOpen, card]);

    if (!isOpen || !card) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
                <div className="p-6 bg-amber-600 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-black uppercase italic">Compras</h2>
                        <p className="text-amber-200 text-[10px] mt-1">**** **** **** {card.cardNumber?.slice(-4)}</p>
                    </div>
                    <button onClick={onClose} className="text-white text-2xl font-black">×</button>
                </div>

                <div className="overflow-y-auto max-h-96">
                    {loading ? (
                        <p className="text-center p-8 text-gray-400">Cargando...</p>
                    ) : purchases.length === 0 ? (
                        <p className="text-center p-8 text-gray-400 italic">Sin compras registradas</p>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left p-4 text-[10px] font-black text-gray-400 uppercase">Descripción</th>
                                    <th className="text-left p-4 text-[10px] font-black text-gray-400 uppercase">Comercio</th>
                                    <th className="text-right p-4 text-[10px] font-black text-gray-400 uppercase">Monto</th>
                                    <th className="text-right p-4 text-[10px] font-black text-gray-400 uppercase">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchases.map(p => (
                                    <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="p-4 font-bold text-sm text-gray-800">{p.description}</td>
                                        <td className="p-4 text-sm text-gray-500">{p.merchant}</td>
                                        <td className="p-4 text-right font-black text-sm text-amber-600">Q {p.amount?.toLocaleString()}</td>
                                        <td className="p-4 text-right text-sm text-gray-400">
                                            {new Date(p.date).toLocaleDateString('es-GT')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase">{purchases.length} compra(s)</span>
                    <span className="font-black text-amber-600">
                        Total: Q {purchases.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
};