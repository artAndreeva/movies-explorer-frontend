import React from 'react';
import { useState, useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import {
  REGISTER_CONFLICT_ERROR_MESSAGE,
  REGISTER_BAD_REQUEST_ERROR_MESSAGE,
  AUTH_SERVER_ERROR_MESSAGE } from '../../constants/error-texts';
import {
  BAD_REQUEST_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  SERVER_ERROR_CODE
} from '../../constants/error-cods';
import './Register.css';

const Register = ({ handleRegister, apiStatus, isFormInProcess }) => {

  const [apiStatusText, setApiStatusText] = useState('');

  useEffect(() => {
    handleApiStatus();
  }, [apiStatus])

  const handleApiStatus = () => {
    if (apiStatus === BAD_REQUEST_ERROR_CODE) {
      setApiStatusText(REGISTER_BAD_REQUEST_ERROR_MESSAGE)
    }
    if (apiStatus === CONFLICT_ERROR_CODE) {
      setApiStatusText(REGISTER_CONFLICT_ERROR_MESSAGE)
    }
    if (apiStatus === SERVER_ERROR_CODE) {
      setApiStatusText(AUTH_SERVER_ERROR_MESSAGE)
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
