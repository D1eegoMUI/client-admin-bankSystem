import React, { useState } from 'react'
import { AccountList } from './AccountList.jsx' // El componente de la cuadrícula
import { AccountModal } from './AccountModal.jsx' // El componente del formulario

export const AccountsView = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="relative">
            {/* Componente de la lista que recibe la función para abrir el modal */}
            <AccountList onAddClick={() => setIsModalOpen(true)} />

            {/* Renderizado condicional del modal */}
            {isModalOpen && (
                <AccountModal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    )
}