import React, { createContext, useState, useContext, ReactNode } from 'react';
import Modal from '../components/Modal';
import AddClassModal from '../components/Modal/AddClass';

interface ModalContextType {
  isOpen: boolean;
  openModal: (children: ReactNode) => void;
  closeModal: () => void;
  modalChildren: ReactNode;
  setModalChildren: (children: ReactNode) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState<ReactNode | null>(null);

  const openModal = (childrenModal: ReactNode) => {
    setModalChildren(childrenModal)

    setIsOpen(true)
  };
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalChildren, setModalChildren }}>
      {children}
      {
        isOpen && (
          <Modal>
            {modalChildren}
          </Modal>
        )
      }
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
