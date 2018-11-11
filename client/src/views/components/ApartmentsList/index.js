import React from 'react';
import PropTypes from 'prop-types';

// Components
import ApartmentTileView from '../ApartmentTileView'


const ApartmentsList = ({ component=ApartmentTileView, apartments }) => {
  return apartments.map((apartment) => {
    return <ApartmentTileView key={apartment._id} apartment={apartment} />
  });
};

ApartmentsList.propTypes = {
  component: PropTypes.node,
  apartments: PropTypes.array.isRequired
};

export default ApartmentsList;
