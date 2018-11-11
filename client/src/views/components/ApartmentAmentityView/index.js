import React from 'react';
import PropTypes from 'prop-types';

const ApartmentAmentityView = ({ amenities, limit = 3 }) => {
  return amenities
    .slice(0, limit)
    .map((item) => {
      return(
        <span key={item} className="_1h9l4w0vvX6d56ZnJ3NLod">
          <i></i><span>{item}</span>
        </span>
      );
  });
};

ApartmentAmentityView.propTypes = {
  limit: PropTypes.number,
  amenities: PropTypes.array.isRequired
};

export default ApartmentAmentityView;
