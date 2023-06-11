import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import savedmovies from '../../utils/savedmovies';

const SavedMovies = () => {
  return (
    <main className="saved-movies">
      <SearchForm/>
      <MoviesCardList movies={savedmovies}/>
    </main>
  );
}

export default SavedMovies;
