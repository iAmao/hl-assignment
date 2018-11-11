import React from 'react';
import PropTypes from 'prop-types';

import RangeFilter from './RangeFilter';

const RoomFilter = ({ onChange, values, ...props }) => {
  return <RangeFilter
    {...props}
    {...values}
    label="Rooms"
    name="details-rooms"
    onChange={(range, value) => onChange(`details-rooms-${range}`, value)}
  />
};

RoomFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputClassName: PropTypes.string,
  values: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
};

export default RoomFilter;
