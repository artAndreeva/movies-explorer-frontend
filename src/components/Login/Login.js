import React from 'react';
import { useState, useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import './Login.css';

const Login = ({ handleLogin, apiStatus, isFormInProcess }) => {

  const [apiStatusText, setApiStatusText] = useState('');

  useEffect(() => {
    handleApiStatus();
  }, [apiStatus])

  const handleApiStatus = () => {
    if (apiStatus === 400) {
      setApiStatusText('Вы ввели неправильный логин или пароль.')
    }
    if (apiStatus === 401) {
      setApiStatusText('При авторизации произошла ошибка. Токен не передан или передан не в том формате.')
    }
    if (apiStatus === 403) {
      setApiStatusText('При авторизации произошла ошибка. Переданный токен некорректен.')
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
