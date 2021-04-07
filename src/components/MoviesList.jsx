import React from 'react';
import { Link } from 'react-router-dom';
import { number, string } from 'prop-types';
import heart from '../img/heart.svg';

const ListItem = ({
  id, title, description, imagePath, itemNumber,
}) => (
  <div className="list-item">
    <div className="list-item__id">{itemNumber}</div>
    <Link to={`/movie/${id}`} className="list-item__link">
      <img src={`https://image.tmdb.org/t/p/w200${imagePath}`} alt={title} className="list-item__img" />
      <div className="list-item__text">
        <h1 className="list-item__title">{title}</h1>
        <p className="list-item__description">{description}</p>
      </div>
    </Link>
    <img src={heart} alt="favorites" className="list-item__icon" />
  </div>
);

ListItem.propTypes = {
  id: number,
  title: string,
  description: string,
  imagePath: string,
  itemNumber: number,
};

ListItem.defaultProps = {
  id: number,
  title: string,
  description: string,
  imagePath: string,
  itemNumber: number,
};

export default ListItem;
