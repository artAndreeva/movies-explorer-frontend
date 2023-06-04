import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movies from '../../utils/movies';

const Movies = () => {

  return (
    <main className="movies">
      <SearchForm/>
      <MoviesCardList movies={movies}/>
      <button className="movies__button button">Ещё</button>
    </main>
  );
}

export default Movies;
