import { useState } from "react";

const LoginForm = () => {

    return (
        <form className="space-y-5">
            <div>
                <label className="block text-sm font-medium
                text-gray-700 mb-1.5">
                    Correo
                </label>
                <input
                    type="text"
                    placeholder="ejemplo@gmail.com"
                    className="w-full px-3 py-2 text-sm
                    border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-emerald-500" />
            </div>

            <div>
                <label className="block text-sm font-medium
                text-gray-700 mb-1.5">
                    Contraseña
                </label>
                <input
                    type="password"
                    placeholder="••••••"
                    className="w-full px-3 py-2 text-sm
                    border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-emerald-500" />
            </div>

            <button className="w-full bg-emerald-700
            hover:bg-emerald-800 text-white font-medium py-2.5
            px-4 rounded-lg text-sm">
                Ingresar
            </button>
        </form>
    );
};

export { LoginForm };