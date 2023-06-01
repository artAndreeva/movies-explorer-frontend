import React from 'react';
import './NavTab.css';

const NavTab = () => {
  return (
    <section className="navtab">
      <ul className="navtab__list">
        <li className="navtab__item">
          <a href="#about-project" className="navtab__link">О проекте</a>
        </li>
        <li className="navtab__item">
          <a href="#techs" className="navtab__link">Технологии</a>
        </li>
        <li className="navtab__item">
          <a href="#about-me" className="navtab__link">Студент</a>
        </li>
      </ul>
    </section>
  );
}

export default NavTab;
