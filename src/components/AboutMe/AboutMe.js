import React from 'react';
import Photo from '../../images/about-me-photo.jpg'
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <hr className="about-me__line"></hr>
      <div className="about-me__info">
        <div className="about-me__text">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__resume">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ.
          У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
          С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке,
          начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.</p>
          <a href="https://github.com/artAndreeva" className="about-me__link" target="_blank" rel="noopener noreferrer" lang="en">Github</a>
        </div>
        <div className="about-me__photo">
          <img src={Photo} alt="Фотография студента" className="about-me__photo-item"></img>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
