import { useNavigate, useParams } from 'react-router-dom';

import Table from '../../components/Table';
import Button from '../../components/Button/Button';
import { useModal } from '../../utils/ModalContext';

import editIcon from '../../assets/icons/edit.svg';
import chevronIcon from '../../assets/icons/chevron.svg';

import './styles.scss';
import { useActivityById } from '../../utils/fetch';

import { formatDate, formatHours } from '../../utils/helpers';
import EditActivityModal from '../../components/Modal/EditActivity';

const ActivitiesDetails = () => {
  const navigate = useNavigate();

  const columns = [
    {
      header: 'Instructor',
      accessor: 'instructor',
      toMap: ({ nombre, apellido }: {
        nombre: string;
        apellido: string;
      }) => nombre && apellido ? `${nombre} ${apellido}` : 'Sin instructor',
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

        const isTurn = value.horaInicio && value.horaFin;

        const horaInicio = isTurn && formatHours(value.horaInicio);
        const horaFin = isTurn && formatHours(value.horaFin);


        return (
          <div className='classes__date'>
            <span>{diaParaDictar}</span>
            <span>{isTurn ? `${horaInicio} - ${horaFin}` : 'No hay turno'}</span>
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
  ]

  const { id = '' } = useParams();
  const { openModal } = useModal();

  const { activity, isLoading, setActivity } = useActivityById({ id });

  const handleOpenModal = () => {
    openModal(
      <EditActivityModal
        data={activity}
        setActivities={setActivity}
      />
    );
  };

  return (
    isLoading || !activity ? <div>Cargando...</div> : (
      <div className="student">
        <div className="student__details-container">
          <div className="student__details">
            <span className="student__breadcrumb">{activity.descripcion}</span>
            <span className="student__info">Costo: ${activity.costo}</span>
            <span className="student__info">Edad Minima: {activity.edadMinima}</span>
          </div>
          <Button
            className="student__details-button"
            onClick={handleOpenModal}
            icon={<img className="student__edit" src={editIcon} />}
            label="Editar"
          />
        </div>
        <div className="student__title">Clases de esta actividad:</div>
        <Table
          columns={columns}
          data={activity.clases}
        />
      </div>
    )
  );
};

export default ActivitiesDetails;
