import { getCardPalette } from '../cardPalette';

export const CardVisual = ({ data, variant }) => {
    const isCredit = variant === 'CREDIT';

    const palette = !isCredit
        ? "from-emerald-900 to-emerald-600 border-emerald-500 text-emerald-100"
        : getCardPalette(data.type).gradient;

    return (
        <div className={`h-52 rounded-[2rem] p-6 text-white bg-gradient-to-br ${palette} shadow-2xl relative overflow-hidden transition-transform hover:scale-[1.02] duration-300 border-r-4`}>
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
            <div className="relative h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Kinal Bank</p>
                        <p className="text-xs font-black uppercase italic tracking-tighter opacity-90">
                            {isCredit ? `${data.type} Line` : 'Debit Access'}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-black italic tracking-widest leading-none">{data.brand || 'VISA'}</p>
                    </div>
                </div>

                <div className="w-11 h-9 bg-gradient-to-br from-yellow-100 to-yellow-500 rounded-lg shadow-inner border border-yellow-200/50 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full opacity-30 flex flex-col justify-around p-1">
                        <div className="h-[1px] bg-black" />
                        <div className="h-[1px] bg-black" />
                        <div className="h-[1px] bg-black" />
                    </div>
                </div>

                <div>
                    <p className="text-xl font-mono tracking-[0.25em] mb-2 drop-shadow-lg">
                        {data.cardNumber?.replace(/(.{4})/g, '$1 ').trim() || '**** **** **** ****'}
                    </p>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[7px] uppercase font-black opacity-60 mb-0.5">Card Holder</p>
                            <p className="text-[11px] font-black uppercase tracking-widest">
                                {data.holderName || 'VALUED CUSTOMER'}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[7px] uppercase font-black opacity-60 mb-0.5 tracking-tighter">Expires</p>
                            <p className="text-[11px] font-black">{data.expirationDate || '12/28'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};