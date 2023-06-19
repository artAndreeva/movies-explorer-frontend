import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';

const Movies = ({
  getMovies,
  addMovie,
  deleteSavedMovie,
  savedMovies,
  isLoaded
}) => {

  const [movies, setMovies] = useState([]);

  const handleSearchedMovies = () => {
    const searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
      setMovies(searchedMovies);
  }

  useEffect(() => {
    handleSearchedMovies();
  }, [])

  return (
    <main className="movies">
      <SearchForm
        getMovies={getMovies}
        handleSearchedMovies={handleSearchedMovies}
      />
      {isLoaded
      ? <Preloader/>
      : <MoviesCardList
          movies={movies}
          addMovie={addMovie}
          deleteSavedMovie={deleteSavedMovie}
          savedMovies={savedMovies}/>
      }
    </main>
  );
}

export default Movies;
