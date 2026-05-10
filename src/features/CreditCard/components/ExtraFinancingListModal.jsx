import { useEffect, useState } from "react";
import { useExtraFinancingStore } from "../../User/Store/adminStore";
import { ExtraFinancingDetailModal } from "./ExtraFinancingDetailModal";
import { ExtraFinancingModal } from "./ExtraFinancingModal";

export const ExtraFinancingListModal = ({ isOpen, onClose, card }) => {
    const { financings, getFinancingsByCard, loading } = useExtraFinancingStore();
    const [detailModal, setDetailModal] = useState({ open: false, financing: null });
    const [createModal, setCreateModal] = useState(false);

    useEffect(() => {
        if (isOpen && card) getFinancingsByCard(card._id);
    }, [isOpen, card]);

    if (!isOpen || !card) return null;

    return (
        <>
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
                <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
                    <div className="p-6 bg-blue-700 text-white flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-black uppercase italic">Extra Financiamientos</h2>
                            <p className="text-blue-200 text-[10px] mt-1">**** **** **** {card.cardNumber?.slice(-4)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setCreateModal(true)} className="bg-white text-blue-700 px-3 py-1 rounded-lg font-black text-[10px] uppercase">+ Nuevo</button>
                            <button onClick={onClose} className="text-white text-2xl font-black">×</button>
                        </div>
                    </div>

                    <div className="overflow-y-auto max-h-96 p-4 space-y-3">
                        {loading ? (
                            <p className="text-center p-6 text-gray-400">Cargando...</p>
                        ) : financings.length === 0 ? (
                            <p className="text-center p-8 text-gray-400 italic">Sin financiamientos registrados</p>
                        ) : financings.map(f => (
                            <div key={f._id} className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center">
                                <div>
                                    <p className="font-black text-sm text-gray-800">{f.description}</p>
                                    <p className="text-[10px] text-gray-400 mt-1">
                                        Q {f.totalAmount?.toLocaleString()} — {f.installments} cuotas — Q {f.monthlyPayment?.toFixed(2)}/mes
                                    </p>
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${f.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {f.status}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setDetailModal({ open: true, financing: f })}
                                    className="ml-4 px-4 py-2 bg-blue-700 text-white rounded-xl font-black text-[10px] uppercase"
                                >
                                    Ver Cuotas
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ExtraFinancingDetailModal
                isOpen={detailModal.open}
                financing={detailModal.financing}
                onClose={() => setDetailModal({ open: false, financing: null })}
            />
            <ExtraFinancingModal
                isOpen={createModal}
                card={card}
                onClose={() => { setCreateModal(false); getFinancingsByCard(card._id); }}
            />
        </>
    );
};