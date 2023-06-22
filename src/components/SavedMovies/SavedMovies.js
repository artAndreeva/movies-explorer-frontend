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
  const [savedMoviesData, setSavedMoviesData] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [deletedMovieId, setDeletedMovieId] = useState(null);

  useEffect(() => {
    setMovies(savedMovies);
    setSavedMoviesData(savedMovies);
  }, [])

  const getDeletedMovie = (id) => {
    setDeletedMovieId(id);
  }

  useEffect(() => {
    if (!savedMovies.some((item) => item._id === deletedMovieId)) {
      setResult((state) => state.filter((currentMovie) => currentMovie._id !== deletedMovieId));
      setSavedMoviesData((state) => state.filter((currentMovie) => currentMovie._id !== deletedMovieId));
      setMovies((state) => state.filter((currentMovie) => currentMovie._id !== deletedMovieId));
    }
  }, [deletedMovieId, savedMovies])

  const searchMovies = (isChecked, values) => {
    if (isChecked) {
      const searchResult = search(savedMoviesData, values);
      const filterResult = filter(searchResult);
      setResult(searchResult);
      setMovies(filterResult);
      handleNoResult(filterResult);
    }
    if (!isChecked) {
      const searchResult = search(savedMoviesData, values);
      setResult(searchResult);
      setMovies(searchResult);
      handleNoResult(searchResult);
    }
  }

  const filterMovies = (isChecked) => {
    if (isChecked) {
      const filterResult = filter(result);
      setMovies(filterResult);
      handleNoResult(filterResult);
    }
    if (!isChecked) {
      setMovies(result);
      setNoResult(false);
    }
  }

  const handleNoResult = (res) => {
    if (res.length === 0) {
      setNoResult(true);
    } else {
      setNoResult(false);
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
        isLoaded={isLoaded}
        noResult={noResult}
        getDeletedMovie={getDeletedMovie}/>
    </main>
  );
}

export default SavedMovies;
