import React from 'react';
import PropTypes from 'prop-types';

import './style.css';


const Input = ({ fullWidth=false, className, ...props }) => {
  const classNames = `hl-input ${fullWidth ? 'full-width' : ''}`;
  return (
    <input className={`${classNames} ${className || ''}`} {...props} />
  );
}

Input.propTypes = {
  fullWidth: PropTypes.bool,
  className: PropTypes.string
};

export default Input;
