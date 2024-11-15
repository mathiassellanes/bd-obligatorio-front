import React from 'react';
import './styles.scss';

interface ButtonProps {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button className="button-container" onClick={onClick}>
      {icon && <div className="icon">{icon}</div>}
      {label}
    </button>
  );
};

export default Button;
