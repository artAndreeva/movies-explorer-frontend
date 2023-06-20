import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useEffect, useState } from 'react';

const SavedMovies = ({
  savedMovies,
  deleteMovie,
  isLoaded
}) => {


  return (
    <main className="saved-movies">
      <SearchForm/>
      <MoviesCardList
        movies={savedMovies}
        deleteMovie={deleteMovie}
        isLoaded={isLoaded}/>
    </main>
  );
}

export default SavedMovies;
