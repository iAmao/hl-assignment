import React from 'react';

import './style.css';


const MiniNav = () => {
  return (
    <div className="mini-nav">
      <div className="container-lg">
        <a href="/search">Search</a>
        &nbsp;&nbsp;&nbsp;
        <a href="/locations">Locations</a>
      </div>
    </div>
  );
}

export default MiniNav;
