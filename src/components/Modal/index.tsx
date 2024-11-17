import { FC } from 'react';
import './styles.scss';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal__container">
        {children}
      </div>
    </div>
  );
}

export default Modal;
