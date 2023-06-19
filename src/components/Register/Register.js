import React from 'react';
import { useState, useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import './Register.css';

const Register = ({ handleRegister, apiStatus, isAuthProcess }) => {

  const [apiStatusText, setApiStatusText] = useState('');

  useEffect(() => {
    handleApiStatus();
  }, [apiStatus])

  const handleApiStatus = () => {
    if (apiStatus.status === 409) {
      setApiStatusText('Пользователь с таким email уже существует.')
    }
    if (apiStatus.status === 500) {
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
