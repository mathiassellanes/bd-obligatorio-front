import { useEffect, useState } from 'react';
import Input from '../../components/Input/Input';

import searchIcon from '../../assets/icons/search.svg';
import editIcon from '../../assets/icons/edit.svg';
import chevronIcon from '../../assets/icons/chevron.svg';

import Select from '../../components/Select';
import Table from '../../components/Table';

import { getInstructors } from '../../api/instructors';

import './styles.scss'

const Instructors = () => {
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
      header: '',
      accessor: 'id',
      className: 'table__actions',
      classForWidth: 'table__actions--width',
      toMap: (value: any) => <>
        <img src={editIcon} />
        <img src={chevronIcon} />
      </>,
    }
  ];

  const [instructors, setInstructors] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    activity: '',
    turn: '',
    dicted: false,
  });

  const handleGetData = async () => {
    const dataResponse = await getInstructors();

    setInstructors(dataResponse);
  }

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div className="instructors">
      <span className='instructors__breadcrumb'>Instructores</span>
      <div className='instructors__filters'>
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

        <div className='instructors__filters--checkbox'>
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
        data={instructors}
      />
    </div>
  );
}

export default Instructors;
