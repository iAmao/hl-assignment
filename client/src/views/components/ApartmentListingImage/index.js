import React from 'react';
import PropTypes from 'prop-types';


const ApartmentListingImage = ({ image, price, style={} }) => {
  const imageStyle = {
    backgroundImage: `url(${image})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    ...style
  };

  return (
    <div className="listing-image">
      <div className="media-cover" style={imageStyle}></div>
      <div className="_3Ts2_4uirKsrlm2Qb57Avw"></div>
      <div className="Ok22VaqPDW9x1uaR46cRO _3ORDzmMDnpzTXIIXjJsRw7">
        <span>{price} €</span>
        <span className="_17Hci6D5EewOTY42eIXhPy">
          <span className="_2GcdOjvYR400SpIsNOxzGK">/</span>
          <span>Monat</span>
        </span>
      </div>
    </div>
  );
};

ApartmentListingImage.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  style: PropTypes.object
};

export default ApartmentListingImage;
