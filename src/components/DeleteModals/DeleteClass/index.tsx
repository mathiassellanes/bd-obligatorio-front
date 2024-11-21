import { FC } from "react";
import { useModal } from "../../../utils/ModalContext";
import Button from "../../Button/Button";
import closeIcon from '../../../assets/icons/close.svg';
import './styles.scss';

interface DeleteModalProps {
  itemName: string;
  onDelete: () => Promise<void>;
}

const DeleteModal: FC<DeleteModalProps> = ({ itemName, onDelete }) => {
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await onDelete();
    closeModal();
  };

  return (
    <div className="delete-modal">
      <div className="delete-modal__header">
        <span className="delete-modal__header-title">Confirmar eliminación</span>
        <img src={closeIcon} alt="close" className="delete-modal__header-close" onClick={closeModal} />
      </div>
      <div className="delete-modal__container">
        <p>¿Estás seguro de que deseas eliminar {itemName}?</p>
        <div className="delete-modal__buttons">
          <Button
            label="Cancelar"
            onClick={closeModal}
          />
          <Button
            label="Eliminar"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
