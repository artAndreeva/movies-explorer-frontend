import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

const SearchForm = ({getSearchParams, searchMovies, filterMovies, updateCheckboxParams }) => {

  const { values, handleChange, setValues } = useFormAndValidation({});
  const [isChecked, setIsChecked] = useState(false);
  const { pathname } = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(isChecked, values);
  }

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
