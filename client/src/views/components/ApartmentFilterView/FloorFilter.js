import React from 'react';
import PropTypes from 'prop-types';

import RangeFilter from './RangeFilter';


const FloorFilter = ({ onChange, values, ...props }) => {
  return <RangeFilter
    {...props}
    {...values}
    label="Floors"
    name="details-floor"
    onChange={(range, value) => onChange(`details-floor-${range}`, value)}
  />
};

FloorFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputClassName: PropTypes.string,
  values: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
};

export default FloorFilter;
