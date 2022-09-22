import { useState } from 'react'

export default function useModal() {
    const [showModal, setShowModal] = useState(false)
    const [stateBody, setStateBody] = useState("load")
    const closeModal = () => { if (showModal) setShowModal(false) }
    const changeModal = (value) => setStateBody(value)
    const openModal = () => { if (!showModal) setShowModal(true) }

    return {
        showModal,
        stateBody,
        changeModal,
        openModal,
        closeModal
    }
} 