import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <hr className="about-project__line"></hr>
      <div className="about-project__text">
        <div className="about-project__column">
          <h3 className="about-project__subtitle">Дипломный проект включал 5&nbsp;этапов</h3>
          <p className="about-project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__subtitle">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
          <p className="about-project__description">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__timeline">
        <div className="about-project__item about-project__item_top-left"><span>1 неделя</span></div>
        <div className="about-project__item about-project__item_top-right"><span>4 недели</span></div>
        <div className="about-project__item about-project__item_bottom-left"><span lang="en">Back-end</span></div>
        <div className="about-project__item about-project__item_bottom-right"><span lang="en">Front-end</span></div>
      </div>
    </section>
  );
}

export default AboutProject;
