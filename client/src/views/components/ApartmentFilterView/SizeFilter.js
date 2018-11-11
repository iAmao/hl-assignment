import React from 'react';
import PropTypes from 'prop-types';

import RangeFilter from './RangeFilter';


const SizeFilter = ({ onChange, values, ...props }) => {
  return <RangeFilter
    {...props}
    {...values}
    name="size"
    label="Size (m²)"
    onChange={(range, value) => onChange(`size-${range}`, value)}
  />
};

SizeFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputClassName: PropTypes.string,
  values: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
};

export default SizeFilter;
