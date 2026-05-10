import { useCardStore } from "../../User/Store/adminStore";

export const useSaveCard = () => {
    const saveCard = useCardStore((state) => state.saveDebitCard);
    const loading = useCardStore((state) => state.loading);

    const saveCardData = async (data, cardId = null) => {
        try {
            const payload = {
                user: data.user,      // ID del dueño
                account: data.account, // ID de la cuenta bancaria vinculada
                type: 'DEBIT',         // Valor fijo para esta entidad
                holderName: data.holderName,
                brand: data.brand
            };

            // Aquí podrías agregar lógica para update si tu store lo permite
            return await saveCard(payload);
        } catch (error) {
            console.error("Error en useSaveCard:", error);
            throw error;
        }
    };

    return { saveCardData, loading };
};