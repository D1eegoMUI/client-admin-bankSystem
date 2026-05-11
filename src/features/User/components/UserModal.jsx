import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSaveUser } from "../hook/useSaveHook.js";
import { useUserStore } from "../store/adminStore.js";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { showSuccess, showError } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";

export const UserModal = ({ isOpen, onClose, user }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm();

    const { saveUser } = useSaveUser();
    const loading = useUserStore((state) => state.loading);

    // Efecto para cargar datos en edición o limpiar en creación
    useEffect(() => {
        if (isOpen) {
            if (user) {
                reset({
                    UserName: user.UserName,
                    UserSurname: user.UserSurname,
                    UserDPI: user.UserDPI,
                    UserEmail: user.UserEmail,
                    UserAddress: user.UserAddress,
                    UserPhone: user.UserPhone,
                    UserJob: user.UserJob,
                    UserIncome: user.UserIncome,
                    UserRol: user.UserRol,
                });
            } else {
                reset({
                    UserName: "", UserSurname: "", UserDPI: "", UserEmail: "",
                    UserAddress: "", UserPhone: "", UserJob: "", UserIncome: 0,
                    UserPassword: "", UserRol: "USER"
                });
            }
        }
    }, [isOpen, user, reset]);

    const onSubmit = async (data) => {
        try {
            await saveUser(data, user?.uid);
            showSuccess(user ? "Usuario actualizado" : "Usuario creado exitosamente");
            onClose();
        } catch (error) {
            showError(error.response?.data?.message || "Error al procesar el usuario");
        }
    };

    const handleClose = () => {
        if (isDirty) {
            showConfirmToast({
                title: "Cerrar Editor",
                message: "Tienes cambios sin guardar. ¿Deseas salir de todos modos?",
                onConfirm: () => {
                    reset();
                    onClose();
                }
            });
        } else {
            reset();
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-emerald-100">
                
                {/* HEADER */}
                <div className="p-6 text-white flex justify-between items-center" style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}>
                    <div>
                        <h2 className="text-2xl font-bold">{user ? "Editar Usuario" : "Gestión de Usuario"}</h2>
                        <p className="text-emerald-100 text-xs">Asegúrate de verificar el DPI antes de guardar</p>
                    </div>
                    <button onClick={handleClose} className="text-white/80 hover:text-white text-2xl">×</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col overflow-hidden">
                    <div className="p-8 space-y-6 overflow-y-auto">
                        {/* SECCIÓN 1: Identidad */}
                        <div>
                            <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4 border-b border-emerald-50 pb-1">Información de Identidad</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input {...register("UserName", { required: "Campo obligatorio" })} type="text" className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Nombres" />
                                <input {...register("UserSurname", { required: "Campo obligatorio" })} type="text" className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Apellidos" />
                                <input {...register("UserDPI", { required: "Campo obligatorio" })} disabled={!!user} type="text" className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none disabled:bg-gray-50" placeholder="DPI (CUI)" />
                                <input {...register("UserEmail", { required: "Email obligatorio" })} type="email" className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Correo Electrónico" />
                            </div>
                        </div>

                        {/* SECCIÓN 2: Laboral y Ubicación */}
                        <div>
                            <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4 border-b border-emerald-50 pb-1">Perfil Socioeconómico</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input {...register("UserAddress", { required: "Obligatorio" })} type="text" className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none md:col-span-2" placeholder="Dirección de Residencia" />
                                <input {...register("UserPhone", { required: "Obligatorio" })} type="text" className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Celular / Teléfono" />
                                <input {...register("UserJob", { required: "Obligatorio" })} type="text" className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Ocupación / Trabajo" />
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">Q</span>
                                    <input {...register("UserIncome", { required: "Obligatorio" })} type="number" className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Ingresos Mensuales" />
                                </div>
                                <select {...register("UserRol")} className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none">
                                    <option value="USER">Rol: Cliente (USER)</option>
                                    <option value="ADMIN">Rol: Administrador (ADMIN)</option>
                                </select>
                            </div>
                        </div>

                        {/* SECCIÓN 3: Seguridad (Solo en creación) */}
                        {!user && (
                            <div>
                                <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4 border-b border-emerald-50 pb-1">Seguridad</h3>
                                <input {...register("UserPassword", { required: "La contraseña es necesaria" })} type="password" title='Password' className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none" placeholder="Contraseña Temporal" />
                            </div>
                        )}

                        {/* BOTONES */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-emerald-50">
                            <button type="button" onClick={handleClose} className="px-6 py-2 text-gray-400 font-bold">Cancelar</button>
                            <button type="submit" disabled={loading} className="px-10 py-3 bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
                                {loading ? <Spinner small /> : user ? "Actualizar Usuario" : "Registrar Usuario"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};