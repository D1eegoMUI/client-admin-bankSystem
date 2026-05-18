import { useUserStore } from "../Store/adminStore.js";
import { changeUserRole as changeUserRoleApi } from "../../../shared/Api/admin.js";

export const useSaveUser = () => {
  const createUser = useUserStore((state) => state.createUser);
  const updateUser = useUserStore((state) => state.updateUser);

  const saveUser = async (data, userId = null) => {
    const userData = {
      UserName: data.UserName,
      UserSurname: data.UserSurname,
      UserDPI: data.UserDPI,
      UserEmail: data.UserEmail,
      UserAddress: data.UserAddress,
      UserPhone: data.UserPhone,
      UserJob: data.UserJob,
      UserIncome: Number(data.UserIncome),
      UserPassword: data.UserPassword,
      UserRol: data.UserRol,
    };

    if (userId) {
      await updateUser(userId, userData);
    } else {
      await createUser(userData);
    }
  };

  const changeUserRole = async (userId, newRole) => {
    await changeUserRoleApi(userId, newRole);
  };

  return { saveUser, changeUserRole };
};