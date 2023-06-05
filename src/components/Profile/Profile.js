import React from 'react';
import './Profile.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const [isRedact, setIsRedact] = useState(false);
  const [values, setValues] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleChange = (e) => {
    const { value } = e.target
    setValues(value)
  }

  const handleRedact = () => {
    setIsRedact(!isRedact)
  }

  const handleExit = () => {
    navigate('/', { replace: true });
  }

  return (
    <main className="profile">
      <div className="profile__container">
        <h1 className="profile__greeting">Привет, Виталий!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__fieldset">
            <div className="profile__field">
              <label className="profile__label" htmlFor="name">Имя</label>
              <input className="profile__input" id="name" name="name" value={values || 'Виталий'} onChange={handleChange} disabled={!isRedact}/>
            </div>
            <div className="profile__field">
              <label className="profile__label" htmlFor="email">E-mail</label>
              <input className="profile__input" id="email" name="email" value="pochta@yandex.ru" onChange={handleChange} disabled={!isRedact}/>
            </div>
          </div>
          <div className="profile__buttons">
          {isRedact
          ?
            <div className="profile__buttons">
              {/* <span className="profile__api-error">Ошибка API</span> */}
              <button className="profile__button button" onClick={handleRedact}>Сохранить</button>
            </div>
          :
            <div className="profile__buttons">
              <button className="profile__edit link" onClick={handleRedact}>Редактировать</button>
              <button className="profile__exit link" onClick={handleExit}>Выйти из аккаунта</button>
            </div>
          }
          </div>
        </form>
      </div>
    </main>
  );
}

export default Profile;
