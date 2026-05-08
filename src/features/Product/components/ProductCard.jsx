export const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col group">
            <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${
                        product.type === 'PRODUCTO' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-purple-50 text-purple-600 border-purple-100'
                    }`}>
                        {product.type}
                    </span>
                    <span className={`text-[10px] font-bold ${product.isActive ? 'text-emerald-500' : 'text-red-400'}`}>
                        {product.isActive ? '● Activo' : '○ Inactivo'}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-emerald-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {product.name}
                </h3>
                
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {product.description}
                </p>

                <div className="flex items-baseline gap-1">
                    <span className="text-emerald-600 font-bold text-sm">Q</span>
                    <span className="text-3xl font-black text-emerald-950">{product.price.toLocaleString()}</span>
                </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-2xl flex justify-between items-center">
                <div className="flex flex-col">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Disponibilidad</p>
                    <p className="text-sm font-bold text-emerald-900">
                        {product.type === 'SERVICIO' ? 'Ilimitado' : `${product.stock} unidades`}
                    </p>
                </div>
                
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-emerald-100 rounded-lg text-emerald-600 transition-colors">✏️</button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors">🗑️</button>
                </div>
            </div>
        </div>
    );
};