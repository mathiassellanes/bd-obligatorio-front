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
import AddInstructorModal from '../../components/Modal/AddInstructor/Index';
import { instructors } from '../../constants/types/instructors';

const Instructors = () => {
  const navigate = useNavigate();

  const columns = [
    {
      header: 'CI',
      accessor: 'ci',
      toMap: (value: string) => value,
    },
    {
      header: 'Nombre completo',
      accessor: 'nombreCompleto',
      toMap: (value: string) => value,
    },
    {
      header: '',
      accessor: 'ci',
      className: 'table__actions',
      classForWidth: 'table__actions--width',
      toMap: (value: string) => <Button
        className="classes__chevron-button"
        onClick={() => navigate(`${value}`)}
        icon={<img className='classes__chevron' src={chevronIcon} />}
        label=''
      />
    }
  ];

  const { openModal } = useModal();

  const [instructors, setInstructors] = useState<instructors>([]);

  const handleOpenModal = () => {
    openModal(
      <AddInstructorModal setInstructors={setInstructors} />
    );
  };

  const handleGetData = async () => {
    const dataResponse = await getInstructors();

    setInstructors(dataResponse);
  }

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div className="instructors">
      <div className='instructors__actions'>
        <span className='instructors__breadcrumb'>Instructores</span>
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
