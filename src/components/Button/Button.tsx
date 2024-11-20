import React from 'react';
import './styles.scss';

interface ButtonProps {
  icon?: React.ReactNode;
  label: string | React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ icon, label, onClick, className = '', disabled}) => {
  return (
    <button className={`button-container ${className}`} disabled={disabled} onClick={onClick}>
      {icon && <div className="icon">{icon}</div>}
      {label}
    </button>
  );
};

export default Button;
