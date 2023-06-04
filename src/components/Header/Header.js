import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import './Header.css';

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className={pathname === '/' ? "header header_blue" : "header"}>
      <div className="header__nav">
        <Logo/>
        {pathname === '/' ? null : <Navigation/> }
      </div>
      {pathname === '/'
      ? <div className="header__auth">
          <Link to="/signup" className="header__link link"><span className="header__register">Регистрация</span></Link>
          <Link to="/signin" className="header__link button"><span className="header__login">Войти</span></Link>
        </div>
      : <Link to="/profile" className="header__link"><span className="header__profile button">Аккаунт</span></Link>
      }
    </header>
  );
}

export default Header;
