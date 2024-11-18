import { useEffect, useState } from 'react';
import Input from '../../components/Input/Input';

import searchIcon from '../../assets/icons/search.svg';
import editIcon from '../../assets/icons/edit.svg';
import chevronIcon from '../../assets/icons/chevron.svg';
import addIcon from '../../assets/icons/add.svg';


import Select from '../../components/Select';
import Table from '../../components/Table';

import { getInstructors } from '../../api/instructors';

import './styles.scss'
import Button from '../../components/Button/Button';
import AddClassModal from '../../components/Modal/AddClass';
import { useModal } from '../../utils/ModalContext';
import { useNavigate } from 'react-router-dom';

const Instructors = () => {
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
      header: '',
      accessor: 'ci',
      className: 'table__actions',
      classForWidth: 'table__actions--width',
      toMap: (value) => <Button
        className="classes__chevron-button"
        onClick={() => navigate(`${value}`)}
        icon={<img className='classes__chevron' src={chevronIcon} />}
        label=''
      />
    }
  ];

  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(<AddClassModal />);
  }

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
      <div className='instructors__actions'>
        <div className='instructors__actions-filters'>
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
        <Button
          className="classes__details-button"
          onClick={handleOpenModal}
          icon={<img className='classes__edit' src={addIcon} />}
          label='Agregar'
        />
      </div>
      <Table
        columns={columns}
        data={instructors}
      />
    </div>
  );
}

export default Instructors;
