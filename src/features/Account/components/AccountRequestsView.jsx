import { useEffect, useState } from 'react';
import { useAccountRequestStore } from '../../User/Store/adminStore';
import { showSuccess, showError } from '../../../shared/utils/toast.js';
import { BaseButton } from '../../../shared/components/ui/BaseButton.jsx';
import { AccountRequestItem } from './AccountRequestItem.jsx';

export const AccountRequestsView = () => {
    const [filter, setFilter] = useState('PENDING');

    const {
        requests,
        loading,
        processing,
        fetchAccountRequests,
        approveAccountRequest,
        rejectAccountRequest,
    } = useAccountRequestStore();

    useEffect(() => {
        fetchAccountRequests();
    }, []);

    const handleApprove = async (id) => {
        try {
            await approveAccountRequest(id);
            showSuccess('Solicitud aprobada. Cuenta creada y activada.');
        } catch (e) {
            showError(e?.response?.data?.message || 'Error al aprobar.');
        }
    };

    const handleReject = async (id, reason) => {
        try {
            await rejectAccountRequest(id, reason);
            showSuccess('Solicitud rechazada.');
        } catch (e) {
            showError(e?.response?.data?.message || 'Error al rechazar.');
        }
    };

    const pendingCount = requests.filter((r) => r.requestStatus === 'PENDING').length;

    const filterOptions = [
        { value: 'PENDING',  label: 'Pendientes' },
        { value: 'APPROVED', label: 'Aprobadas'  },
        { value: 'REJECTED', label: 'Rechazadas' },
    ];

    const activeList = requests.filter((r) => r.requestStatus === filter);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">

            {/* Hero */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-950 rounded-[2.5rem] p-8 text-white col-span-2 shadow-2xl shadow-emerald-900/30">
                    <h1 className="text-4xl font-black italic tracking-tighter">
                        Solicitudes de <span className="text-emerald-400">Cuentas</span>
                    </h1>
                    <p className="text-emerald-200/60 mt-2 font-medium">
                        Revisa y aprueba las solicitudes de apertura de cuenta de los clientes.
                    </p>
                </div>

                <div className="bg-white rounded-[2.5rem] p-6 border border-emerald-100 flex flex-col justify-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Pendientes</p>
                    <p className="text-5xl font-black text-emerald-950">{pendingCount}</p>
                </div>
            </div>

            {/* Filtros */}
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

            {/* Grid */}
            {loading ? (
                <p className="text-center text-gray-400 font-bold py-12">Cargando solicitudes...</p>
            ) : activeList.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl">
                    <p className="text-gray-400 font-medium italic">
                        No hay solicitudes con el filtro seleccionado.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {activeList.map((req) => (
                        <AccountRequestItem
                            key={req._id}
                            req={req}
                            processing={processing}
                            onApprove={handleApprove}
                            onReject={handleReject}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};