import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import * as MoviesApi from '../../utils/MoviesApi';
import ProtectedRouteElement from '../../components/ProtectedRoute/ProtectedRoute';
import AuthRouteElement from '../AuthRoute/AuthRoute';

import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState({});
  const [apiStatusCode, setApiStatusCode] = useState(null);
  const [isAuthProcess, setIsAuthProcess] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

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
      .finally(() => {
        setIsTokenChecked(true);
      })
    } else {
      setIsTokenChecked(true);
    }
  }

  const handleRegister = (values) => {
    setIsAuthProcess(true);
    MainApi.register(values.name, values.email, values.password)
      .then (() => {
        handleLogin(values);
      })
      .catch((code) => {
        setApiStatusCode(code);
      })
      .finally(() => {
        setIsAuthProcess(false);
      })
  }

  const handleLogin = (values) => {
    setIsAuthProcess(true);
    MainApi.authorize(values.email, values.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          navigate('/movies', {replace: true});
        }
      })
      .catch((code) => {
        setApiStatusCode(code);
      })
      .finally(() => {
        setIsAuthProcess(false);
      })
  }

  const handleUpdateUser = (values) => {
    MainApi.setUserInfo(values.name, values.email)
    .then((res) => {
      setCurrentUser(res);
      setApiStatusCode(200);
    })
    .catch((code) => {
      setApiStatusCode(code);
    })
  }

  const getMovies = () => {
    MoviesApi.getMovies()
    .then((res) => {
      localStorage.setItem('movies', res);
    })
    .catch((code) => {
      setApiStatusCode(code);
    })
  }

  return (
    <div className="content">
      <div className="page">
        {isTokenChecked && (
          <CurrentUserContext.Provider value={currentUser}>

            {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile'
            ? <Header isLoggedIn={isLoggedIn}/>
            : null}

            <Routes>
            <Route path='/' element={<Main/>}/>
              <Route path='/movies' element={
                <ProtectedRouteElement
                  Component={Movies}
                  isLoggedIn={isLoggedIn}
                />
              }/>
              <Route path='/saved-movies' element={
                <ProtectedRouteElement
                  Component={SavedMovies}
                  isLoggedIn={isLoggedIn}
                  />
              }/>
              <Route path='/profile' element={
                <ProtectedRouteElement
                  Component={Profile}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  handleUpdateUser={handleUpdateUser}
                  apiStatusCode={apiStatusCode}
                  />
              }/>
              <Route path='/signin' element={
                <AuthRouteElement
                  Component={Login}
                  isLoggedIn={isLoggedIn}
                  handleLogin={handleLogin}
                  apiStatusCode={apiStatusCode}
                  isAuthProcess={isAuthProcess}
                />
              }/>
              <Route path='/signup' element={
                <AuthRouteElement
                  Component={Register}
                  isLoggedIn={isLoggedIn}
                  handleLogin={handleRegister}
                  apiStatusCode={apiStatusCode}
                  isAuthProcess={isAuthProcess}
                />
              }/>
              <Route path='*' element={<NotFound/>}/>
            </Routes>

            {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies'
            ? <Footer/>
            : null}

          </CurrentUserContext.Provider>
        )}
      </div>
    </div>
  );
}

export default App;
