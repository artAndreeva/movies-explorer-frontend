import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FormButton from '../FormButton/FormButton';
import movies from '../../utils/movies';

const Movies = () => {

  return (
    <main className="movies">
      <SearchForm/>
      <MoviesCardList movies={movies}/>
      <FormButton
        buttonClass={'movies__button'}
        buttonText={'Ещё'}
      />
    </main>
  );
}

export default Movies;
