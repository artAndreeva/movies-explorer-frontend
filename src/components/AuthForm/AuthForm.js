import React from 'react';
import Logo from '../Logo/Logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import './AuthForm.css';

const AuthForm = ({ greetingText, buttonText, questionText, registerText, registerPath, navigatePath }) => {

    const { pathname } = useLocation();
    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate(navigatePath, { replace: true });
      resetForm();
    }

  return (
      <div className="auth-form">
        <Logo/>
        <h1 className="auth-form__greeting">{greetingText}</h1>
        <form
          className="auth-form__form"
          name="auth-form"
          id="auth-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset className="auth-form__fieldset">
            {pathname === '/signup' &&
              <div className="auth-form__field">
                <label className="auth-form__label" htmlFor="name">Имя</label>
                <input
                  className={`auth-form__input ${errors.name && 'auth-form__input_invalid'}`}
                  type="text"
                  id="name"
                  name="name"
                  required
                  minLength="2"
                  maxLength="40"
                  value={values.name || ''}
                  onChange={handleChange}
                />
                {errors.name && <span className="auth-form__validation-error">{errors.name}</span>}
              </div>
            }
            <div className="auth-form__field">
              <label className="auth-form__label" htmlFor="email">E-mail</label>
              <input
                className={`auth-form__input ${errors.email && 'auth-form__input_invalid'}`}
                type="email"
                id="email"
                name="email"
                required
                minLength="6"
                maxLength="40"
                value={values.email || ''}
                onChange={handleChange}
              />
              {errors.email && <span className="auth-form__validation-error">{errors.email}</span>}
            </div>
            <div className="auth-form__field">
              <label className="auth-form__label" htmlFor="password">Пароль</label>
              <input
                className={`auth-form__input ${errors.password && 'auth-form__input_invalid'}`}
                type="password"
                id="password"
                name="password"
                required
                minLength="8"
                maxLength="40"
                value={values.password || ''}
                onChange={handleChange}
              />
              {errors.password && <span className="auth-form__validation-error">{errors.password}</span>}
            </div>
          </fieldset>
          <div className="auth-form__submit">
            {/* <span className="auth-form__api-error">Ошибка API</span> */}
            <button className="auth-form__button button" disabled={!isValid}>{buttonText}</button>
          </div>
        </form>
        <div className="auth-form__text">
          <span className="auth-form__question">{questionText} <Link to={registerPath} className="auth-form__to-register link">{registerText}</Link></span>
        </div>
      </div>
  );
}

export default AuthForm;
