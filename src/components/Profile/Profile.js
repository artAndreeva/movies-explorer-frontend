import React from 'react';
import './Profile.css';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

const Profile = ({ handleUpdateUser, apiStatusCode, handleLogout }) => {

  const { values, handleChange, isValid, setValues } = useFormAndValidation({});
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
    handleApiStatus(apiStatusCode);
  }, [apiStatusCode])

  const handleApiStatus = (code) => {
    if (code === 200) {
      setApiStatusText('Данные успешно обновлены');
      setIsSuccess(true);
    }
    if (code === 409) {
      setApiStatusText('Пользователь с таким email уже существует.');
      setIsSuccess(false);
    }
    if (code === 500) {
      setApiStatusText('При обновлении профиля произошла ошибка.');
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
                className="profile__input"
                id="name"
                name="name"
                value={values.name || ''}
                onChange={handleChange}
                disabled={!isRedact}/>
            </div>
            <div className="profile__field">
              <label className="profile__label" htmlFor="email">E-mail</label>
              <input
                className="profile__input"
                id="email"
                name="email"
                value={values.email || ''}
                onChange={handleChange}
                disabled={!isRedact}/>
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
