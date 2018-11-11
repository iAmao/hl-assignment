import React from 'react';
import PropTypes from 'prop-types';

import ApartmentListingImage from '../ApartmentListingImage';
import ApartmentListingDetail from '../ApartmentListingDetail';


const ApartmentTileView = ({ apartment }) => {
  let url = `/apartments/${apartment._id}`;
  let image = `http://localhost:5000/images/apartments/${apartment.images[0]}`;

  return (
    <div className="col-sm-4">
      <div className="col-sm-12 view-apartment-item">
        <div className="view-apartment-item-content">
          <a target ="_blank" href={url}>
            <div className="_3im4pDXrDfzNRT2AlvLfD6">
              <ApartmentListingImage price={apartment.price} image={image} />
              <ApartmentListingDetail
                size={apartment.size}
                title={apartment.title}
                amenities={apartment.amenities}
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

ApartmentTileView.propTypes = {
  apartment: PropTypes.shape({
    _id: PropTypes.string,
    images: PropTypes.array,
    price: PropTypes.number,
    size: PropTypes.number,
    title: PropTypes.string,
    amenities: PropTypes.array,
    owner: PropTypes.shape({
      _id: PropTypes.string,
      email: PropTypes.string
    })
  }).isRequired
};

export default ApartmentTileView;
