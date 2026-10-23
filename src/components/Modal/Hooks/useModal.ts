import { useState } from 'react';
export type UseModalResult = {
  readonly showModal: boolean;
  readonly stateBody: string;
  changeModal: (value: string) => void;
  openModal: () => void;
  closeModal: () => void;
};
export default function useModal(): UseModalResult {
  const [showModal, setShowModal] = useState(false);
  const [stateBody, setStateBody] = useState("load");
  const closeModal = () => {
    if (showModal) setShowModal(false);
  };
  const changeModal = (value: string) => setStateBody(value);
  const openModal = () => {
    if (!showModal) setShowModal(true);
  };
  return {
    showModal,
    stateBody,
    changeModal,
    openModal,
    closeModal
  };
}
