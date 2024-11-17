import React from 'react';
import Select from '../../components/Select';
import closeIcon from '../../assets/icons/close.svg';

interface Student {
  ci: string;
  nombreCompleto: string;
  equipementId: string;
}

interface Equipement {
  id: string;
  descripcion: string;
}

interface StudentChipProps {
  student: Student;
  equipements: Equipement[];
  onRemove: (ci: string) => void;
  onEquipementChange: (ci: string, equipementId: string) => void;
}

const StudentChip: React.FC<StudentChipProps> = ({
  student,
  equipements,
  onRemove,
  onEquipementChange,
}) => {
  return (
    <div className="add-class__students-list-item">
      <div className="add-class__students-list-item-header">
        <span>{student.nombreCompleto}</span>
        <img src={closeIcon} alt="close" onClick={() => onRemove(student.ci)} />
      </div>
      <span className="add-class__students-list-item-equipement">
        Equipamiento:
      </span>
      <Select
        options={[{ id: null, descripcion: 'No' }, ...equipements].map((equipement) => ({
          label: equipement.descripcion,
          value: equipement.id,
        }))}
        value={student.equipementId}
        onChange={(value) => onEquipementChange(student.ci, value)}
        name="chip"
      />
    </div>
  );
};

export default StudentChip;
