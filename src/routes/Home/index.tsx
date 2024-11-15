import { useEffect, useState } from 'react';
import Input from '../../components/Input/Input';

import searchIcon from '../../assets/icons/search.svg';
import './styles.scss'
import Select from '../../components/Select';
import { getClasses } from '../../api/classes';
import Table from '../../components/Table';

const Home = () => {
  const columns = [
    {
      header: 'Instructor',
      accessor: 'instructor',
      toMap: (value: any) => `${value.nombre} ${value.apellido}`,
    },
    {
      header: 'Actividad',
      accessor: 'actividad',
      toMap: (value: any) => value.nombre,
    },
    {
      header: 'Turno',
      accessor: 'turno',
      toMap: (value: any) => `${value.horaInicio} - ${value.horaFin}`,
    },
    {
      header: 'Dictada',
      accessor: 'dictada',
      toMap: (value: any) => (value ? 'Sí' : 'No'),
    },
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

  useEffect(() => {
    handleGetClasses();
  }, []);

  return (
    <div className="classes">
      <span className='classes__breadcrumb'>Clases</span>
      <div className='classes__filters'>
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
      <Table
        columns={columns}
        data={classes}
      />
    </div>
  );
}

export default Home;
