import React from 'react';
import PropTypes from 'prop-types';

import './style.css';


const LocationTile = ({ onClick, location, selected = false }) => {
  const classNames = `location_tile ${selected ? 'location_tile__active':''}`;
  return (
    <div className="col-sm-4" onClick={() => onClick(location)}>
      <div className={`${classNames} col-sm-12`}>
        <h3>{location.title}</h3>
      </div>
    </div>
  );
};

LocationTile.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  location: PropTypes.shape({
    title: PropTypes.string,
    _id: PropTypes.string.isRequired
  })
};

export default LocationTile;
