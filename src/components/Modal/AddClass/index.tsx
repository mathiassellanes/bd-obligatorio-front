import { useModal } from "../../../utils/ModalContext";
import Button from "../../Button/Button";
import Input from "../../Input/Input";

import closeIcon from '../../../assets/icons/close.svg';

import './styles.scss';
import { useEffect, useState } from "react";
import Select from "../../Select";
import {
  useActivities,
  useEquipementsByActivityId,
  useInstructors,
  useStudents,
  useStudentsByActivityAvailable,
  useTurns
} from "../../../utils/fetch";
import { createClass, updateClass } from "../../../api/classes";
import StudentChip from "../../StudentChip";
import { format, parseISO } from "date-fns";

const AddClassModal = ({ data, setClass }: {
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

  const [form, setForm] = useState({
    instructorCi: '',
    date: '',
    turnId: '',
    activityId: '',
    students: [],
  });

  const { activities, isLoading } = useActivities();
  const { turns, isLoading: isLoadingTurns } = useTurns();
  const { instructors, isLoading: isLoadingInstructors } = useInstructors();
  const { students, isLoading: isLoadingStudents, refetch: studentsRefetch } = useStudentsByActivityAvailable(form.activityId);
  const { equipements, refetch } = useEquipementsByActivityId({ id: form.activityId });

  useEffect(() => {
    if (!isLoading && !isLoadingInstructors && !isLoadingTurns) {
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
  }, [isLoading, isLoadingInstructors, isLoadingTurns, data]);

  const handleClass = async () => {
    const classData = {
      ciInstructor: form.instructorCi,
      idActividad: Number.parseInt(form.activityId),
      diaParaDictar: /^\d{4}-\d{2}-\d{2}$/.test(form.date) ? form.date : format(form.date, 'yyyy-MM-dd'),
      idTurno: Number.parseInt(form.turnId),
      alumnos: form.students.map((student) => ({
      ci: student.ci,
      idEquipamiento: Number.parseInt(student.equipementId),
      })),
    };

    if (data) {
      const updatedClass = await updateClass({ id: data.id, ...classData });

      setClass(updatedClass);
    } else {
      const createdClass = await createClass(classData);

      setClass((prevState) => {
        if (Array.isArray(prevState)) {
          return [...prevState, createdClass];
        } else {
          return [prevState, createdClass];
        }
      });
    }

    closeModal();
  };

  useEffect(() => {
    if (form.activityId) {
      refetch(form.activityId);
      studentsRefetch(form.activityId);
    }
  }, [form.activityId]);

  console.log('form', form);

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
            onChange={(value) => {
              console.log(value)
              setForm({ ...form, date: value })
            }}
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
              label: `${turn.horaInicio} - ${turn.horaFin}`,
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
