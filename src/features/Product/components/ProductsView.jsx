import { useEffect, useState, useMemo } from 'react';
import { useProductStore } from '../../User/Store/adminStore';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { Search } from 'lucide-react';

const TYPE_OPTIONS = ['TODOS', 'PRODUCTO', 'SERVICIO'];

export const ProductsView = () => {
    const { products, getProducts, deleteProduct, loading } = useProductStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('TODOS');

    useEffect(() => {
        getProducts();
    }, []);

    const filtered = useMemo(() => {
        const s = search.toLowerCase();
        return products.filter(p => {
            const matchSearch =
                p.name.toLowerCase().includes(s) ||
                (p.description || '').toLowerCase().includes(s);
            const matchType = filterType === 'TODOS' || p.type === filterType;
            return matchSearch && matchType;
        });
    }, [products, search, filterType]);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-black text-emerald-900 tracking-tight">Catálogo de Servicios</h1>
                    <p className="text-emerald-600 mt-1">Gestiona los beneficios y productos financieros disponibles</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-emerald-100 transition-all"
                >
                    + Nuevo Item
                </button>
            </div>

            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar por nombre o descripción..."
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    />
                </div>
                <div className="flex gap-2">
                    {TYPE_OPTIONS.map(opt => (
                        <button
                            key={opt}
                            onClick={() => setFilterType(opt)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${filterType === opt
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            <p className="text-xs text-gray-400 mb-4">
                Mostrando {filtered.length} de {products.length} items
            </p>

            {/* Grid */}
            {loading ? (
                <div className="text-center py-20 text-emerald-700 font-bold">Cargando catálogo...</div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20 text-gray-400 font-medium">No hay items con los filtros aplicados.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onEdit={() => handleEdit(product)}
                            onDelete={() => deleteProduct(product._id)}
                        />
                    ))}
                </div>
            )}

            {isModalOpen && (
                <ProductModal
                    product={editingProduct}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};