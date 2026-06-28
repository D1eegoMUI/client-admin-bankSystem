import { useEffect, useState, useRef } from 'react';
import { useCardStore } from '../../User/Store/adminStore';
import { showSuccess, showError } from '../../../shared/utils/toast.js';
import { CreditCardItem } from './CreditCardItem';
import { CreditCardModal } from './CreditCardModal';
import { PayCardModal } from './PayCardModal';
import { CardPurchasesModal } from './CardPurchasesModal';
import { ExtraFinancingListModal } from './ExtraFinancingListModal';
import { SearchableSelect } from '../../../shared/components/ui/SearchableSelect';
import { BaseButton } from '../../../shared/components/ui/BaseButton';
import { ShoppingBag, DollarSign, Banknote } from 'lucide-react';

const useContainerWidth = () => {
    const ref = useRef(null);
    const [width, setWidth] = useState(999);
    useEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(([entry]) => {
            setWidth(entry.contentRect.width);
        });
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, []);
    return [ref, width];
};

const CreditCardActions = ({ card, onPurchases, onPay, onFinancing }) => {
    const [btnRowRef, btnRowWidth] = useContainerWidth();
    const showBtnText = btnRowWidth > 260;

    return (
        <div ref={btnRowRef} className="flex gap-1.5 overflow-hidden">
            <button
                type="button"
                onClick={() => onPurchases(card)}
                title="Ver compras"
                className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border-2 border-orange-200 text-orange-600 bg-orange-50 text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all active:scale-95 flex-1 min-w-0 overflow-hidden"
            >
                <ShoppingBag size={13} className="shrink-0" />
                {showBtnText && <span className="truncate">Compras</span>}
            </button>

            <button
                type="button"
                onClick={() => onPay(card)}
                title="Pagar tarjeta"
                className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border-2 border-emerald-600 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 hover:border-emerald-700 transition-all active:scale-95 flex-1 min-w-0 overflow-hidden"
            >
                <Banknote size={13} className="shrink-0" />
                {showBtnText && <span className="truncate">Pagar</span>}
            </button>

            <button
                type="button"
                onClick={() => onFinancing(card)}
                title="Extra financiamientos"
                className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border-2 border-slate-700 text-slate-700 bg-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all active:scale-95 flex-1 min-w-0 overflow-hidden"
            >
                <DollarSign size={13} className="shrink-0" />
                {showBtnText && <span className="truncate">Financ.</span>}
            </button>
        </div>
    );
};

export const CreditCardView = () => {
    const [statusFilter, setStatusFilter] = useState('ALL');
    const { creditCards, getCreditCards, loading: loadingCards } = useCardStore();
    const [isModalOpen, setIsModalOpen]       = useState(false);
    const [payModal, setPayModal]             = useState({ open: false, card: null });
    const [purchasesModal, setPurchasesModal] = useState({ open: false, card: null });
    const [financingModal, setFinancingModal] = useState({ open: false, card: null });
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedId, setSelectedId]         = useState('');

    useEffect(() => {
        getCreditCards();
    }, []);

    const cardOptions = Array.from(
        creditCards.reduce((map, c) => {
            const user = c.user ?? c.cardHolder;
            const uid  = user?.uid ?? user?._id ?? '';
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

    const filtered = creditCards
        .filter(c => {
            if (!selectedUserId) return true;
            const user = c.user;
            const uid  = user?.uid ?? user?._id;
            return uid === selectedUserId;
        })
        .filter(c => {
            if (statusFilter === 'ACTIVE')   return c.status === 'ACTIVE';
            if (statusFilter === 'INACTIVE') return c.status !== 'ACTIVE';
            return true;
        });

    const statusFilterOptions = [
        { value: 'ALL',      label: 'Todas'    },
        { value: 'ACTIVE',   label: 'Activas'  },
        { value: 'INACTIVE', label: 'Inactivas' },
    ];

    return (
        <div className="p-8 space-y-8">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black uppercase italic">
                    Tarjetas de <span className="text-emerald-600">Crédito</span>
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg uppercase text-xs"
                >
                    + Emitir Crédito
                </button>
            </div>

            {/* Filtros */}
            <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                    <div className="flex-1">
                        <SearchableSelect
                            options={cardOptions}
                            value={selectedId}
                            onChange={handleSelect}
                            placeholder="Buscar por titular..."
                        />
                    </div>
                    {selectedId && (
                        <button
                            onClick={() => { setSelectedId(''); setSelectedUserId(''); }}
                            className="px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold text-xs hover:border-red-200 hover:text-red-500 transition-colors"
                        >
                            Limpiar
                        </button>
                    )}
                </div>

                <div className="flex gap-1.5">
                    {statusFilterOptions.map(opt => (
                        <BaseButton
                            key={opt.value}
                            variant={statusFilter === opt.value ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => setStatusFilter(opt.value)}
                            className="text-[10px] uppercase tracking-widest font-black"
                        >
                            {opt.label}
                        </BaseButton>
                    ))}
                </div>
            </div>

            {/* Grid de tarjetas */}
            {loadingCards ? (
                <p className="text-center text-gray-400 py-10">Cargando...</p>
            ) : filtered.length === 0 ? (
                <p className="text-center text-gray-400 italic py-10">No se encontraron tarjetas.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map(card => (
                        <div key={card._id} className="flex flex-col gap-3">
                            <CreditCardItem card={card} />
                            <CreditCardActions
                                card={card}
                                onPurchases={(c) => setPurchasesModal({ open: true, card: c })}
                                onPay={(c) => setPayModal({ open: true, card: c })}
                                onFinancing={(c) => setFinancingModal({ open: true, card: c })}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Modales */}
            <CreditCardModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); getCreditCards(); }}
            />
            <PayCardModal
                isOpen={payModal.open}
                card={payModal.card}
                onClose={() => { setPayModal({ open: false, card: null }); getCreditCards(); }}
            />
            <CardPurchasesModal
                isOpen={purchasesModal.open}
                card={purchasesModal.card}
                cardType="CREDIT"
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