import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import * as MainApi from '../../utils/MainApi';
import ProtectedRouteElement from '../../components/ProtectedRoute/ProtectedRoute';

import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState({});

  const { pathname } = useLocation();

  useEffect(() => {
    handleCheckToken();
  }, [])

  useEffect(() => {
    isLoggedIn &&
    Promise.all([MainApi.getUserInfo(), MainApi.getUserMovies()])
      .then(([userInfo, userMovies]) => {
        setCurrentUser(userInfo);
        setSavedMovies(userMovies);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [isLoggedIn])

  const handleCheckToken = () => {
    if(localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      MainApi.checkToken(jwt)
      .then((res) => {
        if(res) {
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  return (
    <div className="content">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>

          {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile'
          ? <Header isLoggedIn={isLoggedIn}/>
          : null}

          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/movies' element={
              <ProtectedRouteElement
                Component={Movies}
                isLoggedIn={isLoggedIn}/>
            }/>
            <Route path='/saved-movies' element={
              <ProtectedRouteElement
                Component={SavedMovies}
                isLoggedIn={isLoggedIn}/>
            }/>
            <Route path='/profile' element={
              <ProtectedRouteElement
                Component={Profile}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}/>
            }/>
            <Route path='/signin' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path='/signup' element={<Register/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>

          {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies'
          ? <Footer/>
          : null}

        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
