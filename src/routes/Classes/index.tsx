import { useEffect, useState } from 'react';
import { format, parse } from 'date-fns';

import Input from '../../components/Input/Input';

import searchIcon from '../../assets/icons/search.svg';
import addIcon from '../../assets/icons/add.svg';
import chevronIcon from '../../assets/icons/chevron.svg';

import Select from '../../components/Select';
import Table from '../../components/Table';

import { getClasses } from '../../api/classes';

import './styles.scss'
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../utils/ModalContext';
import AddClassModal from '../../components/Modal/AddClass';

const Home = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

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
      header: 'Turno',
      accessor: 'turno',
      toMap: (value: {
        diaParaDictar: string;
        horaInicio: string;
        horaFin: string;
      }) => {
        const diaParaDictar = format(new Date(value.diaParaDictar), 'dd/MM/yyyy');
        const horaInicio = format(parse(value.horaInicio, 'HH:mm:ss', new Date()), 'HH:mm');
        const horaFin = format(parse(value.horaFin, 'HH:mm:ss', new Date()), 'HH:mm');

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
          onClick={() => navigate(`/${value}`)}
          icon={<img className='classes__chevron' src={chevronIcon} />}
          label=''
        />
      ),
    }
  ];

  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    activity: '',
    turn: '',
    dicted: false,
  });

  const handleGetClasses = async () => {
    const classesResponse = await getClasses();

    setClasses(classesResponse);
  }

  const handleOpenModal = () => {
    openModal(<AddClassModal />);
  }

  useEffect(() => {
    handleGetClasses();
  }, []);

  return (
    <div className="classes">
      <span className='classes__breadcrumb'>Clases</span>
      <div className='classes__actions'>
        <div className='classes__actions-filters'>
          <Input
            placeholder='Buscar por instructor'
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
          <Select
            value={filters.turn}
            onChange={(value) => setFilters({ ...filters, turn: value })}
            options={[
              { value: false, label: 'No dictadas' },
              { value: true, label: 'Dictadas' },
            ]}
          />
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
        data={classes}
      />
    </div>
  );
}

export default Home;