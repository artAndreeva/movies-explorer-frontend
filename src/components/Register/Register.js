import React from 'react';
import { useState, useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import {
  REGISTER_CONFLICT_ERROR,
  REGISTER_BAD_REQUEST_ERROR,
  AUTH_SERVER_ERROR } from '../../constants/error-texts';
import './Register.css';

const Register = ({ handleRegister, apiStatus, isFormInProcess }) => {

  const [apiStatusText, setApiStatusText] = useState('');

  useEffect(() => {
    handleApiStatus();
  }, [apiStatus])

  const handleApiStatus = () => {
    if (apiStatus === 400) {
      setApiStatusText(REGISTER_BAD_REQUEST_ERROR)
    }
    if (apiStatus === 409) {
      setApiStatusText(REGISTER_CONFLICT_ERROR)
    }
    if (apiStatus === 500) {
      setApiStatusText(AUTH_SERVER_ERROR)
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
