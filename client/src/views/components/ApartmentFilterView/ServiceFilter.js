import React from 'react';
import PropTypes from 'prop-types';

import Chip from '../Chip';
import Input from '../Input';


const ServiceFilter = ({
  onClick, onChange, values, removeItem, inputClassName = ''
}) => {
  const { value, list } = values;
  return (
    <div>
      <p>Services:</p>
      <div>
        <Input
          type="text"
          value={value}
          name="service-value"
          placeholder="Enter Service"
          className={`${inputClassName} item-dropdown-input`}
          onChange={e => onChange('service-value', e.target.value)}
        />
        <div
          className={`item-dropdown ${inputClassName}`}
          onClick={() => onClick('service', value)}
        >
          <div className="item-dropdown-menu">
            {value.length ? <div>{value}</div> : ''}
          </div>
        </div>
      </div>
      <div className="col-12 filter-multi-items-container">
        {list.map(service => {
          return <Chip
            label={service}
            key={service}
            onClick={item => removeItem('service', item)}
          />
        })}
      </div>
    </div>
  );
};

ServiceFilter.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  removeItem: PropTypes.func,
  inputClassName: PropTypes.string,
  values: PropTypes.shape({
    value: PropTypes.string,
    services: PropTypes.arrayOf(PropTypes.string)
  })
};

export default ServiceFilter;
