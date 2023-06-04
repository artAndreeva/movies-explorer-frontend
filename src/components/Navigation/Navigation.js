import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink to="/movies" className={({isActive}) => `navigation__link link ${isActive ? "navigation__link_active" : ""}`}>Фильмы</NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/saved-movies" className={({isActive}) => `navigation__link link ${isActive ? "navigation__link_active" : ""}`}>Сохранённые фильмы</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
