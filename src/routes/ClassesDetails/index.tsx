import { useEffect, useState } from 'react';

import { formatHours, formatDate } from '../../utils/helpers';

import Table from '../../components/Table';

import { getClass } from '../../api/classes';

import editIcon from '../../assets/icons/edit.svg';

import './styles.scss'
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useModal } from '../../utils/ModalContext';
import AddClassModal from '../../components/Modal/AddClass';

const ClassesDetails = () => {
  const columns = [
    {
      header: 'Nombre completo',
      accessor: 'nombreCompleto',
      toMap: (value: string) => value,
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

  const handleGetClasses = async () => {
    const classRes = await getClass({ id });

    setClassResponse(classRes);
  }

  const handleOpenModal = () => {
    openModal(<AddClassModal
      data={{
        id: classResponse.id,
        instructorCi: classResponse.instructor.ci,
        activityId: classResponse.actividad.id,
        date: classResponse.turno.diaParaDictar,
        turnId: classResponse.turno.id,
        students: classResponse.alumnos.map((student) => ({
          nombreCompleto: student.nombreCompleto,
          ci: student.ci,
          equipementId: student?.equipamiento?.id,
        })),
      }}
    />);
  }

  useEffect(() => {
    handleGetClasses();
  }, []);

  return (
    <div className="classes">
      <div className='classes__details-container'>
        <div className='classes__details'>
          <span className='classes__breadcrumb'>{classResponse.actividad.nombre}</span>
          <span className='classes__turn'>Fecha: {formatDate(classResponse.turno.diaParaDictar)}</span>
          <span className='classes__turn'>Turno: {`${formatHours(classResponse.turno.horaInicio)} - ${formatHours(classResponse.turno.horaFin)}`}</span>
          <span className='classes__instructor'>
            Instructor:
            <span className='classes__instructor-name'>{`${classResponse.instructor.nombre} ${classResponse.instructor.apellido}`}</span>
          </span>
          <span className='classes__title'>Alumnos Inscriptos:</span>
        </div>
        <Button
          className="classes__details-button"
          onClick={handleOpenModal}
          icon={<img className='classes__edit' src={editIcon} />}
          label='Editar'
        />
      </div>
      <Table
        columns={columns}
        data={classResponse.alumnos}
      />
    </div>
  );
}

export default ClassesDetails;
