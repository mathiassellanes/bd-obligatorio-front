import { useEffect, useState } from 'react';
import { format, parse } from 'date-fns';
import Input from '../../components/Input/Input.tsx';

import searchIcon from '../../assets/icons/search.svg';
import editIcon from '../../assets/icons/edit.svg';
import chevronIcon from '../../assets/icons/chevron.svg';

import Select from '../../components/Select/index.tsx';
import Table from '../../components/Table/index.tsx';

import { getTurns } from '../../api/turns.ts'; // Update this line

import './styles.scss';

const Turns = () => {
  const columns = [
    {
      header: 'ID',
      accessor: 'id',
      toMap: (value: any) => value,
    },
    {
      header: 'Turno',
      accessor: 'turno',
      toMap: (value: any) => {
        const horaInicio = format(parse(value.horaInicio, 'HH:mm:ss', new Date()), 'HH:mm');
        const horaFin = format(parse(value.horaFin, 'HH:mm:ss', new Date()), 'HH:mm');
        return `${horaInicio} - ${horaFin}`;
      },
    },
    {
      header: '',
      accessor: 'id',
      className: 'table__actions',
      classForWidth: 'table__actions--width',
      toMap: (value: any) => (
        <>
          <img src={editIcon} alt="Edit" />
          <img src={chevronIcon} alt="Chevron" />
        </>
      ),
    },
  ];

  const [turns, setTurns] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    turn: '',
    dicted: false,
  });

  const handleGetTurns = async () => {
    const turnsResponse = await getTurns(); // Update this line

    setTurns(turnsResponse);
  };

  useEffect(() => {
    handleGetTurns();
  }, []);

  return (
    <div className="turns">
      <span className="turns__breadcrumb">Turnos</span>
      <div className="turns__filters">
        <Input
          placeholder="Buscar por turno"
          icon={searchIcon}
          value={search}
          onChange={setSearch}
          iconPosition="right"
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

        <div className="turns__filters--checkbox">
          <input
            type="checkbox"
            id="dicted"
            checked={filters.dicted}
            onChange={() => setFilters({ ...filters, dicted: !filters.dicted })}
          />
          <label htmlFor="dicted">Dictadas</label>
        </div>
      </div>
      <Table columns={columns} data={turns} />
    </div>
  );
};

export default Turns;
