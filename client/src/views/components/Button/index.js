import React from 'react';
import PropTypes from 'prop-types';
import './style.css';


const Button = ({ children, className, variant = 'default', ...props }) => {
  const ClassNames = `hl__btn hl__btn_${variant} ${className || ''}`;

  return (
    <button className={ClassNames} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'success', 'danger', 'primary'])
};

export default Button;
