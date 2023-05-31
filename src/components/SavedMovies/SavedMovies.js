import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

const SavedMovies = () => {
  return (
    <main className="">
      <MoviesCardList/>
      <MoviesCard/>
    </main>
  );
}

export default SavedMovies;
