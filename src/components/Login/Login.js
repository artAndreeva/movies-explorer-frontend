import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/movies', { replace: true });
  }

  return (
    <main className="login">
      <AuthForm
        onSubmit={handleSubmit}
        greetingText={'Рады видеть!'}
        buttonText={'Войти'}
        questionText={'Ещё не зарегистрированы?'}
        registerText={'Регистрация'}
        registerPath={'/signup'}
        emailValue={'pochta@yandex.ru'}
      />
    </main>
  );
}

export default Login;
