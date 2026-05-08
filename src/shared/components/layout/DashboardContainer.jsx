import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const DashboardContainer = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* 1. Contenedor del Navbar: sticky para que no se mueva */}
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            <div className="flex flex-1">
                {/* 2. Contenedor del Sidebar: 
                   Le damos sticky y top-16 (altura del navbar) 
                   para que se mantenga fijo al bajar */}
                <div className="hidden md:block sticky top-16 h-[calc(100vh-4rem)] z-30">
                    <Sidebar />
                </div>
                
                {/* 3. Área de Contenido */}
                <main className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-emerald-50/30">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}