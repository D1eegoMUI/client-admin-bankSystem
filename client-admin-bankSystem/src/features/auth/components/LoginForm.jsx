import { useAuthStore } from "../store/authStore.js";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LoginForm = ({ onForgot, isLogin }) => {
    // 1. Hooks de navegación y estado (Misma estructura anterior)
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.isLoading);

    // 2. Configuración de React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // 3. Función de envío
    const onSubmit = async (data) => {
        console.log("Payload que sale:", JSON.stringify(data));
        const res = await login(data);
        if (res.success) {
            navigate("/dashboard");
            toast.success("!Bienvenido de nuevo");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Sección de email */}    
            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    Correo
                </label>
                <input
                    type="text"
                    placeholder="ejemplo@gmail.com"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    {...register("Email", {
                        required: " ste campo es obligatorio",
                    })}
                />
                {/* Errores visuales */}
                {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.Email.message}</p>
                )}
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
                    {...register("Password", {
                        required: "La contraseña es obligatoria",
                    })}
                />
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm shadow-sm"
            >
                {loading ? "Iniciando..." : "Iniciar Sesión"}
            </button>

            {/* Centramos el botón de olvidaste contraseña */}
            <div className="text-center">
                <button
                    type="button"
                    onClick={onForgot}
                    className="text-sm text-emerald-700 hover:underline font-medium"
                >
                    ¿Olvidaste tu Contraseña?
                </button>
            </div>
        </form>
    );
};

export { LoginForm };