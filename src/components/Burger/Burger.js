import React from 'react';
import Navigation from '../Navigation/Navigation';
import { useState, useEffect } from 'react';
import './Burger.css';

const Burger = ({ toggleBurger, isBurger }) => {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!isOpen);
  }, [])

  const closeBurger = () => {
    setIsOpen(!isOpen);
    setTimeout(toggleBurger, 300);
  };

  return (
    <>
      <div className={`burger__container ${isOpen ? "burger__container_visible" : ""}`}>
        <div className="burger__content">
          <button className="burger__close-button button" onClick={closeBurger}></button>
          <Navigation isBurger={isBurger} closeBurger={closeBurger}/>
        </div>
      </div>
      <div className={`burger ${isOpen ? "burger_visible" : ""}`}></div>
    </>
  );
}

export default Burger;
