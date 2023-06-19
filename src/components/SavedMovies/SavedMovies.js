import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({
  savedMovies,
  deleteMovie,
  isLoaded
}) => {


  return (
    <main className="saved-movies">
      <SearchForm/>
      {isLoaded
      ? <Preloader/>
      : <MoviesCardList
        movies={savedMovies}
        deleteMovie={deleteMovie}/>
      }
    </main>
  );
}

export default SavedMovies;
