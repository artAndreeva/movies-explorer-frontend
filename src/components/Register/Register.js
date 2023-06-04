import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import './Register.css';

const Register = () => {

  return (
    <main className="register">
      <AuthForm
        greetingText={'Добро пожаловать!'}
        buttonText={'Зарегистрироваться'}
        questionText={'Уже зарегистрированы?'}
        registerText={'Войти'}
        registerPath={'/signin'}
        navigatePath={'/signin'}
      />
    </main>
  );
}

export default Register;
