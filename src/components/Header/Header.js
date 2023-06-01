import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Logo from '../../images/header-logo.svg';
import './Header.css';

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className={pathname === '/' ? "header header_blue" : "header"}>
      <div className="header__nav">
        <Link to="/"><img src={Logo} alt="Логотип" className="header__logo"/></Link>
        {pathname === '/' ? null : <Navigation/> }
      </div>
      {pathname === '/'
      ? <div className="header__auth">
          <Link to="/signup" className="header__link"><button className="header__register">Регистрация</button></Link>
          <Link to="/signin" className="header__link"><button className="header__login">Войти</button></Link>
        </div>
      : <Link to="/profile" className="header__link"><button className="header__profile">Аккаунт</button></Link>
      }
    </header>
  );
}

export default Header;
