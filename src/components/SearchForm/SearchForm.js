import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

const SearchForm = ({getSearchParams, searchMovies, filterMovies, updateCheckboxParams }) => {

  const { values, handleChange, setValues } = useFormAndValidation({});
  const [isChecked, setIsChecked] = useState(false);
  const [isMovieError, setIsMovieError] = useState(false);
  const [isInputEnpty, setIsInputEmpty] = useState(false);
  const { pathname } = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!values.movie) {
      setIsInputEmpty(true);
      setIsMovieError(true);
    } else {
      searchMovies(isChecked, values);
    }
  }

  useEffect(() => {
    if(values.movie) {
      setIsMovieError(false);
    }
    if (isInputEnpty) {
      setIsMovieError(true);
      setIsInputEmpty(false)
    }
  }, [values, isInputEnpty])


  useEffect(() => {
    filterMovies(isChecked);
    if(pathname === '/movies' && values.movie) {
      updateCheckboxParams(isChecked);
    }
  }, [isChecked])

  useEffect(() => {
    if(pathname === '/movies') {
      getSearchParams(setValues, setIsChecked);
    }
  }, [])

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  }

  return (
    <section className="search-form">
      <form
        className="search-form__form form"
        name="search-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="search-form__search">
          <input
            className='search-form__input input'
            type='text'
            placeholder={!isMovieError ? 'Фильм' : undefined}
            name='movie'
            id='movie'
            value={values.movie || ''}
            onChange={handleChange}
            required
          />
          <button className='search-form__button button'>Поиск</button>
          {isMovieError && <span className='search-form__input-error'>Нужно ввести ключевое слово</span>}
        </div>
        <FilterCheckbox
          toggleCheckbox={toggleCheckbox}
          isChecked={isChecked}/>
      </form>
    </section>
  );
}

export default SearchForm;
