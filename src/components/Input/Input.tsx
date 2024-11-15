import React from 'react';
import './styles.scss';

interface InputProps {
  icon?: string;
  iconPosition?: 'left' | 'right';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  icon,
  iconPosition = 'left',
  placeholder,
  value,
  onChange,
  label,
  type = 'text',
}) => {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <div className="input-container">
        {icon && iconPosition === 'left' && <img src={icon} className="icon"/>}
        <input
          type={type}
          className="input-field"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {icon && iconPosition === 'right' &&  <img src={icon} className="icon"/>}
      </div>
    </div>
  );
};

export default Input;
