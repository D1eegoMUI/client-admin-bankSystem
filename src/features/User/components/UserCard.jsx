export const UserCard = ({ user }) => {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all group">
            <div className="flex items-center gap-4 mb-4">
                {/* Avatar con Iniciales */}
                <div className="w-14 h-14 rounded-2xl bg-emerald-900 text-white flex items-center justify-center text-xl font-black shadow-lg">
                    {user.UserName[0]}{user.UserSurname[0]}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-emerald-950 group-hover:text-emerald-600 transition-colors">
                            {user.UserName} {user.UserSurname}
                        </h3>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${user.UserRol === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {user.UserRol}
                        </span>
                    </div>
                    <p className="text-xs text-gray-400">{user.UserEmail}</p>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400 uppercase font-bold">DPI</span>
                    <span className="text-emerald-900 font-mono font-bold">{user.UserDPI}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400 uppercase font-bold">Estado</span>
                    <span className={user.UserStatus === 'ACTIVE' ? 'text-emerald-500 font-bold' : 'text-red-400 font-bold'}>
                        ● {user.UserStatus}
                    </span>
                </div>
            </div>

            <div className="flex gap-2 border-t border-gray-50 pt-4">
                <button className="flex-1 py-2 text-xs font-bold bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors">
                    Editar Perfil
                </button>
                {user.isVerified ? (
                    <span className="p-2 bg-emerald-500 text-white rounded-xl shadow-md" title="Usuario Verificado">✓</span>
                ) : (
                    <button className="p-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100" title="Pendiente de Verificación">!</button>
                )}
            </div>
        </div>
    );
};