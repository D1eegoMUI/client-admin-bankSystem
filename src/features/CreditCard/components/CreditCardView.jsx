import { useEffect, useState } from "react";
import { useCardStore } from "../../User/Store/adminStore";
import { CreditCardItem } from "./CreditCardItem";
import { CreditCardModal } from "./CreditCardModal";
import { PayCardModal } from "./PayCardModal";
import { CardPurchasesModal } from "./CardPurchasesModal";
import { ExtraFinancingListModal } from "./ExtraFinancingListModal";
import { SearchableSelect } from "../../../shared/components/ui/SearchableSelect";

export const CreditCardView = () => {
    const { cards, getCreditCards, loading } = useCardStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [payModal, setPayModal] = useState({ open: false, card: null });
    const [purchasesModal, setPurchasesModal] = useState({ open: false, card: null });
    const [financingModal, setFinancingModal] = useState({ open: false, card: null });
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedId, setSelectedId] = useState('');
    useEffect(() => { getCreditCards(); }, []);

    const cardOptions = Array.from(
        cards.reduce((map, c) => {
            const user = c.user ?? c.account?.user ?? c.cardHolder;
            const uid = user?.uid ?? user?._id ?? '';
            if (uid && !map.has(uid)) {
                const name = `${user.UserName ?? ''} ${user.UserSurname ?? ''}`.trim();
                map.set(uid, { value: c._id, label: name, userId: uid });
            }
            return map;
        }, new Map()).values()
    );

    const handleSelect = (cardId) => {
        const option = cardOptions.find(o => o.value === cardId);
        setSelectedId(cardId);
        setSelectedUserId(option?.userId ?? '');
    };

    const filtered = selectedUserId
        ? cards.filter(c => {
            const user = c.user ?? c.account?.user;
            const uid = user?.uid ?? user?._id;
            return uid === selectedUserId;
        })
        : cards;
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-black uppercase italic">Tarjetas de <span className="text-emerald-600">Crédito</span></h1>
                <button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg uppercase text-xs">+ Emitir Crédito</button>
            </div>

            <div className="flex gap-3 items-center mb-8">
                <div className="flex-1">
                    <SearchableSelect
                        options={cardOptions}
                        value={selectedId}
                        onChange={handleSelect}
                        placeholder="Buscar por titular, cuenta o marca..."
                    />
                </div>
                {selectedId && (
                    <button onClick={() => { setSelectedId(''); setSelectedUserId(''); }} className="px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold text-xs hover:border-red-200 hover:text-red-500 transition-colors">
                        Limpiar
                    </button>
                )}
            </div>

            {loading ? (
                <p className="text-center text-gray-400 py-10">Cargando...</p>
            ) : filtered.length === 0 ? (
                <p className="text-center text-gray-400 italic py-10">No se encontraron tarjetas.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map(card => (
                        <div key={card._id} className="flex flex-col gap-3 group">
                            <CreditCardItem card={card} />
                            <div className="flex flex-col gap-2">
                                <div className="flex w-full gap-2">
                                    <button onClick={() => setPurchasesModal({ open: true, card })} className="flex-1 py-3 border-2 border-emerald-100 text-emerald-700 text-[10px] font-black rounded-xl uppercase hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all active:scale-95 shadow-sm">Ver Compras</button>
                                    <button onClick={() => setPayModal({ open: true, card })} className="flex-1 py-3 bg-emerald-600 text-white text-[10px] font-black rounded-xl uppercase hover:bg-emerald-700 transition-all active:scale-95 shadow-md shadow-emerald-100">Pagar Tarjeta</button>
                                </div>
                                <button onClick={() => setFinancingModal({ open: true, card })} className="w-full py-3 border-2 border-slate-800 text-slate-800 text-[10px] font-black rounded-xl uppercase hover:bg-slate-800 hover:text-white transition-all active:scale-95">Extra Financiamientos</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <CreditCardModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); getCreditCards(); }} />
            <PayCardModal isOpen={payModal.open} card={payModal.card} onClose={() => { setPayModal({ open: false, card: null }); getCreditCards(); }} />
            <CardPurchasesModal isOpen={purchasesModal.open} card={purchasesModal.card} onClose={() => setPurchasesModal({ open: false, card: null })} />
            <ExtraFinancingListModal isOpen={financingModal.open} card={financingModal.card} onClose={() => setFinancingModal({ open: false, card: null })} />
        </div>
    );
};