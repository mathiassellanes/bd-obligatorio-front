import { useEffect, useState } from 'react';
import { format, parse } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/Input/Input.tsx';

import searchIcon from '../../assets/icons/search.svg';
import chevronIcon from '../../assets/icons/chevron.svg';

import Select from '../../components/Select/index.tsx';
import Table from '../../components/Table/index.tsx';
import addIcon from '../../assets/icons/add.svg';
import Button from '../../components/Button/Button';
import AddTurns from '../../components/Modal/AddTurns/index.tsx';

import { useModal } from '../../utils/ModalContext';

import { getTurns } from '../../api/turns.ts';

import './styles.scss';

const Turns = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(<AddTurns />);
  }
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
        <Button
          className="classes__chevron-button"
          onClick={() => navigate(`${value}`)}
          icon={<img className='classes__chevron' src={chevronIcon} />}
          label=''
        />
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
      <div className='turns__actions'>
        <span className="turns__breadcrumb">Turnos</span>
        <Button
          className="classes__details-button"
          onClick={handleOpenModal}
          icon={<img className='classes__edit' src={addIcon} />}
          label='Agregar'
        />
      </div>
      <Table columns={columns} data={turns} />
    </div>
  );
};

export default Turns;
