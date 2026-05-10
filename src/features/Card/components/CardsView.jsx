import { useState, useEffect } from "react";
import { useCardStore } from "../../User/Store/adminStore";
import { CardItem } from "./CardItem";
import { CardModal } from "./CardModal";

export const CardsView = () => {
    const { cards, getDebitCards, loading } = useCardStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewDetail, setViewDetail] = useState(null); // Para mostrar detalles al click

    useEffect(() => {
        getDebitCards();
    }, []);

    return (
        <div className="flex flex-col gap-8 p-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black text-gray-800 uppercase italic">
                    Gestión de <span className="text-emerald-600">Tarjetas</span>
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg hover:bg-emerald-700 transition-all uppercase text-xs"
                >
                    + Emitir Nueva
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Listado de Tarjetas */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cards.map((card) => (
                        <div
                            key={card._id}
                            onClick={() => setViewDetail(card)}
                            className="cursor-pointer"
                        >
                            <CardItem card={card} />
                        </div>
                    ))}
                </div>

                {/* Panel Lateral de Detalles (Aparece al clickear) */}
                <div className="lg:col-span-1">
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

                                {viewDetail.type === 'CREDIT' ? (
                                    <>
                                        <DetailRow label="Límite" value={`Q${viewDetail.creditLimit}`} />
                                        <DetailRow label="Aprobada" value={viewDetail.isApproved ? 'SÍ' : 'PENDIENTE'} />
                                    </>
                                ) : (
                                    <>
                                        <DetailRow label="Cuenta vinculada" value={viewDetail.account?.accountNumber || 'Sin cuenta'} />
                                        <DetailRow label="Titular" value={viewDetail.account?.user?.UserName || '—'} />
                                        <DetailRow label="Saldo" value={`Q ${viewDetail.account?.balance?.toLocaleString() ?? '—'}`} />
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center p-10 text-center">
                            <p className="text-gray-400 font-medium italic">Selecciona una tarjeta para ver su información detallada</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Creación */}
            <CardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

const DetailRow = ({ label, value, isBadge, color = "text-gray-700" }) => (
    <div className="flex flex-col">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
        <span className={`text-sm font-bold ${color} ${isBadge ? 'bg-gray-100 px-2 py-0.5 rounded w-fit mt-1' : ''}`}>
            {value}
        </span>
    </div>
);