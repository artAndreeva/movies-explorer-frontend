import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import * as MainApi from '../../utils/MainApi';
import './Register.css';

const Register = () => {

  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (values) => {
    MainApi.register(values.name, values.email, values.password)
      .then (() => {
        navigate('/signin', {replace: true});
      })
      .catch((error) => {
        handleApiError(error);
      })
  }

  const handleApiError = (error) => {
    if (error === 409) {
      setApiError('Пользователь с таким email уже существует.')
    }
    if (error === 500) {
      setApiError('При регистрации пользователя произошла ошибка.')
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
        apiError={apiError}
        onSubmit={handleRegister}
      />
    </main>
  );
}

export default Register;
