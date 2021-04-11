/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

const FilterForm = ({ genres, filterByGenre }) => (
  <form className="filters-form">
    <h1 className="filters-form__name">Genres:</h1>
    {genres.map((genre, index) => (
      <React.Fragment key={index}>
        <input id={index} value={genre.id} className="filters-form__input" type="checkbox" checked={genre.checked} onChange={filterByGenre} />
        <label htmlFor={index} className="filters-form__label">{genre.name}</label>
      </React.Fragment>
    ))}
  </form>
);

FilterForm.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object),
  filterByGenre: PropTypes.func,
};

FilterForm.defaultProps = {
  genres: [],
  filterByGenre: PropTypes.func,
};

export default FilterForm;
