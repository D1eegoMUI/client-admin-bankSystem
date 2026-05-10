import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

/**
 * SearchableSelect — reemplaza <select> con búsqueda por texto
 * 
 * Props:
 *   options:     [{ value, label }]
 *   value:       valor seleccionado actualmente
 *   onChange:    fn(value) => void
 *   placeholder: texto cuando no hay selección
 *   className:   clases extra para el contenedor
 */
export const SearchableSelect = ({ options = [], value, onChange, placeholder = 'Seleccionar...', className = '' }) => {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // Cerrar al hacer click fuera
    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const filtered = options.filter(o =>
        o.label.toLowerCase().includes(query.toLowerCase())
    );

    const selected = options.find(o => o.value === value);

    const handleSelect = (opt) => {
        onChange(opt.value);
        setQuery('');
        setOpen(false);
    };

    return (
        <div ref={ref} className={`relative ${className}`}>
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 font-bold text-left flex justify-between items-center focus:border-emerald-500 outline-none bg-white"
            >
                <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
                    {selected ? selected.label : placeholder}
                </span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
                    {/* Input de búsqueda */}
                    <div className="p-2 border-b border-gray-100 flex items-center gap-2 px-3">
                        <Search size={14} className="text-gray-400 shrink-0" />
                        <input
                            autoFocus
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Buscar..."
                            className="w-full text-sm font-medium outline-none py-1"
                        />
                    </div>

                    {/* Opciones */}
                    <ul className="max-h-48 overflow-y-auto">
                        {filtered.length > 0 ? filtered.map(opt => (
                            <li
                                key={opt.value}
                                onClick={() => handleSelect(opt)}
                                className={`px-4 py-3 text-sm font-bold cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 transition-colors ${
                                    opt.value === value ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                                }`}
                            >
                                {opt.label}
                            </li>
                        )) : (
                            <li className="px-4 py-3 text-sm text-gray-400 text-center">Sin resultados</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};