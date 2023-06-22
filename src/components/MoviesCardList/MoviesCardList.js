import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import useWindowSize from '../../hooks/useWindowSize';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import {
  START_NUMBER,
  TABLET_SIZE,
  MOBILE_SIZE,
  DESKTOP_NUMBER,
  TABLET_NUMBER,
  MOBILE_NUMBER,
  DESKTOP_MORE_NUMBER,
  TABLET_MORE_NUMBER
} from '../../constants/slice-card-numbers'

const MoviesCardList = ({
  movies,
  addMovie,
  deleteMovie,
  deleteSavedMovie,
  savedMovies,
  isLoaded,
  noResult,
  getDeletedMovie
}) => {

  const { pathname } = useLocation();
  const size = useWindowSize();
  const [slicedMovies, setSlicedMovies] = useState([]);
  const [moreMovies, setMoreMovies] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [moviesToRender, setMoviesToRender] = useState([]);

  const sliceMovies = () => {
    if (size.width) {
      setSlicedMovies(movies.slice(START_NUMBER, DESKTOP_NUMBER));
      setMoreMovies(DESKTOP_MORE_NUMBER);
    }
    if (size.width <= TABLET_SIZE) {
      setSlicedMovies(movies.slice(START_NUMBER, TABLET_NUMBER));
      setMoreMovies(TABLET_MORE_NUMBER);
    }
    if (size.width <= MOBILE_SIZE) {
      setSlicedMovies(movies.slice(START_NUMBER, MOBILE_NUMBER));
      setMoreMovies(TABLET_MORE_NUMBER);
    }
  }

  const showMoreMovies = () => {
    setSlicedMovies(movies.slice(START_NUMBER, (slicedMovies.length + moreMovies)));
  }

  useEffect(() => {
    if (movies) {
      sliceMovies();
    }
  }, [size.width, movies])

  useEffect(() => {
    if (movies) {
      toggleButton();
    } else {
      setIsShown(false);
    }
  }, [movies, slicedMovies, moreMovies])

  const toggleButton = () => {
    if (movies.length < (slicedMovies.length + moreMovies)) {
      setIsShown(false);
    } else {
      setIsShown(true);
    }
  }

  useEffect(() => {
    if (pathname === '/movies') {
      setMoviesToRender(slicedMovies);
    }
    if (pathname === '/saved-movies') {
      setMoviesToRender(movies);
    }
  }, [slicedMovies, movies])

  return (
    <section className="movies-card-list">
      {isLoaded
      ? <Preloader/>
      : <>{noResult
          ? <span className="movies-card-list__no-result">Ничего не найдено</span>
          : <><ul className="movies-card-list__list">
                {moviesToRender.map((movie) => (
                  <MoviesCard
                    key={movie.id || movie._id}
                    movie={movie}
                    addMovie={addMovie}
                    deleteMovie={deleteMovie}
                    deleteSavedMovie={deleteSavedMovie}
                    savedMovies={savedMovies}
                    getDeletedMovie={getDeletedMovie}
                  />
                ))}
              </ul>
              {pathname === '/movies' && (isShown && <button className="movies-card-list__button button" onClick={showMoreMovies}>Ещё</button>)}
            </>
          }
        </>
      }

    </section>
  );
}

export default MoviesCardList;
