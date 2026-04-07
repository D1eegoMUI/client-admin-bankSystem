import { useState } from "react";
import { LoginForm } from "../components/LoginForm.jsx";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isForget, setIsForget] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center p-4"
             style={{ background: "linear-gradient(135deg, #064e3b 0%, #047857 100%)" }}>

            <div className="w-full max-w-sm bg-white rounded-2xl
            border border-white/60 p-8">

                <div className="flex justify-center mb-6">
                    <img
                        src="/src/assets/img/Kinal_bank.png"
                        alt="KinalBank"
                        className="h-40 w-auto"
                    />
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-emerald-900 mb-2">
                        {isForget
                            ? "Recuperar NIP"
                            : isLogin
                            ? "Bienvenido"
                            : "Crear cuenta"
                        }
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {isForget
                            ? "Ingresa tu correo para recuperar tu NIP"
                            : isLogin
                            ? "Ingresa a tu cuenta de Kinal Bank"
                            : "Regístrate en Kinal Bank"
                        }
                    </p>
                </div>

                {isForget
                    ? "Formulario de recuperación"
                    : <LoginForm />
                }

                <div className="flex justify-between mt-4">
                    <button
                        className="text-xs text-emerald-700 underline"
                        onClick={() => setIsForget(!isForget)}>
                        {isForget ? "Volver" : "¿Olvidaste tu NIP?"}
                    </button>
                    <button
                        className="text-xs text-emerald-700 underline"
                        onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Registrarme" : "Ya tengo cuenta"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export { AuthPage };