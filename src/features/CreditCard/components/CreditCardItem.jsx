// src/features/CreditCard/components/CreditCardItem.jsx
import { CardVisual } from '../../Card/components/CardVisual';

export const CreditCardItem = ({ card }) => {
    return (
        <div className="flex flex-col gap-4 animate-fadeIn">
            <CardVisual 
                data={card} 
                variant="CREDIT" 
                color={card.type === 'BLACK' ? 'bg-zinc-900' : 'bg-slate-800'} 
            />
            
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between mb-4">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Línea de Crédito</span>
                    <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full italic">Corte: Día {card.cutoffDate || '20'}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border-r border-gray-100">
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Deuda Actual</p>
                        <p className="text-lg font-black text-slate-800">Q {card.totalDebt?.toLocaleString() || '0.00'}</p>
                    </div>
                    <div className="pl-2 text-right">
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Tasa Anual</p>
                        <p className="text-lg font-black text-blue-600">{card.interestRate || '15'}%</p>
                    </div>
                </div>
                <button className="w-full mt-4 py-2.5 bg-slate-900 text-white text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-black transition-all">
                    Registrar Pago
                </button>
            </div>
        </div>
    );
};