import { useNavigate, useParams } from 'react-router-dom';

import Table from '../../components/Table';
import Button from '../../components/Button/Button';
import { useModal } from '../../utils/ModalContext';
import AddStudentModal from '../../components/Modal/AddStudent';

import editIcon from '../../assets/icons/edit.svg';
import chevronIcon from '../../assets/icons/chevron.svg';

import './styles.scss';
import { useTurnById } from '../../utils/fetch';

import { formatDate, formatHours } from '../../utils/helpers';
import AddTurns from '../../components/Modal/AddTurns';

const TurnsDetails = () => {
  const navigate = useNavigate();

  const columns = [
    {
      header: 'Instructor',
      accessor: 'instructor',
      toMap: (value: {
        nombre: string;
        apellido: string;
      }) => `${value.nombre} ${value.apellido}`,
    },
    {
      header: 'Actividad',
      accessor: 'actividad',
      toMap: (value: {
        nombre: string;
      }) => value.nombre,
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

  const { id = '' } = useParams();
  const { openModal } = useModal();

  const { turn, isLoading } = useTurnById({ id });

  const handleOpenModal = () => {
    openModal(
      <AddTurns
        id={id}
        horaInicio={turn?.horaInicio}
        horaFin={turn?.horaFin}
      />
    )
  };

  const hours = `${formatHours(turn?.horaInicio)} - ${formatHours(turn?.horaFin)}`;

  return (
    isLoading || !turn ? <div>Cargando...</div> : (
      <div className="student">
        <div className="student__details-container">
          <div className="student__details">
            <span className="student__breadcrumb">{hours}</span>
          </div>
          <Button
            className="student__details-button"
            onClick={handleOpenModal}
            icon={<img className="student__edit" src={editIcon} />}
            label="Editar"
          />
        </div>
        <div className="student__title">Clases Inscriptas:</div>
        <Table
          columns={columns}
          data={turn.clases}
        />
      </div>
    )
  );
};

export default TurnsDetails;
