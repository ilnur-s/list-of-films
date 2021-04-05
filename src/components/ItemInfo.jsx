import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieInfo } from '../helpers/requests';

const ItemInfo = () => {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});

  useEffect(async () => {
    const data = await getMovieInfo(id);
    setMovieInfo(data);
  }, []);

  return (
    <div className="film-info">
      <img src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`} alt={movieInfo.title} className="list-item__img" />
      <div className="list-item__text">
        <h1 className="list-item__title">{movieInfo.title}</h1>
        <p className="list-item__description">{movieInfo.overview}</p>
      </div>
    </div>
  );
};

export default ItemInfo;
