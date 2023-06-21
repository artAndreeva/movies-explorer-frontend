import React from 'react';
import { useState, useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import {
  AUTH_BAD_REQUEST_ERROR,
  AUTH_UNAUTHORIZED_ERROR,
  AUTH_TOKEN_ERROR,
  AUTH_SERVER_ERROR } from '../../constants/error-texts';
import './Login.css';

const Login = ({ handleLogin, apiStatus, isFormInProcess }) => {

  const [apiStatusText, setApiStatusText] = useState('');

  useEffect(() => {
    handleApiStatus();
  }, [apiStatus])

  const handleApiStatus = () => {
    if (apiStatus === 400) {
      setApiStatusText(AUTH_BAD_REQUEST_ERROR)
    }
    if (apiStatus === 401) {
      setApiStatusText(AUTH_UNAUTHORIZED_ERROR)
    }
    if (apiStatus === 403) {
      setApiStatusText(AUTH_TOKEN_ERROR)
    }
    if (apiStatus === 500) {
      setApiStatusText(AUTH_SERVER_ERROR)
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
      />
    </main>
  );
}

export default Login;
