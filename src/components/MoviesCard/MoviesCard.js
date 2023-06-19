import React, { useEffect } from 'react';
import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({
  movie,
  addMovie,
  deleteMovie,
  deleteSavedMovie,
  savedMovies,
}) => {

  const [isShown, setIsShown] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
        if (pathname === '/movies' && savedMovies.some((item) => item.movieId === movie.id)) {
      setIsSaved(true)
    }
  }, [savedMovies, movie.id])

  const handleSaveMovie = () => {
    setIsSaved(true)
    addMovie({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co/${movie.image.url}`,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
      movieId: movie.id
    });
  }

  const handleDeleteMovie = () => {
    deleteMovie(movie._id);
  }

  const handleDeleteSavedMovie = () => {
    deleteSavedMovie(movie.id);
    setIsSaved(false)
  }

  return (
    <li className="movies-card">
      <div
        className="movies-card__image-container"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
          <img
            src={pathname === '/movies' ? `https://api.nomoreparties.co/${movie.image.url}`: movie.image}
            alt={movie.nameRU}
            className="movies-card__image"/>
        </a>
        {(isShown && !isSaved) &&
          (pathname === '/saved-movies'
          ? <button className="movies-card__button-delete" onClick={handleDeleteMovie}></button>
          : <button className="movies-card__button-save" onClick={handleSaveMovie}>Сохранить</button>)
        }
        {isSaved && (<button className="movies-card__button-saved" onClick={handleDeleteSavedMovie}></button>)}
      </div>
      <div className="movies-card__info">
        <span className="movies-card__description">{movie.nameRU}</span>
        <span className="movies-card__duration">{`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}</span>
      </div>
    </li>
  );
}

export default MoviesCard;
