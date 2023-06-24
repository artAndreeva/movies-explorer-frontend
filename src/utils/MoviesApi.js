const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const request = (url, options) => {
  return fetch(url, options)
  .then(handleResponse)
}

export const getMovies = () => {
  return request(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
