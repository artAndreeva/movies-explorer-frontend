import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import useWindowSize from '../../hooks/useWindowSize';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({
  movies,
  addMovie,
  deleteMovie,
  deleteSavedMovie,
  savedMovies,
  isLoaded
}) => {

  const { pathname } = useLocation();
  const size = useWindowSize();

  const [slicedMovies, setSlicedMovies] = useState([]);
  const [moreMovies, setMoreMovies] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [noResult, setNoResult] = useState(false);

  const sliceMovies = () => {
    if (size.width) {
      setSlicedMovies(movies.slice(0, 12));
      setMoreMovies(3);
    }
    if (size.width <= 768) {
      setSlicedMovies(movies.slice(0, 8));
      setMoreMovies(2);
    }
    if (size.width <= 480) {
      setSlicedMovies(movies.slice(0, 5));
      setMoreMovies(2);
    }
  }

  useEffect(() => {
    if (movies) {
      sliceMovies();
    }
  }, [size.width, movies])

  useEffect(() => {
    if (movies) {
      toggleButton();
      handleNoResult();
    }
  }, [movies, slicedMovies, moreMovies])

  useEffect(() => {
    if (movies) {
      handleNoResult();
    }
  }, [movies])

  const showMoreMovies = () => {
    setSlicedMovies(movies.slice(0, (slicedMovies.length + moreMovies)));
  }

  const toggleButton = () => {
    if (movies.length < (slicedMovies.length + moreMovies)) {
      setIsShown(false);
    } else {
      setIsShown(true);
    }
  }

  const handleNoResult = () => {
    if (movies.length === 0) {
      setNoResult(true);
    } else {
      setNoResult(false);
    }
  }

  return (
    <section className="movies-card-list">
      {isLoaded
      ? <Preloader/>
      : <>{noResult
        ? <span className="movies-card-list__no-result">Ничего не найдено</span>
        : <ul className="movies-card-list__list">
            {slicedMovies.map((movie) => (
              <MoviesCard
                key={movie.id || movie._id}
                movie={movie}
                addMovie={addMovie}
                deleteMovie={deleteMovie}
                deleteSavedMovie={deleteSavedMovie}
                savedMovies={savedMovies}
              />
            ))}
          </ul>
        }</>
      }
      {pathname === '/movies' && (isShown && <button className="movies-card-list__button button" onClick={showMoreMovies}>Ещё</button>)}
    </section>
  );
}

export default MoviesCardList;
