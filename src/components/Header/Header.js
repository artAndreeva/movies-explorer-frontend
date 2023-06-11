import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import './Header.css';
import Burger from '../Burger/Burger';

const Header = () => {

  const [isBurger, setIsBurger] = useState(false);
  const { pathname } = useLocation();

  const toggleBurger = () => {
    setIsBurger(!isBurger);
  }

  return (
    <header className={pathname === '/' ? "header header_blue" : "header"}>
      <Logo/>
      <div className="header__menu">
        {pathname === '/'
        ? <div className="header__auth">
            <Link to="/signup" className="header__link link"><span className="header__register">Регистрация</span></Link>
            <Link to="/signin" className="header__link button"><span className="header__login">Войти</span></Link>
          </div>
        : <div className="header__nav">
            <div className="header__full-menu">
              <Navigation/>
            </div>
            <button className="header__burger-button button" onClick={toggleBurger}></button>
            {isBurger && <Burger toggleBurger={toggleBurger} isBurger={isBurger}/>}
          </div>
        }
      </div>
    </header>
  );
}

export default Header;
