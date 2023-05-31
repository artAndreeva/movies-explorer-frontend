import React from 'react';
import './NavTab.css';

const NavTab = () => {
  return (
    <section className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <a href="#about-project" className="navigation__link">О проекте</a>
        </li>
        <li className="navigation__item">
          <a href="#techs" className="navigation__link">Технологии</a>
        </li>
        <li className="navigation__item">
          <a href="#about-me" className="navigation__link">Студент</a>
        </li>
      </ul>
    </section>
  );
}

export default NavTab;
