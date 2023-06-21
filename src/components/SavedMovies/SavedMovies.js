import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useEffect, useState } from 'react';
import { search, filter } from '../../utils/search';

const SavedMovies = ({
  savedMovies,
  deleteMovie,
  isLoaded
}) => {

  const [movies, setMovies] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    setMovies(savedMovies);
  }, [])

  const searchMovies = (isChecked, values) => {
    if (isChecked) {
      const searchResult = search(savedMovies, values);
      const filterResult = filter(searchResult);
      setMovies(filterResult);
    }
    if (!isChecked) {
      const searchResult = search(movies, values);
      setResult(searchResult);
      setMovies(searchResult);
    }
  }

  const filterMovies = (isChecked) => {
    if (isChecked) {
      const filterResult = filter(result);
      setMovies(filterResult);
    }
    if (!isChecked) {
      setMovies(result);
    }
  }

  return (
    <main className="saved-movies">
      <SearchForm
        searchMovies={searchMovies}
        filterMovies={filterMovies}/>
      <MoviesCardList
        movies={movies}
        deleteMovie={deleteMovie}
        isLoaded={isLoaded}/>
    </main>
  );
}

export default SavedMovies;
