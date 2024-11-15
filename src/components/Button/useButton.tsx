import { useState } from 'react';
import Button from './Button';

const useButton = (initialLabel: string, initialIcon?: React.ReactNode) => {
  const [label, setLabel] = useState(initialLabel);
  const [icon, setIcon] = useState(initialIcon);

  const ButtonComponent = (props: Omit<React.ComponentProps<typeof Button>, 'label' | 'icon'>) => (
    <Button label={label} icon={icon} {...props} />
  );

  return { label, setLabel, icon, setIcon, ButtonComponent };
};

export default useButton;
