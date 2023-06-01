import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

const App = () => {
  const { pathname } = useLocation();
  return (
    <div className="content">
      <div className="page">

      {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ? <Header/> : null}

        <Routes>

          <Route path='/' element={
            <Main/>
          }/>

          <Route path='/movies' element={
            <Movies/>
          }/>

          <Route path='/saved-movies' element={
            <SavedMovies/>
          }/>

          <Route path='/profile' element={
            <Profile/>
          }/>

          <Route path='/signin' element={
            <Login/>
          }/>

          <Route path='/signup' element={
            <Register/>
          }/>

          <Route path='*' element={
            <NotFound/>
          }/>

        </Routes>

        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer/> : null}

      </div>
    </div>
  );
}

export default App;
