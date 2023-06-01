import React from 'react';
import Photo from '../../images/about-me-photo.jpg'
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <hr className="about-me__line"></hr>
      <div div className="about-me__info">
        <div className="about-me__text">
          <h3 className="about-me__name">Светлана</h3>
          <p className="about-me__resume">Фронтенд-разработчик, 39 лет</p>
          <p className="about-me__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
  и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
  С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
  начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a href="https://github.com/artAndreeva" className="about-me__link" target="_blank" rel="noopener noreferrer" lang="en">Github</a>
        </div>
        <div className="about-me__photo">
          <img src={Photo} alt="Светлана" className="about-me__photo-item"></img>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
