import React from 'react';
import Logo from '../Logo/Logo';
import { Link, useLocation } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({ greetingText, buttonText, questionText, registerText, registerPath, onSubmit, nameValue, emailValue,
  passwordValue, errorClass }) => {

   const { pathname } = useLocation();

   const handleChange = () => {
    
   }

  return (
      <div className="auth-form">
        <Logo/>
        <p className="auth-form__greeting">{greetingText}</p>
        <form className="auth-form__form" name="auth-form" id="auth-form" onSubmit={onSubmit} noValidate>
          <fieldset className="auth-form__fieldset">
            {pathname === '/signup' &&
              <div className="auth-form__field">
                <label className="auth-form__label" htmlFor="name">Имя</label>
                <input className="auth-form__input" type="text" id="name" required value={nameValue} onChange={handleChange}></input>
                {/* <span className="auth-form__validation-error">Что-то пошло не так...</span> */}
              </div>
            }
            <div className="auth-form__field">
              <label className="auth-form__label" htmlFor="email">E-mail</label>
              <input className="auth-form__input" type="email" id="email" required value={emailValue} onChange={handleChange}></input>
              {/* <span className="auth-form__validation-error">Что-то пошло не так...</span> */}
            </div>
            <div className="auth-form__field">
              <label className="auth-form__label" htmlFor="password">Пароль</label>
              <input className={`auth-form__input ${errorClass}`} type="password" id="password" required value={passwordValue} onChange={handleChange}></input>
              {errorClass && <span className="auth-form__validation-error">Что-то пошло не так...</span>}
            </div>
          </fieldset>
          <div className="auth-form__submit">
            <span className="auth-form__api-error">Ошибка API</span>
            <button className="auth-form__button">{buttonText}</button>
          </div>
        </form>
        <div className="auth-form__text">
          <p className="auth-form__question">{questionText} <Link to={registerPath} className="auth-form__to-register">{registerText}</Link></p>
        </div>
      </div>
  );
}

export default AuthForm;
