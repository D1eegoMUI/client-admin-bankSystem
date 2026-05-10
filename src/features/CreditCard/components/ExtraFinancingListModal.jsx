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
    }, [isOpen, card, getFinancingsByCard]);

    if (!isOpen || !card) return null;

    return (
        <>
            <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-[100] px-4 animate-fadeIn">
                {/* max-w-3xl para mayor amplitud */}
                <div className="bg-white rounded-[2rem] w-full max-w-3xl overflow-hidden shadow-2xl border border-emerald-100 animate-slideDown">
                    
                    {/* Header Institucional con Gradiente */}
                    <div 
                        className="p-7 text-white flex justify-between items-center" 
                        style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}
                    >
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Extra Financiamientos</h2>
                            <p className="text-emerald-100 text-xs opacity-90 uppercase font-black tracking-widest mt-1">
                                Tarjeta: **** {card.cardNumber?.slice(-4)}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setCreateModal(true)} 
                                className="bg-white text-emerald-900 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase shadow-sm hover:bg-emerald-50 transition-all active:scale-95"
                            >
                                + Nuevo Plan
                            </button>
                            <button onClick={onClose} className="text-white hover:text-emerald-200 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Cuerpo de la Lista */}
                    <div className="overflow-y-auto max-h-[60vh] p-8 space-y-4">
                        {loading ? (
                            <div className="flex flex-col items-center py-12 gap-3">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
                                <p className="text-emerald-800/40 font-bold text-xs uppercase tracking-widest">Consultando registros...</p>
                            </div>
                        ) : financings.length === 0 ? (
                            <div className="text-center py-16 border-2 border-dashed border-emerald-50 rounded-[2rem]">
                                <p className="text-emerald-800/30 font-medium italic">No hay financiamientos activos para esta tarjeta</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {financings.map(f => (
                                    <div key={f._id} className="group bg-gray-50/50 hover:bg-emerald-50/30 border border-gray-100 hover:border-emerald-200 rounded-2xl p-5 flex justify-between items-center transition-all">
                                        <div className="space-y-1">
                                            <p className="font-black text-emerald-900 uppercase text-sm tracking-tight">{f.description}</p>
                                            <div className="flex items-center gap-3">
                                                <p className="text-xs font-bold text-gray-500">
                                                    Monto: <span className="text-emerald-700 font-black">Q{f.totalAmount?.toLocaleString()}</span>
                                                </p>
                                                <span className="text-gray-300">|</span>
                                                <p className="text-xs font-bold text-gray-500">
                                                    Cuotas: <span className="text-emerald-700 font-black">{f.installments} x Q{f.monthlyPayment?.toFixed(2)}</span>
                                                </p>
                                            </div>
                                            <div className="pt-2">
                                                <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                                                    f.status === 'PAID' 
                                                        ? 'bg-emerald-100 text-emerald-700' 
                                                        : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                    Estado: {f.status}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <button
                                            onClick={() => setDetailModal({ open: true, financing: f })}
                                            className="px-6 py-3 bg-white border border-emerald-100 text-emerald-700 rounded-xl font-black text-[10px] uppercase shadow-sm hover:bg-emerald-600 hover:text-white transition-all active:scale-95"
                                        >
                                            Ver Movimientos
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer sutil */}
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 text-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Gestión de Crédito Kinal — 2026</p>
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