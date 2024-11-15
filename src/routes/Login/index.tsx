import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ucuImage from '../../assets/ucu.svg';
import skyPNG from '../../assets/sky.png';

import Input from '../../components/Input/Input';
import useButton from '../../components/Button/useButton';

import { login } from '../../api/auth';

import './styles.scss';

const Login = () => {
  const navigate = useNavigate();
  const { ButtonComponent } = useButton('Iniciar sesión');

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(mail, password);

      navigate('/')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='login'>
      <div className='login__container--left'>
        <img src={ucuImage} alt='UCU' className='login__container--left-image' />
        <div className='login__container--left-form'>
          <h1 className='login__container-title'>¡Bienvenido!</h1>
          <Input
            type='email'
            label='Correo'
            placeholder='Correo electrónico'
            value={mail}
            onChange={setMail}
          />
          <Input
            type='password'
            label='Contraseña'
            placeholder='Contraseña'
            value={password}
            onChange={setPassword}
          />
          <ButtonComponent onClick={handleLogin} />
        </div>
      </div>
      <img src={skyPNG} alt='Sky' className='login__container--right-image' />
    </div>
  );
}

export default Login;
