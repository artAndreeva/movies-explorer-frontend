import React from 'react';
import { useState, useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import {
  AUTH_BAD_REQUEST_ERROR_MESSAGE,
  AUTH_UNAUTHORIZED_ERROR_MESSAGE,
  AUTH_FORBIDDEN_MESSAGE,
  AUTH_SERVER_ERROR_MESSAGE } from '../../constants/error-texts';
import './Login.css';
import {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  SERVER_ERROR_CODE
} from '../../constants/error-cods'

const Login = ({ handleLogin, apiStatus, isFormInProcess, setApiStatus }) => {

  const [apiStatusText, setApiStatusText] = useState('');

  useEffect(() => {
    handleApiStatus();
  }, [apiStatus])

  const handleApiStatus = () => {
    if (apiStatus === BAD_REQUEST_ERROR_CODE) {
      setApiStatusText(AUTH_BAD_REQUEST_ERROR_MESSAGE)
    }
    if (apiStatus === UNAUTHORIZED_ERROR_CODE) {
      setApiStatusText(AUTH_UNAUTHORIZED_ERROR_MESSAGE)
    }
    if (apiStatus === FORBIDDEN_ERROR_CODE) {
      setApiStatusText(AUTH_FORBIDDEN_MESSAGE)
    }
    if (apiStatus === SERVER_ERROR_CODE) {
      setApiStatusText(AUTH_SERVER_ERROR_MESSAGE)
    }
  }

  return (
    <main className="login">
      <AuthForm
        greetingText={'Рады видеть!'}
        buttonText={'Войти'}
        questionText={'Ещё не зарегистрированы?'}
        urlText={'Регистрация'}
        urlPath={'/signup'}
        apiStatusText={apiStatusText}
        onSubmit={handleLogin}
        isFormInProcess={isFormInProcess}
        setApiStatus={setApiStatus}
      />
    </main>
  );
}

export default Login;
