import React from 'react';
import PropTypes from 'prop-types';

import RangeFilter from './RangeFilter';


const BathroomFilter = ({ onChange, values, ...props }) => {
  return <RangeFilter
    {...props}
    {...values}
    label="Bathrooms"
    name="details-bathrooms"
    onChange={(range, value) => onChange(`details-bathrooms-${range}`, value)}
  />
};

BathroomFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputClassName: PropTypes.string,
  values: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
};

export default BathroomFilter;
