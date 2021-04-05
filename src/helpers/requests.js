/* eslint-disable no-alert */
const getMovies = async (pageNumber) => {
  let movies;
  try {
    const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=4237669ebd35e8010beee2f55fd45546&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`;
    const rawDataMovies = await fetch(endpoint);

    if (rawDataMovies.ok) {
      movies = await rawDataMovies.json();
    } else {
      throw new Error('Ошибка получения данных, попробуйте позднее');
    }
  } catch (error) {
    alert(error.message);
  }
  return movies;
};

const getGenres = async () => {
  let genres;
  try {
    const endpoint = 'https://api.themoviedb.org/3/genre/movie/list?api_key=4237669ebd35e8010beee2f55fd45546&language=en-US';
    const rawDataGenres = await fetch(endpoint);

    if (rawDataGenres.ok) {
      genres = await rawDataGenres.json();
    } else {
      throw new Error('Ошибка получения данных, попробуйте позднее');
    }
  } catch (error) {
    alert(error.message);
  }
  return genres;
};

const getMovieInfo = async (id) => {
  let movieInfo;
  try {
    const endpoint = `https://api.themoviedb.org/3/movie/${id}?api_key=4237669ebd35e8010beee2f55fd45546&language=en-US`;
    const rawDataMovieInfo = await fetch(endpoint);

    if (rawDataMovieInfo.ok) {
      movieInfo = await rawDataMovieInfo.json();
    } else {
      throw new Error('Ошибка получения данных, попробуйте позднее');
    }
  } catch (error) {
    alert(error.message);
  }
  return movieInfo;
};

export { getMovies, getGenres, getMovieInfo };
