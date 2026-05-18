import React from 'react';

import {
    User,
    Briefcase,
    Phone,
    MapPin
} from 'lucide-react';

export const CustomerProfile = ({ user }) => {

    return (
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-emerald-100 relative overflow-hidden">

            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[4rem] -mr-6 -mt-6 z-0" />

            <div className="relative z-10 text-center">

                <div className="w-24 h-24 bg-emerald-100 rounded-3xl mx-auto flex items-center justify-center text-emerald-600 mb-4 shadow-inner">
                    <User size={48} strokeWidth={1.5} />
                </div>

                <h2 className="text-xl font-black text-emerald-900">
                    {user.UserName} {user.UserSurname}
                </h2>

                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
                    {user.UserStatus}
                </span>

            </div>

            <div className="mt-8 space-y-4">

                <div className="flex items-start gap-3">

                    <div className="text-emerald-500 mt-1">
                        <Briefcase size={16} />
                    </div>

                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">
                            Ocupación
                        </p>

                        <p className="text-xs font-bold text-emerald-900">
                            {user.UserJob}
                        </p>
                    </div>

                </div>

                <div className="flex items-start gap-3">

                    <div className="text-emerald-500 mt-1">
                        <Phone size={16} />
                    </div>

                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">
                            Contacto
                        </p>

                        <p className="text-xs font-bold text-emerald-900">
                            {user.UserPhone}
                        </p>
                    </div>

                </div>

                <div className="flex items-start gap-3">

                    <div className="text-emerald-500 mt-1">
                        <MapPin size={16} />
                    </div>

                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">
                            Dirección
                        </p>

                        <p className="text-xs font-bold text-emerald-900">
                            {user.UserAddress}
                        </p>
                    </div>

                </div>

                <div className="pt-4 border-t border-gray-50">

                    <p className="text-[10px] text-gray-400 font-bold uppercase">
                        Ingresos Mensuales
                    </p>

                    <p className="text-xl font-black text-emerald-600">
                        Q {user.UserIncome?.toLocaleString() ?? "—"}
                    </p>

                </div>

            </div>
        </div>
    );
};