import React, { useState } from 'react';

export const ProductsView = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-black text-emerald-900 tracking-tight">Catálogo de Servicios</h1>
                    <p className="text-emerald-600 mt-2">Gestiona los beneficios y productos financieros disponibles</p>
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-emerald-100 transition-all"
                    >
                        + Nuevo Item
                    </button>
                </div>
            </div>

            {/* Grid de Productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Ejemplo de un Servicio */}
                <ProductCard product={{
                    name: "Seguro de Gastos Médicos",
                    description: "Cobertura completa en hospitales de la red Kinal con descuentos exclusivos.",
                    price: 450.00,
                    type: "SERVICIO",
                    stock: 0,
                    isActive: true
                }} />

                {/* Ejemplo de un Producto */}
                <ProductCard product={{
                    name: "Token Físico de Seguridad",
                    description: "Dispositivo de generación de códigos aleatorios para transacciones seguras.",
                    price: 150.00,
                    type: "PRODUCTO",
                    stock: 45,
                    isActive: true
                }} />
            </div>

            {isModalOpen && <ProductModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};