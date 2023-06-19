import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';

const MoviesCardList = ({
  movies,
  addMovie,
  deleteMovie,
  deleteSavedMovie,
  savedMovies,
}) => {

  const { pathname } = useLocation();
  const size = useWindowSize();

  const [slicedMovies, setSlicedMovies] = useState([]);
  const [moreMovies, setMoreMovies] = useState(null);
  const [isShown, setIsShown] = useState(true);

  const sliceMovies = () => {
    if (size.width) {
      setSlicedMovies(movies.slice(0, 12))
      setMoreMovies(3)
    }
    if (size.width <= 768) {
      setSlicedMovies(movies.slice(0, 8))
      setMoreMovies(2)
    }
    if (size.width <= 480) {
      setSlicedMovies(movies.slice(0, 5))
      setMoreMovies(2)
    }
  }

  useEffect(() => {
    sliceMovies()
  }, [size.width, movies])

  const showMoreMovies = () => {
    setSlicedMovies(movies.slice(0, (slicedMovies.length + moreMovies)));
    if (movies.length < (slicedMovies.length + moreMovies)) {
      setIsShown(false);
    } 
  }

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
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
      {pathname === '/movies' && (isShown && <button className="movies-card-list__button button" onClick={showMoreMovies}>Ещё</button>)}
    </section>
  );
}

export default MoviesCardList;
