import { useCardStore } from "../../User/Store/adminStore";
import { CardItem } from "./CardItem";
import { CardModal } from "./CardModal";
import { SearchableSelect } from "../../../shared/components/ui/SearchableSelect";
import React, { useState, useEffect } from "react";

export const CardsView = () => {
    const { cards, getDebitCards, loading } = useCardStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewDetail, setViewDetail] = useState(null);
    const [selectedId, setSelectedId] = useState('');

    useEffect(() => { getDebitCards(); }, []);

    const cardOptions = cards.map(c => ({
        value: c._id,
        label: `${c.account?.user?.UserName ?? ''} ${c.account?.user?.UserSurname ?? ''} — ${c.account?.accountNumber ?? ''} (${c.brand ?? ''})`
    }));

    const filtered = selectedId ? cards.filter(c => c._id === selectedId) : cards;

    return (
        <div className="flex flex-col gap-8 p-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black text-gray-800 uppercase italic">
                    Gestión de <span className="text-emerald-600">Tarjetas</span>
                </h1>
                <button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg hover:bg-emerald-700 transition-all uppercase text-xs">
                    + Emitir Nueva
                </button>
            </div>

            <div className="flex gap-3 items-center">
                <div className="flex-1">
                    <SearchableSelect
                        options={cardOptions}
                        value={selectedId}
                        onChange={setSelectedId}
                        placeholder="Buscar por titular, cuenta o marca..."
                    />
                </div>
                {selectedId && (
                    <button onClick={() => { setSelectedId(''); setViewDetail(null); }} className="px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold text-xs hover:border-red-200 hover:text-red-500 transition-colors">
                        Limpiar
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading ? (
                        <p className="col-span-2 text-center text-gray-400 py-10">Cargando...</p>
                    ) : filtered.length === 0 ? (
                        <p className="col-span-2 text-center text-gray-400 italic py-10">No se encontraron tarjetas.</p>
                    ) : filtered.map((card) => (
                        // 👇 Usamos un Fragment para poder insertar el detalle inline en móvil
                        <React.Fragment key={card._id}>
                            <div onClick={() => setViewDetail(viewDetail?._id === card._id ? null : card)} className="cursor-pointer">
                                <CardItem card={card} />
                            </div>

                            {/* MÓVIL: detalle inline justo debajo de la tarjeta seleccionada */}
                            {viewDetail?._id === card._id && (
                                <div className="lg:hidden col-span-1 md:col-span-2 bg-white rounded-3xl p-6 border border-emerald-100 shadow-xl animate-fadeIn">
                                    <div className="flex justify-between items-start mb-6">
                                        <h2 className="font-black text-gray-800 uppercase italic">Detalles Técnicos</h2>
                                        <button onClick={() => setViewDetail(null)} className="text-gray-400 text-2xl">×</button>
                                    </div>
                                    <div className="space-y-4">
                                        <DetailRow label="ID de Tarjeta" value={viewDetail._id} />
                                        <DetailRow label="Tipo" value={viewDetail.type} isBadge />
                                        <DetailRow label="Marca" value={viewDetail.brand} />
                                        <DetailRow label="Estado" value={viewDetail.isActive ? 'Activa' : 'Bloqueada'} color={viewDetail.isActive ? 'text-emerald-600' : 'text-red-500'} />
                                        <hr />
                                        <DetailRow label="Cuenta vinculada" value={viewDetail.account?.accountNumber || 'Sin cuenta'} />
                                        <DetailRow label="Titular" value={viewDetail.account?.user ? `${viewDetail.account.user.UserName ?? ''} ${viewDetail.account.user.UserSurname ?? ''}`.trim() : '—'} />
                                        <DetailRow label="Saldo" value={`Q ${viewDetail.account?.balance?.toLocaleString() ?? '—'}`} />
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* DESKTOP: columna lateral — solo visible en lg+ */}
                <div className="hidden lg:block lg:col-span-1">
                    {viewDetail ? (
                        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xl sticky top-6 animate-slideInRight">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="font-black text-gray-800 uppercase italic">Detalles Técnicos</h2>
                                <button onClick={() => setViewDetail(null)} className="text-gray-400 text-2xl">×</button>
                            </div>
                            <div className="space-y-4">
                                <DetailRow label="ID de Tarjeta" value={viewDetail._id} />
                                <DetailRow label="Tipo" value={viewDetail.type} isBadge />
                                <DetailRow label="Marca" value={viewDetail.brand} />
                                <DetailRow label="Estado" value={viewDetail.isActive ? 'Activa' : 'Bloqueada'} color={viewDetail.isActive ? 'text-emerald-600' : 'text-red-500'} />
                                <hr />
                                <DetailRow label="Cuenta vinculada" value={viewDetail.account?.accountNumber || 'Sin cuenta'} />
                                <DetailRow
                                    label="Titular"
                                    value={
                                        viewDetail.account?.user
                                            ? `${viewDetail.account.user.UserName ?? ''} ${viewDetail.account.user.UserSurname ?? ''}`.trim()
                                            : '—'
                                    }
                                />                                <DetailRow label="Saldo" value={`Q ${viewDetail.account?.balance?.toLocaleString() ?? '—'}`} />
                            </div>
                        </div>
                    ) : (
                        <div className="h-full border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center p-10 text-center">
                            <p className="text-gray-400 font-medium italic">Selecciona una tarjeta para ver su información detallada</p>
                        </div>
                    )}
                </div>
            </div>

            <CardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

const DetailRow = ({ label, value, isBadge, color = "text-gray-700" }) => (
    <div className="flex flex-col">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
        <span className={`text-sm font-bold ${color} ${isBadge ? 'bg-gray-100 px-2 py-0.5 rounded w-fit mt-1' : ''}`}>{value}</span>
    </div>
);