import { useEffect, useState } from "react";
import { usePurchaseStore } from "../../User/Store/adminStore";
import { PurchaseModal } from "./PurchaseModal";
import { SearchableSelect } from "../../../shared/components/ui/SearchableSelect";

export const PurchaseView = () => {
    const { purchases, getPurchases, loading } = usePurchaseStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState('');

    useEffect(() => { getPurchases(); }, []);

    const purchaseOptions = purchases.map(p => ({
        value: p._id,
        label: `${p.description} — ${p.merchant} (Q${p.amount?.toLocaleString()})`
    }));

    const filtered = selectedId ? purchases.filter(p => p._id === selectedId) : purchases;

    return (
        <div className="flex flex-col gap-8 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black text-gray-800 uppercase italic">
                    Historial de <span className="text-violet-600">Compras</span>
                </h1>
                <button onClick={() => setIsModalOpen(true)} className="bg-violet-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg hover:bg-violet-700 transition-all uppercase text-xs">
                    + Nueva Compra
                </button>
            </div>

            <div className="flex gap-3 items-center">
                <div className="flex-1">
                    <SearchableSelect
                        options={purchaseOptions}
                        value={selectedId}
                        onChange={setSelectedId}
                        placeholder="Buscar por descripción, comercio o monto..."
                    />
                </div>
                {selectedId && (
                    <button onClick={() => setSelectedId('')} className="px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold text-xs hover:border-red-200 hover:text-red-500 transition-colors">
                        Limpiar
                    </button>
                )}
            </div>

            <div className="flex flex-col gap-3 md:hidden">
                {loading ? (
                    <p className="text-center p-8 text-gray-400">Cargando...</p>
                ) : filtered.length === 0 ? (
                    <p className="text-center p-8 text-gray-400 italic">Sin compras registradas</p>
                ) : filtered.map(p => (
                    <div key={p._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                            <span className="font-bold text-sm text-gray-800">{p.description}</span>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase ${p.type === 'CREDIT' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                {p.type}
                            </span>
                        </div>
                        <span className="text-xs text-gray-500">{p.merchant}</span>
                        <div className="flex justify-between items-center mt-1">
                            <span className="font-black text-violet-600 text-sm">Q {p.amount?.toLocaleString()}</span>
                            <span className="text-xs text-gray-400">{new Date(p.date).toLocaleDateString('es-GT')}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden md:block bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">                <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="text-left p-4 text-[10px] font-black text-gray-400 uppercase">Descripción</th>
                        <th className="text-left p-4 text-[10px] font-black text-gray-400 uppercase">Comercio</th>
                        <th className="text-left p-4 text-[10px] font-black text-gray-400 uppercase">Tipo</th>
                        <th className="text-left p-4 text-[10px] font-black text-gray-400 uppercase">Monto</th>
                        <th className="text-left p-4 text-[10px] font-black text-gray-400 uppercase">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan={5} className="text-center p-8 text-gray-400">Cargando...</td></tr>
                    ) : filtered.length === 0 ? (
                        <tr><td colSpan={5} className="text-center p-8 text-gray-400 italic">Sin compras registradas</td></tr>
                    ) : filtered.map(p => (
                        <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-bold text-sm text-gray-800">{p.description}</td>
                            <td className="p-4 text-sm text-gray-500">{p.merchant}</td>
                            <td className="p-4">
                                <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase ${p.type === 'CREDIT' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{p.type}</span>
                            </td>
                            <td className="p-4 font-black text-sm text-violet-600">Q {p.amount?.toLocaleString()}</td>
                            <td className="p-4 text-sm text-gray-400">{new Date(p.date).toLocaleDateString('es-GT')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            <PurchaseModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); getPurchases(); }} />
        </div>
    );
};