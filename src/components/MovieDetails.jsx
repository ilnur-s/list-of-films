/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../helpers/requests';
import { isEmpty } from '../helpers/utils';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(async () => {
    const data = await getMovieDetails(id);
    setMovieDetails(data);
  }, []);

  return (
    <div className="wrapper">
      { !isEmpty(movieDetails)
    && (
    <div className="movie-info">
      <img src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`} alt={movieDetails.title} className="movie-info__img" />
      <div className="movie-info__text">
        <h1 className="movie-info__title">{movieDetails.title}</h1>
        <p className="movie-info__description">{movieDetails.overview}</p>
        <h2 className="movie-info__subtitle">About the movie:</h2>
        <ul className="movie-info__about about-movie">
          <li className="about-movie__item">
            <h3 className="about-movie__item-title">Release date: </h3>
            <p className="about-movie__item-value">{movieDetails.release_date}</p>
          </li>
          <li className="about-movie__item">
            <h3 className="about-movie__item-title">Country: </h3>
            {movieDetails.production_countries.map((item, index) => (
              <p key={index} className="about-movie__item-value">{` ${item.name}`}</p>
            ))}
          </li>
          <li className="about-movie__item">
            <h3 className="about-movie__item-title">Genre: </h3>
            {movieDetails.genres.map((item, index) => (
              <p key={index} className="about-movie__item-value">{` ${item.name}`}</p>
            ))}
          </li>
          <li className="about-movie__item">
            <h3 className="about-movie__item-title">Runtime: </h3>
            <p className="about-movie__item-value">{`${movieDetails.runtime} min`}</p>
          </li>
          <li className="about-movie__item">
            <h3 className="about-movie__item-title">Vote average: </h3>
            <p className="about-movie__item-value">{movieDetails.vote_average}</p>
          </li>
          <li className="about-movie__item">
            <h3 className="about-movie__item-title">Vote count: </h3>
            <p className="about-movie__item-value">{movieDetails.vote_count}</p>
          </li>
        </ul>
      </div>
    </div>
    )}
    </div>
  );
};

export default MovieDetails;
