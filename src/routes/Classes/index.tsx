import { useEffect, useState } from 'react';
import { parse } from 'date-fns';

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
import { formatDate, formatHours } from '../../utils/helpers';

const Home = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

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
          onClick={() => navigate(`${value}`)}
          icon={<img className='classes__chevron' src={chevronIcon} />}
          label=''
        />
      ),
    }
  ];

  const [classes, setClasses] = useState([]);

  const handleGetClasses = async () => {
    const classesResponse = await getClasses();

    setClasses(classesResponse);
  }

  const handleOpenModal = () => {
    openModal(<AddClassModal setClass={setClasses} />);
  }

  useEffect(() => {
    handleGetClasses();
  }, []);

  return (
    <div className="classes">
      <div className='classes__actions'>
        <span className='classes__breadcrumb'>Clases</span>
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
