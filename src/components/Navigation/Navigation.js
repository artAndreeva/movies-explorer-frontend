import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ isBurger, closeBurger }) => {

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className={`navigation__item ${!isBurger ? "navigation__item_invisible" : ""}`}>
          <NavLink
            to="/"
            className={({isActive}) => `navigation__link link ${isActive ? "navigation__link_active" : ""}`}
            onClick={closeBurger}>
              Главная
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/movies"
            className={({isActive}) => `navigation__link link ${isActive ? "navigation__link_active" : ""}`}
            onClick={closeBurger}>
              Фильмы
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/saved-movies"
            className={({isActive}) => `navigation__link link ${isActive ? "navigation__link_active" : ""}`}
            onClick={closeBurger}>
              Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <Link
        to="/profile"
        className="navigation__profile-link link"
        onClick={closeBurger}>
        <span className="navigation__profile">Аккаунт</span>
      </Link>
    </nav>
  );
}

export default Navigation;
