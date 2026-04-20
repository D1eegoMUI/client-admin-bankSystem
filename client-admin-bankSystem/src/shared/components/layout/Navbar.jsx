import imgLogo from "../../../assets/img/Kinal_bank.png";

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="w-full px-4 h-16 flex items-center justify-between">

                {/* Logo + título institucional */}
                <div className="flex items-center gap-3">
                    <img
                        src={imgLogo}
                        alt="Kinal Bank Logo"
                        className="h-10 md:h-12 w-auto object-contain" // Reduje un poco el alto para que no se vea tan apretado en los 16 de la h-16
                    />
                    <div className="h-6 w-px bg-gray-200 mx-1 hidden md:block" /> 
                    <h1 className="font-bold text-emerald-900 text-lg tracking-tight">
                         Kinal Bank <span className="font-normal text-emerald-600">Admin</span>
                    </h1>
                </div>

                {/* Si tienes algo a la derecha (como un avatar), iría aquí */}
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100" />
            </div>
        </nav>
    );
}

export { Navbar };