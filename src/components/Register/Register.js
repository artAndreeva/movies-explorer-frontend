import React from 'react';
import { useState, useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import './Register.css';

const Register = ({ handleRegister, apiStatusCode, isAuthProcess }) => {

  const [apiStatusText, setApiStatusText] = useState('');

  useEffect(() => {
    handleApiStatus(apiStatusCode);
  }, [apiStatusCode])

  const handleApiStatus = (apiStatusCode) => {
    if (apiStatusCode === 409) {
      setApiStatusText('Пользователь с таким email уже существует.')
    }
    if (apiStatusCode === 500) {
      setApiStatusText('При регистрации пользователя произошла ошибка.')
    }
  }

  return (
    <main className="register">
      <AuthForm
        greetingText={'Добро пожаловать!'}
        buttonText={'Зарегистрироваться'}
        questionText={'Уже зарегистрированы?'}
        urlText={'Войти'}
        urlPath={'/signin'}
        apiStatusText={apiStatusText}
        onSubmit={handleRegister}
        isAuthProcess={isAuthProcess}
      />
    </main>
  );
}

export default Register;
