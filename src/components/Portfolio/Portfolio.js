import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a href="https://artandreeva.github.io/how-to-learn/" className="portfolio__link link" target="_blank" rel="noopener noreferrer">Статичный сайт</a>
          <div className="portfolio__icon"></div>
        </li>
        <li className="portfolio__item">
          <a href="https://artandreeva.github.io/russian-travel/" className="portfolio__link link" target="_blank" rel="noopener noreferrer">Адаптивный сайт</a>
          <div className="portfolio__icon"></div>
        </li>
        <li className="portfolio__item">
          <a href="https://artandreeva.github.io/mesto-react/" className="portfolio__link link" target="_blank" rel="noopener noreferrer">Одностраничное приложение</a>
          <div className="portfolio__icon"></div>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
