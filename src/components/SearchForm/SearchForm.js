import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import './SearchForm.css';
import { useEffect, useState } from 'react';


const SearchForm = ({ getMovies, handleSearchedMovies }) => {

  const { values, handleChange, setValues } = useFormAndValidation({});
  const [isChecked, setIsChecked] = useState(false);
  const [isFirstSearch, setIsFirstSearch] = useState(true);

const handleSubmit = (e) => {
  e.preventDefault();
  handleFirstSearch();
  setIsFirstSearch(false);
  searchMovies();
}

useEffect(() => {
  handleStartParams();
}, [])

const handleStartParams = () => {
  const params = JSON.parse(localStorage.getItem('searchParams'));
  setValues({movie: params.value});
  setIsChecked(params.checkbox);
}

const toggleCheckbox = () => {
  setIsChecked(!isChecked);
}

useEffect(() => {
  if (values.movie) {
    searchMovies();
  }
}, [isChecked])

const handleFirstSearch = () => {
  if (isFirstSearch) {
    getMovies();
  }
}

const searchMovies = () => {
  const movies = JSON.parse(localStorage.getItem('movies'));
  let searchResult;

  if (isChecked) {
   searchResult = movies
     .filter((movie) => movie.nameRU.toLowerCase().includes(values.movie.toLowerCase()))
     .filter((movie) => movie.duration <= 40)
  }

  if (!isChecked) {
   searchResult = movies
     .filter((movie) => movie.nameRU.toLowerCase().includes(values.movie.toLowerCase()))
  }
  localStorage.setItem('searchedMovies', JSON.stringify(searchResult));
  handleSearchedMovies();
  handleSearchParams();
}

const handleSearchParams = () => {
  const searchParams = {
    value: values.movie,
    checkbox: isChecked
  }
  localStorage.setItem('searchParams', JSON.stringify(searchParams));
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
