import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import searchIcon from '../../assets/icons/search.svg';
import chevronIcon from '../../assets/icons/chevron.svg';

import Input from '../../components/Input/Input';
import Select from '../../components/Select';
import Table from '../../components/Table';
import Button from '../../components/Button/Button.tsx';

import { getActivities } from '../../api/activities.ts'; // Update this line

import './styles.scss';

const Activities = () => {
  const navigate = useNavigate();

  const columns = [
    {
      header: 'ID',
      accessor: 'id',
      toMap: (value: string) => value,
    },
    {
      header: 'Descripción',
      accessor: 'descripcion',
      toMap: (value: string) => value,
    },
    {
      header: 'Costo',
      accessor: 'costo',
      toMap: (value: string) => `$${value}`,
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
    },
  ];

  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    activity: '',
    turn: '',
    dicted: false,
  });

  const handleGetActivities = async () => {
    const activitiesResponse = await getActivities();

    setActivities(activitiesResponse);
  };

  useEffect(() => {
    handleGetActivities();
  }, []);

  return (
    <div className="activities">
      <span className="activities__breadcrumb">Actividades</span>
      <Table columns={columns} data={activities} />
    </div>
  );
};

export default Activities;
