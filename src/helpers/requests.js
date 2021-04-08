/* eslint-disable no-alert */
const getMoviesData = async (pageNumber) => {
  let moviesData;
  try {
    const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=4237669ebd35e8010beee2f55fd45546&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`;
    const rawMoviesData = await fetch(endpoint);

    if (rawMoviesData.ok) {
      moviesData = await rawMoviesData.json();
    } else {
      throw new Error('Ошибка получения данных, попробуйте обновить страницу');
    }
  } catch (error) {
    alert(error.message);
  }
  return moviesData;
};

const getGenres = async () => {
  let genres;
  try {
    const endpoint = 'https://api.themoviedb.org/3/genre/movie/list?api_key=4237669ebd35e8010beee2f55fd45546&language=en-US';
    const rawDataGenres = await fetch(endpoint);

    if (rawDataGenres.ok) {
      genres = await rawDataGenres.json();
    } else {
      throw new Error('Ошибка получения данных, попробуйте обновить страницу');
    }
  } catch (error) {
    alert(error.message);
  }
  return genres;
};

const getMovieDetails = async (id) => {
  let movieDetails;
  try {
    const endpoint = `https://api.themoviedb.org/3/movie/${id}?api_key=4237669ebd35e8010beee2f55fd45546&language=en-US`;
    const rawMovieDetailsData = await fetch(endpoint);

    if (rawMovieDetailsData.ok) {
      movieDetails = await rawMovieDetailsData.json();
    } else {
      throw new Error('Ошибка получения данных, попробуйте обновить страницу');
    }
  } catch (error) {
    alert(error.message);
  }
  return movieDetails;
};

export { getMoviesData, getGenres, getMovieDetails };
