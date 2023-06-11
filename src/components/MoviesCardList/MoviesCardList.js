import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({ movies }) => {
  const { pathname } = useLocation();

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {movies.map((movie) => (
          <MoviesCard
            key={movie._id}
            movie={movie}
          />
        ))}
      </ul>
      {pathname === '/movies' && <button className="movies-card-list__button button">Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
