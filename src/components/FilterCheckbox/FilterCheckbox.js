import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <label className="checkbox">
      <input type="checkbox" name="extra-option" id="short-films" value="short-films" className="checkbox__item"/>
      <span class="checkbox__pseudo-item"></span>
      <span class="checkbox__label-text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
