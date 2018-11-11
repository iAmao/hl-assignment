import React from 'react';
import PropTypes from 'prop-types';

import RangeFilter from './RangeFilter';

const BedroomFilter = ({ onChange, values, ...props }) => {
  return <RangeFilter
    {...props}
    {...values}
    label="Bedrooms"
    name="details-bedrooms"
    onChange={(range, value) => onChange(`details-bedrooms-${range}`, value)}
  />
};

BedroomFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputClassName: PropTypes.string,
  values: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
};

export default BedroomFilter;
