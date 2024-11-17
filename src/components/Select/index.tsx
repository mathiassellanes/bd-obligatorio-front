import React from 'react';
import './styles.scss';

interface SelectProps {
  icon?: string;
  iconPosition?: 'left' | 'right';
  value: string;
  onChange: (value: string) => void;
  label?: string;
  options: { value: string; label: string }[];
  name?: string;
}

const Select: React.FC<SelectProps> = ({
  icon,
  iconPosition = 'left',
  value,
  onChange,
  label,
  options,
  name = '',
}) => {
  return (
    <div className={`select-wrapper select-wrapper--${name}`}>
      {label && <label className={`select-label select-label--${name}`}>{label}</label>}
      <div className={`select-container select-container--${name}`}>
        {icon && iconPosition === 'left' && <img src={icon} className="icon" />}
        <select
          className={`select-field select-field--${name}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {icon && iconPosition === 'right' && <img src={icon} className="icon" />}
      </div>
    </div>
  );
};

export default Select;
