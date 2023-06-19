import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
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
import Popup from '../Popup/Popup';

import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [apiStatus, setApiStatus] = useState(null);
  const [isAuthProcess, setIsAuthProcess] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
        .catch((err) => {
          setIsPopupOpen(true);
          setApiStatus(err.message);
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
      .catch((err) => {
        setIsPopupOpen(true);
        setApiStatus(err.message);
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
      .catch((err) => {
        setApiStatus(err);
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
      .catch((err) => {
        setApiStatus(err);
      })
      .finally(() => {
        setIsAuthProcess(false);
      })
  }

  const handleLogout = () => {
    navigate('/', { replace: true });
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('searchedMovies');
    localStorage.removeItem('searchParams');
    setIsLoggedIn(false);
  }


  const handleUpdateUser = (values) => {
    MainApi.setUserInfo(values.name, values.email)
    .then((res) => {
      setCurrentUser(res);
      setApiStatus(200);
    })
    .catch((err) => {
      setApiStatus(err);
    })
  }

  const getMovies = () => {
    MoviesApi.getMovies()
    .then((res) => {
      localStorage.setItem('movies', JSON.stringify(res));
    })
    .catch((err) => {
      setIsPopupOpen(true);
      setApiStatus(err.message);
    })
  }

  const addMovie = (movie) => {
    MainApi.addMovie(movie)
    .then((newMovie) => {
      setSavedMovies([newMovie, ...savedMovies])
    })
    .catch((err) => {
      setIsPopupOpen(true);
      setApiStatus(err.message);
    })
  }

  const deleteSavedMovie = (id) => {
    const savedMovie = savedMovies.find((movie) => movie.movieId === id)
    deleteMovie(savedMovie._id);
  }

  const deleteMovie = (id) => {
    MainApi.deleteMovie(id)
    .then(() => {
      setSavedMovies((state) => state.filter((currentMovie) => currentMovie._id !== id));
    })
    .catch((err) => {
      setIsPopupOpen(true);
      setApiStatus(err.message);
    })
  }

  const closePopup = () => {
    setIsPopupOpen(false);
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
                  isLoaded={isLoaded}
                  getMovies={getMovies}
                  addMovie={addMovie}
                  deleteSavedMovie={deleteSavedMovie}
                  savedMovies={savedMovies}
                />
              }/>
              <Route path='/saved-movies' element={
                <ProtectedRouteElement
                  Component={SavedMovies}
                  isLoggedIn={isLoggedIn}
                  isLoaded={isLoaded}
                  deleteMovie={deleteMovie}
                  savedMovies={savedMovies}
                  />
              }/>
              <Route path='/profile' element={
                <ProtectedRouteElement
                  Component={Profile}
                  isLoggedIn={isLoggedIn}
                  handleUpdateUser={handleUpdateUser}
                  apiStatus={apiStatus}
                  handleLogout={handleLogout}
                  />
              }/>
              <Route path='/signin' element={
                <AuthRouteElement
                  Component={Login}
                  isLoggedIn={isLoggedIn}
                  handleLogin={handleLogin}
                  apiStatus={apiStatus}
                  isAuthProcess={isAuthProcess}
                />
              }/>
              <Route path='/signup' element={
                <AuthRouteElement
                  Component={Register}
                  isLoggedIn={isLoggedIn}
                  handleLogin={handleRegister}
                  apiStatus={apiStatus}
                  isAuthProcess={isAuthProcess}
                />
              }/>
              <Route path='*' element={<NotFound/>}/>
            </Routes>

            {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies'
            ? <Footer/>
            : null}

            <Popup
              isPopupOpen={isPopupOpen}
              closePopup={closePopup}
              apiStatus={apiStatus}/>

          </CurrentUserContext.Provider>
        )}
      </div>
    </div>
  );
}

export default App;
