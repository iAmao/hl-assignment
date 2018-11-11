import React from 'react';
import PropTypes from 'prop-types';

import Chip from '../Chip';
import Input from '../Input';


const AmenityFilter = ({
  onClick, onChange, removeItem, values, inputClassName = ''
}) => {
  const { value, list } = values;
  return (
    <div>
      <p>Amenities:</p>
      <div>
        <Input
          type="text"
          value={value}
          name="amenity-value"
          placeholder="Enter Amenity"
          className={`${inputClassName} item-dropdown-input`}
          onChange={e => onChange('amenity-value', e.target.value)}
        />
        <div
          className={`item-dropdown ${inputClassName}`}
          onClick={() => onClick('amenity', value)}
        >
          <div className="item-dropdown-menu">
            {value.length ? <div>{value}</div> : ''}
          </div>
        </div>
      </div>
      <div className="col-12 filter-multi-items-container">
        {list.map(amenity => {
          return <Chip
            label={amenity}
            key={amenity}
            onClick={item => removeItem('amenity', item)}
          />
        })}
      </div>
    </div>
  );
};

AmenityFilter.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  removeItem: PropTypes.func,
  inputClassName: PropTypes.string,
  values: PropTypes.shape({
    value: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.string)
  })
};

export default AmenityFilter;
