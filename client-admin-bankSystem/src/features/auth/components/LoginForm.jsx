import { useState } from "react";

const LoginForm = ({ onForgot, isLogin }) => {
    return (
        <form className="space-y-5">
            {/* Sección de email o usuario */}
            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    Correo o Usuario
                </label>
                <input
                    type="text"
                    placeholder="ejemplo@gmail.com o usuario"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>

            {/* Sección de contraseña */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Contraseña
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm shadow-sm"
            >
                Iniciar Sesión
            </button>

            {/* Centramos el botón de olvidaste contraseña */}
            <div className="text-center">
                <button
                    type="button"
                    onClick={onForgot} // Ahora sí funcionará porque lo recibimos arriba
                    className="text-sm text-emerald-700 hover:underline font-medium"
                    >
                        ¿Olvidaste tu Contraseña?
                    </button>
                </div>
        </form>
    );
};

export { LoginForm };