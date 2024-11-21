import { useNavigate, useParams } from 'react-router-dom';

import { deleteTurn } from '../../api/turns';

import Table from '../../components/Table';
import Button from '../../components/Button/Button';
import { useModal } from '../../utils/ModalContext';
import DeleteModal from '../../components/DeleteModals/DeleteClass';
import AddTurns from '../../components/Modal/AddTurns';

import editIcon from '../../assets/icons/edit.svg';
import chevronIcon from '../../assets/icons/chevron.svg';
import deleteIcon from '../../assets/icons/delete.svg';

import { formatHours } from '../../utils/helpers';
import { useTurnById } from '../../utils/fetch';

import './styles.scss';

const TurnsDetails = () => {
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

  const { turn, isLoading, setTurn } = useTurnById({ id });

  const handleOpenModal = () => {
    openModal(
      <AddTurns
        data={turn}
        setTurn={setTurn}
      />
    )
  };

  const handleDeleteModal = () => {
    openModal(
      <DeleteModal
        onDelete={() => {
          deleteTurn(turn.id)

          navigate('/turns');
        }}
        itemName='este turno'
      />
    );
  }

  const hours = `${formatHours(turn?.horaInicio)} - ${formatHours(turn?.horaFin)}`;

  return (
    isLoading || !turn ? <div>Cargando...</div> : (
      <div className="student">
        <div className="student__details-container">
          <div className="student__details">
            <span className="student__breadcrumb">{hours}</span>
          </div>
          <div className="flex-20-gap">
            <Button
              className="secondary-button"
              onClick={handleDeleteModal}
              icon={<img className="student__delete" src={deleteIcon} />}
              label="Eliminar"
            />
            <Button
              className="student__details-button"
              onClick={handleOpenModal}
              icon={<img className="student__edit" src={editIcon} />}
              label="Editar"
            />
          </div>
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
