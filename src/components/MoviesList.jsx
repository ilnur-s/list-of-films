import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MoviesList = ({ movies, addOrDeleteToFavourites }) => (
  movies.map((movie, index) => (
    <div key={movie.id} className="list-item">
      <div className="list-item__id">{index + 1}</div>
      <Link to={`/movie/${movie.id}`} className="list-item__link">
        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="list-item__img" />
        <div className="list-item__text">
          <h1 className="list-item__title">{movie.title}</h1>
          <p className="list-item__description">{movie.overview}</p>
        </div>
      </Link>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className={movie.isFavorite ? 'list-item__icon-red' : 'list-item__icon'} viewBox="0 0 16 16" onClick={() => addOrDeleteToFavourites(movie)}>
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
      </svg>
    </div>
  )));

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};

MoviesList.defaultProps = {
  movies: [],
};

export default MoviesList;
