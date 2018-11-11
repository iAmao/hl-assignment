import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import ApartmentAmentityView from "../ApartmentAmentityView";
import './style.css';


const classNames = {
  title: 'text-truncate text-first-capitalize _1NES5HH5UNUjUVK5_-d-AG',
  size: '_17om8IEGFeu2W2TBOJ6xQs Lsdn2hC-tehVod76x4HzK text-truncate'
};

const mailTo = (email) => {
  window.location.href = `mailto:${email}`;
};


const ApartmentListingDetail = ({
  size,
  owner,
  title,
  amenities,
  withOwner=false
}) => {
  return (
    <div className="listing-details-container">
      <div className="listing-details">
        <div className="_3-hUUH6d0vGND3vUzaybD0 Lsdn2hC-tehVod76x4HzK">
          <span className={classNames.title}>
            {title}
          </span>
        </div>
        <div className={classNames.size}>
          <span>{size} m²</span>
        </div>
        <div className="f9YmKwMaSOdtYnk_Qz-iT">
          <div className="dVjtBg_ihJ63cZB8GwE0g text-truncate">
            <ApartmentAmentityView amenities={amenities} />
          </div>
        </div>
        {withOwner && (
          <div className="listing-details__contact">
            <Button variant="primary" onClick={() => mailTo(owner.email)}>
              CONTACT OWNER
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

ApartmentListingDetail.propTypes = {
  withOwner: PropTypes.bool,
  size: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  amenities: PropTypes.array.isRequired,
  owner: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  })
};

export default ApartmentListingDetail;
