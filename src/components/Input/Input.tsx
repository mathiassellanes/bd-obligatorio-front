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
  name?: string;
}

const Input: React.FC<InputProps> = ({
  icon,
  iconPosition = 'left',
  placeholder,
  value,
  onChange,
  label,
  type = 'text',
  name = ''
}) => {
  return (
    <div className={`input-wrapper input-wrapper--${name}`}>
      {label && <label className={`input-label input-label--${name}`}>{label}</label>}
      <div className={`input-container input-container--${name}`}>
        {icon && iconPosition === 'left' && <img src={icon} className="icon" />}
        <input
          type={type}
          className={`input-field input-field--${name}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {icon && iconPosition === 'right' && <img src={icon} className="icon" />}
      </div>
    </div>
  );
};

export default Input;
