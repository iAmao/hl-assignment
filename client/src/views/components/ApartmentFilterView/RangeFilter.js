import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';

const handleChange = ({ target: { value } }, callback) => {
  if (value === '') {
    return callback(0);
  }
  return callback(value);
};


const RangeFilter = ({
  min = 0, max = 0, name, label, onChange, inputClassName
}) => {
  return (
    <div>
      <p>{label}:</p>
      <div>
        <Input
          value={min}
          type="number"
          placeholder="Min"
          name={`${name}-min`}
          className={inputClassName || ''}
          onChange={e => handleChange(e, value => onChange('min', value))}
        />
        &nbsp; - &nbsp;
        <Input
          value={max}
          type="number"
          placeholder="Max"
          name={`${name}-max`}
          className={inputClassName || ''}
          onChange={e => handleChange(e, value => onChange('max', value))}
        />
      </div>
    </div>
  );
};

RangeFilter.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputClassName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default RangeFilter;
