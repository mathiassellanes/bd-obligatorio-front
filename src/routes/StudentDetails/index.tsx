import { useNavigate, useParams } from 'react-router-dom';

import Table from '../../components/Table';
import Button from '../../components/Button/Button';
import AddStudentModal from '../../components/Modal/AddStudent';
import DeleteModal from '../../components/DeleteModals/DeleteClass';

import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import chevronIcon from '../../assets/icons/chevron.svg';

import { useModal } from '../../utils/ModalContext';
import { formatDate, formatHours } from '../../utils/helpers';
import { useStudentByCi } from '../../utils/fetch';
import { deleteStudent } from '../../api/students';

import './styles.scss';

const StudentDetails = () => {
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

  const { student: studentResponse, isLoading, setStudent } = useStudentByCi({ ci });

  const handleOpenModal = () => {
    openModal(
      <AddStudentModal
        data={{
          ci: studentResponse.ci,
          nombreCompleto: studentResponse.nombreCompleto,
          telefono: studentResponse.telefono,
          correo: studentResponse.correo,
          nombre: studentResponse.nombre,
          apellido: studentResponse.apellido,
        }}
        setStudents={setStudent}
      />
    );
  };

  const handleDeleteModal = () => {
    openModal(
      <DeleteModal
        onDelete={() => {
          deleteStudent(studentResponse.ci)

          navigate('/students');
        }}
        itemName='este estudiante'
      />
    );
  }

  return (
    isLoading || !studentResponse ? <div>Cargando...</div> : (
      <div className="student">
        <div className="student__details-container">
          <div className="student__details">
            <span className="student__breadcrumb">{studentResponse.nombreCompleto}</span>
            <span className="student__info">Correo: {studentResponse.correo}</span>
            <span className="student__info">Teléfono: {studentResponse.telefono}</span>
            <span className="student__info">CI: {studentResponse.ci}</span>
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
          data={studentResponse.clases}
        />
      </div>
    )
  );
};

export default StudentDetails;
