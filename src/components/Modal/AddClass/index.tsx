import { useModal } from "../../../utils/ModalContext";
import Button from "../../Button/Button";
import Input from "../../Input/Input";

import closeIcon from '../../../assets/icons/close.svg';
import addIcon from '../../../assets/icons/add.svg';

import './styles.scss';
import { useEffect, useState } from "react";
import Select from "../../Select";
import { useActivities, useEquipements, useInstructors, useStudents, useTurns } from "../../../utils/fetch";
import { createClass, updateClass } from "../../../api/classes";
import StudentChip from "../../StudentChip";
import { format, parseISO } from "date-fns";

const AddClassModal = ({ data }: {
  data?: {
    id: string;
    instructorCi: string;
    date: string;
    turnId: string;
    activityId: string;
    students: {
      ci: string;
      nombreCompleto: string;
      equipementId: string;
    }[];
  };
}) => {
  const { closeModal } = useModal();

  const { activities, isLoading } = useActivities();
  const { turns, isLoading: isLoadingTurns } = useTurns();
  const { instructors, isLoading: isLoadingInstructors } = useInstructors();
  const { students, isLoading: isLoadingStudents } = useStudents();
  const { equipements, isLoading: isLoadingEquipements } = useEquipements();

  const [form, setForm] = useState({
    instructorCi: '',
    date: '',
    turnId: '',
    activityId: '',
    students: [],
  });

  useEffect(() => {
    if (!isLoading && !isLoadingInstructors && !isLoadingTurns && !isLoadingStudents && !isLoadingEquipements) {
      if (data) {
        setForm({
          instructorCi: data.instructorCi,
          date: data.date,
          turnId: data.turnId,
          activityId: data.activityId,
          students: data.students,
        });
      } else {
        setForm({
          instructorCi: instructors[0]?.ci,
          date: '',
          turnId: turns[0]?.id,
          activityId: activities[0]?.id,
          students: [],
        });
      }
    }
  }, [isLoading, isLoadingInstructors, isLoadingTurns, isLoadingStudents, isLoadingEquipements, data]);

  const handleClass = async () => {
    const classData = {
      ciInstructor: form.instructorCi,
      idActividad: Number.parseInt(form.activityId),
      diaParaDictar: format(form.date, 'yyyy-MM-dd'),
      idTurno: Number.parseInt(form.turnId),
      alumnos: form.students.map((student) => ({
        ci: student.ci,
        idEquipamiento: Number.parseInt(student.equipementId),
      })),
    };

    if (data) {
      await updateClass({ id: data.id, ...classData });
    } else {
      await createClass(classData);
    }

    closeModal();
  };

  return (
    <div className="add-class">
      <div className="add-class__header">
        <span className="add-class__header-title">{data ? 'Editar clase' : 'Agregar clase'}</span>
        <img src={closeIcon} alt="close" className="add-class__header-close" onClick={closeModal} />
      </div>
      <div className="add-class__container">
        <Select
          onChange={(value) => setForm({ ...form, instructorCi: value })}
          label="Instructor "
          name="modal"
          options={instructors.map((instructor) => ({
            label: instructor.nombreCompleto,
            value: instructor.ci,
          }))}
          value={form.instructorCi}
        />
        <Select
          onChange={(value) => setForm({ ...form, activityId: value })}
          label="Actividad "
          name="modal"
          options={activities.map((activity) => ({
            label: activity.descripcion,
            value: activity.id,
          }))}
          value={form.activityId}
        />
        <div className="add-class__container-row">
          <Input
            onChange={(value) => setForm({ ...form, date: value })}
            label="Dia "
            type="date"
            name="modal"
            value={form.date ? format(parseISO(form.date), 'yyyy-MM-dd') : ''}
          />
          <Select
            onChange={(value) => setForm({ ...form, turnId: value })}
            label="Turno "
            name="modal"
            options={turns.map((turn) => ({
              label: `${turn.turno.horaInicio} - ${turn.turno.horaFin}`,
              value: turn.id,
            }))}
            value={form.turnId}
          />
        </div>
        <div className="add-class__students">
          <span className="add-class__students-title">
            Alumnos
          </span>
          <div className="add-class__students-list">
            {
              form.students.map((student) => (
                <StudentChip
                  key={student.ci}
                  student={student}
                  equipements={equipements}
                  onRemove={(ci) => setForm({ ...form, students: form.students.filter((s) => s.ci !== ci) })}
                  onEquipementChange={(ci, equipementId) => {
                    const studentChanged = form.students.reduce((acc, s) => {
                      if (s.ci === ci) {
                        return [...acc, {
                          ...s,
                          equipementId,
                        }];
                      }

                      return [...acc, s];
                    }, []);

                    setForm({ ...form, students: studentChanged });
                  }}
                />
              ))
            }
            <Select
              onChange={(value) => setForm({ ...form, students: [...form.students, students.find((s) => s.ci === value)] })}
              name="chip"
              options={[{ label: 'Elegir alumno', value: '' },
              ...students
                .filter((student) => !form.students.find((s) => s.ci === student.ci))
                .map((student) => ({
                  label: student.nombreCompleto,
                  value: student.ci,
                }))]}
              value=""
            />
          </div>
        </div>
        <div className="add-class__buttons">
          <Button
            label="Cancelar"
            onClick={closeModal}
          />
          <Button
            label="Guardar"
            onClick={handleClass}
          />
        </div>
      </div>
    </div>
  );
}

export default AddClassModal;
