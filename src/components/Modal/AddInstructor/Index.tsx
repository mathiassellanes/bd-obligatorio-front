import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useModal } from "../../../utils/ModalContext";
import Button from "../../Button/Button";
import Input from "../../Input/Input";

import closeIcon from '../../../assets/icons/close.svg';
import { createInstructor, updateInstructor } from "../../../api/instructors.ts";
import { instructor, instructors } from "../../../constants/types/instructors.ts";

import './styles.scss';

const AddInstructorModal = ({ data, setInstructors }: {
  data?: instructor,
  setInstructors: Dispatch<SetStateAction<instructor[] | instructor>>;
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

      setInstructors((prevState) => ({
        ...prevState,
        ...instructorData,
        nombreCompleto: `${instructorData.nombre} ${instructorData.apellido}`
      }));
    } else {
      const instructorCreated = await createInstructor(instructorData);

      setInstructors((prevState) => {
        if (Array.isArray(prevState)) {
          return [...prevState, instructorCreated];
        } else {
          return [prevState, instructorCreated];
        }
      });
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
          disabled={!!data}
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
