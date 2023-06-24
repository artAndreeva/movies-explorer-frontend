import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import {
  PROFILE_OK_STATUS_MESSAGE,
  REGISTER_BAD_REQUEST_ERROR_MESSAGE,
  REGISTER_CONFLICT_ERROR_MESSAGE,
  AUTH_SERVER_ERROR_MESSAGE } from '../../constants/error-texts';
import {
  OK_STATUS_CODE,
  BAD_REQUEST_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  SERVER_ERROR_CODE
} from '../../constants/error-cods';
import './Profile.css';

const Profile = ({ handleUpdateUser, apiStatus, handleLogout, isFormInProcess, setApiStatus }) => {

  const { values, handleChange, isValid, setValues, errors } = useFormAndValidation({});
  const currentUser = useContext(CurrentUserContext);
  const [isRedact, setIsRedact] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [apiStatusText, setApiStatusText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isApiDisabled, setIsApiDisabled] = useState(true);

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
    } else if (isValid && (values.name !== currentUser.name || values.email !== currentUser.email)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [values])

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser(values);
    setValues(currentUser);
    setIsApiDisabled(false);
    setApiStatus(null);
  }

  useEffect(() => {
    handleApiStatus();
    if(apiStatus === OK_STATUS_CODE) {
      setIsRedact(false);
    }
  }, [apiStatus])

  const handleApiStatus = () => {
    if (apiStatus === OK_STATUS_CODE) {
      setApiStatusText(PROFILE_OK_STATUS_MESSAGE);
      setIsSuccess(true);
    }
    if (apiStatus === BAD_REQUEST_ERROR_CODE) {
      setApiStatusText(REGISTER_BAD_REQUEST_ERROR_MESSAGE);
      setIsSuccess(false);
    }
    if (apiStatus === CONFLICT_ERROR_CODE) {
      setApiStatusText(REGISTER_CONFLICT_ERROR_MESSAGE);
      setIsSuccess(false);
    }
    if (apiStatus === SERVER_ERROR_CODE) {
      setApiStatusText(AUTH_SERVER_ERROR_MESSAGE);
      setIsSuccess(false);
    }
  }

  return (
    <main className="profile">
      <div className="profile__container">
        <h2 className="profile__greeting">Привет, {currentUser.name}!</h2>
        <form className="profile__form form" onSubmit={handleSubmit}>
          <div className="profile__fieldset">
            <div className="profile__field">
              <label className="profile__label" htmlFor="name">Имя</label>
              <input
                className={`profile__input input ${errors.name && 'profile__input-error'}`}
                id="name"
                name="name"
                value={values.name || ''}
                onChange={handleChange}
                disabled={!isRedact || isFormInProcess}
                required
                minLength={2}
                maxLength={30}
                pattern='^[\-\sA-Za-zА-Яа-я]*$'
                />
            </div>
            <div className="profile__field">
              <label className="profile__label" htmlFor="email">E-mail</label>
              <input
                className={`profile__input input ${errors.email && 'profile__input-error'}`}
                id="email"
                name="email"
                value={values.email || ''}
                onChange={handleChange}
                disabled={!isRedact || isFormInProcess}
                required
                minLength={6}
                maxLength={30}
                pattern='[a-zA-Z0-9\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]*'
                />
            </div>
          </div>
          <div className="profile__buttons">
            {!isApiDisabled && <span className={`profile__api-error ${isSuccess ? "profile__api-error_not-error" : ""}`}>{apiStatusText}</span>}
            {isRedact
            ?
              <div className="profile__buttons">
                <button className="profile__button button" disabled={isButtonDisabled}>Сохранить</button>
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
