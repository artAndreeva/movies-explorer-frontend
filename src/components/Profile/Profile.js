import React from 'react';
import './Profile.css';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import {
  PROFILE_OK_STATUS,
  REGISTER_BAD_REQUEST_ERROR,
  REGISTER_CONFLICT_ERROR,
  AUTH_SERVER_ERROR } from '../../constants/error-texts';

const Profile = ({ handleUpdateUser, apiStatus, handleLogout, isFormInProcess, apiAction }) => {

  const { values, handleChange, isValid, setValues } = useFormAndValidation({});
  const currentUser = useContext(CurrentUserContext);
  const [isRedact, setIsRedact] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [apiStatusText, setApiStatusText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isApiDisabled, setIsApiDisabled] = useState(true);

  useEffect(() => {
      if (apiAction) {
        setIsRedact(true);
      }
  }, [apiAction])

  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
    }
  }, [currentUser])

  const handleRedact = () => {
    setIsRedact(true);
    setIsApiDisabled(true);
  }

   useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setIsButtonDisabled(true);
    }
    if (isValid && (values.name !== currentUser.name || values.email !== currentUser.email)) {
      setIsButtonDisabled(false);
    }
  }, [values])

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser(values);
    setValues(currentUser);
    setIsApiDisabled(false);
    setIsRedact(false);
  }

  useEffect(() => {
    handleApiStatus();
  }, [apiStatus])

  const handleApiStatus = () => {
    if (apiStatus === 200) {
      setApiStatusText(PROFILE_OK_STATUS);
      setIsSuccess(true);
    }
    if (apiStatus === 400) {
      setApiStatusText(REGISTER_BAD_REQUEST_ERROR);
      setIsSuccess(false);
    }
    if (apiStatus === 409) {
      setApiStatusText(REGISTER_CONFLICT_ERROR);
      setIsSuccess(false);
    }
    if (apiStatus === 500) {
      setApiStatusText(AUTH_SERVER_ERROR);
      setIsSuccess(false);
    }
  }

  return (
    <main className="profile">
      <div className="profile__container">
        <h2 className="profile__greeting">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__fieldset">
            <div className="profile__field">
              <label className="profile__label" htmlFor="name">Имя</label>
              <input
                className="profile__input input"
                id="name"
                name="name"
                value={values.name || ''}
                onChange={handleChange}
                disabled={!isRedact || isFormInProcess}/>
            </div>
            <div className="profile__field">
              <label className="profile__label" htmlFor="email">E-mail</label>
              <input
                className="profile__input input"
                id="email"
                name="email"
                value={values.email || ''}
                onChange={handleChange}
                disabled={!isRedact || isFormInProcess}/>
            </div>
          </div>
          <div className="profile__buttons">
            {!isApiDisabled && <span className={`profile__api-error ${isSuccess ? "profile__api-error_not-error" : ""}`}>{apiStatusText}</span>}
            {isRedact
            ?
              <div className="profile__buttons">
                <button className="profile__button button input" disabled={isButtonDisabled}>Сохранить</button>
              </div>
            :
              <div className="profile__buttons">
                <button className="profile__edit link" onClick={handleRedact}>Редактировать</button>
                <button className="profile__exit link" onClick={handleLogout}>Выйти из аккаунта</button>
              </div>
            }
          </div>
        </form>
      </div>
    </main>
  );
}

export default Profile;
