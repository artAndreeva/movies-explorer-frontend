import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
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
        />
        <button className='search-form__button button'>Поиск</button>
        </div>
        <FilterCheckbox/>
      </form>
    </section>
  );
}

export default SearchForm;
