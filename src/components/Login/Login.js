import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import * as MainApi from '../../utils/MainApi';
import './Login.css';

const Login = ({ setIsLoggedIn }) => {

  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (values) => {
    if (!values.email || !values.password){
      return;
    }
    MainApi.authorize(values.email, values.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          navigate('/movies', {replace: true});
        }
      })
      .catch((error) => {
        handleApiError(error);
      })
  }

  const handleApiError = (error) => {
    if (error === 400) {
      setApiError('Вы ввели неправильный логин или пароль.')
    }
    if (error === 401) {
      setApiError('При авторизации произошла ошибка. Токен не передан или передан не в том формате.')
    }
    if (error === 403) {
      setApiError('При авторизации произошла ошибка. Переданный токен некорректен.')
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
        apiError={apiError}
        onSubmit={handleLogin}
      />
    </main>
  );
}

export default Login;
