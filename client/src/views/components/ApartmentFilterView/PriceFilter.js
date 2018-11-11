import React from 'react';
import PropTypes from 'prop-types';

import RangeFilter from './RangeFilter';

const PriceFilter = ({ onChange, values, ...props }) => {
  return <RangeFilter
    {...props}
    {...values}
    name="price"
    label="Price (€)"
    onChange={(range, value) => onChange(`price-${range}`, value)}
  />
};

PriceFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputClassName: PropTypes.string,
  values: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
};

export default PriceFilter;
