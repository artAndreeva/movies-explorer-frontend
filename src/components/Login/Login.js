import React from 'react';
import { useState, useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import './Login.css';

const Login = ({ handleLogin, apiStatus, isAuthProcess }) => {

  const [apiStatusText, setApiStatusText] = useState('');

  useEffect(() => {
    handleApiStatus();
  }, [apiStatus])

  const handleApiStatus = () => {
    if (apiStatus.status === 400) {
      setApiStatusText('Вы ввели неправильный логин или пароль.')
    }
    if (apiStatus.status === 401) {
      setApiStatusText('При авторизации произошла ошибка. Токен не передан или передан не в том формате.')
    }
    if (apiStatus.status === 403) {
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
        isAuthProcess={isAuthProcess}
      />
    </main>
  );
}

export default Login;
