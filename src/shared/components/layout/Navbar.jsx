import imgLogo from "../../../assets/img/Kinal_bank.png";

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl px-6 h-16 flex items-center justify-between">

                {/* Logo + título institucional */}
                <div className="flex items-center gap-3">
                    <img
                        src={imgLogo}
                        alt="Kinal Bank Logo"
                        className="h-12 md:h-14 w-auto object-contain"
                    />
                    <div className="h-6 w-px bg-gray-200 mx-1 hidden md:block" /> {/* Separador visual */}
                    <h1 className="font-bold text-emerald-900 text-lg tracking-tight">
                        Kinal Bank <span className="font-normal text-emerald-600">Admin</span>
                    </h1>
                </div>
            </div>
        </nav>
    );
}

export { Navbar };