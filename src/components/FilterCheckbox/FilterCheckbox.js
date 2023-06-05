import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <label className="filter-checkbox">
      <input type="checkbox" name="extra-option" id="short-films" value="short-films" className="filter-checkbox__item"/>
      <span className="filter-checkbox__pseudo-item"></span>
      <span className="filter-checkbox__label-text link">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
