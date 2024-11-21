import { useNavigate, useParams } from 'react-router-dom';

import Table from '../../components/Table';
import Button from '../../components/Button/Button';
import AddInstructorModal from '../../components/Modal/AddInstructor/Index';
import DeleteModal from '../../components/DeleteModals/DeleteClass';

import editIcon from '../../assets/icons/edit.svg';
import chevronIcon from '../../assets/icons/chevron.svg';
import deleteIcon from '../../assets/icons/delete.svg';

import { useModal } from '../../utils/ModalContext';
import { formatDate, formatHours } from '../../utils/helpers';
import { useInstructorByCi } from '../../utils/fetch';

import './styles.scss';
import { deleteInstructor } from '../../api/instructors';

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
  ];

  const { ci = '' } = useParams();
  const { openModal } = useModal();

  const { instructor, isLoading, setInstructor } = useInstructorByCi({ ci });

  const handleOpenModal = () => {
    const instructorData = {
      ci: instructor.ci,
      nombre: instructor.nombre,
      apellido: instructor.apellido,
    };

    openModal(
      <AddInstructorModal data={instructorData} setInstructors={setInstructor} />
    );
  };

  const handleDeleteModal = () => {
    openModal(
      <DeleteModal
        onDelete={() => {
          deleteInstructor(instructor.ci)

          navigate('/instructors');
        }}
        itemName='este turno'
      />
    );
  }

  return (
    isLoading || !instructor ? <div>Cargando...</div> : (
      <div className="student">
        <div className="student__details-container">
          <div className="student__details">
            <span className="student__breadcrumb">{instructor.nombreCompleto}</span>
            <span className="student__info">CI: {instructor.ci}</span>
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
        <div className="student__title">Clases a cargo:</div>
        <Table
          columns={columns}
          data={instructor.clases}
        />
      </div>
    )
  );
};

export default InstructorDetails;
