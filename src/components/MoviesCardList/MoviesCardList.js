import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ movies }) => {

  return (
    <section className="movies-card">
      <ul className="movies-card__list">
        {movies.map((movie) => (
          <MoviesCard
            key={movie._id}
            movie={movie}
          />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
