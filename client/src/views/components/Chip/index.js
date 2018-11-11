import React from 'react';
import PropTypes from 'prop-types';

import './style.css';


const Chip = ({ label, onClick }) => {
  const props = { className: 'hl-chip' };
  if (onClick) {
    props.onClick = () => onClick(label);
    props.className = `${props.className} ${props.className}_clickable`;
  }
  return (
    <button {...props}>{label}</button>
  );
};

Chip.propTypes = {
  label: PropTypes.string.isRequired
};

export default Chip;
