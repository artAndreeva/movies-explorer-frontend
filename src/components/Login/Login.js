import React from 'react';
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <main className="login">
      <div className="login__container">
        <Logo/>
        <p className="login__greeting">Рады видеть!</p>
        <form className="login__form" name="login-form" id="login-form" onSubmit={handleSubmit} noValidate>
          <fieldset className="login__fieldset">
            <label className="login__label" htmlFor="email">E-mail</label>
            <input className="login__input" type="email" id="email" required></input>
            <label className="login__label" htmlFor="password">Пароль</label>
            <input className="login__input" type="password" id="password" required></input>
          </fieldset>
          <button className="login__button">Войти</button>
        </form>
        <div className="login__text">
          <p className="login__question">Ещё не зарегистрированы? <Link to='/signup' className="login__to-register">Регистрация</Link></p>
        </div>
      </div>
    </main>
  );
}

export default Login;
