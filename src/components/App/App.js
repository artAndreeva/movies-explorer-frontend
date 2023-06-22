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
import {
  SERVER_ERROR_MESSAGE,
  DELETE_MOVIE_ERROR_MESSAGE,
  ADD_MOVIE_ERROR_MESSAGE,
  TOKEN_ERROR_MESSAGE } from '../../constants/error-texts';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [apiStatus, setApiStatus] = useState(null);
  const [apiMessage, setApiMessage] = useState('');
  const [isFormInProcess, setIsFormInProcess] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    handleCheckToken();
  }, [])

  const getUserInfoAndMovies = async () => {
    try {
      const [userInfo, userMovies] = await Promise.all([MainApi.getUserInfo(), MainApi.getUserMovies()]);
      setCurrentUser(userInfo);
      setSavedMovies(userMovies.reverse());
    } catch {
      setIsPopupOpen(true);
      setApiMessage(SERVER_ERROR_MESSAGE);
    }
  }

  useEffect(() => {
    isLoggedIn &&
    getUserInfoAndMovies();
  }, [isLoggedIn])

  const handleCheckToken = async () => {
    try {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        const res = await MainApi.checkToken(jwt);
        if (res) {
          setIsLoggedIn(true);
        }
      }
    } catch {
      setIsPopupOpen(true);
      setApiMessage(TOKEN_ERROR_MESSAGE);
    } finally {
      setTimeout(() => {
        setIsTokenChecked(true);
      }, 500)
    }
  }

  const handleRegister = async (values) => {
    setIsFormInProcess(true);
    try {
      await MainApi.register(values.name, values.email, values.password);
      handleLogin(values);
    } catch (err) {
      setApiStatus(err.status);
    } finally {
        setTimeout(() => {
          setIsFormInProcess(false);
      }, 500)
    }
  }

  const handleLogin = async (values) => {
    setIsFormInProcess(true);
    try {
      const res = await MainApi.authorize(values.email, values.password);
      localStorage.setItem('jwt', res.token);
      setIsLoggedIn(true);
      navigate('/movies', {replace: true});
    } catch (err) {
      setApiStatus(err.status);
    } finally {
        setTimeout(() => {
          setIsFormInProcess(false);
      }, 500)
    }
  }

  const handleLogout = () => {
    navigate('/', { replace: true });
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('searchedMovies');
    localStorage.removeItem('searchParams');
    setApiStatus(null);
    setApiMessage('');
    setIsLoggedIn(false);
  }

  const handleUpdateUser = async (values) => {
    setIsFormInProcess(true);
    try {
      const res = await MainApi.setUserInfo(values.name, values.email);
      setCurrentUser(res);
      setApiStatus(200);
    } catch (err) {
      setApiStatus(err.status);
    } finally {
      setTimeout(() => {
        setIsFormInProcess(false);
      }, 500)
    }
  }

  const getMovies = async () => {
    setIsLoaded(true);
    try {
      const res = await MoviesApi.getMovies()
      localStorage.setItem('movies', JSON.stringify(res));
    } catch {
      setIsPopupOpen(true);
      setApiMessage(SERVER_ERROR_MESSAGE);
    } finally {
      setTimeout(() => {
        setIsLoaded(false);
      }, 500)
    }
  }

  const addMovie = async (movie) => {
    try {
      const newMovie = await MainApi.addMovie(movie);
      setSavedMovies([newMovie, ...savedMovies]);
    } catch {
      setIsPopupOpen(true);
      setApiMessage(ADD_MOVIE_ERROR_MESSAGE);
    }
  }

  const deleteSavedMovie = (id) => {
    const savedMovie = savedMovies.find((movie) => movie.movieId === id)
    deleteMovie(savedMovie._id);
  }

  const deleteMovie = async (id) => {
    try {
      await MainApi.deleteMovie(id);
      setSavedMovies((state) => state.filter((currentMovie) => currentMovie._id !== id));
    } catch {
      setIsPopupOpen(true);
      setApiMessage(DELETE_MOVIE_ERROR_MESSAGE);
    }
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
                  setIsPopupOpen={setApiMessage}
                  setApiMessage={setApiMessage}
                  setIsLoaded={setIsLoaded}
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
                  isFormInProcess={isFormInProcess}
                  />
              }/>
              <Route path='/signin' element={
                <AuthRouteElement
                  Component={Login}
                  isLoggedIn={isLoggedIn}
                  handleLogin={handleLogin}
                  apiStatus={apiStatus}
                  isFormInProcess={isFormInProcess}
                />
              }/>
              <Route path='/signup' element={
                <AuthRouteElement
                  Component={Register}
                  isLoggedIn={isLoggedIn}
                  handleRegister={handleRegister}
                  apiStatus={apiStatus}
                  isFormInProcess={isFormInProcess}
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
              apiMessage={apiMessage}/>

          </CurrentUserContext.Provider>
        )}
      </div>
    </div>
  );
}

export default App;
