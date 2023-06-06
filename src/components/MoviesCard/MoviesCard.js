import React from 'react';
import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ movie }) => {
  const [isShown, setIsShown] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { pathname } = useLocation();

  return (
    <li className="movies-card__item">
      <div
        className="movies-card__image-container"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <img src={movie.img} alt={movie.description} className="movies-card__image"/>
        {(isShown && !isSaved) &&
          (pathname === '/saved-movies'
          ? <button className="movies-card__button-delete"></button>
          : <button className="movies-card__button-save" onClick={() => setIsSaved(true)}>Сохранить</button>)
        }
        {isSaved && (<button className="movies-card__button-saved" onClick={() => setIsSaved(false)}></button>)}
      </div>
      <div className="movies-card__info">
        <span className="movies-card__description">{movie.description}</span>
        <span className="movies-card__duration">{movie.time}</span>
      </div>
    </li>
  );
}

export default MoviesCard;
