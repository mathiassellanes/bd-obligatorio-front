import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { formatHours, formatDate, isTurnActive } from '../../utils/helpers';
import { useModal } from '../../utils/ModalContext';

import Table from '../../components/Table';
import Button from '../../components/Button/Button';
import AddClassModal from '../../components/Modal/AddClass';
import DeleteModal from '../../components/DeleteModals/DeleteClass';

import { deleteClass, getClass } from '../../api/classes';

import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';

import './styles.scss'

const ClassesDetails = () => {
  const navigate = useNavigate();
  const handleNavigateToStudent = (ci) => navigate(`/students/${ci}`);

  const columns = [
    {
      header: 'Nombre completo',
      accessor: '',
      toMap: (value: string) => <span onClick={() => { handleNavigateToStudent(value.ci) }}>{value.nombreCompleto}</span>,
    },
    {
      header: 'Correo electrónico',
      accessor: 'correo',
      toMap: (value: string) => (value),
    },
    {
      header: 'Equipamiento',
      accessor: 'equipamiento',
      toMap: (value: {
        descripcion: string;
      }) => value?.descripcion || 'Sin equipamiento',
    },
  ]

  const { id = '' } = useParams();
  const { openModal } = useModal();

  const [classResponse, setClassResponse] = useState({
    id: '',
    actividad: {
      id: '',
      nombre: '',
    },
    turno: {
      id: '',
      diaParaDictar: '',
      horaInicio: '',
      horaFin: '',
    },
    instructor: {
      id: '',
      nombre: '',
      apellido: '',
    },
    alumnos: [],
  });

  const isActive = isTurnActive(
    classResponse.turno.horaInicio,
    classResponse.turno.horaFin,
    classResponse.turno.diaParaDictar
  );

  const handleGetClasses = async () => {
    const classRes = await getClass({ id });

    setClassResponse(classRes);
  }

  const handleOpenModal = () => {
    if (isActive) return;

    openModal(<AddClassModal
      data={{
        id: classResponse.id,
        instructorCi: classResponse.instructor.ci,
        activityId: classResponse.actividad.id,
        date: classResponse.turno.diaParaDictar,
        turnId: classResponse.turno.id,
        students: classResponse?.alumnos?.map((student) => ({
          nombreCompleto: student.nombreCompleto,
          ci: student.ci,
          equipementId: student?.equipamiento?.id,
        })) || [],
      }}
      setClass={setClassResponse}
    />);
  }

  const handleDeleteModal = () => {
    openModal(<DeleteModal
      onDelete={() => {
        deleteClass(classResponse.id)

        navigate('/classes');
      }}
      itemName='la clase'
    />);
  }

  useEffect(() => {
    handleGetClasses();
  }, []);

  const instructorFullName = useMemo(() => {
    const { instructor } = classResponse;

    return instructor.id ? `${instructor.nombre} ${instructor.apellido}` : 'No hay instructor'
  }, [classResponse]);

  const turnComplete = useMemo(() => {
    const { turno } = classResponse;

    return turno.id ? `${formatHours(turno.horaInicio)} - ${formatHours(turno.horaFin)}` : 'No hay turno'
  }, [classResponse]);

  return (
    <div className="classes">
      <div className='classes__details-container'>
        <div className='classes__details'>
          <span className='classes__breadcrumb'>{classResponse.actividad.nombre}</span>
          <span className='classes__turn'>Fecha: {formatDate(classResponse.turno.diaParaDictar)}</span>
          <span className='classes__turn'>Turno: {turnComplete}</span>
          <span className='classes__instructor'>
            Instructor:
            <span className='classes__instructor-name'>{instructorFullName}</span>
          </span>
          <span className='classes__title'>Alumnos Inscriptos:</span>
        </div>
        <div className='classes__buttons'>
          <Button
            className={`classes__details-button--delete ${isActive ? 'classes__details-button--disabled' : ''}`}
            onClick={handleDeleteModal}
            icon={!isActive && <img className='classes__edit' src={deleteIcon} />}
            label={isActive ? 'La clase se esta dictando, no se puede eliminar' : 'Eliminar'}
          />
          <Button
            className={`classes__details-button ${isActive ? 'classes__details-button--disabled' : ''}`}
            onClick={handleOpenModal}
            icon={!isActive && <img className='classes__edit' src={editIcon} />}
            disabled={isActive}
            label={isActive ? 'La clase se esta dictando, no se puede editar' : 'Editar'}
          />
        </div>
      </div>
      <Table
        columns={columns}
        data={classResponse.alumnos}
      />
    </div>
  );
}

export default ClassesDetails;
