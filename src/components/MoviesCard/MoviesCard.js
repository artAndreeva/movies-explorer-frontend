import React from 'react';
import './MoviesCard.css';

const MoviesCard = ({ movie }) => {
  return (
    <li className="movie__item">
      <img src={movie.img} alt={movie.description} className="movie__image"/>
      <div className="movie__info">
        <p className="movie__description">{movie.description}</p>
        <p className="movie__duration">{movie.time}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
