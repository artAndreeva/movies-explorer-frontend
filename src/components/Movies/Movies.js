import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect } from 'react';
import { search, filter } from '../../utils/search';
import { SERVER_ERROR_MESSAGE } from '../../constants/error-texts';

const Movies = ({
  getMovies,
  addMovie,
  deleteSavedMovie,
  savedMovies,
  isLoaded,
  setIsPopupOpen,
  setApiMessage,
  setIsLoaded,
}) => {

  const [movies, setMovies] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const renderSearchedMoviesOnMount = () => {
    const searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
      setMovies(searchedMovies);
  }

  useEffect(() => {
    renderSearchedMoviesOnMount();
  }, [])

  const getSearchParams = (setValues, setIsChecked) => {
    if (localStorage.getItem('searchParams')) {
      const params = JSON.parse(localStorage.getItem('searchParams'));
      setValues({movie: params.value});
      setIsChecked(params.checkbox);
    }
  }

  const updateCheckboxParams = (isChecked) => {
    const searchParams = JSON.parse(localStorage.getItem('searchParams'));
    searchParams.checkbox = isChecked;
    localStorage.setItem('searchParams', JSON.stringify(searchParams));
  }

  const searchMovies = async (isChecked, values) => {
    setIsLoaded(true);
    try {
      if (!localStorage.getItem('movies')) {
        await getMovies();
      }
      const movies = JSON.parse(localStorage.getItem('movies'));
      if (isChecked) {
        const searchResult = search(movies, values);
        const filterResult = filter(searchResult);
        localStorage.setItem('searchedMovies', JSON.stringify(searchResult));
        setMovies(filterResult);
        handleNoResult(filterResult);
      }
      if (!isChecked) {
        const searchResult = search(movies, values);
        localStorage.setItem('searchedMovies', JSON.stringify(searchResult));
        setMovies(searchResult);
        handleNoResult(searchResult);
      }
      setSearchParams(isChecked, values);
    } catch {
      setIsPopupOpen(true);
      setApiMessage(SERVER_ERROR_MESSAGE);
    } finally {
      setTimeout(() => {
        setIsLoaded(false);
      }, 1000)
    }
  }

  const setSearchParams = (isChecked, values) => {
    localStorage.setItem('searchParams', JSON.stringify({ value: values.movie, checkbox: isChecked}));
  }

  const filterMovies = (isChecked) => {
    const movies = JSON.parse(localStorage.getItem('searchedMovies'));
    const searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
    if (isChecked) {
      const filterResult = filter(searchedMovies);
      setMovies(filterResult);
      handleNoResult(filterResult);
    }
    if (!isChecked) {
      setMovies(movies);
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
    <main className="movies">
      <SearchForm
        getSearchParams={getSearchParams}
        searchMovies={searchMovies}
        filterMovies={filterMovies}
        updateCheckboxParams={updateCheckboxParams}
      />
      <MoviesCardList
        movies={movies}
        addMovie={addMovie}
        deleteSavedMovie={deleteSavedMovie}
        savedMovies={savedMovies}
        isLoaded={isLoaded}
        noResult={noResult}
      />
    </main>
  );
}

export default Movies;
