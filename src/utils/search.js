export const search = (movies, values) => {
  return movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.movie.toLowerCase()))
}

export const filter = (searchResult) => {
  return searchResult.filter((movie) => movie.duration <= 40)
}
