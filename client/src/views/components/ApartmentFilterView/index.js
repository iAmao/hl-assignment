import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import RoomFilter from './RoomFilter';
import SizeFilter from './SizeFilter';
import FloorFilter from './FloorFilter';
import PriceFilter from './PriceFilter';
import AmenityFilter from './AmenityFilter';
import ServiceFilter from './ServiceFilter';
import BedroomFilter from './BedroomFilter';
import BathroomFilter from './BathroomFilter';

import './style.css';


const ApartmentFilterView = ({
  show, values, toggleView, onSubmit, onChange, onSelect, onCancel, onRemove
}) => {
  const { size, price, amenity, service, details: {
    rooms, bedrooms, bathrooms, floor
  } } = values;
  const rangeFilterProps = {
    onChange,
    inputClassName: 'col-5'
  };

  return (
    <div className="filter-panel">
      <div className={show ? 'filter-panel__show__active' : 'filter-panel__show__inactive'}>
        {!show && <Button onClick={toggleView}>Show Filters</Button>}
        <div className="row">
          <div className="col-sm-3">
            <SizeFilter
              {...rangeFilterProps}
              values={{ min: size.min, max: size.max }}
            />
            <PriceFilter
              {...rangeFilterProps}
              values={{ min: price.min, max: price.max }}
            />
          </div>
          <div className="col-sm-3">
            <AmenityFilter
              onClick={onSelect}
              onChange={onChange}
              removeItem={onRemove}
              inputClassName="col-10"
              values={{ value: amenity.value, list: amenity.list }}
            />
            <ServiceFilter
              onClick={onSelect}
              onChange={onChange}
              removeItem={onRemove}
              inputClassName="col-10"
              values={{ value: service.value, list: service.list }}
            />
          </div>
          <div className="col-sm-3">
            <RoomFilter
              {...rangeFilterProps}
              values={{ min: rooms.min, max: rooms.max }}
            />
            <BedroomFilter
              {...rangeFilterProps}
              values={{ min: bedrooms.min, max: bedrooms.max }}
            />
          </div>
          <div className="col-sm-3">
            <BathroomFilter
              {...rangeFilterProps}
              values={{ min: bathrooms.min, max: bathrooms.max }}
            />
            <FloorFilter
              {...rangeFilterProps}
              values={{ min: floor.min, max: floor.max }}
            />
          </div>
        </div>
        <div className="filter-panel-action">
          <Button onClick={onCancel}>Clear Filters</Button>
          &nbsp;&nbsp;
          <Button variant="primary" onClick={onSubmit}>Apply Filters</Button>
        </div>
        {show && <Button onClick={toggleView}>Hide Filters</Button>}
      </div>
    </div>
  );
};


const rangeFilterPropType = PropTypes.shape({
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
}).isRequired;

ApartmentFilterView.propTypes = {
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  toggleView: PropTypes.func.isRequired,
  values: PropTypes.shape({
    size: rangeFilterPropType,
    price: rangeFilterPropType,
    amenity: PropTypes.shape({
      value: PropTypes.string.isRequired,
      list: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    service: PropTypes.shape({
      value: PropTypes.string.isRequired,
      list: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    details: PropTypes.shape({
      rooms: rangeFilterPropType,
      floor: rangeFilterPropType,
      bedrooms: rangeFilterPropType,
      bathrooms: rangeFilterPropType
    }).isRequired
  }).isRequired
};

export default ApartmentFilterView;
