import React from 'react';
import './styles.scss';

interface ButtonProps {
  icon?: React.ReactNode;
  label: string | React.ReactNode;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ icon, label, onClick, className = ''}) => {
  return (
    <button className={`button-container ${className}`} onClick={onClick}>
      {icon && <div className="icon">{icon}</div>}
      {label}
    </button>
  );
};

export default Button;
