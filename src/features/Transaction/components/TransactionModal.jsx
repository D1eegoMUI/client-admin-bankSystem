import { useState, useEffect } from 'react';
import { X, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { useTransactionStore } from '../../User/Store/adminStore';
import { useAccountStore } from '../../User/Store/adminStore';
import { SearchableSelect } from '../../../shared/components/ui/SearchableSelect';

const CURRENCIES = ['GTQ', 'USD', 'EUR', 'MXN'];

export const TransactionModal = ({ onClose }) => {
    const { createTransaction, loading } = useTransactionStore();
    const { accounts, getAccounts } = useAccountStore();

    const [type, setType] = useState('DEPOSIT');
    const [form, setForm] = useState({
        AccountOriginId: '',
        amount: '',
        currency: 'GTQ',
        description: ''
    });
    const [result, setResult] = useState(null);

    useEffect(() => {
        getAccounts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!form.AccountOriginId || !form.amount || Number(form.amount) <= 0) {
            setResult({ success: false, message: 'Completa todos los campos requeridos.' });
            return;
        }
        try {
            const res = await createTransaction({ ...form, type, amount: Number(form.amount) });
            setResult({ success: true, message: `${type === 'DEPOSIT' ? 'Depósito' : 'Retiro'} registrado exitosamente. Nuevo saldo: Q${res.data?.nuevoSaldoOrigen?.toLocaleString('en-US', { minimumFractionDigits: 2 })}` });
            setForm({ AccountOriginId: '', amount: '', currency: 'GTQ', description: '' });
        } catch (e) {
            setResult({ success: false, message: e?.response?.data?.message || 'Error al procesar la transacción.' });
        }
    };

    const accountOptions = accounts.map(a => ({
        value: a._id,
        label: `${a.accountNumber} — ${a.currency} ${a.balance?.toLocaleString('en-US', { minimumFractionDigits: 2 })} (${a.user?.UserName || 'N/A'})`
    }));

    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-emerald-100">

                {/* Header */}
                <div className="p-6 text-white flex justify-between items-center" style={{ background: 'linear-gradient(90deg, #064e3b 0%, #059669 100%)' }}>
                    <div>
                        <h2 className="text-2xl font-bold">Nueva Transacción</h2>
                        <p className="text-emerald-100 text-xs">Registra un depósito o retiro en ventanilla</p>
                    </div>
                    <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-5">

                    {/* Selector de tipo */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => { setType('DEPOSIT'); setResult(null); }}
                            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                                type === 'DEPOSIT'
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-100'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-emerald-300'
                            }`}
                        >
                            <ArrowDownCircle size={16} /> Depósito
                        </button>
                        <button
                            type="button"
                            onClick={() => { setType('WITHDRAWAL'); setResult(null); }}
                            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                                type === 'WITHDRAWAL'
                                    ? 'bg-yellow-500 text-white border-yellow-500 shadow-lg shadow-yellow-100'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-yellow-300'
                            }`}
                        >
                            <ArrowUpCircle size={16} /> Retiro
                        </button>
                    </div>

                    {/* Cuenta */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-emerald-900 mb-1">Cuenta</label>
                        <SearchableSelect
                            options={accountOptions}
                            value={form.AccountOriginId}
                            onChange={val => setForm(prev => ({ ...prev, AccountOriginId: val }))}
                            placeholder="Buscar número de cuenta..."
                        />
                    </div>

                    {/* Monto y moneda */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col col-span-2">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Monto</label>
                            <input
                                name="amount"
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={form.amount}
                                onChange={handleChange}
                                className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none font-mono transition-all"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-emerald-900 mb-1">Moneda</label>
                            <select
                                name="currency"
                                value={form.currency}
                                onChange={handleChange}
                                className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none h-full"
                            >
                                {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-emerald-900 mb-1">Descripción <span className="text-gray-400 font-normal">(opcional)</span></label>
                        <input
                            name="description"
                            type="text"
                            value={form.description}
                            onChange={handleChange}
                            maxLength={255}
                            className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none transition-all"
                            placeholder={type === 'DEPOSIT' ? 'Ej: Abono en efectivo ventanilla' : 'Ej: Retiro en ventanilla central'}
                        />
                    </div>

                    {/* Resultado */}
                    {result && (
                        <div className={`p-4 rounded-2xl text-sm font-bold ${
                            result.success
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                : 'bg-red-50 text-red-600 border border-red-100'
                        }`}>
                            {result.message}
                        </div>
                    )}

                    {/* Acciones */}
                    <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl text-gray-500 font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Cerrar
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading || result?.success}
                            className={`px-8 py-2.5 rounded-xl text-white font-bold shadow-lg transition-all disabled:opacity-50 ${
                                type === 'DEPOSIT'
                                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
                                    : 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-100'
                            }`}
                        >
                            {loading ? 'Procesando...' : type === 'DEPOSIT' ? 'Registrar Depósito' : 'Registrar Retiro'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};