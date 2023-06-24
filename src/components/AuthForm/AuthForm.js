import React from 'react';
import Logo from '../Logo/Logo';
import { Link, useLocation } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import './AuthForm.css';

const AuthForm = ({
  greetingText,
  buttonText,
  questionText,
  urlPath,
  urlText,
  onSubmit,
  apiStatusText,
  isFormInProcess,
  setApiStatus
}) => {

  const { pathname } = useLocation();
  const { values, handleChange, errors, isValid } = useFormAndValidation({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <div className="auth-form">
      <Logo/>
      <h2 className="auth-form__greeting">{greetingText}</h2>
      <form
        className="auth-form__form form"
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
                className={`auth-form__input input ${errors.name && 'auth-form__input_invalid'}`}
                type="text"
                id="name"
                name="name"
                value={values.name || ''}
                onChange={handleChange}
                disabled={isFormInProcess}
                required
                minLength={2}
                maxLength={30}
                pattern='^[\-\sA-Za-zА-Яа-я]*$'
              />
              {errors.name && <span className="auth-form__validation-error">{errors.name}</span>}
            </div>
          }
          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="email">E-mail</label>
            <input
              className={`auth-form__input input ${errors.email && 'auth-form__input_invalid'}`}
              type="email"
              id="email"
              name="email"
              value={values.email || ''}
              onChange={handleChange}
              disabled={isFormInProcess}
              required
              minLength={6}
              maxLength={30}
              pattern='[a-zA-Z0-9\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]*'
            />
            {errors.email && <span className="auth-form__validation-error">{errors.email}</span>}
          </div>
          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="password">Пароль</label>
            <input
              className={`auth-form__input input ${errors.password && 'auth-form__input_invalid'}`}
              type="password"
              id="password"
              name="password"
              value={values.password || ''}
              onChange={handleChange}
              disabled={isFormInProcess}
              required
              minLength={8}
              maxLength={30}
            />
            {errors.password && <span className="auth-form__validation-error">{errors.password}</span>}
          </div>
        </fieldset>
        <div className="auth-form__submit">
          {apiStatusText && <span className="auth-form__api-error">{apiStatusText}</span>}
          <button className="auth-form__button button" disabled={!isValid || isFormInProcess}>{buttonText}</button>
          <span className="auth-form__text">{questionText}
            <Link to={urlPath} className="auth-form__to-register link" onClick={() => setApiStatus(null)}> {urlText}</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
