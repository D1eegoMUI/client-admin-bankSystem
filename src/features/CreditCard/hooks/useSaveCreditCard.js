import { useCardStore } from "../../User/Store/adminStore";

export const useCreditCard = () => {
    const saveCredit = useCardStore((state) => state.saveCreditCard);
    const loading = useCardStore((state) => state.loading);

    const emitCredit = async (data) => {
        try {
            // El backend ya genera el resto, solo mandamos la base
            const payload = {
                user: data.user,
                type: data.type, // CLASSIC, GOLD, etc.
                creditLimit: parseFloat(data.creditLimit)
            };
            return await saveCredit(payload);
        } catch (error) {
            console.error("Error en useCreditCard:", error);
            throw error;
        }
    };

    return { emitCredit, loading };
};