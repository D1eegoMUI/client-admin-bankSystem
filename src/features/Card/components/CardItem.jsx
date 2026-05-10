// src/features/Card/components/CardItem.jsx
import { CardVisual } from './CardVisual';

export const CardItem = ({ card }) => {
    return (
        <div className="flex flex-col gap-4 animate-fadeIn">
            <CardVisual data={card} variant="DEBIT" color="bg-emerald-700" />
            
            <div className="bg-white p-5 rounded-2xl border border-emerald-50 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cuenta Vinculada</span>
                    <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Activa</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-black text-emerald-900 tracking-tight">{card.account?.accountNumber || 'N/A'}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Saldo en Cuenta</p>
                    </div>
                    <p className="text-xl font-black text-emerald-600 italic">Q {card.account?.balance?.toLocaleString() || '0.00'}</p>
                </div>
                <button className="w-full mt-4 py-2.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all active:scale-95">
                    Detalles de Cuenta
                </button>
            </div>
        </div>
    );
};