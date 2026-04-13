import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const DashboardContainer = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Navbar con sombra sutil para profundidad */}
            <div className="z-20 shadow-sm">
                <Navbar />
            </div>

            <div className="flex flex-1">
                {/* Sidebar con color sólido esmeralda o blanco (según prefieras) */}
                <aside className="w-64 hidden md:block border-r border-gray-200 bg-white">
                    <Sidebar />
                </aside>
                
                {/* Área de contenido con un degradado muy suave en el fondo */}
                <main className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-emerald-50/30">
                    <div className="max-w-7xl mx-auto">
                        {/* Aquí es donde inyectamos el contenido dinámico 
                            Usamos {children} para que sea reutilizable
                        */}
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}