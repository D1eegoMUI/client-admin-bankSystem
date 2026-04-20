import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const DashboardContainer = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <div className="z-20 shadow-sm">
                <Navbar />
            </div>

            <div className="flex flex-1">
                {/* Quitamos el <aside> de aquí porque el componente 
                   Sidebar ya trae su etiqueta <aside> con sus estilos 
                */}
                <div className="hidden md:block">
                    <Sidebar />
                </div>
                
                <main className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-emerald-50/30">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}