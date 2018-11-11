import React from 'react';
import PropTypes from 'prop-types';


const Pulse = (props) => {
  return (
    <div>
      <div className="pulse">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      {props.message && (
        <h4 className="hl-loader__message">{props.message}</h4>
      )}
    </div>
  );
};

Pulse.propTypes = {
  message: PropTypes.string
};

export default Pulse;
