import React from 'react';
import LogoImg from '../../images/header-logo.svg';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
  return (
    <>
      <Link to="/"><img src={LogoImg} alt="Логотип" className="logo"/></Link>
    </>
  );
}

export default Logo;
