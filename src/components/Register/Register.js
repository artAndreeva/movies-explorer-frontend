import React from 'react';
import { useState, useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import './Register.css';

const Register = ({ handleRegister, apiStatus, isFormInProcess }) => {

  const [apiStatusText, setApiStatusText] = useState('');

  useEffect(() => {
    handleApiStatus();
  }, [apiStatus])

  const handleApiStatus = () => {
    if (apiStatus === 409) {
      setApiStatusText('Пользователь с таким email уже существует.')
    }
    if (apiStatus === 500) {
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
        isFormInProcess={isFormInProcess}
      />
    </main>
  );
}

export default Register;
