import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSaveUser } from "../hook/useSaveHook.js";
import { useUserStore } from "../Store/adminStore.js";
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

    const { saveUser, changeUserRole } = useSaveUser();
    const loading = useUserStore((state) => state.loading);

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
                    UserAddress: "", UserPhone: "", UserJob: "", UserIncome: 1000,
                    UserPassword: "", UserRol: "USER"
                });
            }
        }
    }, [isOpen, user, reset]);

    const onSubmit = async (data) => {
        try {
            await saveUser(data, user?.uid);
            if (user && data.UserRol !== user.UserRol) {
                await changeUserRole(user.uid, data.UserRol);
            }
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

    // Bloquear letras en campos numericos
    const blockLetters = (e) => {
        if (!/[\d]/.test(e.key) && !['ArrowLeft', 'ArrowRight', 'Delete', 'Tab', 'Backspace'].includes(e.key)) {
            e.preventDefault();
        }
    };

    // Bloquear numeros en campos de texto
    const blockNumbers = (e) => {
        if (/\d/.test(e.key)) {
            e.preventDefault();
        }
    };

    // Para ingresos: solo flechas arriba/abajo para cambiar valor, no escribir
    const blockTypingInNumber = (e) => {
        const allowed = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Backspace', 'Tab'];
        if (!allowed.includes(e.key)) {
            e.preventDefault();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-emerald-100">

                {/* HEADER */}
                <div className="p-6 text-white flex justify-between items-center flex-shrink-0" style={{ background: "linear-gradient(90deg, #064e3b 0%, #059669 100%)" }}>
                    <div>
                        <h2 className="text-2xl font-bold">{user ? "Editar Usuario" : "Gestion de Usuario"}</h2>
                        <p className="text-emerald-100 text-xs">Asegurate de verificar el DPI antes de guardar</p>
                    </div>
                    <button onClick={handleClose} className="text-white/80 hover:text-white text-2xl">x</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col overflow-hidden flex-1">
                    <div className="p-8 space-y-6 overflow-y-auto">
                        {/* SECCION 1: Identidad */}
                        <div>
                            <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4 border-b border-emerald-50 pb-1">Informacion de Identidad</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="flex flex-col">
                                    <input
                                        {...register("UserName", {
                                            required: "El nombre es obligatorio",
                                            pattern: { value: /^[a-zA-ZaeiouAEIOUNn\s]+$/, message: "Solo se permiten letras" }
                                        })}
                                        type="text"
                                        placeholder="Nombres"
                                        onKeyDown={blockNumbers}
                                        className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none"
                                    />
                                    {errors.UserName && <span className="text-red-500 text-[10px] mt-1">{errors.UserName.message}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <input
                                        {...register("UserSurname", {
                                            required: "El apellido es obligatorio",
                                            pattern: { value: /^[a-zA-ZaeiouAEIOUNn\s]+$/, message: "Solo se permiten letras" }
                                        })}
                                        type="text"
                                        placeholder="Apellidos"
                                        onKeyDown={blockNumbers}
                                        className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none"
                                    />
                                    {errors.UserSurname && <span className="text-red-500 text-[10px] mt-1">{errors.UserSurname.message}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <input
                                        {...register("UserDPI", {
                                            required: "El DPI es obligatorio",
                                            pattern: { value: /^\d{13}$/, message: "Deben ser 13 digitos" }
                                        })}
                                        disabled={!!user}
                                        type="text"
                                        maxLength={13}
                                        onKeyDown={blockLetters}
                                        placeholder="DPI (CUI)"
                                        className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none disabled:bg-gray-50"
                                    />
                                    {errors.UserDPI && <span className="text-red-500 text-[10px] mt-1">{errors.UserDPI.message}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <input
                                        {...register("UserEmail", {
                                            required: "El correo es obligatorio",
                                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email invalido" }
                                        })}
                                        type="email"
                                        placeholder="Correo Electronico"
                                        className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none"
                                    />
                                    {errors.UserEmail && <span className="text-red-500 text-[10px] mt-1">{errors.UserEmail.message}</span>}
                                </div>
                            </div>
                        </div>

                        {/* SECCION 2: Laboral y Ubicacion */}
                        <div>
                            <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4 border-b border-emerald-50 pb-1">Perfil Socioeconomico</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="flex flex-col md:col-span-2">
                                    <input
                                        {...register("UserAddress", { required: "La direccion es obligatoria" })}
                                        type="text"
                                        className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none"
                                        placeholder="Direccion de Residencia"
                                    />
                                    {errors.UserAddress && <span className="text-red-500 text-[10px] mt-1">{errors.UserAddress.message}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <input
                                        {...register("UserPhone", {
                                            required: "El telefono es obligatorio",
                                            pattern: { value: /^\d{8}$/, message: "El telefono debe tener exactamente 8 digitos" }
                                        })}
                                        type="text"
                                        maxLength={8}
                                        onKeyDown={blockLetters}
                                        className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none"
                                        placeholder="Celular / Telefono"
                                    />
                                    {errors.UserPhone && <span className="text-red-500 text-[10px] mt-1">{errors.UserPhone.message}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <input
                                        {...register("UserJob", {
                                            required: "La ocupacion es obligatoria",
                                            pattern: { value: /^[a-zA-ZaeiouAEIOUNn\s]+$/, message: "Solo se permiten letras" }
                                        })}
                                        type="text"
                                        onKeyDown={blockNumbers}
                                        className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none"
                                        placeholder="Ocupacion / Trabajo"
                                    />
                                    {errors.UserJob && <span className="text-red-500 text-[10px] mt-1">{errors.UserJob.message}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">
                                        Ingresos Mensuales
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">Q</span>
                                        <input
                                            {...register("UserIncome", {
                                                required: "Los ingresos son obligatorios",
                                                min: { value: 1000, message: "El ingreso minimo es Q1,000" },
                                                valueAsNumber: true
                                            })}
                                            type="number"
                                            min={1000}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none"
                                            placeholder="Ingresos Mensuales"
                                        />
                                    </div>
                                    {errors.UserIncome && <span className="text-red-500 text-[10px] mt-1">{errors.UserIncome.message}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1.5 ml-1 tracking-widest">Rol de Usuario</label>
                                    <select {...register("UserRol")} className="px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none">
                                        <option value="USER">Rol: Cliente (USER)</option>
                                        <option value="ADMIN_ROLE">Rol: Administrador (ADMIN)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* SECCION 3: Seguridad (Solo en creacion) */}
                        {!user && (
                            <div>
                                <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4 border-b border-emerald-50 pb-1">Seguridad</h3>
                                <input
                                    {...register("UserPassword", { required: "La contrasena es necesaria" })}
                                    type="password"
                                    title="Password"
                                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none"
                                    placeholder="Contrasena Temporal"
                                />
                                {errors.UserPassword && <span className="text-red-500 text-[10px] mt-1">{errors.UserPassword.message}</span>}
                            </div>
                        )}

                        {/* BOTONES */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-emerald-50">
                            <button type="button" onClick={handleClose} className="px-6 py-2 text-gray-400 font-bold">Cancelar</button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-10 py-3 bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                            >
                                {loading ? <Spinner small /> : user ? "Actualizar Usuario" : "Registrar Usuario"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};