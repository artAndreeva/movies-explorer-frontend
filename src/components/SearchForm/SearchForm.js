import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import FormField from '../FormField/FormField';
import FormButton from '../FormButton/FormButton';
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
          <FormField
            inputClass={'search-form__input'}
            inputType={'text'}
            inputPlaceholder={'Фильм'}
          />
          <FormButton
            buttonClass={'search-form__button'}
            buttonText={'Поиск'}
          />
        </div>
        <FilterCheckbox/>
      </form>
    </section>
  );
}

export default SearchForm;
