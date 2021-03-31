import React from 'react';
import { number, string } from 'prop-types';

const ListItem = ({
  id, title, description, imagePath,
}) => (
  <div className="list-item">
    <div className="list-item__id">{id}</div>
    <img src={`https://image.tmdb.org/t/p/w200${imagePath}`} alt={title} className="list-item__img" />
    <div className="list-item__text">
      <h1 className="list-item__title">{title}</h1>
      <p className="list-item__description">{description}</p>
    </div>
    <img src="" alt="" className="list-item__icon" />
  </div>
);

ListItem.propTypes = {
  id: number,
  title: string,
  description: string,
  imagePath: string,
};

ListItem.defaultProps = {
  id: number,
  title: string,
  description: string,
  imagePath: string,
};

export default ListItem;
