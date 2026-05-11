import React, { useState } from 'react';
import {
    RefreshCw,
    ArrowRightLeft,
    TrendingUp,
    Globe,
    ArrowUpRight,
    Info
} from 'lucide-react';

import { useExchangeStore } from '../../../features/User/Store/adminStore';

export const ExchangeAdminView = () => {

    const currencies = [
        { code: "GTQ", name: "Quetzal Guatemalteco" },
        { code: "USD", name: "Dólar Estadounidense" },
        { code: "EUR", name: "Euro" },
        { code: "MXN", name: "Peso Mexicano" }
    ];

    // ================= STATE LOCAL =================
    const [amount, setAmount] = useState('');
    const [from, setFrom] = useState('GTQ');
    const [to, setTo] = useState('USD');

    // ================= ZUSTAND STORE =================
    const {
        convert,
        lastConversion,
        loading,
        error
    } = useExchangeStore();

    // ================= HANDLE CONVERT =================
    const handleConvert = async () => {
        try {
            if (!amount || amount <= 0) return;

            await convert(amount, from, to);

        } catch (err) {
            console.error(err);
        }
    };

    // ================= REFRESH =================
    const handleRefresh = () => {
        if (amount) {
            handleConvert();
        }
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <header className="bg-white p-8 rounded-[2rem] shadow-sm border border-emerald-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-emerald-950 italic uppercase tracking-tighter">
                        Exchange Center
                    </h1>

                    <div className="flex items-center gap-2 text-emerald-600 font-medium">
                        <Globe size={16} />
                        <span>Tasas de cambio globales en tiempo real</span>
                    </div>
                </div>

                <button
                    onClick={handleRefresh}
                    className="group p-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-all flex items-center gap-2 font-bold"
                >
                    <RefreshCw
                        size={20}
                        className={`${loading ? 'animate-spin' : ''}`}
                    />

                    <span className="text-sm">Actualizar</span>
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT PANEL */}
                <div className="lg:col-span-7 bg-white p-8 rounded-[3rem] shadow-sm border border-emerald-50 space-y-8">

                    {/* AMOUNT */}
                    <div>
                        <label className="block text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-4 ml-1">
                            Monto a enviar
                        </label>

                        <div className="relative">
                            <input
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-8 pr-24 py-6 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-[2rem] outline-none transition-all font-mono text-4xl font-black text-emerald-950"
                            />

                            <div className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-500">
                                {from}
                            </div>
                        </div>
                    </div>

                    {/* SELECTS */}
                    <div className="flex flex-col md:flex-row items-center gap-4">

                        {/* FROM */}
                        <div className="w-full">
                            <label className="block text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-2 ml-1">
                                De divisa
                            </label>

                            <select
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none font-bold text-emerald-900 appearance-none cursor-pointer"
                            >
                                {currencies.map(c => (
                                    <option key={c.code} value={c.code}>
                                        {c.code} - {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="p-3 bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-200 mt-6 hidden md:block">
                            <ArrowRightLeft size={20} />
                        </div>

                        {/* TO */}
                        <div className="w-full">
                            <label className="block text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-2 ml-1">
                                A divisa
                            </label>

                            <select
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none font-bold text-emerald-900 appearance-none cursor-pointer"
                            >
                                {currencies.map(c => (
                                    <option key={c.code} value={c.code}>
                                        {c.code} - {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={handleConvert}
                        disabled={loading}
                        className="w-full py-5 bg-emerald-950 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all uppercase tracking-widest flex justify-center items-center gap-3 disabled:opacity-50"
                    >
                        {loading ? 'Convirtiendo...' : 'Realizar Conversión'}

                        <ArrowUpRight size={20} />
                    </button>

                    {/* ERROR */}
                    {error && (
                        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-2xl text-sm font-semibold">
                            {error}
                        </div>
                    )}
                </div>

                {/* RIGHT PANEL */}
                <div className="lg:col-span-5 flex flex-col gap-6">

                    <div className="flex-1 bg-emerald-600 p-8 rounded-[3rem] shadow-xl text-white flex flex-col justify-between relative overflow-hidden">

                        <TrendingUp
                            size={180}
                            className="absolute -bottom-10 -right-10 opacity-20 rotate-12"
                        />

                        <div className="relative z-10">

                            <span className="px-3 py-1 bg-emerald-500/30 border border-emerald-400/30 rounded-full text-[10px] font-black uppercase tracking-widest">
                                Resultado Estimado
                            </span>

                            <div className="mt-6">

                                <span className="text-6xl font-black tracking-tighter">
                                    {lastConversion
                                        ? lastConversion.convertedAmount.toFixed(2)
                                        : '0.00'}
                                </span>

                                <span className="text-2xl font-bold ml-2 text-emerald-200">
                                    {lastConversion?.to || to}
                                </span>
                            </div>
                        </div>

                        <div className="relative z-10 pt-6 border-t border-emerald-500/50">

                            <div className="flex justify-between items-center text-sm font-medium text-emerald-100">

                                <span>Tasa de cambio:</span>

                                <span className="font-mono">
                                    {lastConversion
                                        ? `1 ${lastConversion.from} = ${lastConversion.rate} ${lastConversion.to}`
                                        : `1 ${from} = 0.00 ${to}`}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* INFO CARD */}
                    <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 flex gap-4 items-start">
                        <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                            <Info size={20} />
                        </div>

                        <div>
                            <h4 className="text-xs font-black text-amber-900 uppercase tracking-widest">
                                Aviso de mercado
                            </h4>

                            <p className="text-[11px] text-amber-700 leading-relaxed mt-1">
                                Las tasas son informativas y cambian según el mercado global.
                                Kinal Bank no cobra comisiones ocultas.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};