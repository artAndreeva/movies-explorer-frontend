import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/signin', { replace: true });
  }

  return (
    <main className="register">
      <AuthForm
        onSubmit={handleSubmit}
        greetingText={'Добро пожаловать!'}
        buttonText={'Зарегистрироваться'}
        questionText={'Уже зарегистрированы?'}
        registerText={'Войти'}
        registerPath={'/signin'}
        nameValue={'Виталий'}
        emailValue={'pochta@yandex.ru'}
        passwordValue={'пароль'}
        errorClass={'auth-form__input_invalid'}
      />
    </main>
  );
}

export default Register;
