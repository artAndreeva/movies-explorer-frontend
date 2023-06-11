import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import './Login.css';

const Login = () => {

  return (
    <main className="login">
      <AuthForm
        greetingText={'Рады видеть!'}
        buttonText={'Войти'}
        questionText={'Ещё не зарегистрированы?'}
        registerText={'Регистрация'}
        registerPath={'/signup'}
        navigatePath={'/movies'}
      />
    </main>
  );
}

export default Login;
