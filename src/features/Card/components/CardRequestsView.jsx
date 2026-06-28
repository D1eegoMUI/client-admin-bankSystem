import { useEffect, useState } from 'react';
import {
    useCardRequestStore,
    useCardStatusRequestStore,
    useCreditCardRequestStore,
    useExtraFinancingRequestStore,
} from '../../User/Store/adminStore';
import { showSuccess, showError } from '../../../shared/utils/toast.js';
import { BaseButton } from '../../../shared/components/ui/BaseButton.jsx';
import { CardRequestItem } from './CardRequestItem.jsx';
import { CardStatusRequestItem } from './CardStatusRequestItem.jsx';
import { CreditCardRequestItem } from '../../CreditCard/components/CreditCardRequestItem.jsx';
import { ExtraFinancingRequestItem } from '../../CreditCard/components/ExtraFinancingRequestItem.jsx';

export const CardRequestsView = () => {
    // tab principal: 'requests' | 'status' | 'financing'
    const [tab, setTab] = useState('requests');
    // sub-tab dentro de 'requests': 'debit' | 'credit'
    const [cardTab, setCardTab] = useState('debit');
    const [filter, setFilter] = useState('PENDING');

    // ── Solicitudes nuevas débito ──────────────────────────────────────────
    const {
        requests: debitRequests,
        loading: loadingDebit,
        processing: processingDebit,
        fetchCardRequests,
        approveCardRequest,
        rejectCardRequest,
    } = useCardRequestStore();

    // ── Solicitudes nuevas crédito ─────────────────────────────────────────
    const {
        requests: creditRequests,
        loading: loadingCredit,
        processing: processingCredit,
        fetchCreditCardRequests,
        approveCreditCardRequest,
        rejectCreditCardRequest,
    } = useCreditCardRequestStore();

    // ── Solicitudes de cambio de estado ───────────────────────────────────
    const {
        requests: statusRequests,
        loading: loadingStatus,
        processing: processingStatus,
        fetchCardStatusRequests,
        approveCardStatusRequest,
        rejectCardStatusRequest,
    } = useCardStatusRequestStore();

    // ── Solicitudes de extra-financiamiento ───────────────────────────────
    const {
        requests: financingRequests,
        loading: loadingFinancing,
        processing: processingFinancing,
        fetchExtraFinancingRequests,
        approveRequest: approveFinancing,
        rejectRequest: rejectFinancing,
    } = useExtraFinancingRequestStore();

    useEffect(() => {
        fetchCardRequests();
        fetchCreditCardRequests();
        fetchCardStatusRequests();
        fetchExtraFinancingRequests();
    }, []);

    // ── Handlers débito ───────────────────────────────────────────────────
    const handleApproveDebit = async (id) => {
        try {
            await approveCardRequest(id);
            showSuccess('Solicitud aprobada. Tarjeta de débito emitida y activada.');
        } catch (e) {
            showError(e?.response?.data?.message || 'Error al aprobar.');
        }
    };

    const handleRejectDebit = async (id, reason) => {
        try {
            await rejectCardRequest(id, reason);
            showSuccess('Solicitud rechazada.');
        } catch (e) {
            showError(e?.response?.data?.message || 'Error al rechazar.');
        }
    };

    // ── Handlers crédito ──────────────────────────────────────────────────
    const handleApproveCredit = async (id, approvedCreditLimit) => {
        try {
            await approveCreditCardRequest(id, approvedCreditLimit);
            showSuccess('Solicitud aprobada. Tarjeta de crédito emitida.');
        } catch (e) {
            showError(e?.response?.data?.message || 'Error al aprobar.');
        }
    };

    const handleRejectCredit = async (id, reason) => {
        try {
            await rejectCreditCardRequest(id, reason);
            showSuccess('Solicitud rechazada.');
        } catch (e) {
            showError(e?.response?.data?.message || 'Error al rechazar.');
        }
    };

    // ── Handlers estado ───────────────────────────────────────────────────
    const handleApproveStatus = async (id) => {
        try {
            await approveCardStatusRequest(id);
            showSuccess('Cambio de estado aplicado correctamente.');
        } catch (e) {
            showError(e?.response?.data?.message || 'Error al aprobar.');
        }
    };

    const handleRejectStatus = async (id, reason) => {
        try {
            await rejectCardStatusRequest(id, reason);
            showSuccess('Solicitud rechazada.');
        } catch (e) {
            showError(e?.response?.data?.message || 'Error al rechazar.');
        }
    };

    // ── Handlers extra-financiamiento ─────────────────────────────────────
    const handleApproveFinancing = async (id) => {
        try {
            await approveFinancing(id);
            showSuccess('Solicitud aprobada. Extra-financiamiento creado exitosamente.');
        } catch (e) {
            showError(e?.response?.data?.message || 'Error al aprobar.');
        }
    };

    const handleRejectFinancing = async (id, reason) => {
        try {
            await rejectFinancing(id, reason);
            showSuccess('Solicitud rechazada.');
        } catch (e) {
            showError(e?.response?.data?.message || 'Error al rechazar.');
        }
    };

    // ── Contadores de pendientes ──────────────────────────────────────────
    const pendingDebit     = debitRequests.filter((r) => r.status === 'PENDING').length;
    const pendingCredit    = creditRequests.filter((r) => r.status === 'PENDING').length;
    const pendingCards     = pendingDebit + pendingCredit;
    const pendingStatus    = statusRequests.filter((r) => r.status === 'PENDING').length;
    const pendingFinancing = financingRequests.filter((r) => r.status === 'PENDING').length;

    // ── Lista activa según tab + sub-tab + filtro ─────────────────────────
    const filterOptions = [
        { value: 'PENDING',  label: 'Pendientes' },
        { value: 'APPROVED', label: 'Aprobadas'  },
        { value: 'REJECTED', label: 'Rechazadas' },
    ];

    const activeList = (() => {
        if (tab === 'status')    return statusRequests.filter((r) => r.status === filter);
        if (tab === 'financing') return financingRequests.filter((r) => r.status === filter);
        if (cardTab === 'credit') return creditRequests.filter((r) => r.status === filter);
        return debitRequests.filter((r) => r.status === filter);
    })();

    const isLoading = (() => {
        if (tab === 'status')    return loadingStatus;
        if (tab === 'financing') return loadingFinancing;
        if (cardTab === 'credit') return loadingCredit;
        return loadingDebit;
    })();

    const activeProcessing = (() => {
        if (tab === 'status')    return processingStatus;
        if (tab === 'financing') return processingFinancing;
        if (cardTab === 'credit') return processingCredit;
        return processingDebit;
    })();

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">

            {/* ── Hero ───────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-950 rounded-[2.5rem] p-8 text-white col-span-2 shadow-2xl shadow-emerald-900/30">
                    <h1 className="text-4xl font-black italic tracking-tighter">
                        Solicitudes de <span className="text-emerald-400">Tarjetas</span>
                    </h1>
                    <p className="text-emerald-200/60 mt-2 font-medium">
                        Gestiona solicitudes de tarjetas, cambios de estado y extra-financiamientos.
                    </p>
                </div>

                {/* Contadores */}
                <div className="bg-white rounded-[2.5rem] p-6 border border-emerald-100 flex flex-col justify-center gap-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Débito</p>
                            <p className="text-3xl font-black text-emerald-950">{pendingDebit}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Crédito</p>
                            <p className="text-3xl font-black text-indigo-700">{pendingCredit}</p>
                        </div>
                    </div>
                    <div className="w-full border-t border-gray-100" />
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Act. / Desact.</p>
                            <p className="text-3xl font-black text-blue-700">{pendingStatus}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Financiamientos</p>
                            <p className="text-3xl font-black text-slate-700">{pendingFinancing}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Tab principal ──────────────────────────────────────────── */}
            <div className="flex gap-1.5 flex-wrap bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm w-fit">
                <BaseButton
                    variant={tab === 'requests' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => { setTab('requests'); setFilter('PENDING'); }}
                    className="text-[10px] uppercase tracking-widest font-black"
                >
                    Nuevas Tarjetas
                    {pendingCards > 0 && (
                        <span className="ml-2 bg-white text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded-full">
                            {pendingCards}
                        </span>
                    )}
                </BaseButton>
                <BaseButton
                    variant={tab === 'status' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => { setTab('status'); setFilter('PENDING'); }}
                    className="text-[10px] uppercase tracking-widest font-black"
                >
                    Act. / Desact.
                    {pendingStatus > 0 && (
                        <span className="ml-2 bg-white text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded-full">
                            {pendingStatus}
                        </span>
                    )}
                </BaseButton>
                <BaseButton
                    variant={tab === 'financing' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => { setTab('financing'); setFilter('PENDING'); }}
                    className="text-[10px] uppercase tracking-widest font-black"
                >
                    Extra Financiamientos
                    {pendingFinancing > 0 && (
                        <span className="ml-2 bg-white text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded-full">
                            {pendingFinancing}
                        </span>
                    )}
                </BaseButton>
            </div>

            {/* ── Sub-tab Débito / Crédito (solo en tab 'requests') ─────── */}
            {tab === 'requests' && (
                <div className="flex gap-1.5 bg-gray-50 p-1.5 rounded-xl border border-gray-200 w-fit">
                    <button
                        onClick={() => { setCardTab('debit'); setFilter('PENDING'); }}
                        className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                            cardTab === 'debit'
                                ? 'bg-emerald-600 text-white shadow'
                                : 'text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        Débito
                        {pendingDebit > 0 && (
                            <span className={`ml-2 text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                                cardTab === 'debit' ? 'bg-white text-emerald-700' : 'bg-emerald-100 text-emerald-700'
                            }`}>
                                {pendingDebit}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => { setCardTab('credit'); setFilter('PENDING'); }}
                        className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                            cardTab === 'credit'
                                ? 'bg-indigo-600 text-white shadow'
                                : 'text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        Crédito
                        {pendingCredit > 0 && (
                            <span className={`ml-2 text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                                cardTab === 'credit' ? 'bg-white text-indigo-700' : 'bg-indigo-100 text-indigo-700'
                            }`}>
                                {pendingCredit}
                            </span>
                        )}
                    </button>
                </div>
            )}

            {/* ── Filtros de estado ─────────────────────────────────────── */}
            <div className="flex gap-1.5 flex-wrap">
                {filterOptions.map((opt) => (
                    <BaseButton
                        key={opt.value}
                        variant={filter === opt.value ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setFilter(opt.value)}
                        className="text-[10px] uppercase tracking-widest font-black"
                    >
                        {opt.label}
                    </BaseButton>
                ))}
            </div>

            {/* ── Grid de solicitudes ───────────────────────────────────── */}
            {isLoading ? (
                <p className="text-center text-gray-400 font-bold py-12">Cargando solicitudes...</p>
            ) : activeList.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl">
                    <p className="text-gray-400 font-medium italic">
                        No hay solicitudes con el filtro seleccionado.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {tab === 'status' && activeList.map((req) => (
                        <CardStatusRequestItem
                            key={req._id}
                            req={req}
                            processing={activeProcessing}
                            onApprove={handleApproveStatus}
                            onReject={handleRejectStatus}
                        />
                    ))}

                    {tab === 'requests' && cardTab === 'debit' && activeList.map((req) => (
                        <CardRequestItem
                            key={req._id}
                            req={req}
                            processing={activeProcessing}
                            onApprove={handleApproveDebit}
                            onReject={handleRejectDebit}
                        />
                    ))}

                    {tab === 'requests' && cardTab === 'credit' && activeList.map((req) => (
                        <CreditCardRequestItem
                            key={req._id}
                            req={req}
                            processing={activeProcessing}
                            onApprove={handleApproveCredit}
                            onReject={handleRejectCredit}
                        />
                    ))}

                    {tab === 'financing' && activeList.map((req) => (
                        <ExtraFinancingRequestItem
                            key={req._id}
                            req={req}
                            processing={activeProcessing}
                            onApprove={handleApproveFinancing}
                            onReject={handleRejectFinancing}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};