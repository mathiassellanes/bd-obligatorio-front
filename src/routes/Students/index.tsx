import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import searchIcon from '../../assets/icons/search.svg';
import chevronIcon from '../../assets/icons/chevron.svg';
import addIcon from '../../assets/icons/add.svg';

import Input from '../../components/Input/Input';
import Select from '../../components/Select';
import Table from '../../components/Table';
import Button from '../../components/Button/Button';

import { getStudents } from '../../api/students';

import './styles.scss'
import AddStudentModal from '../../components/Modal/AddStudent';
import { useModal } from '../../utils/ModalContext';
import { Student } from '../../constants/types/students';

const Alumns = () => {
  const navigate = useNavigate();

  const columns = [
    {
      header: 'CI',
      accessor: 'ci',
      toMap: (value: any) => value,
    },
    {
      header: 'Nombre completo',
      accessor: 'nombreCompleto',
      toMap: (value: any) => value,
    },
    {
      header: 'Fecha de Nacimiento',
      accessor: 'fechaNacimiento',
      toMap: (value: any) => format(new Date(value), 'dd/MM/yyyy')
    },
    {
      header: 'Teléfono',
      accessor: 'telefono',
      toMap: (value: any) => value,
    },
    {
      header: 'Correo electrónico',
      accessor: 'correo',
      toMap: (value: any) => (value),
    },
    {
      header: '',
      accessor: 'ci',
      className: 'table__actions',
      classForWidth: 'table__actions--width',
      toMap: (value: any) => (
        <Button
          className="classes__chevron-button"
          onClick={() => navigate(`${value}`)}
          icon={<img className='classes__chevron' src={chevronIcon} />}
          label=''
        />
      ),
    }
  ];

  const { openModal } = useModal();
  const [students, setStudents] = useState<Student[]>([]);

  const handleGetClasses = async () => {
    const classesResponse = await getStudents();

    setStudents(classesResponse);
  }

  useEffect(() => {
    handleGetClasses();
  }, []);

  const handleOpenModal = () => {
    openModal(<AddStudentModal setStudents={setStudents}/>);
  }

  return (
    <div className="classes">
      <div className='classes__actions'>
        <span className='classes__breadcrumb'>Estudiantes</span>
        <Button
          className="classes__details-button"
          onClick={handleOpenModal}
          icon={<img className='classes__edit' src={addIcon} />}
          label='Agregar'
        />
      </div>
      <Table
        columns={columns}
        data={students}
      />
    </div>
  );
}

export default Alumns;
