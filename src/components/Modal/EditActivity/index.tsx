import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useModal } from "../../../utils/ModalContext";
import Button from "../../Button/Button";
import Input from "../../Input/Input";

import closeIcon from '../../../assets/icons/close.svg';

import { Activity } from "../../../constants/types/students.ts";
import { editActivity } from "../../../api/activities.ts";

import './styles.scss';

const EditActivityModal = ({ data, setActivities }: {
  data?: Activity,
  setActivities: Dispatch<SetStateAction<Activity[] | Activity>>;
}) => {
  const { closeModal } = useModal();

  const [form, setForm] = useState({
    descripcion: '',
    costo: '',
    edadMinima: '',
  });

  useEffect(() => {
    if (data) {
      setForm({
        descripcion: data.descripcion,
        costo: data.costo.toString(),
        edadMinima: data.edadMinima.toString(),
      });
    }
  }, [data]);

  const handleActivity = async () => {
    const activityData = {
      descripcion: form.descripcion,
      edadMinima: parseInt(form.edadMinima),
      costo: parseFloat(form.costo),
    };

    await editActivity({ id: data.id, data: activityData });

    setActivities((prevState) => ({
      ...prevState,
      ...activityData,
    }));

    closeModal();
  };

  return (
    <div className="edit-activity">
      <div className="edit-activity__header">
        <span className="edit-activity__header-title">{data ? 'Editar actividad' : 'Agregar actividad'}</span>
        <img src={closeIcon} alt="close" className="edit-activity__header-close" onClick={closeModal} />
      </div>
      <div className="edit-activity__container">
        <Input
          onChange={(value) => setForm({ ...form, descripcion: value })}
          label="Descripción"
          name="modal"
          value={form.descripcion}
        />
        <Input
          onChange={(value) => setForm({ ...form, costo: value })}
          label="Costo "
          name="modal"
          value={form.costo}
        />
        <Input
          onChange={(value) => setForm({ ...form, edadMinima: value })}
          label="Edad mínima"
          name="modal"
          value={form.edadMinima}
        />
        <div className="edit-activity__buttons">
          <Button
            label="Cancelar"
            onClick={closeModal}
          />
          <Button
            label="Guardar"
            onClick={handleActivity}
          />
        </div>
      </div>
    </div>
  );
}

export default EditActivityModal;
