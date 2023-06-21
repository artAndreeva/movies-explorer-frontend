import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect } from 'react';
import { search, filter } from '../../utils/search';

const Movies = ({
  getMovies,
  addMovie,
  deleteSavedMovie,
  savedMovies,
  isLoaded
}) => {

  const [movies, setMovies] = useState([]);
  const [isFirstSearch, setIsFirstSearch] = useState(true);


  const handleSearchedMovies = (movieToRender) => {
    setMovies(movieToRender);
  }

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

  const handleFirstSearch = () => {
    if (isFirstSearch) {
      getMovies();
      setIsFirstSearch(false);
    }
  }

  const searchMovies = (isChecked, values) => {
    handleFirstSearch();
    const movies = JSON.parse(localStorage.getItem('movies'));
    if (isChecked) {
      const searchResult = search(movies, values);
      const filterResult = filter(searchResult);
      localStorage.setItem('searchedMovies', JSON.stringify(searchResult));
      handleSearchedMovies(filterResult);
    }
    if (!isChecked) {
      const searchResult = search(movies, values);
      localStorage.setItem('searchedMovies', JSON.stringify(searchResult));
      handleSearchedMovies(searchResult);
    }
    setSearchParams(isChecked, values);
  }

  const setSearchParams = (isChecked, values) => {
    localStorage.setItem('searchParams', JSON.stringify({ value: values.movie, checkbox: isChecked}));
  }

  const filterMovies = (isChecked) => {
    const movies = JSON.parse(localStorage.getItem('searchedMovies'));
    const searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
    if (isChecked) {
      const filterResult = filter(searchedMovies);
      handleSearchedMovies(filterResult);
    }
    if (!isChecked) {
      handleSearchedMovies(movies);
    }
  }

  return (
    <main className="movies">
      <SearchForm
        getMovies={getMovies}
        handleSearchedMovies={handleSearchedMovies}
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
        isLoaded={isLoaded}/>
    </main>
  );
}

export default Movies;
