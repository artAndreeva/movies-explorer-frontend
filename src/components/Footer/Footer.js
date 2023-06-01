import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х <span lang="en">BeatFilm.</span></p>
      <hr className="footer__line"></hr>
      <div className="footer__info">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__list">
          <li className="footer__item"><a href="https://practicum.yandex.ru/" className="footer__link" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a></li>
          <li className="footer__item" lang="en"><a href="https://github.com/" className="footer__link" target="_blank" rel="noopener noreferrer">Github</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
