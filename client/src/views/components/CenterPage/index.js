import React from 'react';
import PropTypes from 'prop-types';

import './style.css';


const CenterPage = ({ className, children }) => {
  const classNames = `hl-center-page__root ${className || ''}`;

  return (
    <div className={classNames}>
      {children}
    </div>
  );
};

CenterPage.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default CenterPage;
