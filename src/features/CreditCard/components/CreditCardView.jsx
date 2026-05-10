import { useEffect, useState } from "react";
import { useCardStore } from "../../User/Store/adminStore";
import { CreditCardItem } from "./CreditCardItem";
import { CreditCardModal } from "./CreditCardModal";
import { PayCardModal } from "./PayCardModal";
import { CardPurchasesModal } from "./CardPurchasesModal";
import { ExtraFinancingListModal } from "./ExtraFinancingListModal";

export const CreditCardView = () => {
    const { cards, getCreditCards, loading } = useCardStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [payModal, setPayModal] = useState({ open: false, card: null });
    const [purchasesModal, setPurchasesModal] = useState({ open: false, card: null });
    const [financingModal, setFinancingModal] = useState({ open: false, card: null });

    useEffect(() => { getCreditCards(); }, []);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-2xl font-black uppercase italic">Tarjetas de <span className="text-emerald-600">Crédito</span></h1>
                <button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg uppercase text-xs">+ Emitir Crédito</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cards.map(card => (
                    <div key={card._id} className="flex flex-col gap-2">
                        <CreditCardItem card={card} />
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPurchasesModal({ open: true, card })}
                                className="flex-1 py-2 border-2 border-amber-500 text-amber-600 text-[10px] font-black rounded-xl uppercase hover:bg-amber-50 transition-colors"
                            >
                                Ver Compras
                            </button>
                            <button
                                onClick={() => setPayModal({ open: true, card })}
                                className="flex-1 py-2 bg-slate-800 text-white text-[10px] font-black rounded-xl uppercase hover:bg-slate-700 transition-colors"
                            >
                                Pagar Tarjeta
                            </button>
                            <button
                                onClick={() => setFinancingModal({ open: true, card })}
                                className="w-full py-2 border-2 border-blue-600 text-blue-600 text-[10px] font-black rounded-xl uppercase hover:bg-blue-50 transition-colors"
                            >
                                Extra Financiamientos
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <CreditCardModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); getCreditCards(); }} />
            <PayCardModal
                isOpen={payModal.open}
                card={payModal.card}
                onClose={() => { setPayModal({ open: false, card: null }); getCreditCards(); }}
            />
            <CardPurchasesModal
                isOpen={purchasesModal.open}
                card={purchasesModal.card}
                onClose={() => setPurchasesModal({ open: false, card: null })}
            />
            <ExtraFinancingListModal
                isOpen={financingModal.open}
                card={financingModal.card}
                onClose={() => setFinancingModal({ open: false, card: null })}
            />
        </div>
    );
};