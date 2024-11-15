import React from 'react';
import './styles.scss';

interface SelectProps {
  icon?: string;
  iconPosition?: 'left' | 'right';
  value: string;
  onChange: (value: string) => void;
  label?: string;
  options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({
  icon,
  iconPosition = 'left',
  value,
  onChange,
  label,
  options,
}) => {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <div className="input-container">
        {icon && iconPosition === 'left' && <img src={icon} className="icon" />}
        <select
          className="input-field"
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
