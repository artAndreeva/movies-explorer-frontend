import React from 'react';
import './Profile.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const [isRedact, setIsRedact] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleChange = () => {

  }

  const handleRedact = () => {
    setIsRedact(true)
  }

  const handleButton = () => {
    setIsRedact(false)
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
              <input className="profile__input" id="name" name="name" value="Виталий" onChange={handleChange} onClick={handleRedact}/>
            </div>
            <div className="profile__field">
              <label className="profile__label" htmlFor="email">E-mail</label>
              <input className="profile__input" id="email" name="email" value="pochta@yandex.ru" onChange={handleChange} onClick={handleRedact}/>
            </div>
          </div>
          <div className="profile__buttons">
          {isRedact
          ?
            <>
              <span className="profile__api-error">Ошибка API</span>
              <button className="profile__button" onClick={handleButton}>Сохранить</button>
            </>
          :
            <>
              <span className="profile__edit" onClick={handleRedact}>Редактировать</span>
              <span className="profile__exit" onClick={handleExit}>Выйти из аккаунта</span>
            </>
          }
          </div>
        </form>
      </div>
    </main>
  );
}

export default Profile;
