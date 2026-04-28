import React, { useState } from 'react';
import { CardItem } from './CardItem.jsx';
import { CardModal } from './CardModal.jsx';

export const CardsView = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-emerald-900">Mis Tarjetas</h1>
                    <p className="text-emerald-600">Administra tus plásticos y líneas de crédito</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
                >
                    + Solicitar Tarjeta
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {/* Ejemplo de data */}
                <CardItem card={{
                    cardNumber: "1234567812345678",
                    holderName: "Pedrito",
                    expirationDate: "05/29",
                    brand: "VISA",
                    type: "CREDIT",
                    isApproved: true
                }} />

                {/* Ejemplo de data */}
                <CardItem card={{
                    cardNumber: "98745632145678941",
                    holderName: "Juanito",
                    expirationDate: "07/28",
                    brand: "VISA",
                    type: "CREDIT",
                    isApproved: false
                }} />

                {/* Ejemplo de data */}
                <CardItem card={{
                    cardNumber: "1234567891011147",
                    holderName: "Leandro",
                    expirationDate: "06/30",
                    brand: "VISA",
                    type: "CREDIT",
                    isApproved: true
                }} />
            </div>

            {showModal && <CardModal onClose={() => setShowModal(false)} />}
        </div>
    );
};