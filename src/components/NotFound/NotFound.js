import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <main className="not-found">
      <div className="not-found__container">
        <div className="not-found__error-container">
          <h2 className="not-found__title">404</h2>
          <span className="not-found__description">Страница не найдена</span>
        </div>
        <button className="not-found__go-back link" onClick={goBack}>Назад</button>
      </div>
    </main>
  );
}

export default NotFound;
