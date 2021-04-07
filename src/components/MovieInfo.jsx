import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieInfo } from '../helpers/requests';
import { isEmpty } from '../helpers/utils';

const MovieInfo = () => {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});

  useEffect(async () => {
    const data = await getMovieInfo(id);
    setMovieInfo(data);
  }, []);

  return (
    <>
      { !isEmpty(movieInfo)
    && (
    <div className="movie-info">
      <img src={`https://image.tmdb.org/t/p/w200${movieInfo.poster_path}`} alt={movieInfo.title} className="movie-info__img" />
      <div className="movie-info__text">
        <h1 className="movie-info__title">{movieInfo.title}</h1>
        <p className="movie-info__description">{movieInfo.overview}</p>
        <h2 className="movie-info__subtitle">About the movie:</h2>
        <ul className="movie-info__about about-movie">
          <li className="about-movie__item">
            <h3 className="about-movie__item-title">Release date: </h3>
            <p className="about-movie__item-value">{movieInfo.release_date}</p>
          </li>
          <li className="about-movie__item">
            <h3 className="about-movie__item-title">Country: </h3>
            {movieInfo.production_countries.map((item) => (
              <p className="about-movie__item-value">{item.name}</p>
            ))}
          </li>
          <li className="about-movie__item">
            <h3 className="about-movie__item-title">Genre: </h3>
            {movieInfo.genres.map((item) => (
              <p className="about-movie__item-value">{` ${item.name}`}</p>
            ))}
          </li>
          <li className="about-movie__item">
            <h3 className="about-movie__item-title">Runtime: </h3>
            <p className="about-movie__item-value">{`${movieInfo.runtime} min`}</p>
          </li>
          <li className="about-movie__item">
            <h3 className="about-movie__item-title">Vote average: </h3>
            <p className="about-movie__item-value">{movieInfo.vote_average}</p>
          </li>
          <li className="about-movie__item">
            <h3 className="about-movie__item-title">Vote count: </h3>
            <p className="about-movie__item-value">{movieInfo.vote_count}</p>
          </li>
        </ul>
      </div>
    </div>
    )}
    </>
  );
};

export default MovieInfo;
