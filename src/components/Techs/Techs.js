import React from 'react';
import './Techs.css';

const Techs = () => {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <hr className="techs__line"></hr>
      <div className="techs__text">
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__description">На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.</p>
      </div>
      <div className="techs__container">
        <ul className="techs__list">
          <li className="techs__item" lang="en">HTML</li>
          <li className="techs__item" lang="en">CSS</li>
          <li className="techs__item" lang="en">JS</li>
          <li className="techs__item" lang="en">React</li>
          <li className="techs__item" lang="en">Git</li>
          <li className="techs__item" lang="en">Express.js</li>
          <li className="techs__item" lang="en">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
