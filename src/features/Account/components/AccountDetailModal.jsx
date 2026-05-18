import React from 'react';

export const AccountDetailModal = ({ account, onClose }) => {
    const owner = account.user?.UserName
        ? `${account.user.UserName} ${account.user.UserSurname || ''}`
        : account.user;

    return (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] my-auto overflow-hidden">
                <div className="flex items-center justify-between gap-4 p-6 bg-emerald-600 text-white">
                    <div>
                        <h2 className="text-2xl font-bold">Detalle de Cuenta</h2>
                        <p className="text-sm text-emerald-100">Información de la cuenta seleccionada</p>
                    </div>
                    <button onClick={onClose} className="text-3xl leading-none hover:text-emerald-200">×</button>
                </div>

                <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Número de cuenta</p>
                            <p className="text-lg font-bold text-emerald-900">{account.accountNumber}</p>
                        </div>
                        <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Tipo de cuenta</p>
                            <p className="text-lg font-bold text-emerald-900">{account.accountType}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Saldo</p>
                            <p className="text-3xl font-black text-emerald-900">{account.currency} {Number(account.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Estado</p>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${account.status ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                {account.status ? 'Activa' : 'Inactiva'}
                            </span>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Propietario</p>
                        <p className="text-lg font-bold text-emerald-900">{owner || 'N/A'}</p>
                        {account.user?.UserEmail && <p className="text-sm text-slate-500 mt-2">{account.user.UserEmail}</p>}
                    </div>

                    <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Detalles adicionales</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
                            <div>
                                <p className="font-semibold text-slate-800">Divisa</p>
                                <p>{account.currency}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800">Cuenta</p>
                                <p>{account.accountNumber}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800">Tipo</p>
                                <p>{account.accountType}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800">Usuario</p>
                                <p>{owner || account.user || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
