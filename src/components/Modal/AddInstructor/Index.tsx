import { useModal } from "../../../utils/ModalContext";
import Button from "../../Button/Button";
import Input from "../../Input/Input";

import closeIcon from '../../../assets/icons/close.svg';

import './styles.scss';
import { useEffect, useState } from "react";
import { createInstructor, updateInstructor } from "../../../api/instructors.ts";

const AddInstructorModal = ({ data }: {
  data?: {
    ci: string,
    nombreCompleto: string,
    nombre: string,
    apellido: string,
  }
}) => {
  const { closeModal } = useModal();

  const [form, setForm] = useState({
    ci: '',
    nombre: '',
    apellido: '',
  });

  useEffect(() => {
    if (data) {
      setForm({
        ci: data.ci,
        nombre: data.nombre,
        apellido: data.apellido
      });
    }
  }, [data]);

  console.log('form', form);

  const handleInstructor = async () => {
    const instructorData = {
      ci: form.ci,
      nombre: form.nombre,
      apellido: form.apellido,
    };

    if (data) {
      await updateInstructor(instructorData);
    } else {
      await createInstructor(instructorData);
    }

    closeModal();
  };

  return (
    <div className="add-instructor">
      <div className="add-instructor__header">
        <span className="add-instructor__header-title">{data ? 'Editar instructor' : 'Agregar instructor'}</span>
        <img src={closeIcon} alt="close" className="add-instructor__header-close" onClick={closeModal} />
      </div>
      <div className="add-instructor__container">
        <Input
          onChange={(value) => setForm({ ...form, ci: value })}
          label="CI "
          name="modal"
          value={form.ci}
        />
        <Input
          onChange={(value) => setForm({ ...form, nombre: value })}
          label="Nombre "
          name="modal"
          value={form.nombre}
        />
        <Input
          onChange={(value) => setForm({ ...form, apellido: value })}
          label="Apellido "
          name="modal"
          value={form.apellido}
        />
        <div className="add-instructor__buttons">
          <Button
            label="Cancelar"
            onClick={closeModal}
          />
          <Button
            label="Guardar"
            onClick={handleInstructor}
          />
        </div>
      </div>
    </div>
  );
}

export default AddInstructorModal;
