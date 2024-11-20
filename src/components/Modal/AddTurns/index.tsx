import { useEffect, useState } from "react";

import { useModal } from "../../../utils/ModalContext";

import Button from "../../Button/Button";
import Input from "../../Input/Input";

import closeIcon from '../../../assets/icons/close.svg';

import './styles.scss';
import { createTurn, updateTurn } from "../../../api/turns";

const AddTurns = (data: {
  data?: {
    id: string;
    horaInicio: string;
    horaFin: string
  }
}) => {
  const { closeModal } = useModal();

  const [form, setForm] = useState({
    id: '',
    horaInicio: '',
    horaFin: '',
  });

  useEffect(() => {
    if (data) {
      setForm({
        id: data.id,
        horaInicio: data.horaInicio,
        horaFin: data.horaFin,
      });
    }
  }, [data]);

  const handleTurn = async () => {
    if (data) {
      await updateTurn(form);
    } else {
      await createTurn(form);
    }

    closeModal();
  };

  return (
    <div className="add-student">
      <div className="add-student__header">
        <span className="add-student__header-title">{data ? 'Editar Turno' : 'Agregar turno'}</span>
        <img src={closeIcon} alt="close" className="add-student__header-close" onClick={closeModal} />
      </div>
      <div className="add-student__container">
        <Input
          onChange={(value) => setForm({ ...form, horaInicio: value })}
          label="Hora de inicio"
          name="modal"
          type="time"
          value={form.horaInicio}
        />

        <Input
          onChange={(value) => setForm({ ...form, horaFin: value })}
          label="Hora de final"
          name="modal"
          type="time"
          value={form.horaFin}
        />

        <div className="add-student__buttons">
          <Button
            label="Cancelar"
            onClick={closeModal}
          />
          <Button
            label="Guardar"
            onClick={handleTurn}
          />
        </div>
      </div>
    </div>
  );
}

export default AddTurns;
