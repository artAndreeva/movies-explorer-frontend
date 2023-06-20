import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { useEffect, useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ getMovies, handleSearchedMovies }) => {

  const { values, handleChange, setValues } = useFormAndValidation({});
  const [isChecked, setIsChecked] = useState(false);
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies();
  }

  useEffect(() => {
    filterMovies();
    if(values.movie) {
      updateCheckboxParams();
    }
  }, [isChecked])

  const updateCheckboxParams = () => {
    const searchParams = JSON.parse(localStorage.getItem('searchParams'));
    searchParams.checkbox = isChecked;
    localStorage.setItem('searchParams', JSON.stringify(searchParams));
  }

  useEffect(() => {
    getSearchParams();
  }, [])

  const getSearchParams = () => {
    if (localStorage.getItem('searchParams')) {
      const params = JSON.parse(localStorage.getItem('searchParams'));
      setValues({movie: params.value});
      setIsChecked(params.checkbox);
    }
  }

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  }
/* перенести */
  const handleFirstSearch = () => {
    if (isFirstSearch) {
      getMovies();
      setIsFirstSearch(false);
    }
  }

  const search = (movies) => {
    return movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.movie.toLowerCase()))
  }

  const filter = (searchResult) => {
    return searchResult.filter((movie) => movie.duration <= 40)
  }

  const searchMovies = () => {
    handleFirstSearch();
    const movies = JSON.parse(localStorage.getItem('movies'));
    if (isChecked) {
      const searchResult = search(movies);
      const filterResult = filter(searchResult);
      localStorage.setItem('searchedMovies', JSON.stringify(searchResult));
      handleSearchedMovies(filterResult);
    }
    if (!isChecked) {
      const searchResult = search(movies);
      localStorage.setItem('searchedMovies', JSON.stringify(searchResult));
      handleSearchedMovies(searchResult);
    }
    setSearchParams();
  }

  const setSearchParams = () => {
    localStorage.setItem('searchParams', JSON.stringify({ value: values.movie, checkbox: isChecked}));
  }

  const filterMovies = () => {
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
    <section className="search-form">
      <form
        className="search-form__form"
        name="search-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="search-form__search">
          <input
            className='search-form__input input'
            type='text'
            placeholder='Фильм'
            name='movie'
            id='movie'
            value={values.movie || ''}
            onChange={handleChange}
          />
          <button className='search-form__button button input'>Поиск</button>
        </div>
        <FilterCheckbox
          toggleCheckbox={toggleCheckbox}
          isChecked={isChecked}/>
      </form>
    </section>
  );
}

export default SearchForm;
