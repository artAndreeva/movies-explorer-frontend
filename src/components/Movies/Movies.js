import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect } from 'react';

const Movies = ({
  getMovies,
  addMovie,
  deleteSavedMovie,
  savedMovies,
  isLoaded
}) => {

  const [movies, setMovies] = useState([]);

  const handleSearchedMovies = (searchedMovies) => {
    setMovies(searchedMovies);
  }

  const renderSearchedMoviesOnMount = () => {
    const searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
      setMovies(searchedMovies);
  }

  useEffect(() => {
    renderSearchedMoviesOnMount();
  }, [])

  return (
    <main className="movies">
      <SearchForm
        getMovies={getMovies}
        handleSearchedMovies={handleSearchedMovies}
      />
      <MoviesCardList
        movies={movies}
        addMovie={addMovie}
        deleteSavedMovie={deleteSavedMovie}
        savedMovies={savedMovies}
        isLoaded={isLoaded}/>
    </main>
  );
}

export default Movies;
