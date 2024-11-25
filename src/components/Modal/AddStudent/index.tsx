import { useModal } from "../../../utils/ModalContext";
import Button from "../../Button/Button";
import Input from "../../Input/Input";

import closeIcon from '../../../assets/icons/close.svg';

import './styles.scss';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createStudent, updateStudent } from "../../../api/students";

import { formatDate } from "../../../utils/helpers";
import { Student } from "../../../constants/types/students";

const AddStudentModal = ({ data, setStudents }: {
  data?: Student;
  setStudents: Dispatch<SetStateAction<Student[] | Student>>;
}) => {
  const { closeModal } = useModal();

  const [form, setForm] = useState({
    ci: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    telefono: '',
    correo: '',
  });

  useEffect(() => {
    if (data) {
      setForm({
        ci: data.ci,
        nombre: data.nombre,
        apellido: data.apellido,
        fechaNacimiento: formatDate(data.fechaNacimiento, 'yyyy-MM-dd'),
        telefono: data.telefono,
        correo: data.correo,
      });
    }
  }, [data]);

  console.log('form', form);

  const handleStudent = async () => {
    const studentData = {
      ci: form.ci,
      nombre: form.nombre,
      apellido: form.apellido,
      fechaNacimiento: form.fechaNacimiento,
      telefono: form.telefono,
      correo: form.correo,
    };

    if (data) {
      const updatedStudent = await updateStudent(studentData);

      setStudents(updatedStudent);
    } else {
      const createdStudent = await createStudent(studentData);

      setStudents((prevState) => {
        if (Array.isArray(prevState)) {
          return [...prevState, createdStudent];
        } else {
          return [prevState, createdStudent];
        }
      });
    }

    closeModal();
  };

  return (
    <div className="add-student">
      <div className="add-student__header">
        <span className="add-student__header-title">{data ? 'Editar estudiante' : 'Agregar estudiante'}</span>
        <img src={closeIcon} alt="close" className="add-student__header-close" onClick={closeModal} />
      </div>
      <div className="add-student__container">
        {
          !data && (
            <Input
              onChange={(value) => setForm({ ...form, ci: value })}
              label="CI "
              name="modal"
              value={form.ci}
            />
          )
        }
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
        <Input
          onChange={(value) => setForm({ ...form, fechaNacimiento: value })}
          label="Fecha de Nacimiento "
          type="date"
          name="modal"
          value={form.fechaNacimiento}
        />
        <Input
          onChange={(value) => setForm({ ...form, telefono: value })}
          label="Teléfono "
          name="modal"
          value={form.telefono}
        />
        <Input
          onChange={(value) => setForm({ ...form, correo: value })}
          label="Correo "
          name="modal"
          value={form.correo}
        />
        <div className="add-student__buttons">
          <Button
            label="Cancelar"
            onClick={closeModal}
          />
          <Button
            label="Guardar"
            onClick={handleStudent}
          />
        </div>
      </div>
    </div>
  );
}

export default AddStudentModal;
