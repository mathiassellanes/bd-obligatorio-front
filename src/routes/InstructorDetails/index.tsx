import { useNavigate, useParams } from 'react-router-dom';

import Table from '../../components/Table';
import Button from '../../components/Button/Button';
import { useModal } from '../../utils/ModalContext';
import AddStudentModal from '../../components/Modal/AddStudent';

import editIcon from '../../assets/icons/edit.svg';
import chevronIcon from '../../assets/icons/chevron.svg';

import './styles.scss';
import { useInstructorByCi, useStudentByCi } from '../../utils/fetch';

import { formatDate, formatHours } from '../../utils/helpers';

const InstructorDetails = () => {
  const navigate = useNavigate();

  const columns = [
    {
      header: 'Actividad',
      accessor: 'actividad',
      toMap: (value: {
        nombre: string;
      }) => value.nombre,
    },
    {
      header: 'Turno',
      accessor: 'turno',
      toMap: (value: {
        diaParaDictar: string;
        horaInicio: string;
        horaFin: string;
      }) => {
        const diaParaDictar = formatDate(value.diaParaDictar);
        const horaInicio = formatHours(value.horaInicio);
        const horaFin = formatHours(value.horaFin);

        return (
          <div className='classes__date'>
            <span>{diaParaDictar}</span>
            <span>{`${horaInicio} - ${horaFin}`}</span>
          </div>
        )
      },
    },
    {
      header: 'Dictada',
      accessor: 'dictada',
      toMap: (value: boolean) => (value ? 'Sí' : 'No'),
    },
    {
      header: 'Cantidad Alumnos',
      accessor: 'cantidadAlumnos',
      toMap: (value: string) => (value),
    },
    {
      header: '',
      accessor: 'id',
      className: 'table__actions',
      classForWidth: 'table__actions--width',
      toMap: (value: string) => (
        <Button
          className="classes__chevron-button"
          onClick={() => navigate(`/classes/${value}`)}
          icon={<img className='classes__chevron' src={chevronIcon} />}
          label=''
        />
      ),
    }
  ];

  const { ci = '' } = useParams();
  const { openModal } = useModal();

  const { instructor: studentResponse, isLoading } = useInstructorByCi({ ci });

  const handleOpenModal = () => {
    openModal(
      <AddStudentModal
        data={{
          ci: studentResponse.ci,
          nombreCompleto: studentResponse.nombreCompleto,
          nombre: studentResponse.nombre,
          apellido: studentResponse.apellido,
        }}
      />
    );
  };

  return (
    isLoading || !studentResponse ? <div>Cargando...</div> : (
      <div className="student">
        <div className="student__details-container">
          <div className="student__details">
            <span className="student__breadcrumb">{studentResponse.nombreCompleto}</span>
            <span className="student__info">CI: {studentResponse.ci}</span>
          </div>
          <Button
            className="student__details-button"
            onClick={handleOpenModal}
            icon={<img className="student__edit" src={editIcon} />}
            label="Editar"
          />
        </div>
        <div className="student__title">Clases a cargo:</div>
        <Table
          columns={columns}
          data={studentResponse.clases}
        />
      </div>
    )
  );
};

export default InstructorDetails;