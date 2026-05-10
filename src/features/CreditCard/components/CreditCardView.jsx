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
    <div key={card._id} className="flex flex-col gap-3 group">
        <CreditCardItem card={card} />
        
        {/* Contenedor de Botones Organizado */}
        <div className="flex flex-wrap gap-2">
            {/* Fila Superior: 2 Botones */}
            <div className="flex w-full gap-2">
                <button
                    onClick={() => setPurchasesModal({ open: true, card })}
                    className="flex-1 py-3 border-2 border-emerald-100 text-emerald-700 text-[10px] font-black rounded-xl uppercase hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all active:scale-95 shadow-sm"
                >
                    Ver Compras
                </button>
                <button
                    onClick={() => setPayModal({ open: true, card })}
                    className="flex-1 py-3 bg-emerald-600 text-white text-[10px] font-black rounded-xl uppercase hover:bg-emerald-700 transition-all active:scale-95 shadow-md shadow-emerald-100"
                >
                    Pagar Tarjeta
                </button>
            </div>

            {/* Fila Inferior: 1 Botón Ancho */}
            <button
                onClick={() => setFinancingModal({ open: true, card })}
                className="w-full py-3 border-2 border-slate-800 text-slate-800 text-[10px] font-black rounded-xl uppercase hover:bg-slate-800 hover:text-white transition-all active:scale-95"
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