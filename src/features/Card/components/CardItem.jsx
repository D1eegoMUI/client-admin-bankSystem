export const CardItem = ({ card }) => {
    return (
        <div className="relative h-56 w-full rounded-2xl p-6 text-white shadow-2xl transition-transform hover:scale-105 overflow-hidden group"
             style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #10b981 100%)" }}>
            
            {/* Decoración de fondo */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />

            <div className="relative h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] font-bold opacity-80 tracking-widest uppercase">Kinal Bank Card</p>
                        <p className="text-xs font-medium italic">{card.type === 'CREDIT' ? 'Premium Credit' : 'Debit Access'}</p>
                    </div>
                    <span className="font-italic font-black text-xl italic opacity-90">{card.brand}</span>
                </div>

                {/* Chip Simulado */}
                <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-md shadow-inner" />

                <div>
                    <p className="text-xl font-mono tracking-[0.2em] mb-2">
                        **** **** **** {card.cardNumber?.slice(-4) || '0000'}
                    </p>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[8px] uppercase opacity-70">Card Holder</p>
                            <p className="text-sm font-bold tracking-wide">{card.holderName || 'NOMBRE DEL TITULAR'}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[8px] uppercase opacity-70">Expires</p>
                            <p className="text-xs font-bold">{card.expirationDate || '00/00'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay de estado si no está aprobada */}
            {!card.isApproved && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-yellow-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                        Pendiente de Aprobación
                    </span>
                </div>
            )}
        </div>
    );
};