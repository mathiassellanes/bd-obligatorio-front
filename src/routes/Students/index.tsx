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
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    activity: '',
    turn: '',
    dicted: false,
  });

  const handleGetClasses = async () => {
    const classesResponse = await getStudents();

    setStudents(classesResponse);
  }

  useEffect(() => {
    handleGetClasses();
  }, []);

  const handleOpenModal = () => {
    openModal(<AddStudentModal />);
  }

  return (
    <div className="classes">
      <span className='classes__breadcrumb'>Estudiantes</span>
      <div className='classes__actions'>
        <div className='classes__actions-filters'>

          <Input
            placeholder='Buscar por estudiante'
            icon={searchIcon}
            value={search}
            onChange={setSearch}
            iconPosition='right'
          />
          <Select
            value={filters.activity}
            onChange={(value) => setFilters({ ...filters, activity: value })}
            options={[
              { value: 'yoga', label: 'Yoga' },
              { value: 'crossfit', label: 'Crossfit' },
              { value: 'pilates', label: 'Pilates' },
            ]}
          />
          <Select
            value={filters.turn}
            onChange={(value) => setFilters({ ...filters, turn: value })}
            options={[
              { value: 'morning', label: 'Mañana' },
              { value: 'afternoon', label: 'Tarde' },
              { value: 'night', label: 'Noche' },
            ]}
          />

          <div className='classes__filters--checkbox'>
            <input
              type='checkbox'
              id='dicted'
              checked={filters.dicted}
              onChange={() => setFilters({ ...filters, dicted: !filters.dicted })}
            />
            <label htmlFor='dicted'>Dictadas</label>
          </div>
        </div>


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
