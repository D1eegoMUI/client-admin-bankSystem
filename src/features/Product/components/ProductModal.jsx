import { useState, useEffect } from 'react';
import { useProductStore } from '../../User/Store/adminStore';
import { showSuccess, showError } from "../../../shared/utils/toast.js";


export const ProductModal = ({ product, onClose }) => {
    const { createProduct, updateProduct, loading } = useProductStore();
    const isEditing = !!product;

    const [form, setForm] = useState({
        name: '',
        type: 'SERVICIO',
        price: '',
        stock: 0,
        description: ''
    });

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name,
                type: product.type,
                price: product.price,
                stock: product.stock ?? 0,
                description: product.description
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!form.name || !form.price || !form.description) return alert('Completa todos los campos requeridos.');
        try {
            if (isEditing) {
                await updateProduct(product._id, form);
            } else {
                await createProduct(form);
            }
            showSuccess(isEditing ? "Producto actualizado con éxito" : "Producto creado con éxito"); onClose();
        } catch (e) {
            showError("Error al guardar");
        }
    };

    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-emerald-100">
                <div className="p-6 text-white" style={{ background: 'linear-gradient(90deg, #064e3b 0%, #059669 100%)' }}>
                    <h2 className="text-2xl font-bold">{isEditing ? 'Editar Item' : 'Nuevo Item'}</h2>
                    <p className="text-emerald-100 text-xs">
                        {isEditing ? 'Modifica los datos del producto o servicio' : 'Agrega un nuevo producto o servicio al catálogo'}
                    </p>
                </div>

                <div className="p-8 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Nombre *</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                type="text"
                                className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none transition-all"
                                placeholder="Ej: Seguro de Vida Premium"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Categoría</label>
                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none"
                            >
                                <option value="PRODUCTO">PRODUCTO</option>
                                <option value="SERVICIO">SERVICIO</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Precio (GTQ) *</label>
                            <input
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                type="number"
                                min="0"
                                className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none font-mono"
                                placeholder="0.00"
                            />
                        </div>

                        {form.type === 'PRODUCTO' && (
                            <div className="flex flex-col md:col-span-2">
                                <label className="text-sm font-bold text-emerald-900 mb-1">Stock</label>
                                <input
                                    name="stock"
                                    value={form.stock}
                                    onChange={handleChange}
                                    type="number"
                                    min="0"
                                    className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none"
                                    placeholder="Cantidad disponible"
                                />
                            </div>
                        )}

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Descripción *</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="3"
                                className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none resize-none"
                                placeholder="Describe los beneficios o características..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={onClose} className="px-6 py-2 text-gray-400 font-semibold hover:text-emerald-700">
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Guardar Item'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}