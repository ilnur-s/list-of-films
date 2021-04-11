/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const SortingForm = ({ sorting, sortBy }) => (
  <form className="sorting-form">
    <label htmlFor="sorting" className="sorting-form__label">Sort by:</label>
    <select value={sorting} name="sorting" id="sorting" className="sorting-form__select" onChange={sortBy}>
      <option value="popularity">Popularity</option>
      <option value="vote_average">Rating</option>
      <option value="primary_release_date">Release date</option>
    </select>
  </form>
);

SortingForm.propTypes = {
  sorting: PropTypes.string,
  sortBy: PropTypes.func,
};

SortingForm.defaultProps = {
  sorting: '',
  sortBy: PropTypes.func,
};

export default SortingForm;
