import React from 'react';
import LogoImg from '../../images/header-logo.svg';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
  return (
    <>
      <Link to="/" className="logo__link"><img src={LogoImg} alt="Логотип" className="logo__img"/></Link>
    </>
  );
}

export default Logo;
