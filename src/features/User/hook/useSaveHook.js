import { useUserStore } from "../Store/adminStore.js";

export const useSaveUser = () => {
  const createUser = useUserStore((state) => state.createUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const saveUser = async (data, userId = null) => {
    // Estructuramos el objeto según los nombres exactos de tu modelo de Mongoose
    const userData = {
      UserName: data.UserName,
      UserSurname: data.UserSurname,
      UserDPI: data.UserDPI,
      UserEmail: data.UserEmail,
      UserAddress: data.UserAddress,
      UserPhone: data.UserPhone,
      UserJob: data.UserJob,
      UserIncome: Number(data.UserIncome), // Convertimos a número para validar los ingresos
      UserPassword: data.UserPassword,
      UserRol: data.UserRol,
    };

    if (userId) {
      /* 
         Recordatorio: Tu controlador 'updateUser' en el backend borra 
         UserDPI, UserPassword y UserRol antes de actualizar para proteger los datos.
      */
      await updateUser(userId, userData);
    } else {
      await createUser(userData);
    }
  };

  return { saveUser };
};